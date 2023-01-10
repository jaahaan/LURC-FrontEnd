<template>
  <div>
    <nav class="navbar navbar-expand justify-content-center">
      <div>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <nuxt-link
              class="nav-link text"
              :to="`/profile/${this.$route.params.slug}/${this.$route.params.id}/overview`"
              >Profile
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link text"
              :to="`/profile/${this.$route.params.slug}/${this.$route.params.id}/research`"
              >Research</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link text"
              :to="`/profile/${this.$route.params.slug}/${this.$route.params.id}/project`"
              >Projects</nuxt-link
            >
          </li>
          <li class="nav-item me-2">
            <nuxt-link
              class="nav-link text"
              :to="`/profile/${this.$route.params.slug}/${this.$route.params.id}/post`"
              >Posts</nuxt-link
            >
          </li>
          <!-- <li class="nav-item">
            <div v-if="authUser.id == this.$route.params.id">
              <button class="main-btn" v-on:click="showSidebar()">
                <i class="fa-solid fa-plus"></i> Add New
              </button>
            </div>
          </li> -->
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "ProfileNav",
  components: {},
  data() {
    return {
      isSidebar: false,
      isLoading: true,
      isAdding: false,
      profileInfo: "",
      data: {
        about: "",
        institute: "",
        Skills: "",
      },
      editData: {
        about: "",
        skills: "",
        interests: "",
      },
      educationData: {
        institute: "",
        degree: "",
        fieldOfStudy: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        grade: "",
        activities: "",
      },
      user_id: -1,
      sectionModal: false,
      aboutModal: false,
      educationModal: false,
      skillsModal: false,
      interestsModal: false,
      publicationsModal: false,
      projectsModal: false,
      awardsModal: false,
      volunteerModal: false,
    };
  },
  methods: {
    showSidebar() {
      this.isSidebar = true;
    },
    hideSidebar() {
      this.isSidebar = false;
    },
  },
};
</script>
<style scoped></style>
