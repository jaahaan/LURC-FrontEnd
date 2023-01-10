<template>
  <div class="mt-2">
    <!--****** Add Project box ******-->

    <template
      v-if="isLoading == false && showProjectForm == false && projects == ''"
    >
      <div class="card mb-2 p-3" v-if="authUser.id == this.$route.params.id">
        <button class="add_new_card" v-on:click="showForm()">
          <i class="lni lni-folder"></i> Add Your Project
        </button>
      </div>
    </template>

    <!--****** Add Project form ******-->
    <template v-if="showProjectForm == true">
      <div class="research-post--item">
        <h5 class="post-title">
          <div>Add Project</div>
          <div class="btn-edit text-danger" @click="reset()">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </h5>
        <Form label-position="top">
          <FormItem label="Project Name *">
            <Input v-model="data.title" placeholder="Project Name"></Input>
            <span class="text-danger" v-if="errors.title">{{
              errors.title[0]
            }}</span>
          </FormItem>

          <FormItem label="Description">
            <Input
              v-model="data.abstract"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="Write description..."
            ></Input>
            <span class="text-danger" v-if="errors.abstract">{{
              errors.abstract[0]
            }}</span>
          </FormItem>
          <FormItem label="Team Member">
            <Select
              filterable
              multiple
              placeholder="Select Authors"
              v-model="data.author_id"
              :remote-method="getAuthors"
            >
              <Option
                v-for="(user, index) in users"
                :value="user.id"
                :key="index"
                >{{ user.name }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="Affiliation">
            <Input placeholder="Affiliation" v-model="data.affiliation" />
            <span class="text-danger" v-if="errors.affiliation">{{
              errors.affiliation[0]
            }}</span>
          </FormItem>
          <FormItem label="Project URL">
            <Input type="url" v-model="data.url" placeholder="Project URL" />
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </FormItem>

          <FormItem label="Attachment">
            <Upload
              :headers="{
                'x-csrf-token': token,
                'X-Requested-With': 'XMLHttpRequest',
              }"
              ref="upload"
              :multiple="true"
              :show-upload-list="true"
              :on-success="handleSuccess"
              :format="[
                'jpg',
                'jpeg',
                'png',
                'pdf',
                'docx',
                'txt',
                'mp4',
                'mp3',
                'zip',
              ]"
              :max-size="21048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-remove="deleteAttachment"
              type="drag"
              action="/api/upload_attachment"
            >
              <div class="profile-main-btn">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                Upload Attachment
              </div>
            </Upload>
            <div v-if="this.attachmentName" class="attachmentName">
              <span class="c-pointer">{{ this.attachmentName }}</span>
              <span @click="deleteAttachment"
                ><i class="lni lni-trash-can c-pointer"></i
              ></span>
            </div>
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </FormItem>
          <FormItem label="Project URL">
            <Input type="url" v-model="data.url" placeholder="Project URL" />
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </FormItem>
          <div class="row">
            <div class="col-6">
              <FormItem label="Start Date">
                <DatePicker
                  type="date"
                  v-model="data.start_date"
                  placeholder="Start Date"
                ></DatePicker>
                <span class="text-danger" v-if="errors.start_date">{{
                  errors.start_date[0]
                }}</span>
              </FormItem>
            </div>

            <div class="col-6">
              <FormItem label="End Date (or expected)">
                <DatePicker
                  type="date"
                  v-model="data.end_date"
                  placeholder="End Date (or expected)"
                ></DatePicker>
                <span class="text-danger" v-if="errors.end_date">{{
                  errors.end_date[0]
                }}</span>
              </FormItem>
            </div>
          </div>
        </Form>
        <!-- <div>
          <div class="mb-2">
            <label>Project Name *</label>

            <Input
              type="text"
              v-model="data.title"
              placeholder="Project Name"
            />
            <span class="text-danger" v-if="errors.title">{{
              errors.title[0]
            }}</span>
          </div>
          <div class="mb-2">
            <label>Description</label>
            <textarea
              class="form-control form-outline"
              v-model="data.abstract"
              rows="4"
            ></textarea>
            <span class="text-danger" v-if="errors.abstract">{{
              errors.abstract[0]
            }}</span>
          </div>
          <div class="mb-2">
            <label>Team Member</label>

            <Select
              filterable
              multiple
              placeholder="Select Authors"
              v-model="data.author_id"
            >
              <Option
                v-for="(user, index) in users"
                :value="user.id"
                :key="index"
                >{{ user.name }}</Option
              >
            </Select>
          </div>
          <div class="mb-2">
            <label>Affiliation</label>
            <Input
              type="text"
              placeholder="Affiliation"
              v-model="data.affiliation"
            />
            <span class="text-danger" v-if="errors.affiliation">{{
              errors.affiliation[0]
            }}</span>
          </div>
          <div class="mb-2">
            <label>Project URL</label>
            <Input type="url" v-model="data.url" placeholder="Project URL" />
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </div>
          <div class="mb-2">
            <label>Attachment</label>
            <Upload
              :headers="{
                'x-csrf-token': token,
                'X-Requested-With': 'XMLHttpRequest',
              }"
              ref="upload"
              :multiple="true"
              :show-upload-list="true"
              :on-success="handleSuccess"
              :format="[
                'jpg',
                'jpeg',
                'png',
                'pdf',
                'docx',
                'txt',
                'mp4',
                'mp3',
                'zip',
              ]"
              :max-size="21048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-remove="deleteAttachment"
              type="drag"
              action="/api/upload_attachment"
            >
              <div class="profile-main-btn">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                Upload Attachment
              </div>
            </Upload>
            <div v-if="this.attachmentName" class="attachmentName">
              <span class="c-pointer">{{ this.attachmentName }}</span>
              <span @click="deleteAttachment"
                ><i class="lni lni-trash-can c-pointer"></i
              ></span>
            </div>
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </div>
          <div class="mb-2">
            <div class="row">
              <div class="col-6">
                <label>Start Date</label>
                <input
                  type="month"
                  v-model="data.start_date"
                  placeholder="Start Date"
                  class="d-block w-100 p-1"
                />
                <span class="text-danger" v-if="errors.start_date">{{
                  errors.start_date[0]
                }}</span>
              </div>

              <div class="col-6">
                <label>End Date (or expected)</label>
                <input
                  type="month"
                  v-model="data.end_date"
                  placeholder="End Date (or expected)"
                  class="d-block w-100 p-1"
                />
                <span class="text-danger" v-if="errors.end_date">{{
                  errors.url[0]
                }}</span>
              </div>
            </div>
          </div>
        </div> -->
        <div class="footer">
          <div>
            <button class="main-btn main-btn__border" @click="save()">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            <button
              class="main-btn main-btn__border"
              @click="reset(profileInfo)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </template>

    <!--**** Projects ****-->

    <template
      v-if="projects != '' && isLoading == false && showProjectForm == false"
    >
      <div>
        <div>
          <div class="section-header">
            <div>
              <h3>Projects</h3>
            </div>
            <div
              v-if="authUser.id == route_id && editData.id == ''"
              class="btn-edit"
              @click="showForm()"
            >
              <i class="lni lni-plus"></i>
            </div>
          </div>
        </div>
        <div
          class="research-post--item"
          v-for="(research, index) in projects"
          :key="index"
        >
          <h5 class="post-title">
            <router-link :to="`/description/${research.slug}`">{{
              research.title
            }}</router-link>
            <div
              v-if="authUser.id == route_id && editData.id == ''"
              class="btn-edit"
              @click="showEdit()"
            >
              <i class="lni lni-pencil"></i>
            </div>
          </h5>
          <div class="mt-2 mb-2">
            <router-link
              :to="`/description/${research.slug}`"
              class="main-btn main-btn__border d-inline-block text-center"
            >
              {{ research.type }}</router-link
            >
          </div>
          <p v-if="research.abstract != null">
            {{ research.abstract.substring(0, 190) }}
            ...
            <router-link :to="`/description/${research.slug}`"
              >See more</router-link
            >
          </p>

          <div v-if="research.authors.length">
            <p
              v-if="research.authors.length > 1 && research.type != 'Project'"
              class="mt-2"
            >
              Authors:
              <span v-for="author in research.authors">
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
            <p
              v-else-if="
                research.authors.length > 1 && research.type == 'Project'
              "
              class="mt-2"
            >
              Team Members:
              <span v-for="author in research.authors">
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
            <p
              class="mt-2"
              v-else-if="
                research.authors.length == 1 && research.type == 'Project'
              "
            >
              Team Member:
              <span v-for="author in research.authors">
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
            <p
              class="mt-2"
              v-else-if="
                research.authors.length == 1 && research.type != 'Project'
              "
            >
              Author:
              <span v-for="author in research.authors">
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
          </div>
          <div
            v-else-if="research.authors.length && research.type == 'Project'"
          >
            <p v-if="research.authors.length > 1" class="mt-2">
              Team Members:
              <span
                v-for="author in research.authors"
                v-if="research.authors.length"
              >
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
            <p class="mt-2" v-else>
              Team Member:
              <span
                v-for="author in research.authors"
                v-if="research.authors.length"
              >
                <router-link
                  v-if="authUser"
                  :to="`/profile/${author.slug}/${author.id}`"
                  class="authors"
                  >{{ author.name }}
                </router-link>
                <span v-else> {{ author.name }} . </span>
              </span>
            </p>
          </div>
          <div class="post-sub-title">
            <p>
              {{ research.created_at }}
              .
              <a v-if="research.read_count > 1"
                >{{ research.read_count }} Reads</a
              ><a v-else-if="research.read_count <= 1"
                >{{ research.read_count }} Read</a
              >
              .
              <a>{{ research.upVote }} UpVote</a>
              .
              <a>{{ research.downVote }} DownVote</a>
            </p>
          </div>
          <div class="footer">
            <p>
              <a
                v-if="research.attachment && authUser"
                class="main-btn main-btn__bg"
                :href="`http://localhost:8000/api/download_attachment/${research.attachment}`"
                >Download</a
              >
              <a
                class="main-btn main-btn__bg px-5"
                :href="`${research.url}`"
                v-if="research.url"
                target="_blank"
              >
                Link
              </a>
            </p>

            <p v-if="authUser">
              <a v-if="research.like_count" @click="getLikedUser(index)">
                {{ research.like_count }}
              </a>

              <a
                v-on:click="like(index)"
                v-bind:class="{
                  active: research.authUserLike == 'yes',
                }"
              >
                <i class="fa-solid fa-thumbs-up"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </template>
    <!--**** loader ****-->
    <template v-if="isLoading == true">
      <div class="research-post--skeleton">
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
      <div class="research-post--skeleton">
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
      <div class="research-post--skeleton">
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
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showProjectForm: false,
      isLoading: true,
      errors: [],
      projects: [],
      users: [],
      user_id: -1,
      user_slug: "",
      route_id: this.$route.params.id,
      attachmentName: "",
      data: {
        type: "",
        title: "",
        author_id: [],
        attachment: "",
        abstract: "",
        url: "",
        images: [],
        pdf: "",
        start_date: "",
        end_date: "",
      },
      editData: {
        user_id: "",
        type: "",
        conference: "",
        conference_date: "",
        title: "",
        author_id: [],
        attachment: "",
        abstract: "",
        start_date: "",
        end_date: "",
        url: "",
        images: [],
        pdf: "",
        id: "",
        index: "",
      },
    };
  },

  methods: {
    async deleteAttachment() {
      let attachment = this.attachmentName;
      this.$refs.upload.clearFiles();
      this.attachmentName = "";
      this.data.attachment = "";

      const res = await this.callApi("post", "/api/delete_attachment", {
        Name: attachment,
      });
      if (res.status != 200) {
        this.data.attachment = attachment;
        this.swr();
      }
    },
    handleSuccess(res, file) {
      // res = `/attachments/${res}`;
      // res1 = `${res}`;
      this.$refs.upload.clearFiles();
      // if (this.isEditingItem) {
      //     console.log("inside");
      //     return (this.data.attachments = res);
      // }
      // console.log(res);
      // this.data.attachment = `\\attachments\\${res}`;
      console.log(this.data.attachment);
      this.data.attachment = `${res}`;

      this.attachmentName = `${res}`;
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
    showForm() {
      this.showProjectForm = true;
    },
    async reset() {
      this.showProjectForm = false;
      this.editData.id = "";
      this.user_id = this.$route.params.id;
      this.data = {
        type: "",
        title: "",
        author_id: [],
        attachment: "",
        abstract: "",
        url: "",
        images: [],
        pdf: "",
        start_date: "",
        end_date: "",
      };
      // const res = await this.callApi(
      //     "get",
      //     `/api/get_research/${this.user_id}`
      // );
      // if (res.status == 200) {
      //     this.researches = res.data;
      //     this.errors = [];
      // } else {
      //     this.swr();
      // }

      this.isLoading = false;
    },
    async save() {
      // if (this.data.project_name.trim() == "")
      //     return this.e("Project Name is required");
      // if (this.data.project_type.trim() == "")
      //     return this.e("Project type is required");
      // if (this.data.start_date.trim() == "")
      //     return this.e("Start date is required");
      this.user_id = this.$route.params.id;
      this.data.type = "Project";
      console.log(this.user_id);
      const res = await this.callApi(
        "post",
        `/api/save_post/${this.user_id}`,
        this.data
      );
      this.isLoading = true;
      if (res.status === 200) {
        this.s(res.data.msg);
        // this.msg = res.data.msg;
        this.data.type = "";
        this.data.title = "";
        this.data.author_id = "";
        this.data.attachment = "";
        this.data.abstract = "";
        this.data.start_date = "";
        this.data.end_date = "";
        this.data.url = "";
        this.attachmentName = "";
        this.reset();
      } else {
        if (res.status == 422) {
          console.log(this.$route.params.id);

          for (let i in res.data.errors) {
            this.errors = res.data.errors;
          }
        } else {
          this.swr();
        }
      }
      this.isLoading = false;
    },
    editProject(index) {
      if (this.projects[index].id) {
        this.editData.user_id = this.projects[index].user_id;
        this.editData.project_name = this.projects[index].project_name;
        this.editData.project_type = this.projects[index].project_type;
        this.editData.start_date = this.projects[index].start_date;
        this.editData.end_date = this.projects[index].end_date;
        this.editData.project_url = this.projects[index].project_url;
        this.editData.project_description =
          this.projects[index].project_description;
        this.editData.id = this.projects[index].id;
        this.editData.index = index;
        this.$nextTick(() => {
          if (this.$refs["projectName" + this.projects[index].id]) {
            this.$refs["projectName" + this.projects[index].id][0].focus();
          }
        });
      }
    },

    async updateProject() {
      // if (this.data.project_name.trim() == "")
      //     return this.e("Project Name is required");
      // if (this.data.project_type.trim() == "")
      //     return this.e("Project type is required");
      // if (this.data.start_date.trim() == "")
      //     return this.e("Start date is required");
      this.user_id = this.$route.params.id;
      this.isLoading = true;

      const res = await this.callApi(
        "post",
        "/api/update_project",
        this.editData
      );
      if (res.status === 200) {
        this.s(res.data.msg);
        // this.msg = res.data.msg;
        this.errors = "";
        this.reset();
      } else {
        if (res.status == 422) {
          console.log(this.$route.params.id);

          for (let i in res.data.errors) {
            this.errors = res.data.errors;
          }
        } else {
          this.swr();
        }
      }
      this.isLoading = false;
    },

    async deleteProject() {
      this.isLoading = true;

      const res = await this.callApi(
        "post",
        `/api/delete_project/${this.editData.id}`
      );

      if (res.status === 200) {
        this.s(res.data.msg);
        // this.reset();
        this.projects.splice(this.editData.index, 1);
      } else {
        this.swr();
      }
      this.isLoading = false;
    },

    async getAuthors(query) {
      console.log(query);
      const response = await this.callApi(
        "get",
        `/api/search?keyword=${query}`
      );
      if (response.status == 200) {
        this.users = response.data;
      }
    },
  },

  // watch: {
  //   "$route.params"(oldValue, newValue) {
  //     if (oldValue != newValue) {
  //       console.log("route is changing!");
  //       this.reset();
  //     }
  //   },
  // },

  async created() {
    // this.token = window.Laravel.csrfToken;
    this.user_slug = this.$route.params.slug;
    const res = await this.callApi(
      "get",
      `/api/get_user_project/${this.user_slug}`
    );
    if (res.status == 200) {
      this.projects = res.data.data;
    } else {
      this.swr();
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.card-header-border {
  border-bottom: 1px solid #34c5d9;
}
p {
  color: #333;
}

.profile-info-skeleton h5 {
  width: 60%;
  height: 24px;
  display: block;
  background-color: #c0c0c0;
  margin: 0.25rem;
}
.profile-info-skeleton p {
  width: 95%;
  height: 16px;
  margin: 0.25rem;
  background-color: #c0c0c0;
}
</style>
