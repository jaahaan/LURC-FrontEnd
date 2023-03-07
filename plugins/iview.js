import iView from 'iview';
import locale from 'iview/dist/locale/en-US'; // Change locale, check node_modules/iview/dist/locale
import Vue from 'vue';
import VueTyperPlugin from 'vue-typer';
import { mapGetters } from 'vuex';
 
Vue.use(VueTyperPlugin)

Vue.use(iView, {
  locale
})


// mixins for using common methods

Vue.mixin({
    computed:{
        ...mapGetters({
            departmentInfo: "getDepartment",
        })
    },
    
    methods: {
        i(msg, i = 'Hey!') {
            this.$Notice.info({
                title: i,
                desc: msg
            });
        },
        s(msg, i = 'Great!') {
            // this.$Message.success('This is a success tip');
            this.$Notice.success({
                title: i,
                desc: msg
            });
        },
        w(msg, i = 'Hi!') {
            this.$Notice.warning({
                title: i,
                desc: msg
            });
        },
        e(msg) {
            this.$Message.error(msg);
            // this.$Notice.error({
            //     title: i,
            //     desc: msg,

            // });
        },
        swr() {
            this.$Message.error('Something went wrong, please try again later');

            // this.$Notice.error({
            //     title: 'Oops',
            //     desc: 'Something went wrong, please try again later'
            // });
        },
        async getNotificationItemsServer(){
            const [notification, peopleYouMayKnow, connection] = await Promise.all([
                this.callApi("get", '/api/get_notification'),
                this.callApi("get", "/api/get_people_you_may_know"),
                this.callApi("get", "/api/get_auth_user_connection"),
              ]);
              if(notification.status == 200 && peopleYouMayKnow.status==200 && connection.status==200){
                console.log(notification.data.data)
                // state.seenCount = notification.data.count
                this.$store.dispatch('updateNotification', notification.data.data)
                this.$store.dispatch('updatePeopleYouMayKnow', peopleYouMayKnow.data.data)
                this.$store.dispatch('updateAuthUserConnection', connection.data.data)
            }
            
            else {
                this.swr();
            }
        },
        
    }
})

