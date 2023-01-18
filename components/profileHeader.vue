<template>
  <div>
    <section class="container">
      <div class="profile-section">
        <div class="profile-menu">
          <div v-if="isLoading == false">
            <!--****** Profile edit for Teacher ******-->
            <template v-if="editModal && isLoading == false">
              <div
                class="container"
                v-if="
                  profileInfo.userType == 'teacher' ||
                  profileInfo.userType == 'admin'
                "
              >
                <div class="profile-header m-auto" v-if="editData.image">
                  <img
                    :src="`${editData.image}`"
                    class="img-fluid"
                    type="file"
                  />
                  <div class="profile-header-cover" @click="deleteImage()">
                    <i class="lni lni-trash-can"></i>
                  </div>
                </div>

                <div class="mt-3 mb-3">
                  <Upload
                    ref="editDataUploads"
                    type="drag"
                    :headers="{
                      'x-csrf-token': token,
                      'X-Requested-With': 'XMLHttpRequest',
                    }"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    action="http://localhost:8000/api/upload"
                  >
                    <div class="profile-main-btn">
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                      Upload Image
                    </div>
                  </Upload>
                </div>

                <div class="plr-1rem">
                  <div class="mb-2">
                    <Input
                      type="text"
                      v-model="editData.name"
                      placeholder="Name"
                    />
                    <span class="text-danger" v-if="errors.name">{{
                      errors.name[0]
                    }}</span>
                  </div>
                  <div class="mb-2">
                    <Select
                      v-model="editData.designation"
                      placeholder="Designation"
                    >
                      <Option value="Head">Head</Option>
                      <Option value="Professor">Professor</Option>
                      <Option value="Associate Professor"
                        >Associate Professor</Option
                      >
                      <Option value="Assistant Professor"
                        >Assistant Professor</Option
                      >
                      <Option value="Lecturer">Lecturer</Option>
                    </Select>
                    <span class="text-danger" v-if="errors.designation">{{
                      errors.designation[0]
                    }}</span>
                  </div>
                  <div class="mb-2">
                    <Select
                      v-model="editData.department"
                      placeholder="Department"
                    >
                      <Option
                        v-for="(department, index) in departments"
                        :key="index"
                        :value="department.id"
                        >{{ department.department_name }}</Option
                      >
                    </Select>
                    <span class="text-danger" v-if="errors.department">{{
                      errors.department[0]
                    }}</span>
                  </div>
                  <div class="d-flex mb-2">
                    <button
                      class="profile-main-btn col-6"
                      @click="closeEditModal()"
                    >
                      Cancel
                    </button>
                    <button class="profile-main-btn col-6" @click="save()">
                      <i class="fa-solid fa-floppy-disk"></i> Save
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <!--****** Profile edit for Student ******-->
            <template v-if="editModal && isLoading == false">
              <div class="container" v-if="profileInfo.userType == 'student'">
                <div class="profile-header m-auto" v-if="editData.image">
                  <img
                    :src="`${editData.image}`"
                    class="img-fluid"
                    type="file"
                  />
                  <div class="profile-header-cover" @click="deleteImage()">
                    <i class="lni lni-trash-can"></i>
                  </div>
                </div>

                <div class="mt-3 mb-3">
                  <Upload
                    ref="editDataUploads"
                    type="drag"
                    :headers="{
                      'x-csrf-token': token,
                      'X-Requested-With': 'XMLHttpRequest',
                    }"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    action="http://localhost:8000/api/upload"
                  >
                    <div class="profile-main-btn">
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                      Upload Image
                    </div>
                  </Upload>
                </div>

                <div class="plr-1rem">
                  <div class="mb-2">
                    <Input
                      type="text"
                      v-model="editData.name"
                      placeholder="Name"
                    />
                    <span class="text-danger" v-if="errors.name">{{
                      errors.name[0]
                    }}</span>
                  </div>
                  <div class="mb-2">
                    <Select
                      v-model="editData.department"
                      placeholder="Department"
                    >
                      <Option
                        v-for="(department, index) in departments"
                        :key="index"
                        :value="department.id"
                        >{{ department.department_name }}</Option
                      >
                    </Select>
                    <span class="text-danger" v-if="errors.department">{{
                      errors.department[0]
                    }}</span>
                  </div>
                  <div class="d-flex mb-2">
                    <button
                      class="profile-main-btn col-6"
                      @click="closeEditModal()"
                    >
                      Cancel
                    </button>
                    <button class="profile-main-btn col-6" @click="save()">
                      <i class="fa-solid fa-floppy-disk"></i> Save
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <!--****** Profile Info ******-->
            <template v-else>
              <div class="profile-header m-auto">
                <img :src="profileInfo.image" alt="img" class="img-fluid" />
                <div
                  class="profile-header-cover"
                  @click="showEditModal(profileInfo)"
                  v-if="authUser.slug == this.$route.params.slug"
                >
                  <i class="fa-solid fa-camera"></i>
                </div>
              </div>
              <h4 class="header">
                {{ profileInfo.name
                }}<span
                  v-if="authUser.slug == this.$route.params.slug"
                  class="btn-edit m-2"
                  @click="showEditModal()"
                >
                  <i class="fa-solid fa-pen" />
                </span>
              </h4>
              <p id="not">
                {{ profileInfo.designation }}
                .
                {{ profileInfo.department.department_name }}
              </p>
              <p>Leading University</p>
            </template>
          </div>
          <!---******* loader *******--->
          <div class="container mb-2" v-if="isLoading == true">
            <div class="profile-header-skeleton m-lg-auto">
              <img
                :src="'/profileImages/download.jpg'"
                alt="img"
                class="img-fluid m-auto"
              />
            </div>
            <div class="p-3 profile-info-skeleton">
              <h4 class="mt-1 mb-1" />
              <p class="mb-1" />
              <p />
            </div>
          </div>
          <div class="d-lg-block d-none">
            <ul class="profile-menu--list">
              <li class="profile-menu--list---item">
                <nuxt-link
                  class="menu-link"
                  aria-current="page"
                  :to="`/profile/${this.$route.params.slug}/overview`"
                  ><h4>Profile</h4></nuxt-link
                >
              </li>
              <li class="profile-menu--list---item" v-if="authUser">
                <nuxt-link
                  class="menu-link"
                  aria-current="page"
                  :to="`/profile/${this.$route.params.slug}/research`"
                >
                  <h4>Research</h4></nuxt-link
                >
              </li>
              <li class="profile-menu--list---item" v-if="authUser">
                <nuxt-link
                  class="menu-link"
                  aria-current="page"
                  :to="`/profile/${this.$route.params.slug}/project`"
                  ><h4>Projects</h4></nuxt-link
                >
              </li>
              <li class="profile-menu--list---item" v-if="authUser">
                <nuxt-link
                  class="menu-link"
                  aria-current="page"
                  :to="`/profile/${this.$route.params.slug}/post`"
                  ><h4>Posts</h4></nuxt-link
                >
              </li>
            </ul>
          </div>
          <div class="d-lg-none">
            <profileNav />
          </div>
        </div>

        <!-- profile description -->
        <div class="profile-description menu-item">
          <div class="menu-item-box">
            <Nuxt />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ProfileNav from "./profileNav";

export default {
  name: "Profile",

  data() {
    return {
      isLoading: true,
      data: {
        image: "",
        name: "",
        designation: "",
        department: "",
        about: "",
        //education
        institute: "",

        Skills: "",
      },
      editModal: false,
      departments: [],
      profileInfo: [],
      editData: {
        image: "",
        name: "",
        designation: "",
        department: "",
        about: "",
        skills: "",
        interests: "",
      },
      index: -1,
      user_slug: "",
      token: "",
      isIconImageNew: false,
      isEditingItem: false,
      errors: [],
    };
  },
  components: {
    ProfileNav,
  },
  methods: {
    async save() {
      if (this.editData.name.trim() == "") return this.e("Name is required");
      if (this.editData.designation == "")
        return this.e("Designation is required");
      if (this.editData.department == "")
        return this.e("Department is required");
      const res = await this.callApi(
        "post",
        `/api/edit_profile`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.name = this.editData.name;
        this.profileInfo.designation = this.editData.designation;
        this.profileInfo.department_id = this.editData.department;
        this.reset();
        this.s("Profile has been updated successfully!");
        this.editModal = false;
        this.errors = [];
        // window.location = `/profile/${this.profileInfo.id}`;
      } else {
        if (res.status == 422) {
          for (let i in res.data.errors) {
            this.errors = res.data.errors;
            // this.e(res.data.errors[i][0]);
          }
        } else {
          this.swr();
        }
      }
    },
    showEditModal() {
      let obj = {
        id: this.profileInfo.id,
        image: this.profileInfo.image,
        name: this.profileInfo.name,
        designation: this.profileInfo.designation,
        department: parseInt(this.profileInfo.department_id),
      };
      this.editModal = true;
      this.editData = obj;
      // this.departments.push(this.profileInfo.department);
      this.isEditingItem = true;
    },
    handleSuccess(res, file) {
      res = `http://localhost:8000/profileImages/${res}`;
      if (this.isEditingItem) {
        console.log("inside");
        this.$refs.editDataUploads.clearFiles();
        return (this.editData.image = res);
      }
      console.log(res);
      this.data.image = res;
    },
    handleError(res, file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc: `${
          file.errors.file.length
            ? file.errors.file[0]
            : "Something went wrong!"
        }`,
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    async deleteImage() {
      let image;
      // for editing....
      // this.isIconImageNew = true;
      image = this.editData.image;
      this.editData.image = "http://localhost:8000/profileImages/download.jpg";
      this.$refs.editDataUploads.clearFiles();
      const res = await this.callApi("post", "/api/delete_image", {
        imageName: image,
      });
      if (res.status != 200) {
        this.data.image = image;
        this.swr();
      }
    },
    closeEditModal() {
      this.isEditingItem = false;
      this.editModal = false;
    },
    async getDepartments() {
      const res = await this.callApi("get", "/api/get_departments");
      if (res.status == 200) {
        this.departments = res.data.data;
      } else {
        this.swr();
      }
      this.isLoading = false;
    },
    async reset() {
      // this.token = window.Laravel.csrfToken;

      this.user_slug = this.$route.params.slug;
      const res = await this.callApi(
        "get",
        `/api/get_profile_info/${this.user_slug}`
      );

      if (res.status == 200) {
        this.profileInfo = res.data.user;
      } else {
        this.swr();
      }
      this.isLoading = false;
    },
  },

  // to perform "side effects" in reaction to state changes
  watch: {
    "$route.params"(oldValue, newValue) {
      if (oldValue != newValue) {
        console.log("route is changing!");
        this.reset();
      }
    },
  },
  async created() {
    // this.token = window.Laravel.csrfToken;
    this.getDepartments();
    this.user_slug = this.$route.params.slug;
    const res = await this.callApi(
      "get",
      `/api/get_profile_info/${this.user_slug}`
    );
    if (res.status == 200) {
      this.profileInfo = res.data.user;
    } else {
      this.swr();
    }
    this.isLoading = false;
  },
};
</script>
<style scoped></style>
