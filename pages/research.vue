<template>
  <div>
    <section class="container research">
      <div class="row">
        <div class="col-lg-9 research-post m-auto">
          <div v-if="isDataLoading == false">
            <div class="research-post--display">
              <div class="research-post--display--icon">
                <button v-on:click="showSearchbar()" ref="searchBoxSource">
                  <i class="lni lni-search-alt"> </i>
                </button>
              </div>

              <!-- ****SearchBox**** -->
              <div
                class="research-post--display--search"
                v-bind:class="{ active: isSearchbar }"
                ref="searchBox"
              >
                <div class="research-post--display--search-input">
                  <input
                    type="search"
                    placeholder="Search..."
                    v-model="search"
                    :ref="`search${search}`"
                    v-on:keyup="filterPosts"
                  />
                  <button type="button" class="search-button">
                    <i class="lni lni-search-alt"></i>
                  </button>
                </div>

                <div class="research-post--display--search-cancel">
                  <button
                    type="button"
                    class="cancel-button"
                    v-on:click="cancelSearchBar"
                  >
                    <i>
                      <i class="lni lni-close"></i>
                    </i>
                  </button>
                </div>
              </div>
              <div class="research-post--display--default">
                <div v-if="isSearchbar == false">
                  <Dropdown trigger="hover">
                    <span
                      ><span v-if="search == ''"> Type </span>
                      <span else>{{ search }}</span></span
                    >
                    <i class="lni lni-chevron-down"></i>
                    <DropdownMenu slot="list">
                      <DropdownItem
                        ><p @click="addToFilterSearch('Article')">
                          Article
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Conference Paper')">
                          Conference Paper
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Data')">
                          Data
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Resaerch')">
                          Resaerch
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Project')">
                          Project
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Presentation')">
                          Presentation
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="addToFilterSearch('Preprint')">
                          Preprint
                        </p></DropdownItem
                      >
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div v-if="isSearchbar == false">
                  <Dropdown trigger="hover">
                    <span>
                      <span v-if="filter.default == 'id'"> Newest </span>
                      <span
                        v-else-if="
                          filter.default == 'title' && filter.order == 'asc'
                        "
                      >
                        Ascending [A-Z]
                      </span>
                      <span
                        v-else-if="
                          filter.default == 'title' && filter.order == 'desc'
                        "
                      >
                        Descending [Z-A]
                      </span>
                      <span
                        v-else-if="
                          filter.default == 'count' && filter.order == 'desc'
                        "
                      >
                        Top Research
                      </span>
                      <span v-else>Default Sort</span>
                    </span>
                    <i class="lni lni-chevron-down"></i>
                    <DropdownMenu slot="list">
                      <DropdownItem
                        ><p @click="removeFromSelectedFilterAll">
                          Default Sort
                        </p></DropdownItem
                      >

                      <DropdownItem
                        ><p @click="sortData(['id', 'desc'])">
                          Newest
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="sortData(['title', 'asc'])">
                          Ascending [A-Z]
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="sortData(['title', 'desc'])">
                          Descending [Z-A]
                        </p></DropdownItem
                      >
                      <DropdownItem
                        ><p @click="sortData(['count', 'desc'])">
                          Top Research
                        </p></DropdownItem
                      >
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <!-- post description -->
            <div v-if="isLoading == false && posts.length">
              <div
                class="research-post--item"
                v-for="(post, index) in posts"
                :key="index"
              >
                <router-link
                  :to="`/description/${post.slug}/overview`"
                  class="post-title"
                >
                  <h5>{{ post.title }}</h5>
                </router-link>
                <div class="mt-2 mb-2">
                  <router-link
                    :to="`/description/${post.slug}/overview`"
                    class="main-btn main-btn__type d-inline-block text-center"
                  >
                    {{ post.type }}</router-link
                  >
                </div>
                <p v-if="post.abstract != null">
                  {{ post.abstract.substring(0, 190) }}
                  ...
                  <router-link :to="`/description/${post.slug}/overview`"
                    >See more</router-link
                  >
                </p>

                <div v-if="post.authors.length">
                  <p
                    v-if="post.authors.length > 1 && post.type != 'Project'"
                    class="mt-2"
                  >
                    Authors:
                    <span v-for="(author, index) in post.authors">
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }} </router-link
                      ><span v-else> {{ author.name }}</span
                      ><span class="dot" v-if="post.authors.length - 1 > index"
                        >.</span
                      >
                    </span>
                  </p>
                  <p
                    v-else-if="
                      post.authors.length > 1 && post.type == 'Project'
                    "
                    class="mt-2"
                  >
                    Team Members:
                    <span v-for="author in post.authors">
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }} </router-link
                      ><span v-else> {{ author.name }}</span
                      ><span class="dot" v-if="post.authors.length - 1 > index"
                        >.</span
                      ></span
                    >
                  </p>
                  <p
                    class="mt-2"
                    v-else-if="
                      post.authors.length == 1 && post.type == 'Project'
                    "
                  >
                    Team Member:
                    <span v-for="author in post.authors">
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }}</router-link
                      ><span v-else> {{ author.name }}</span
                      ><span class="dot" v-if="post.authors.length - 1 > index"
                        >.</span
                      ></span
                    >
                  </p>
                  <p
                    class="mt-2"
                    v-else-if="
                      post.authors.length == 1 && post.type != 'Project'
                    "
                  >
                    Author:
                    <span v-for="author in post.authors">
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }}
                      </router-link>
                      <span v-else> {{ author.name }} . </span>
                    </span>
                  </p>
                </div>
                <div v-else-if="post.authors.length && post.type == 'Project'">
                  <p v-if="post.authors.length > 1" class="mt-2">
                    Team Members:
                    <span
                      v-for="author in post.authors"
                      v-if="post.authors.length"
                    >
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }}
                      </router-link>
                      <span v-else> {{ author.name }} . </span>
                    </span>
                  </p>
                  <p class="mt-2" v-else>
                    Team Member:
                    <span
                      v-for="author in post.authors"
                      v-if="post.authors.length"
                    >
                      <router-link
                        v-if="authUser"
                        :to="`/profile/${author.slug}/overview`"
                        class="authors"
                        >{{ author.name }}
                      </router-link>
                      <span v-else> {{ author.name }} . </span>
                    </span>
                  </p>
                </div>
                <div class="post-sub-title">
                  <p>
                    {{ post.formatedDateTime }}<span class="dot">.</span
                    ><a v-if="post.read_count > 1"
                      >{{ post.read_count }} Reads</a
                    ><a v-else-if="post.read_count <= 1"
                      >{{ post.read_count }} Read</a
                    ><span class="dot">.</span><a>{{ post.upVote }} UpVote</a
                    ><span class="dot">.</span
                    ><a>{{ post.downVote }} DownVote</a>
                  </p>
                </div>
                <div class="footer">
                  <p>
                    <a
                      v-if="post.attachment && authUser"
                      class="main-btn main-btn__bg"
                      :href="`http://localhost:8000/api/download_attachment/${post.attachment}`"
                      >Download <i class="fa-solid fa-download"
                    /></a>
                    <a
                      class="main-btn main-btn__bg px-5"
                      :href="`${post.url}`"
                      v-if="post.url"
                      target="_blank"
                    >
                      Link <i class="fa-solid fa-arrow-up-right-from-square"></i
                    ></a>
                  </p>

                  <p v-if="authUser">
                    <a v-if="post.like_count" @click="getLikedUser(index)">
                      {{ post.like_count }}
                    </a>

                    <a
                      v-on:click="like(index)"
                      v-bind:class="{
                        active: post.authUserLike == 'yes',
                      }"
                    >
                      <i class="fa-solid fa-thumbs-up"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div v-else-if="isLoading == false && posts.length == 0">
              <h2 class="text-center pt-50">No Data Found!!</h2>
            </div>
          </div>
          <div v-if="isDataLoading == true">
            <div class="research-post--skeleton--display">
              <div class="research-post--skeleton--display--icon">
                <p></p>
              </div>

              <div class="research-post--skeleton--display--default">
                <p></p>
                <p></p>
              </div>
            </div>
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
          </div>
          <div v-if="isLoading == true">
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
          </div>
          <div v-if="loadMoreLoading && !noResearchRemaining">
            <div class="research-post--skeleton--item">
              <div class="post-title-skeleton">
                <p></p>
              </div>
              <div class="post-sub-title-skeleton">
                <p></p>
              </div>
              <div class="footer">
                <a> </a>
                <a> </a>
              </div>
            </div>
          </div>
          <!-- <div v-else-if="noResearchRemaining">
            <div style="text-align: center; margin: 30px 0px">
              <h4>No More Research Found...</h4>
            </div>
          </div> -->
        </div>
        <div
          class="col-lg-3 d-none d-lg-block research-people r"
          v-if="authUser"
        >
          <div class="research-post--item">
            <h5 class="post-title">People you may know</h5>
            <ul>
              <li v-for="(user, index) in peopleYouMayKnow">
                <img :src="user.image" alt="img" />
                <div>
                  <nuxt-link :to="`/profile/${user.slug}/overview`">
                    {{ user.name }}
                  </nuxt-link>
                  <p>
                    {{ user.designation }}<span class="dot">.</span
                    >{{ user.department.department_name }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!--***** Liked User Modal *****-->
    <Modal
      v-model="likedUserModal"
      title="People Who Liked"
      :mask-closable="true"
      :closable="true"
    >
      <div class="comment-liked" v-for="user in likedUser">
        <img :src="user.image" alt="img" />
        <router-link :to="`/profile/${user.slug}/overview`">
          {{ user.name }}
        </router-link>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      isSearchbar: false,
      likedUserModal: false,
      loadMoreLoading: false,
      noResearchRemaining: false,
      limit: 4,
      // isLoading: false,
      isDataLoading: true,
      users: [],
      // posts: [],
      departments: [],
      likedUser: [],
      url: "",
      user_id: "",
      like_count: 0,
      authUserLike: "",
      page: 1,
      filter: {
        department: "",
        default: "",
        order: "",
      },
      search: "",
      departmentName: "",
      type: "",
    };
  },

  computed: {
    ...mapGetters({
      peopleYouMayKnow: "getPeopleYouMayKnow",
      posts: "getAllGlobalResearch",
      isLoading: "getGlobalResearchLoading",
    }),
  },
  methods: {
    showSearchbar() {
      this.isSearchbar = true;
      this.search = "";
      this.$nextTick(() => {
        if (this.$refs["search" + this.search]) {
          this.$refs["search" + this.search].focus();
        }
      });
    },
    cancelSearchBar() {
      this.isSearchbar = false;
      this.search = "";
      // this.removeFromSelectedFilterAll();
    },

    hideSearchbar(e) {
      if (this.isSearchbar) {
        let target = e.target;
        var container = this.$refs.searchBox;
        var source = this.$refs.searchBoxSource;

        if (!source.contains(target) && !container.contains(target)) {
          this.isSearchbar = false;
          this.search = "";
        }
      }
    },

    async upVote(index) {
      if (
        this.authUser.userType == "teacher" ||
        this.authUser.userType == "admin"
      ) {
        if (this.posts[index].user_id != this.authUser.id) {
          let upVoteCount1 = parseInt(this.posts[index].upVote, 10);
          let avgVoteCount1 = parseInt(this.posts[index].avgVote, 10);
          let downVoteCount1 = parseInt(this.posts[index].downVote, 10);
          let obj = {
            id: this.posts[index].id,
            upVote: 1,
          };
          console.log(obj);
          const res = await this.callApi("post", "/api/up_vote", obj);
          if (res.status == 200) {
            this.posts[index].upVote = upVoteCount1 - 1;
            this.posts[index].avgVote = upVoteCount1 - 1 - downVoteCount1;
            this.posts[index].authUserVote = "";
          }
          if (res.status == 201) {
            this.posts[index].upVote = upVoteCount1 + 1;
            this.posts[index].avgVote = upVoteCount1 + 1 - (downVoteCount1 - 1);
            this.posts[index].downVote = downVoteCount1 - 1;
            this.posts[index].authUserVote = "up";
          }
          if (res.status == 202) {
            this.posts[index].upVote = upVoteCount1 + 1;
            this.posts[index].avgVote = upVoteCount1 + 1 - downVoteCount1;
            this.posts[index].authUserVote = "up";
          }
        } else {
          this.i("You can't vote your own post!");
        }
      } else {
        this.i(
          "Thanks for the feedback! You are not eligible to cast a vote, but your feedback has been recorded."
        );
      }
    },

    async downVote(index) {
      if (
        this.authUser.userType == "teacher" ||
        this.authUser.userType == "admin"
      ) {
        if (this.posts[index].user_id != this.authUser.id) {
          let upVoteCount1 = parseInt(this.posts[index].upVote, 10);
          let avgVoteCount1 = parseInt(this.posts[index].avgVote, 10);
          let downVoteCount1 = parseInt(this.posts[index].downVote, 10);

          let obj = {
            id: this.posts[index].id,
            downVote: 1,
          };
          console.log(obj);
          const res = await this.callApi("post", "/api/down_vote", obj);
          if (res.status == 200) {
            this.posts[index].avgVote = upVoteCount1 - (downVoteCount1 - 1);
            this.posts[index].downVote = downVoteCount1 - 1;
            this.posts[index].authUserVote = "";
          }
          if (res.status == 201) {
            this.posts[index].upVote = upVoteCount1 - 1;
            this.posts[index].downVote = downVoteCount1 + 1;
            this.posts[index].avgVote = upVoteCount1 - 1 - (downVoteCount1 + 1);
            this.posts[index].authUserVote = "down";
          }

          if (res.status == 202) {
            this.posts[index].avgVote = upVoteCount1 - (downVoteCount1 + 1);
            this.posts[index].downVote = downVoteCount1 + 1;
            this.posts[index].authUserVote = "down";
          }
        } else {
          this.i("You can't vote your own post!");
        }
      } else {
        this.i(
          "Thanks for the feedback! You are not eligible to cast a vote, but your feedback has been recorded."
        );
      }
    },

    async like(index) {
      if (this.posts[index].user_id != this.authUser.id) {
        let obj = {
          id: this.posts[index].id,
        };
        this.id = this.posts[index].id;
        console.log(this.id);
        const res = await this.callApi("post", "/api/like", obj);
        if (res.status == 201) {
          this.posts[index].like_count += 1;
          this.posts[index].authUserLike = "yes";
        } else {
          this.posts[index].like_count -= 1;
          this.posts[index].authUserLike = "no";
        }
      } else {
        this.i("You can't like your own post!!");
      }
    },

    async getLikedUser(index) {
      let obj = {
        id: this.posts[index].id,
      };
      console.log(this.posts[index].id);
      const res = await this.callApi(
        "get",
        `/api/get_liked_user?id=${this.posts[index].id}`
      );
      if (res.status == 200) {
        this.likedUser = res.data.data;
        this.likedUserModal = true;
      } else {
        this.swr();
      }
    },
    async download(post) {
      this.url = post.attachment;
      console.log(this.url);
      const res = await this.callApi(
        "get",
        `/api/download_attachment/${this.url}`
      );
    },
    async view(post) {
      this.id = post.id;
      console.log(this.id);
      const res = await this.callApi("get", `/api/view_attachment/${this.id}`);
      if (res.status == 200) {
        this.s(res.data.msg);
      }
    },
    // async searchPost(query) {
    //     this.isLoading = true;
    //     console.log(query);

    //     // const response = await this.callApi("get", `/api/get_all_research`);
    //     const response = await this.callApi(
    //         "get",
    //         `/api/get_all_research?search=${query}`
    //     );
    //     if (response.status == 200) {
    //         this.posts = response.data.data;
    //     } else this.swr();
    //     this.isLoading = false;
    // },

    sortData(key) {
      this.filter.default = key[0];
      this.filter.order = key[1];
      this.filterPosts();
    },
    addToFilterDepartment(department) {
      this.filter.department = department.id;
      this.departmentName = department.department_name;
      this.filterPosts();
    },
    addToFilterSearch(index) {
      this.search = index;
      this.filterPosts();
    },
    removeFromSelectedFilterAll() {
      this.filter.department = "";
      this.filter.default = "";
      this.filter.order = "";
      this.search = "";
      this.departmentName = "";
      this.filterPosts();
    },
    // async filterPosts() {
    //   this.isLoading = true;
    //   // const response = await this.callApi("get", `/api/get_all_research`);
    //   const response = await this.callApi(
    //     "get",
    //     `/api/get_all_research?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&order=${this.filter.order}`
    //   );
    //   if (response.status == 200) {
    //     this.posts = response.data.data;
    //   } else this.swr();
    //   this.isLoading = false;
    // },

    async filterPosts() {
      window.history.pushState(
        {},
        null,
        `${this.$route.path}?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&order=${this.filter.order}`
      );
      this.$store.commit("setGlobalResearchLoading", true);
      const response = await this.callApi(
        "get",
        `/api/get_all_research?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&order=${this.filter.order}&limit=${this.limit}`
      );
      if (response.status == 200) {
        this.$store.commit("setAllGlobalResearch", response.data.data);
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.$store.commit("setGlobalResearchLoading", false);
    },
    async loadMore(more) {
      console.log("Load more is calling! length", this.posts.length);

      if (this.noResearchRemaining) return;

      this.limit = this.limit + more;
      this.loadMoreLoading = true;
      const res = await this.callApi(
        "get",
        `/api/get_all_research?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&order=${this.filter.order}&limit=${this.limit}`
      );
      if (res.status == 200) {
        let prevLength = this.posts.length;
        if (this.posts.length == res.data.data.length) {
          this.noResearchRemaining = true;
        }
        for (let i in res.data.data) {
          console.log("pushing data");
          let d = res.data.data[i];
          if (i >= prevLength) {
            this.$store.commit("pushAllGlobalResearch", d);
          }
        }
      }
      this.loadMoreLoading = false;
      console.log("Load more is finished! length", this.posts.length);
    },

    // async getDepartments() {
    //   const res = await this.callApi("get", "/api/get_departments");
    //   if (res.status == 200) {
    //     this.departments = res.data.data;
    //   } else {
    //     this.swr();
    //   }
    //   this.isDataLoading = false;
    // },
  },
  watch: {
    "$route.fullPath": function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      window.scrollTo(0, 0);

      this.page = this.$route.query.page ? this.$route.query.page : 1;

      this.filterPosts();
    },
  },
  async created() {
    this.page = this.$route.query.page ? this.$route.query.page : 1;
    this.$store.commit("setGlobalResearchLoading", true);
    if (this.authUser) {
      const [res, res1] = await Promise.all([
        this.callApi(
          "get",
          `/api/get_all_research?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&limit=${this.limit}`
        ),
        this.callApi("get", "/api/get_people_you_may_know"),
      ]);

      if (res.status == 200 && res1.status == 200) {
        this.$store.commit("setAllGlobalResearch", res.data.data);
        this.$store.dispatch("updatePeopleYouMayKnow", res1.data.data);
        this.$store.commit("setGlobalResearchLoading", false);
      }
    } else {
      const res = await this.callApi(
        "get",
        `/api/get_all_research?department=${this.filter.department}&search=${this.search}&default=${this.filter.default}&limit=${this.limit}`
      );
      if (res.status == 200) {
        this.$store.commit("setAllGlobalResearch", res.data.data);
        this.$store.commit("setGlobalResearchLoading", false);
      }
    }
    this.$store.commit("setGlobalResearchLoading", false);
    this.isDataLoading = false;
  },

  mounted() {
    document.addEventListener("click", this.hideSearchbar);
    window.onscroll = () => {
      this.bottomOfWindow =
        window.pageYOffset + window.innerHeight >
        document.body.scrollHeight - 100;

      if (this.bottomOfWindow) {
        if (!this.loadMoreLoading) {
          this.loadMore(4);
        }
      }
    };
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },
};
</script>
<style scoped>
h6:hover {
  cursor: pointer;
  color: #000;
}

.image-loader {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 100px;
  border: 1px solid transparent;
  overflow: hidden;
  background: #a7a7a7;
  margin-right: 2px;
}

.loader h6 {
  width: 160px;
  height: 15px;
  margin-bottom: 5px;
  background-color: #c0c0c0;
}
.loader p {
  width: 50px;
  height: 15px;
  background-color: #a7a7a7;
}
</style>
