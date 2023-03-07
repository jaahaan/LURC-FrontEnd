<template>
  <div class="login-section">
    <div class="left">
      <img :src="'/assets/images/lurc.png'" alt="img" />
    </div>

    <div class="right">
      <div class="form">
        <div class="alert alert-dark">
          <p>We have sent an OTP to your email.</p>
        </div>
        <div class="mb-2">
          Enter OTP
          <input type="number" class="form-control" v-model="data.token" />
          <span class="alert-danger" v-if="errors.token">{{
            errors.token[0]
          }}</span>
          <span class="alert-danger" v-if="errors.token">{{
            errors.token[0]
          }}</span>
        </div>

        <div class="mb-2">
          <button
            :class="[
              data.token ? ' main-btn-change col-12' : ' main-btn col-12',
              ' main-btn col-12',
            ]"
            @click="submit"
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            {{ isSubmitting ? "Submitting..." : "Submit OTP" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "guest",

  data() {
    return {
      data: {
        token: "",
        email: "",
      },
      isSubmitting: false,
      errors: [],
      msg: "",
    };
  },
  methods: {
    async submit() {
      if (this.data.token.trim() == "") return this.e("OTP is required");
      this.isSubmitting = true;
      const res = await this.callApi(
        "post",
        "/api/submit_reset_password_otp",
        this.data
      );

      if (res.status == 200) {
        this.msg = res.data.msg;
        this.$store.commit("setPasswordReset", this.data);
        this.$router.push("/auth/reset_password");
        //this.data.token = "";
      } else {
        if (res.status == 401) {
          this.msg = res.data.msg;
        }
        if (res.status == 402) {
          this.e(res.data.msg);
          this.$router.push("/auth/forgot");
        } else if (res.status == 422) {
          for (let i in res.data.errors) {
            this.errors = res.data.errors;
            // this.e(res.data.errors[i][0]);
          }
        } else {
          this.e(res.data.msg);
        }
      }
      this.isSubmitting = false;
    },
  },
  async created() {
    console.log(this.$route.query.email);
    this.data.email = this.$route.query.email;
  },
};
</script>
