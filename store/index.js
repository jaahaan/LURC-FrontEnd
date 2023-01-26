//import Vuex from 'vuex'
//import axios from 'axios'
export const strict = false
import cookie from 'cookie'

export const state = () => ({
    user : 'no user',
    authUser: false,
    allGlobalResearch:[],
    globalResearchLoading:true,

    allGlobalPost:[],
    globalPostLoading:true,

    callNotificationOb:null,
    notification: [],
    connection: [],
    peopleYouMayKnow:[],
    seenCount:0,
    token: '',
    passwordReset: { email: "" , token: ""},
    unauthorizedCredential: { email: "",  password: ""},
    
})
// common getters
export const getters = {
  getIsLoggedIn (state) {
    return !!state.authUser
  },
  getAuthUser (state) {
    return state.authUser
  },
  getToken (state) {
    return state.token
  },
  getSeenCount (state) {
    return state.seenCount
  },
  getCallNotificationOb (state) {
    return state.callNotificationOb
  },
  unauthorizedCredential(state) {
    return state.unauthorizedCredential;
  },
  passwordReset(state) {
    return state.passwordReset;
  },
  
  getConnectionItem (state) {
    return state.connection
  },

  getNotificationItem (state) {
    return state.notification
  },

  getPeopleYouMayKnow (state) {
    return state.peopleYouMayKnow
  },

  getAllGlobalResearch (state) {
    return state.allGlobalResearch
  },
  getGlobalResearchLoading (state) {
    return state.globalResearchLoading
  },

  getAllGlobalPost (state) {
    return state.allGlobalPost
  },
  getGlobalPostLoading (state) {
    return state.globalPostLoading
  },

}
//mutations for changing data from action
export const mutations = {
  loginUser(state, data) {
    state.authUser = data
  },
  setAuthInfo(state, data) {
    state.authUser = data
  },
  setToken(state, data) {
    state.token = data
  },

  updateSeenCount(state, data) {
    state.seenCount = data
  },

  removeConnectionItem (state, i) {
    state.Connection.splice(i,1)
  },
  
  updateConnection (state, data) {
    state.connection = data
  },
  removeNotificationItem (state, i) {
    state.Notification.splice(i,1)
  },
  
  updateNotification (state, data) {
    state.notification = data
  },
  updatePeopleYouMayKnow (state, data) {
    state.peopleYouMayKnow = data
  },
  
  setCallNotificationOb (state, data) {
    state.callNotificationOb = data
  },
  setUnauthorizedCredential(state, data)  {
    state.unauthorizedCredential = data;
  },
  setPasswordReset(state, data) {
    state.passwordReset = data;
  },
  //research
  setAllGlobalResearch (state, data) {
    state.allGlobalResearch = data
  },
  setGlobalResearchLoading (state, data) {
    state.globalResearchLoading = data
  },
  pushAllGlobalResearch (state, data) {
    state.allGlobalResearch.push(data)
  },

  //post
  setAllGlobalPost (state, data) {
    state.allGlobalPost = data
  },
  setGlobalPostLoading (state, data) {
    state.globalPostLoading = data
  },
  pushAllGlobalPost (state, data) {
    state.allGlobalPost.push(data)
  },
  
}
// actionns for commiting mutations
export const actions = {
    async nuxtServerInit({ commit, state }, { $axios, req, env })  {
    console.log('I am running as nuxt server init')
    const session = req.headers.cookie ? cookie.parse(req.headers.cookie) : ''
    // console.log("token : ",session)
    $axios.setToken(session.token, 'Bearer');
    try {
      const res  = await $axios.get('/api/auth_user')
      console.log(res.data)
      commit('setAuthInfo', res.data)
      // const notification = await $axios.get('/api/get_notification')
      const [notification, peopleYouMayKnow, connection] = await Promise.all([
        this.callApi("get", '/api/get_notification'),
        this.callApi("get", "/api/get_people_you_may_know"),
        this.callApi("get", "/api/get_auth_user_connection"),
      ]);
      if(notification.status == 200 && peopleYouMayKnow.status==200 && connection.status==200){
        console.log(notification.data.data)
        state.seenCount = notification.data.count
        commit('updateNotification', notification.data.data)
        commit('updatePeopleYouMayKnow', peopleYouMayKnow.data.data)
        commit('updateConnection', connection.data.data)
      }
    } catch (e) {
        console.log('nuxt server error ')
    }
  },
  

  setToken ({ commit }, data) {
    commit('setToken', data)
  },
  updateConnection ({ commit }, data) {
    commit('updateConnection', data)
  },
  updateNotification ({ commit }, data) {
    commit('updateNotification', data)
  },
  updatePeopleYouMayKnow({commit}, data){
    commit('updatePeopleYouMayKnow', data)
  },
  updateSeenCount ({ commit }, data) {
    commit('updateSeenCount', data)
  },
  setAuthInfo ({ commit }, data) { 
    commit('setAuthInfo', data)
  },
}
