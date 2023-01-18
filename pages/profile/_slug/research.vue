<template>
  <div>
    <!--****** Add Research box ******-->

    <template
      v-if="isLoading == false && showResearchForm == false && researches == ''"
    >
      <div class="card mb-2 p-3" v-if="authUser.slug == route_slug">
        <button class="add_new_card" v-on:click="showForm()">
          <i class="lni lni-folder"></i> Add Your Research
        </button>
      </div>
    </template>

    <!--****** Add Research form ******-->
    <template v-if="showResearchForm == true">
      <div class="research-post--item">
        <h5 class="post-title">
          <div v-if="data.type == ''">Add Research</div>
          <div v-else>Add {{ data.type }}</div>

          <div class="btn-edit text-danger" @click="reset">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </h5>
        <div class="card-body">
          <div class="mb-2">
            <label>Research Type *</label>
            <Select v-model="data.type" placeholder="Select Type">
              <Option value="Article">Article</Option>
              <Option value="Conference Paper">Conference Paper</Option>
              <Option value="Data">Data</Option>
              <Option value="Research">Research</Option>
              <Option value="Presentation">Presentation</Option>
              <Option value="Preprint">Preprint</Option>
              <Option value="Poster">Poster</Option>
            </Select>
            <span class="text-danger" v-if="errors.type">{{
              errors.type[0]
            }}</span>
          </div>

          <div v-if="data.type == 'Conference Paper'">
            <div class="mb-2" v-if="data.type == 'Conference Paper'">
              <label>Conference *</label>
              <Input
                type="text"
                v-model="data.conference"
                placeholder="Conference"
              />
              <span class="text-danger" v-if="errors.conference">{{
                errors.conference[0]
              }}</span>
            </div>
            <div class="mb-2" v-if="data.type == 'Conference Paper'">
              <label>Publication Date</label>
              <input
                type="month"
                v-model="data.publication_date"
                placeholder="Publication Date"
                class="d-block w-100 p-1"
              />
              <span class="text-danger" v-if="errors.start_date">{{
                errors.start_date[0]
              }}</span>
            </div>
          </div>
          <div class="mb-2">
            <label>Title *</label>
            <Input
              type="text"
              v-model="data.title"
              placeholder="Research Title"
            />
            <span class="text-danger" v-if="errors.title">{{
              errors.title[0]
            }}</span>
          </div>

          <div class="mb-2">
            <label>Abstract</label>
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
            <label>Authors</label>
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
            <label>URL</label>
            <Input type="url" v-model="data.url" placeholder="URL" />
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </div>
          <div class="mb-2">
            <label>Attachment</label>
            <Upload
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
              action="http://localhost:8000/api/upload_attachment"
            >
              <div class="profile-main-btn">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                Upload Attachment
              </div>
            </Upload>
            <!-- <div v-if="this.attachmentName" class="attachmentName">
              <span class="c-pointer">{{ this.attachmentName }}</span>
              <span @click="deleteAttachment"
                ><i class="lni lni-trash-can c-pointer"></i
              ></span>
            </div> -->
            <span class="text-danger" v-if="errors.url">{{
              errors.url[0]
            }}</span>
          </div>
        </div>
        <div class="footer">
          <div>
            <button class="main-btn main-btn__bg" @click="save">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            <button class="main-btn main-btn__border" @click="reset()">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </template>

    <!--**** Researches ****-->
    <template
      v-if="researches != '' && isLoading == false && showResearchForm == false"
    >
      <div>
        <div>
          <div class="section-header">
            <div>
              <h3>Research Items</h3>
            </div>
            <div
              v-if="authUser.slug == route_slug && editData.id == ''"
              class="btn-edit"
              @click="showForm()"
            >
              <i class="lni lni-plus"></i>
            </div>
          </div>
        </div>
        <div
          class="research-post--item"
          v-for="(research, index) in researches"
          :key="index"
        >
          <h5 class="post-title">
            <router-link :to="`/description/${research.slug}/overview`"
              ><h5>{{ research.title }}</h5></router-link
            >
            <div
              v-if="authUser.slug == route_slug && editData.id == ''"
              class="btn-edit"
              @click="showEdit()"
            >
              <i class="lni lni-pencil"></i>
            </div>
          </h5>

          <!-- <div class="post-sub-title">
            <p v-if="research.end_date">
              {{ research.start_date }} -
              {{ research.end_date }}
            </p>
            <p v-else>{{ research.start_date }} - Ongoing</p>
          </div> -->
          <div class="post-sub-title" v-if="research.affiliation">
            <p>
              <i class="fa-solid fa-graduation-cap"></i> Associated with
              {{ research.affiliation }}
            </p>
          </div>

          <p class="my-3">
            <router-link
              :to="`/description/${research.slug}/overview`"
              class="py-2 px-4 alert alert-secondary text-center"
            >
              {{ research.type }}</router-link
            >
          </p>
          <div class="post-sub-title" v-if="research.conference">
            <div>
              <p>
                {{ research.publication_date }}
              </p>
              <p>Conference: {{ research.conference }}</p>
            </div>
          </div>
          <p v-if="research.abstract != null">
            {{ research.abstract.substring(0, 90) }}
            ...
            <router-link :to="`/description/${research.slug}/overview`"
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
                  :to="`/profile/${author.slug}/overview`"
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
                  :to="`/profile/${author.slug}/overview`"
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
                  :to="`/profile/${author.slug}/overview`"
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
                  :to="`/profile/${author.slug}/overview`"
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
                v-for="author in research.authors"
                v-if="research.authors.length"
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
                >Download <i class="fa-solid fa-download"
              /></a>
              <a
                class="main-btn main-btn__bg px-5"
                :href="`${research.url}`"
                v-if="research.url"
                target="_blank"
              >
                Link <i class="fa-solid fa-arrow-up-right-from-square"></i
              ></a>
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
    <div v-if="isLoading == true">
      <div class="section-header__skeleton">
        <h3></h3>
        <i></i>
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
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showResearchForm: false,
      isLoading: true,
      loading1: false,
      errors: [],
      researches: [],
      users: [],
      user_id: -1,
      user_slug: "",

      route_slug: this.$route.params.slug,
      data: {
        type: "",
        conference: "",
        conference_date: "",
        title: "",
        author_id: [],
        attachment: "",
        abstract: "",
        url: "",
        images: [],
        pdf: "",
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
      isEditingItem: false,
      attachmentName: "",
    };
  },
  methods: {
    clearErrorMessage() {
      this.errors = [];
    },
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
      // this.$refs.upload.clearFiles();
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
      this.showResearchForm = true;
    },
    async reset() {
      this.showResearchForm = false;
      this.editData.id = "";
      this.user_id = this.$route.params.id;
      this.data = {
        type: "",
        conference: "",
        conference_date: "",
        title: "",
        author_id: [],
        attachment: "",
        abstract: "",
        url: "",
        images: [],
        pdf: "",
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
      console.log(this.user_id);
      const res = await this.callApi("post", `/api/save_post`, this.data);
      this.isLoading = true;
      if (res.status === 200) {
        this.s(res.data.msg);
        // this.msg = res.data.msg;
        this.reset();
        this.clearErrorMessage();
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

    edit(index) {
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

    async update() {
      // if (this.data.email.trim() == "")
      //     return this.e("Email is required");
      // if (this.data.designation.trim() == "")
      //     return this.e("Designation is required");
      // if (this.data.department.trim() == "")
      //     return this.e("Department is required");
      this.isLoading = true;

      const res = await this.callApi("post", "/api/update_post", this.editData);

      if (res.status === 200) {
        this.msg = res.data.msg;
        this.reset();
        this.errors = [];
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
      this.isLoading = false;
    },
    async delete() {
      this.isLoading = true;

      const res = await this.callApi(
        "post",
        `/api/delete_post/${this.editData.id}`
      );

      if (res.status === 200) {
        this.s(res.data.msg);
        this.reset();
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
  async created() {
    // this.token = window.Laravel.csrfToken;
    this.user_slug = this.$route.params.slug;
    const res = await this.callApi(
      "get",
      `/api/get_user_research/${this.user_slug}`
    );
    if (res.status == 200) {
      this.researches = res.data.data;
      console.log(this.user_id);
      console.log(res.data.data);
    } else {
      this.swr();
    }
    this.isLoading = false;
  },
};
</script>
