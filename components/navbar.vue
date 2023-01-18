<template>
  <div>
    <header>
      <div
        class="navbar-mobile--wrapper d-lg-none"
        v-bind:class="{ active: isSidebar }"
      >
        <div class="navbar-mobile">
          <div class="navbar-mobile--head">
            <nuxt-link
              class="nav-link"
              aria-current="page"
              to="/home"
              v-if="authUser"
            >
              <img src="/assets/images/logo.png" alt="Brand" />
              <!-- <span class="lurc"
                ><span class="lurc1">RESEARCH</span
                ><span class="lurc2">COMMUNITY</span>
              </span> -->
            </nuxt-link>
            <nuxt-link class="nav-link" aria-current="page" to="/" v-else>
              <img src="/assets/images/logo.png" alt="Brand" />
              <!-- <span class="lurc"
                ><span class="lurc1">RESEARCH</span
                ><span class="lurc2">COMMUNITY</span>
              </span> -->
            </nuxt-link>
            <button type="button" v-on:click="hideSidebar()">
              <i class="lni lni-cross-circle"></i>
            </button>
          </div>
          <ul class="navbar-mobile--body">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                aria-current="page"
                to="/home"
                v-if="authUser"
                >Home</nuxt-link
              >
              <nuxt-link class="nav-link" aria-current="page" to="/" v-else
                >Home</nuxt-link
              >
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" aria-current="page" to="/research"
                >Research</nuxt-link
              >
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Departments
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="(department, index) in departments" :key="index">
                  <nuxt-link
                    :to="`/department/${department.department_name}/${department.id}`"
                    class="dropdown-item"
                    href="#"
                    >{{ department.department_name }}</nuxt-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                aria-current="page"
                v-if="authUser.userType == 'admin'"
                to="/admin/teachers"
                >Add Teacher</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- ****notification**** -->

      <div
        class="navbar-notification--wrapper"
        v-bind:class="{ active: isNotification }"
      >
        <div class="navbar-notification">
          <div class="navbar-notification--head">
            <h5>Notification</h5>
            <button type="button" v-on:click="hideNotification()">
              <i class="lni lni-close"></i>
            </button>
          </div>
          <ul
            class="navbar-notification--body"
            v-for="(notification, index) in notificationItem"
          >
            <nuxt-link
              class="nav-item notify"
              v-bind:class="{
                active: notification.seen == 0,
              }"
              :to="`/description/${notification.post_slug}/overview`"
            >
              <li class="nav-link" @click="updateSeen(index)">
                <img :src="notification.image" />
                <div>
                  <nuxt-link
                    :to="`/profile/${notification.user_slug}/overview`"
                    >{{ notification.user_name }}</nuxt-link
                  >
                  {{ notification.msg }}
                </div>
              </li>
            </nuxt-link>
          </ul>
        </div>
      </div>
      <!-- ****SearchBox**** -->
      <div
        class="navbar-search"
        v-bind:class="{ active: isSearchbar }"
        ref="searchBox"
      >
        <div class="navbar-search-input">
          <input type="search" placeholder="Search..." v-model="keyword" />
          <button type="button" class="search-button">
            <i class="lni lni-search-alt" v-if="keyword == ''"></i>
            <i class="lni lni-close" v-else v-on:click="clearSearchBar()"></i>
          </button>
        </div>

        <div class="navbar-search-cancel">
          <button
            type="button"
            class="cancel-button"
            v-on:click="cancelSearchBar()"
          >
            <i class="lni lni-close"></i>
          </button>
        </div>
        <div
          class="navbar-search-result"
          v-if="Users.length > 0 && keyword.length > 0"
        >
          <ul class="search-list w-100 c-pointer">
            <li
              v-for="user in Users"
              v-if="authUser.id != user.id"
              :key="user.id"
              @click="getSearchedUser(user)"
            >
              <img :src="user.image" />
              <div>
                <h4>{{ user.name }}</h4>
                <p>{{ user.designation }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg">
        <div class="container header-content">
          <div class="navbar-item navbar-itemLogo">
            <a class="navbar-brand">
              <nuxt-link class="lurc" to="/home" v-if="authUser"
                ><img src="/assets/images/logo.png" alt="Brand" />
              </nuxt-link>
              <nuxt-link class="lurc" to="/" v-else
                ><img src="/assets/images/logo.png" alt="Brand" />
              </nuxt-link>
            </a>
          </div>
          <div class="navbar-item navbar-body d-none d-lg-block">
            <ul class="navbar-nav">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  aria-current="page"
                  to="/home"
                  v-if="authUser"
                  >Home</nuxt-link
                >
                <nuxt-link class="nav-link" aria-current="page" to="/" v-else
                  >Home</nuxt-link
                >
              </li>

              <li class="nav-item">
                <nuxt-link class="nav-link" aria-current="page" to="/research"
                  >Research</nuxt-link
                >
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Departments
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li v-for="(department, index) in departments" :key="index">
                    <nuxt-link
                      class="dropdown-item"
                      :to="`/department/${department.department_name}/${department.id}`"
                      >{{ department.department_name }}</nuxt-link
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  aria-current="page"
                  v-if="authUser.userType == 'admin'"
                  to="/admin/teachers"
                  >Add Teacher</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="navbar-item">
            <ul class="navbar-item__action" v-if="authUser">
              <li v-on:click="showSearchbar()" ref="searchBoxSource">
                <i class="lni lni-search-alt"> </i>
              </li>
              <li>
                <div v-on:click="showNotification()">
                  <i class="lni lni-alarm"></i>
                  <span
                    class="navbar-action__badge"
                    v-if="this.seenCount > 0"
                    >{{ this.seenCount }}</span
                  >
                </div>
              </li>
              <Dropdown trigger="hover">
                <span
                  ><nuxt-link :to="`/profile/${authUser.slug}/overview`">
                    <img
                      :src="authUser.image"
                      alt="img"
                      class="img-fluid nav-profile-img m-auto"
                    />
                    <!-- <i class="lni lni-user"></i> -->
                  </nuxt-link></span
                >
                <i class="lni lni-chevron-down"></i>
                <!-- <span >category</span> -->
                <DropdownMenu slot="list">
                  <div>
                    <DropdownItem class="d-block">
                      <nuxt-link
                        :to="`/profile/${authUser.slug}/overview`"
                        style="color: #000"
                      >
                        Your Profile
                      </nuxt-link>
                    </DropdownItem>
                  </div>
                  <div>
                    <DropdownItem class="d-block"
                      ><a @click="logout" style="color: #000">
                        Log Out
                      </a></DropdownItem
                    >
                  </div>
                </DropdownMenu>
              </Dropdown>

              <li>
                <button v-on:click="showSidebar()">
                  <i class="d-lg-none"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-list"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </i>
                </button>
              </li>
            </ul>
            <ul class="navbar-item__right" v-else>
              <li>
                <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
              </li>
              <li>
                <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
              </li>
              <li>
                <button v-on:click="showSidebar()">
                  <i class="d-lg-none"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-list"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isSidebar: false,
      isSearchbar: false,
      isNotification: false,
      isFilter: false,
      keyword: "",
      Users: [],
      user_id: -1,
      user_slug: "",
      departments: [],
    };
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params"(oldValue, newValue) {
      if (oldValue != newValue) {
        this.hideNotification();
        this.hideSidebar();
        this.hideSearchbar();
      }
    },
  },

  computed: {
    ...mapGetters({
      seenCount: "getSeenCount",
      notificationItem: "getNotificationItem",
    }),
  },
  methods: {
    showSidebar() {
      this.isSidebar = true;
    },
    hideSidebar() {
      this.isSidebar = false;
    },
    showSearchbar() {
      this.isSearchbar = true;
    },
    hideSearchbar(e) {
      if (this.isSearchbar) {
        let target = e.target;
        var container = this.$refs.searchBox;
        var source = this.$refs.searchBoxSource;

        if (!source.contains(target) && !container.contains(target)) {
          this.isSearchbar = false;
          this.keyword = "";
        }
      }
    },
    async showNotification() {
      this.isNotification = true;
      if (this.seenCount > 0) {
        const res = await this.callApi("post", "/api/update_seenCount");
        if (res.status == 200) {
          this.$store.dispatch("updateSeenCount", 0);
        }
      }
    },
    hideNotification() {
      this.isNotification = false;
    },

    cancelSearchBar() {
      this.isSearchbar = false;
      this.keyword = "";
    },
    clearSearchBar() {
      this.keyword = "";
    },
    getSearchedUser(user) {
      //     const res = await this.callApi(
      //     "get",
      //     `/api/get_profile_info/${this.user_id}`
      // );
      this.user_slug = user.slug;
      this.hideSearchbar(user);
      this.$router.push(`/profile/${this.user_slug}/overview`);
      // this.keyword = "";
    },
    async getResults() {
      const res = await this.callApi(
        "get",
        `/api/search?keyword=${this.keyword}`
      );
      if (res.status == 200) {
        this.Users = res.data;
      } else {
        this.swr();
      }
      // axios
      //   .get("/api/search", {
      //     params: { keyword: this.keyword },
      //   })
      //   .then((res) => (this.Users = res.data))
      //   .catch((error) => {});
    },

    async logout() {
      try {
        const res = await this.callApi("get", "/api/logout");
        if (res.status == 200) {
          window.location = "/";
          this.$store.commit("setAuthInfo", false);
          this.setCookie("token", null);
          this.s("You Are Logged Out");
          // this.$router.push("/");
        } else {
          this.swr();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateSeen(index) {
      if (this.notificationItem[index].seen == 0) {
        let id = this.notificationItem[index].id;
        const res = await this.callApi("post", `/api/update_seen/${id}`);
        // if (res.status == 200) {
        //   const notification = await this.callApi(
        //     "get",
        //     "/api/get_notification"
        //   );
        //   if (notification.status == 200) {
        //     console.log(notification.data.data);
        //     this.$store.dispatch("updateNotification", res.data.notification);
        //   }
        // }
      }
      if (this.$route.params.slug == this.notificationItem[index].post_slug) {
        this.hideNotification();
      }
    },
    async getDepartments() {
      const res = await this.callApi("get", "/api/get_departments");
      if (res.status == 200) {
        this.departments = res.data.data;
      } else {
        this.swr();
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.hideSearchbar);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },
  // async asyncData({ app, store, redirect, params }) {
  //   try {
  //     let [res] = await Promise.all([app.$axios.get(`/api/get_departments`)]);
  //     return {
  //       departments: res.data.data,
  //     };
  //   } catch (error) {
  //     console.log("error from asyncData server");
  //     console.log(error);
  //     //   return redirect("/");
  //   }
  // },
  async created() {
    console.log(this.seenCount);
    console.log(this.notificationItem);

    this.getDepartments();
  },
};
</script>

<style scoped>
.nav-profile-img {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>
