<template>
  <div>
    <div v-if="authUser">
      <Navbar />
      <div
        v-if="
          $route.name == 'profile-slug-overview' ||
          $route.name == 'profile-slug-research' ||
          $route.name == 'profile-slug-project' ||
          $route.name == 'profile-slug-connection'
        "
      >
        <div class="container-fluid profile-header-bg main">
          <profileHeader />
        </div>
      </div>
      <div
        v-else-if="
          $route.name == 'description-slug-overview' ||
          $route.name == 'description-slug-comments'
        "
        class="main"
      >
        <postHeader />
      </div>
      <div v-else class="main">
        <Nuxt />
      </div>
    </div>
    <div v-else>
      <Navbar />
      <Nuxt class="main" />
      <BottomContainer v-if="isFooterShow == true" />
    </div>
  </div>
</template>
<script>
import Navbar from "/components/navbar";
import BottomContainer from "/components/footer";
import profileHeader from "/components/profileHeader";
import ProfileNav from "/components/profileNav";
import postHeader from "/components/postHeader";

export default {
  components: {
    Navbar,
    profileHeader,
    ProfileNav,
    BottomContainer,
    postHeader,
  },
  data() {
    return {
      isHeaderShow: true,
      isFooterShow: true,
    };
  },
  methods: {
    isHeaderShowChange() {
      if (
        this.$route.name == "login" ||
        this.$route.name == "register" ||
        this.$route.name == "index" ||
        this.$route.name == "research" ||
        this.$route.name == "department"
      ) {
        this.isHeaderShow = true;
      } else this.isHeaderShow = false;
    },
    isFooterShowChange() {
      if (
        this.$route.name == "register" ||
        this.$route.name == "login" ||
        this.$route.name == "index"
      ) {
        this.isFooterShow = true;
      } else this.isFooterShow = false;
    },
  },
  // async mounted() {
  //   const socket = io("http://127.0.0.1:8000", {
  //     methods: ["GET", "POST"],
  //     transports: ["websocket"],
  //     credentials: true,
  //   });

  //   socket.emit("On_Message", "New Data Send!");

  //   socket.on(`On_Message`, (data) => {
  //     console.log("online On_Message", data);
  //   });
  //   socket.on(`New_Message`, (data) => {
  //     console.log("online New_Message", data);
  //   });

  //   if (!this.$store.state.authUser) return;
  //   console.log(this.$config.SOCKET_URL);

  //   var self = this;
  //   setTimeout(function () {
  //     self.runBackInground();
  //   }, 2000);

  //   // const socket = io(this.$config.SOCKET_URL, {
  //   //   withCredentials: false,
  //   //   //transports: ["websocket"],
  //   // });
  //   // const socket = io(this.$config.SOCKET_URL, {
  //   //         // methods: ["GET", "POST"],
  //   //     transports: ['websocket' ],
  //   //     credentials: true
  //   //     });

  //   socket.on(`noti:${this.$store.state.authUser.id}`, (data) => {
  //     console.log("new-noti-data", data);

  //     if (data.noti_type == "new_friend") {
  //       if (
  //         data.is_deleted == true &&
  //         this.$store.state.authUser.friend_count > 0
  //       ) {
  //         console.log("new-noti-data", data);
  //         this.$store.commit("decreaseFriend", 1);
  //       } else if (data.is_deleted != true) {
  //         this.$store.commit("increaseFriend", 1);
  //         this.playSound();
  //       }
  //     } else if (data.noti_type == "new_chat") {
  //       //console.log(data)
  //       if (
  //         this.$store.state.chatWindowBuddy &&
  //         this.$store.state.chatWindowBuddy.id != data.chatObj.user_id
  //       ) {
  //         this.playSound();
  //         this.$store.commit("increaseMsgNoti", 1);
  //       }
  //       if (!this.$store.state.chatWindowBuddy) {
  //         this.playSound();
  //         this.$store.commit("increaseMsgNoti", 1);
  //       }
  //       this.$set(data.user, "is_chat_seen", 0);
  //       this.$store.commit("pushNewSOChat", data);
  //       //  console.log('i am from chat',data)

  //       //  don't send if the user is not same...
  //       if (
  //         this.$store.state.chatWindowBuddy &&
  //         this.$store.state.chatWindowBuddy.id == data.user.id
  //       ) {
  //         console.log("########### previous ##########");
  //         socket.emit("notification", {
  //           user_id: data.user.id,
  //           noti_type: "msg_seen",
  //           from_user: this.$store.state.authUser.id,
  //           is_seen: 1,
  //         });
  //         this.updateSeen(data.user.id);
  //       }
  //     } else if (data.noti_type == "typing") {
  //       this.$store.commit("setTypingIndicator", data);
  //       console.log("joom", this.$store.state.chatWindowBuddy.isTyping);
  //       console.log("joom2", this.$store.state.chatWindowBuddy);
  //     } else if (data.noti_type == "msg_seen") {
  //       //  console.log('msg is seen....', data)
  //       this.$store.commit("setSeen", data);
  //     } else if (data.noti_type == "new-call") {
  //       console.log("New-call.... should ringing", data);

  //       let sound = new Audio();
  //       sound.src = "/ringtone.mp3";
  //       sound.loop = true;
  //       sound.play();

  //       this.$store.commit("videoCall/setAudioPlayer", sound);

  //       let newVideoCallOb = {
  //         call_status: "pending",
  //         room_id: data.room_id,
  //         call_type: data.call_type,
  //       };
  //       this.$store.commit("videoCall/setInCallUsers", data.sender);
  //       this.$store.commit("videoCall/setIsNewIncomingCall", true);
  //       this.$store.commit(
  //         "videoCall/setNewIncomingCallObject",
  //         newVideoCallOb
  //       );
  //     } else if (data.noti_type == "new-call-ended") {
  //       console.log("new-call-ended");
  //       this.audioPlayer.pause();
  //       this.audioPlayer.remove();
  //       this.$store.commit("videoCall/setInCallUsers", null);
  //       this.$store.commit("videoCall/setIsNewIncomingCall", false);
  //       this.$store.commit("videoCall/setNewIncomingCallObject", false);
  //       // this.$store.commit('videoCall/setAudioPlayer',null)
  //     } else {
  //       console.log("else");
  //       if (data.is_deleted == true) {
  //         let count =
  //           this.$store.state.totalNoti > 0
  //             ? this.$store.state.totalNoti - 1
  //             : 0;
  //         this.$store.commit("setNotiCount", count);
  //       } else {
  //         this.$store.commit("increaseNoti", 1);
  //         if (this.$config.IS_CAREVAN != "yes") {
  //           this.playSound();
  //         }
  //       }
  //     }
  //     console.log("working....");
  //   });

  //   socket.on(`online`, (data) => {
  //     // console.log('online event', data)
  //     this.$store.commit("updateOnline", data);
  //   });

  //   socket.emit("con", { id: this.$store.state.authUser.id });
  // },
  watch: {
    "$route.name": function (newVal, oldVal) {
      // watch it

      this.isHeaderShowChange();
      this.isFooterShowChange();
    },
  },
  // async created() {
  //   // if (this.authUser) this.getNotificationItemsServer();
  //   // console.log("auth", window.authUser);
  //   // await this.$store.commit("setUpdateUser", window.authUser);
  // },
};
</script>
