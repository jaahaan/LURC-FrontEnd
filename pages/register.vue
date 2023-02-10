<template>
  <div class="bg">
    <div class="container-fluid justify-content-center py-md-4 py-3">
      <div class="row">
        <div class="col-md-6 my-md-auto text-center justify-content-center">
          <img :src="'/assets/images/lurc.png'" alt="img" class="login-logo" />
        </div>

        <div class="col-md-6 my-md-auto justify-content-center">
          <div class="container-fluid p-2">
            <div class="text-center">
              <button
                class="main-btn m-auto cext-center col-5"
                v-for="(tab, index) in tabs"
                :key="tab"
                @click="component = tab"
                :class="component === tab ? 'active' : ''"
              >
                {{ tab }}
              </button>
            </div>
            <component :is="component" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Teacher from "~/components/registerTeacher";
import Student from "~/components/registerStudent";

export default {
  middleware: "guest",

  components: {
    Teacher,
    Student,
  },
  data() {
    return {
      tabs: ["Teacher", "Student"],
      component: "Teacher",
    };
  },
};
</script>

<style scoped>
.active {
  color: #ffffff !important;
  background: #6aa5b1;
  border: 2px solid #6aa5b1;
}
</style>
