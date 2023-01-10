<template>
  <div>
    <!-- 1st row -->

    <section class="hero-section">
      <hooper
        class="no-margin"
        :settings="hooperSettings"
        :wheelControl="false"
      >
        <slide
          class="item hero-section__bg"
          v-for="(data, index) in dataBanner"
          :key="index"
          v-if="data.type == 'slider'"
          :style="{ backgroundImage: `url(${data.image})` }"
        >
          <!-- <div class="container">
            <div class="hero-section__content">
              <h4>{{ data.subTitle }}</h4>
              <h1>{{ data.title }}</h1>
              <button class="main-btn main-btn__border">
                {{ data.btn_text }}
              </button>
            </div>
          </div> -->
        </slide>

        <HooperPagination slot="hooper-addons"></HooperPagination>
      </hooper>
    </section>

    <!--*************** Top Banner ***************-->

    <!--*************** Random ***************-->
    <div class="p-5 bg-card">
      <div class="container-fluid justify-content-center">
        <div class="row">
          <div
            class="col-12 col-md-6 my-md-auto text-center justify-content-center pb-3"
          >
            <h1 class="col-8 _card">
              Science is a way of thinking much more than it is a body of
              knowledge.
            </h1>
          </div>
          <div
            class="col-12 col-md-6 my-md-auto text-center justify-content-center"
          >
            <img
              :src="'/assets/images/pixel.png'"
              alt="img"
              class="img-fluid slider h-70"
            />
          </div>
        </div>
      </div>
    </div>

    <!--*************** Research Interests Section ***************-->
    <div class="pt-5 pb-5 bg-card">
      <div class="justify-content-around">
        <h5 class="text-center">Find Your Research Interests</h5>
        <hooper :settings="hooperSettings">
          <slide>
            <div class="text-center rt-title m-2">
              <h1 class="p-3">ENGINEERING</h1>
            </div>
          </slide>
          <slide>
            <div class="text-center rt-title m-2">
              <h1 class="p-3">SCIENCE</h1>
            </div>
          </slide>
          <slide>
            <div class="text-center rt-title m-2">
              <h1 class="p-3">MACHINE LEARNING</h1>
            </div>
          </slide>
          <slide>
            <div class="text-center rt-title m-2">
              <h1 class="p-3">DATA SCIENCE</h1>
            </div>
          </slide>
          <slide>
            <div class="text-center rt-title m-2">
              <h1 class="p-3">AI</h1>
            </div>
          </slide>
        </hooper>
      </div>
    </div>

    <!-- <div class="p-5 bg-card">
            <div class="container-fluid justify-content-around">
                <div class="row">
                    <div
                        class="col-12 col-md-6 my-md-auto text-center justify-content-center pb-3"
                    >
                        <h5 class="text-center rt-title">
                            Find Your Research Interests
                        </h5>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">ENGINEERING</a>
                                </div>

                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">SCIENCE</a>
                                </div>
                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">Machine Learning</a>
                                </div>
                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">Data Science</a>
                                </div>
                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">AI</a>
                                </div>

                                <div
                                    class="col-sm-4 col-md-4 m-2 card text-center rt"
                                >
                                    <a class="p-3">ANN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

    <!--*************** About ***************-->
    <div>
      <h6 class="m-3 _card col-9 mx-auto text-center justify-content-center">
        Our mission is to help the students gather knowledge about research
        field and find the research works of our honourable teachers that can
        guide them to find out their own research interest.
      </h6>
    </div>

    <!--*************** Random ***************-->
    <div class="p-5 bg-card">
      <div class="container-fluid justify-content-center">
        <div class="row">
          <div
            class="col-12 col-md-6 my-md-auto text-center justify-content-center pb-3"
          >
            <h1 class="col-8 _card">
              Connect with our research community to share your thoughts,
              collaborate with your teachers, colleagues and friends.
            </h1>
          </div>

          <div
            class="col-12 col-md-6 my-md-auto text-center justify-content-center"
          >
            <img
              :src="'/assets/images/remote.png'"
              alt="img"
              class="img-fluid slider w-50"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from "hooper";
import "hooper/dist/hooper.css";
export default {
  name: "index",
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation,
  },

  data() {
    return {
      dataBanner: [],
      isDataLoading: true,

      hooperSettings: {
        infiniteScroll: true,
        centerMode: true,
        autoPlay: true,
        playSpeed: 2000,
        breakpoints: {
          1200: {
            itemsToShow: 1,
          },

          995: {
            itemsToShow: 1,
          },
          0: {
            itemsToShow: 1,
          },
        },
      },
    };
  },

  methods: {},
  async asyncData({ app, store, redirect, params }) {
    try {
      let [res1] = await Promise.all([app.$axios.get(`/api/banners`)]);
      return {
        dataBanner: res1.data,
      };
    } catch (error) {
      console.log("error from asyncData server");
      console.log(error);
      //   return redirect("/");
    }
  },

  async created() {
    console.log("index page");
    const response = await this.callApi("get", "/api/banners");
    if (response.status == 200) {
      this.dataBanner = response.data.data;
      console.log("index page");
    } else this.e("Oops!", "Something went wrong, please try again!");
    this.isDataLoading = false;
  },
};
</script>
