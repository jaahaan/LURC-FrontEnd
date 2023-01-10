<template>
  <div class="mt-2">
    <div
      class="mb-2 p-3"
      v-if="
        authUser.id == this.$route.params.id &&
        isLoading == false &&
        profileInfo.about == null &&
        profileInfo.skills == null &&
        profileInfo.interests == null &&
        educationInfo == ''
      "
    >
      <button class="main-btn w-100" v-on:click="showSidebar()">
        No Information Found<br />
        <i class="fa-solid fa-plus"></i> Add Your Information
      </button>
    </div>
    <div
      class="mb-2"
      v-else-if="authUser.id == this.$route.params.id && isLoading == false"
    >
      <button class="main-btn w-100" v-on:click="showSidebar()">
        <i class="fa-solid fa-plus"></i> Add New
      </button>
    </div>
    <div
      class="card mb-2 p-3"
      v-else-if="
        isLoading == false &&
        profileInfo.about == null &&
        profileInfo.skills == null &&
        profileInfo.interests == null &&
        educationInfo == ''
      "
    >
      <h2 class="Nothing_to_show_card text-center">No information to show</h2>
    </div>
    <!--**** about-section starts ****-->
    <!-- about edit -->
    <template v-if="about_id">
      <div class="research-post--item">
        <h5 class="post-title">
          <div>Edit About</div>
          <div class="btn-edit text-danger" @click="reset()">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </h5>
        <textarea
          class="form-control"
          v-model="editData.about"
          rows="4"
          placeholder="Write About You..."
        ></textarea>
        <div class="footer">
          <div>
            <button class="main-btn main-btn__border" @click="updateAbout()">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            <button
              class="main-btn main-btn__border"
              @click="deleteAbout(profileInfo)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- about -->
    <template v-else>
      <div
        class="research-post--item"
        v-if="profileInfo.about && isLoading == false"
      >
        <h5 class="post-title">
          <div>About</div>
          <div
            v-if="authUser.id == this.$route.params.id"
            class="btn-edit"
            @click="editAbout(profileInfo)"
          >
            <i class="lni lni-pencil"></i>
          </div>
        </h5>
        <p>
          {{ profileInfo.about.substring(0, 90) }}
        </p>
      </div>
    </template>
    <!--**** about-section ends ****-->

    <!--**** education-section starts ****-->
    <!-- education edit -->
    <!-- <template v-if="about_id">
            <div
                class="container-fluid card card-bg m-auto col-md-8 col-lg-6 justtify-content-center p-4 m-3"
            >
                <h5>Edit About</h5>
                <div class="space" />
                <textarea
                    class="form-control"
                    v-model="editData.about"
                    rows="4"
                    placeholder="Write About You..."
                ></textarea>
                <div class="d-flex">
                    <button
                        @click="updateAbout()"
                        class="btn btn-sm text-success"
                    >
                        <i class="fa-solid fa-square-check"></i>
                    </button>
                    <button class="btn btn-sm text-danger" @click="reset">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </template> -->

    <template>
      <div
        class="research-post--item"
        v-if="educationInfo != '' && isLoading == false"
      >
        <h5 class="post-title">
          <div>Education</div>
          <div
            v-if="authUser.id == this.$route.params.id"
            class="btn-edit"
            @click="editEducation(educationInfo)"
          >
            <i class="lni lni-pencil"></i>
          </div>
        </h5>
        <div v-for="(education, index) in educationInfo" :key="index">
          <h6>{{ education.institute }}</h6>
          <div class="space" />
          <p>{{ education.degree }}, {{ education.fieldOfStudy }}</p>
          <p v-if="education.endDate">
            {{ education.startDate }} - {{ education.endDate }}
          </p>
          <p v-else>{{ education.startDate }} - Present</p>
          <hr class="mt-2 mb-2" v-if="educationInfo.length - 1 > index" />
        </div>
      </div>
    </template>
    <!--**** education-section ends ****-->

    <!--**** Skills-section starts ****-->
    <!-- skills edit -->
    <template v-if="skills_id">
      <div class="card mb-2">
        <div class="card-header card-header-border p-3">
          <div class="d-block">
            <div class="float-start">
              <h5>Edit Skills</h5>
            </div>
            <div class="btn-edit text-danger mx-2 float-end" @click="reset()">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <div class="card-body">
          <textarea
            class="form-control"
            v-model="editData.skills"
            rows="4"
            placeholder="Write Your Skills..."
          ></textarea>
        </div>
        <div class="card-footer text-muted p-3">
          <div class="d-block">
            <button
              class="profile-main-btn mx-2 float-end"
              @click="updateSkills()"
            >
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- skills -->
    <template v-else>
      <div class="card mb-2" v-if="profileInfo.skills && isLoading == false">
        <div class="card-header card-header-border p-3">
          <div class="d-block">
            <div class="float-start">
              <h5>Skills</h5>
            </div>
            <div
              v-if="authUser.id == this.$route.params.id"
              class="btn-edit mx-2 float-end"
              @click="editSkills(profileInfo)"
            >
              <i class="lni lni-pencil"></i>
            </div>
          </div>
        </div>
        <div class="card-body p-3">
          <p>{{ profileInfo.skills }}</p>
        </div>
      </div>
    </template>
    <!--**** Skills-section ends ****-->

    <!--**** interests-section starts ****-->
    <!-- interests edit-->
    <template v-if="interests_id">
      <div class="card mb-2">
        <div class="card-header card-header-border p-3">
          <div class="d-block">
            <div class="float-start">
              <h5>Edit Interests</h5>
            </div>
            <div class="btn-edit text-danger mx-2 float-end" @click="reset()">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <div class="card-body">
          <textarea
            class="form-control"
            v-model="editData.interests"
            rows="4"
            placeholder="Write Your Interests..."
          ></textarea>
        </div>
        <div class="card-footer text-muted p-3">
          <div class="d-block">
            <button
              class="profile-main-btn mx-2 float-end"
              @click="updateInterests()"
            >
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- interests-->
    <template v-else>
      <div class="card mb-2" v-if="profileInfo.interests && isLoading == false">
        <div class="card-header card-header-borderp-3">
          <div class="d-block">
            <div class="float-start">
              <h5>Interests</h5>
            </div>
            <div
              v-if="authUser.id == this.$route.params.id"
              class="btn-edit mx-2 float-end"
              @click="editInterests(profileInfo)"
            >
              <i class="lni lni-pencil"></i>
            </div>
          </div>
        </div>

        <div class="card-body p-3">
          <p>{{ profileInfo.interests }}</p>
        </div>
      </div>
    </template>
    <!--**** interests-section ends ****-->

    <!--**** loader ****-->
    <div v-if="isLoading == true">
      <button class="main-btn--skeleton w-100"></button>
      <div class="research-post--skeleton">
        <div class="post-title-skeleton">
          <p></p>
        </div>
        <div class="post-sub-title-skeleton">
          <p></p>
        </div>
      </div>
      <div class="research-post--skeleton">
        <div class="post-title-skeleton">
          <p></p>
        </div>
        <div class="post-sub-title-skeleton">
          <p></p>
        </div>
      </div>
      <div class="research-post--skeleton">
        <div class="post-title-skeleton">
          <p></p>
        </div>
        <div class="post-sub-title-skeleton">
          <p></p>
        </div>
      </div>
    </div>

    <div v-if="isLoading == false">
      <div
        class="navbar-notification--wrapper"
        v-bind:class="{ active: isSidebar }"
      >
        <div class="navbar-notification">
          <div class="navbar-notification--head">
            <!-- <a href="#"><img src="assets/images/logo.png" alt="Logo" /></a> -->
            <h5 class="d-inline">Add Your Information</h5>
            <button type="button" v-on:click="hideSidebar()">
              <i class="lni lni-cross-circle"></i>
            </button>
          </div>
          <ul class="navbar-notification--body">
            <li class="nav-item" @click="showAboutModal(profileInfo)">
              <a class="nav-link">About</a>
            </li>

            <li class="nav-item" @click="showEducationModal(profileInfo)">
              <a class="nav-link">Education</a>
            </li>
            <li class="nav-item" @click="showSkillsModal(profileInfo)">
              <a class="nav-link">Skills</a>
            </li>
            <li class="nav-item" @click="showInterestsModal(profileInfo)">
              <a class="nav-link">Interests</a>
            </li>
          </ul>

          <div class="navbar-notification--head">
            <!-- <a href="#"><img src="assets/images/logo.png" alt="Logo" /></a> -->
            <h5 class="d-inline">Add Your Research</h5>
          </div>
          <ul class="navbar-notification--body">
            <li class="nav-item" @click="showProjectModal">
              <a class="nav-link">Project</a>
            </li>
            <!-- <li class="nav-item" @click="showResearchModal()">
              <a class="nav-link">Thesis Paper</a>
            </li> -->
            <li class="nav-item" @click="showResearchModal('Conference Paper')">
              <a class="nav-link">Conference Paper</a>
            </li>
            <li class="nav-item" @click="showResearchModal('Article')">
              <a class="nav-link">Article</a>
            </li>
            <li class="nav-item" @click="showResearchModal('Presentation')">
              <a class="nav-link">Presentation</a>
            </li>
            <li class="nav-item" @click="showResearchModal('Preprint')">
              <a class="nav-link">Preprint</a>
            </li>
            <li class="nav-item" @click="showResearchModal('Poster')">
              <a class="nav-link">Poster</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- About modal -->
      <Modal v-model="aboutModal" :closable="false">
        <div class="research-post--item" id="modal">
          <h5 class="post-title">
            <div>About</div>
            <div class="btn-edit text-danger" @click="closeModal">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </h5>
          <textarea
            class="form-control"
            v-model="editData.about"
            rows="4"
            placeholder="Write About You..."
          ></textarea>
        </div>
        <div slot="footer">
          <div>
            <button class="main-btn main-btn__border" @click="updateAbout()">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            <button
              class="main-btn main-btn__border"
              @click="deleteAbout(profileInfo)"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <!-- Education modal -->
      <Modal
        v-model="educationModal"
        title="Add Education"
        :mask-closable="false"
        :closable="true"
      >
        <div class="mb-2">
          <label>Institute *</label>
          <Input
            type="text"
            v-model="educationData.institute"
            placeholder="Ex: Leading University"
          />
        </div>

        <div class="mb-2">
          <label>Degree</label>
          <Input
            type="text"
            v-model="educationData.degree"
            placeholder="Ex: Bachelor's"
          />
        </div>

        <div class="mb-2">
          <label>Field of study</label>
          <Input
            type="text"
            v-model="educationData.fieldOfStudy"
            placeholder="Ex: Computer Science"
          />
        </div>

        <div class="mb-2">
          <label>Start Date</label>
          <div class="row">
            <div class="col-6">
              <Select v-model="educationData.startMonth" placeholder="Month">
                <Option value="January">January</Option>
                <Option value="February">February</Option>
                <Option value="March">March</Option>
                <Option value="April">April</Option>
                <Option value="May">May</Option>
                <Option value="June">June</Option>
                <Option value="July">July</Option
                ><Option value="August">August</Option
                ><Option value="September">September</Option
                ><Option value="October">October</Option
                ><Option value="November">November</Option
                ><Option value="December">December</Option>
              </Select>
            </div>

            <div class="col-6">
              <Select v-model="educationData.startYear" placeholder="Year">
                <Option value="2022">2022</Option>
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
                <Option value="2017">2017</Option>
                <Option value="2016">2016</Option>
                <Option value="2015">2015</Option>
                <Option value="2014">2014</Option>
                <Option value="2013">2013</Option>
                <Option value="2012">2012</Option>
                <Option value="2011">2011</Option>
                <Option value="2010">2010</Option>
                <Option value="2009">2009</Option>
                <Option value="2008">2008</Option>
                <Option value="2007">2007</Option>
                <Option value="2006">2006</Option>
                <Option value="2005">2005</Option>
                <Option value="2004">2004</Option>
                <Option value="2003">2003</Option>
                <Option value="2002">2002</Option>
                <Option value="2001">2001</Option>
                <Option value="2000">2000</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <label>End Date (or expected)</label>
          <div class="row">
            <div class="col-6">
              <Select v-model="educationData.endMonth" placeholder="Month">
                <Option value="January">January</Option>
                <Option value="February">February</Option>
                <Option value="March">March</Option>
                <Option value="April">April</Option>
                <Option value="May">May</Option>
                <Option value="June">June</Option>
                <Option value="July">July</Option
                ><Option value="August">August</Option
                ><Option value="September">September</Option
                ><Option value="October">October</Option
                ><Option value="November">November</Option
                ><Option value="December">December</Option>
              </Select>
            </div>

            <div class="col-6">
              <Select v-model="educationData.endYear" placeholder="Year">
                <Option value="2030">2030</Option>
                <Option value="2029">2029</Option>
                <Option value="2028">2028</Option>
                <Option value="2027">2027</Option>
                <Option value="2026">2026</Option>
                <Option value="2025">2025</Option>
                <Option value="2024">2024</Option>
                <Option value="2023">2023</Option>
                <Option value="2022">2022</Option>
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
                <Option value="2017">2017</Option>
                <Option value="2016">2016</Option>
                <Option value="2015">2015</Option>
                <Option value="2014">2014</Option>
                <Option value="2013">2013</Option>
                <Option value="2012">2012</Option>
                <Option value="2011">2011</Option>
                <Option value="2010">2010</Option>
                <Option value="2009">2009</Option>
                <Option value="2008">2008</Option>
                <Option value="2007">2007</Option>
                <Option value="2006">2006</Option>
                <Option value="2005">2005</Option>
                <Option value="2004">2004</Option>
                <Option value="2003">2003</Option>
                <Option value="2002">2002</Option>
                <Option value="2001">2001</Option>
                <Option value="2000">2000</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <label>Grade</label>
          <Input type="text" v-model="educationData.grade" />
        </div>
        <div class="mb-2">
          <label>Activities</label>
          <div class="form-outline">
            <textarea
              class="form-control"
              id="textAreaExample1"
              v-model="educationData.activities"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            @click="saveEducation"
            :disabled="isAdding"
            :loading="isAdding"
            >{{ isAdding ? "Saving.." : "Save" }}</Button
          >
        </div>
      </Modal>

      <!-- Skills modal -->
      <Modal v-model="skillsModal" :closable="true">
        <div class="research-post--item" id="modal">
          <h5 class="post-title">
            <div>Add Skills</div>
            <!-- <div class="btn-edit text-danger" @click="closeModal">
              <i class="fa-solid fa-xmark"></i>
            </div> -->
          </h5>
          <div class="mb-2">
            <Select
              filterable
              multiple
              placeholder="Select Authors"
              v-model="editData.skill_id"
              :remote-method="getSkills"
            >
              <Option
                v-for="(skill, index) in skills"
                :value="skill.id"
                :key="index"
                >{{ skill.name }}</Option
              >
            </Select>
          </div>
        </div>
        <div slot="footer">
          <div>
            <button class="main-btn main-btn__border" @click="closeModal">
              Cancel
            </button>
            <Button
              class="main-btn main-btn__bg"
              @click="saveSkills"
              :disabled="isAdding"
              :loading="isAdding"
              >{{ isAdding ? "Saving..." : "Save" }}</Button
            >
          </div>
        </div>
      </Modal>

      <!-- Interests modal -->
      <Modal
        v-model="interestsModal"
        title="Add Interests"
        :mask-closable="false"
        :closable="true"
      >
        <div class="form-outline">
          <textarea
            class="form-control"
            id="textAreaExample1"
            v-model="editData.interests"
            rows="4"
            placeholder="Write Your Skills..."
          ></textarea>
        </div>

        <div slot="footer">
          <Button
            type="primary"
            @click="saveInterests"
            :disabled="isAdding"
            :loading="isAdding"
            >{{ isAdding ? "Saving.." : "Save" }}</Button
          >
        </div>
      </Modal>

      <!-- Research modal -->
      <Modal v-model="researchModal" :mask-closable="false" :closable="false">
        <div class="research-post--item" id="modal">
          <h5 class="post-title">
            <div v-if="researchData.type == ''">Add Research</div>
            <div v-else>Add {{ researchData.type }}</div>

            <div class="btn-edit text-danger" @click="closeModal">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </h5>
          <div class="card-body">
            <div class="mb-2">
              <label>Research Type *</label>
              <Select v-model="researchData.type" placeholder="Select Type">
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
            <div v-if="researchData.type == 'Conference Paper'">
              <div class="mb-2" v-if="researchData.type == 'Conference Paper'">
                <label>Conference *</label>
                <Input
                  type="text"
                  v-model="researchData.conference"
                  placeholder="Conference"
                />
                <span class="text-danger" v-if="errors.conference">{{
                  errors.conference[0]
                }}</span>
              </div>
              <div class="mb-2" v-if="researchData.type == 'Conference Paper'">
                <label>Publication Date</label>
                <input
                  type="month"
                  v-model="researchData.publication_date"
                  placeholder="Publication Date"
                  class="d-block w-100 p-1"
                />
                <span class="text-danger" v-if="errors.start_date">{{
                  errors.start_date[0]
                }}</span>
              </div>
            </div>
            <div class="mb-2">
              <label>Publication Date</label>
              <input
                type="month"
                v-model="researchData.publication_date"
                placeholder="Publication Date"
                class="d-block w-100 p-1"
              />
              <span class="text-danger" v-if="errors.start_date">{{
                errors.start_date[0]
              }}</span>
            </div>
            <div class="mb-2">
              <label>Title *</label>
              <Input
                type="text"
                v-model="researchData.title"
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
                v-model="researchData.abstract"
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
                v-model="researchData.author_id"
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
                v-model="researchData.affiliation"
              />
              <span class="text-danger" v-if="errors.affiliation">{{
                errors.affiliation[0]
              }}</span>
            </div>
            <div class="mb-2">
              <label>URL</label>
              <Input type="url" v-model="researchData.url" placeholder="URL" />
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
          </div>
        </div>
        <div slot="footer">
          <div>
            <button class="main-btn main-btn__border" @click="closeModal">
              Cancel
            </button>
            <Button
              class="main-btn main-btn__bg"
              @click="saveResearch"
              :disabled="isAdding"
              :loading="isAdding"
              ><i class="fa-solid fa-floppy-disk"></i>
              {{ isAdding ? "Saving..." : "Save" }}</Button
            >
          </div>
        </div>
      </Modal>

      <!-- Peoject modal -->
      <Modal v-model="projectModal" :closable="false"
        ><div class="research-post--item" id="modal">
          <h5 class="post-title">
            <div>Add Project</div>
            <div class="btn-edit text-danger" @click="closeModal">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </h5>
          <Form label-position="top">
            <FormItem label="Project Name *">
              <Input
                v-model="projectData.title"
                placeholder="Project Name"
              ></Input>
              <span class="text-danger" v-if="errors.title">{{
                errors.title[0]
              }}</span>
            </FormItem>

            <FormItem label="Description">
              <Input
                v-model="projectData.abstract"
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
                v-model="projectData.author_id"
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
              <Input
                placeholder="Affiliation"
                v-model="projectData.affiliation"
              />
              <span class="text-danger" v-if="errors.affiliation">{{
                errors.affiliation[0]
              }}</span>
            </FormItem>
            <FormItem label="Project URL">
              <Input
                type="url"
                v-model="projectData.url"
                placeholder="Project URL"
              />
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

            <div class="row">
              <div class="col-6">
                <FormItem label="Start Date">
                  <DatePicker
                    type="date"
                    v-model="projectData.start_date"
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
                    v-model="projectData.end_date"
                    placeholder="End Date (or expected)"
                  ></DatePicker>
                  <span class="text-danger" v-if="errors.end_date">{{
                    errors.end_date[0]
                  }}</span>
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
        <div slot="footer">
          <button class="main-btn main-btn__border" @click="closeModal">
            Cancel
          </button>
          <Button
            class="main-btn main-btn__bg"
            @click="saveProject"
            :disabled="isAdding"
            :loading="isAdding"
            ><i class="fa-solid fa-floppy-disk"></i>
            {{ isAdding ? "Saving.." : "Save" }}</Button
          >
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebar: false,
      isLoading: true,
      isAdding: false,
      profileInfo: "",
      skills: [],
      users: [],
      educationInfo: "",
      user_id: -1,
      about_id: "",
      skills_id: "",
      interests_id: "",

      data: {
        about: "",
        institute: "",
        Skills: "",
      },
      editData: {
        about: "",
        skills: "",
        interests: "",
        id: "",
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

      researchData: {
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
      attachmentName: "",
      projectData: {
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

      sectionModal: false,
      aboutModal: false,
      educationModal: false,
      skillsModal: false,
      interestsModal: false,
      publicationsModal: false,
      projectsModal: false,
      researchModal: false,
      awardsModal: false,
      volunteerModal: false,
      projectModal: false,
      conferenceModal: false,
      errors: [],
    };
  },

  methods: {
    showSidebar() {
      this.isSidebar = true;
    },
    hideSidebar() {
      this.isSidebar = false;
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
    //section modal
    showSectionModal() {
      this.sectionModal = true;
    },

    showAboutModal(profileInfo) {
      // let obj = {
      // 	id : tag.id,
      // 	tagName : tag.tagName
      // }
      this.editData = profileInfo;
      this.aboutModal = true;
      this.isEditingItem = true;
      this.sectionModal = false;
      this.hideSidebar();
    },

    async saveAbout() {
      if (this.editData.about.trim() == "") return this.e("required");
      this.user_id = this.$route.params.id;
      const res = await this.callApi(
        "post",
        `/api/save_about/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.about = this.editData.about;
        this.reset();
        this.s("About has been updated successfully!");
        this.aboutModal = false;
      } else {
        if (res.status == 422) {
          if (res.data.errors.about) {
            this.e(res.data.errors.about[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    //education modal
    showEducationModal(profileInfo) {
      this.educationData = profileInfo;
      this.educationModal = true;
      this.sectionModal = false;
      this.hideSidebar();
    },

    async saveEducation() {
      this.user_id = this.$route.params.id;
      const res = await this.callApi(
        "post",
        `/api/save_education/${this.user_id}`,
        this.educationData
      );
      if (res.status === 201) {
        // this.edications.unshift(res.data);
        this.s("Education has been added successfully!");
        this.educationModal = false;
        this.reset();
      } else {
        if (res.status == 422) {
          if (res.data.errors) {
            this.e(res.data.errors[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    showSkillsModal(profileInfo) {
      this.editData = profileInfo;
      this.skillsModal = true;
      this.isEditingItem = true;
      this.sectionModal = false;
      this.hideSidebar();
    },

    async saveSkills() {
      if (this.editData.skills.trim() == "") return this.e("required");
      this.user_id = this.$route.params.slug;
      const res = await this.callApi(
        "post",
        `/api/save_skills/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.skills = this.editData.skills;
        this.reset();
        this.s("Skills has been updated successfully!");
        this.skillsModal = false;
      } else {
        if (res.status == 422) {
          if (res.data.errors.skills) {
            this.e(res.data.errors.skills[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    showInterestsModal(profileInfo) {
      this.editData = profileInfo;
      this.interestsModal = true;
      this.isEditingItem = true;
      this.sectionModal = false;
      this.hideSidebar();
    },

    async saveInterests() {
      if (this.editData.interests.trim() == "") return this.e("required");
      this.user_id = this.$route.params.slug;
      this.isAdding = true;
      const res = await this.callApi(
        "post",
        `/api/save_interests/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.interests = this.editData.interests;
        this.reset();
        this.s("Interest has been updated successfully!");
        this.interestsModal = false;
      } else {
        if (res.status == 422) {
          if (res.data.errors.interests) {
            this.e(res.data.errors.interests[0]);
          }
        } else {
          this.swr();
        }
      }
      this.isAdding = false;
    },

    editAbout(profileInfo) {
      this.reset();
      this.editData.about = profileInfo.about;
      this.editData.id = profileInfo.id;
      this.about_id = profileInfo.id;
      // this.editData.skills = "";
      // this.editData.interests = "";

      // if (this.profileInfo) {
      //     this.$nextTick(() => {
      //         if (this.$refs["todo" + th is.todos[index].id]) {
      //             this.$refs["todo" + this.todos[index].id][0].focus();
      //         }
      //     });
      // }
    },
    async updateAbout() {
      if (this.editData.about.trim() == "") return this.e("required");
      this.user_id = this.$route.params.id;
      const res = await this.callApi(
        "post",
        `/api/save_about/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.about = this.editData.about;
        this.reset();
        this.s("About has been updated successfully!");
        this.errors = [];
      } else {
        if (res.status == 422) {
          if (res.data.errors.about) {
            this.e(res.data.errors.about[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    async deleteAbout(profileInfo) {
      if (this.profileInfo.id) {
        const res = await this.callApi(
          "post",
          `/api/delete_about/${this.profileInfo.id}`,
          this.editData
        );

        if (res.status === 200) {
          this.profileInfo.about = this.editData.about;
          this.reset();
          this.s("About has been deleted successfully!");
        } else {
          this.swe();
        }
      }
    },

    editSkills(profileInfo) {
      this.reset();
      this.editData.skills = profileInfo.skills;
      this.editData.id = profileInfo.id;
      this.skills_id = profileInfo.id;
      this.editData.about = "";
      this.editData.interests = "";

      // if (this.profileInfo) {
      //     this.$nextTick(() => {
      //         if (this.$refs["todo" + this.todos[index].id]) {
      //             this.$refs["todo" + this.todos[index].id][0].focus();
      //         }
      //     });
      // }
    },
    async updateSkills() {
      if (this.editData.skills.trim() == "") return this.e("required");
      this.user_id = this.$route.params.id;
      const res = await this.callApi(
        "post",
        `/api/save_skills/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.skills = this.editData.skills;
        this.reset();
        this.s("Skills has been updated successfully!");
      } else {
        if (res.status == 422) {
          if (res.data.errors.about) {
            this.e(res.data.errors.about[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    editInterests(profileInfo) {
      this.reset();
      this.editData.interests = profileInfo.interests;
      this.editData.id = profileInfo.id;
      this.interests_id = profileInfo.id;
      this.editData.about = "";
      this.editData.skills = "";

      // if (this.profileInfo) {
      //     this.$nextTick(() => {
      //         if (this.$refs["todo" + this.todos[index].id]) {
      //             this.$refs["todo" + this.todos[index].id][0].focus();
      //         }
      //     });
      // }
    },
    async updateInterests() {
      if (this.editData.interests.trim() == "") return this.e("required");
      this.user_id = this.$route.params.id;
      const res = await this.callApi(
        "post",
        `/api/save_interests/${this.user_id}`,
        this.editData
      );
      if (res.status === 200) {
        this.profileInfo.interests = this.editData.interests;
        this.reset();
        this.s("Interests has been updated successfully!");
      } else {
        if (res.status == 422) {
          if (res.data.errors.interests) {
            this.e(res.data.errors.interests[0]);
          }
        } else {
          this.swr();
        }
      }
    },

    showProjectModal() {
      this.projectModal = true;
      this.hideSidebar();
    },
    async saveProject() {
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
    showResearchModal(type) {
      this.researchData.type = type;
      this.researchModal = true;
      this.hideSidebar();
    },
    async saveResearch() {
      // if (this.data.project_name.trim() == "")
      //     return this.e("Project Name is required");
      // if (this.data.project_type.trim() == "")
      //     return this.e("Project type is required");
      // if (this.data.start_date.trim() == "")
      //     return this.e("Start date is required");

      this.user_id = this.$route.params.id;
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
    async getSkills(query) {
      // console.log(query);
      const response = await this.callApi(
        "get",
        `/api/search_skills?keyword=${query}`
      );
      if (response.status == 200) {
        this.skills = response.data;
      }
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

    closeModal() {
      this.aboutModal = false;
      this.skillsModal = false;
      this.projectModal = false;
      this.researchModal = false;
      // this.user_id = "";
      // this.editData.about = "";
      // this.about_id = "";
      // this.editData.skills = "";
      // this.skills_id = "";
      // this.editData.interests = "";
      // this.interests_id = "";
    },
    async reset() {
      this.user_id = "";
      this.editData.about = "";
      this.about_id = "";
      this.editData.skills = "";
      this.skills_id = "";
      this.editData.interests = "";
      this.interests_id = "";
      this.aboutModal = false;
      this.skillsModal = false;
      this.projectModal = false;
      this.researchModal = false;
      //   this.token = window.Laravel.csrfToken;

      this.user_id = this.$route.params.id;
      const resU = await this.callApi(
        "get",
        `/api/get_profile_info/${this.user_id}`
      );
      const resE = await this.callApi(
        "get",
        `/api/get_education/${this.user_id}`
      );
      if (resU.status == 200) {
        this.profileInfo = resU.data;
      }
      if (resE.status == 200) {
        this.educationInfo = resE.data;
      } else {
        this.swr();
      }
      this.isLoading = false;
    },
  },
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

    this.user_id = this.$route.params.id;
    if (this.authUser) {
      const resU = await this.callApi(
        "get",
        `/api/get_profile_info/${this.user_id}`
      );
      const resE = await this.callApi(
        "get",
        `/api/get_education/${this.user_id}`
      );
      if (resU.status == 200) {
        this.profileInfo = resU.data;
      }
      if (resE.status == 200) {
        this.educationInfo = resE.data;
      } else {
        this.swr();
      }
    } else {
      this.swr();
    }

    this.isLoading = false;
  },
};
</script>

<style scoped>
.card-bg {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card {
  border: 1px solid #cdcdcd;
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
