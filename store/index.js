//import Vuex from 'vuex'
//import axios from 'axios'
export const strict = false
import cookie from 'cookie'

export const state = () => ({
    user : 'no user',
    authUser: false,
    // callWishListOb:null,
    // callCartOb:null,
    // cart: [],
    // order:{
    //   billingCity:'',
    //   shippingPrice:0,
    //   coupon:'',
    //   discountType:'',
    //   discount:0,
    //   postCode:'',
    //   referralCode:'',
    //   giftVoucherCode:'',
    //   giftVoucherAmount:0,
    //   isDGMoney:0,
    //   dgAmount:0,
    //   roundAmount:0,
    //   refferalDiscount:0,
    //   membershipDiscount:0,
    //   promoDiscount:0,
    //   refferalDiscountAmount:0,
    //   membershipDiscountAmount:0,
    //   promoDiscountAmount:0,

    //   totalSellingPrice:0,
    //   subTotal:0,
    //   invoiceTotal:0,
    //   grandTotal:0,
    //   billingAddress:'',
    //   paymentType:'',
    //   name:'',
    //   contact:'',


    // },
    token: '',
    passwordReset: { email: "" },
    unauthorizedCredential: { contact: "",  password: ""},

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
  getCallCartOb (state) {
    return state.callCartOb
  },
  unauthorizedCredential(state) {
    return state.unauthorizedCredential;
  },
  passwordReset(state) {
    return state.passwordReset;
  },
  getCallWishListOb (state) {
    return state.callWishListOb
  },
  order (state) {
    return state.order;
  },
  getCartItem (state) {
    return state.cart
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
  updateNotification (state, data) {
    state.cart = data
  },
  setToken(state, data) {
    state.token = data
  },
  removeItem (state, i) {
    state.cart.splice(i,1)
  },
  setCallCartOb (state, data) {
    state.callCartOb = data
  },
  setUnauthorizedCredential(state, data)  {
    state.unauthorizedCredential = data;
  },
  setPasswordReset(state, data) {
    state.passwordReset = data;
},
  setCallWishListOb (state, data) {
    state.callWishListOb = data
  },
  order (state, data) {
    state.order = data
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
      // const cart = await $axios.get(`/app/get_cart`)
      // if(cart.status == 200){
      //   // console.log(cart.data);
      //   commit('updateNotification', cart.data.data)
      // }
    } catch (e) {
        console.log('nuxt server error ')
    }
  },
  

  setToken ({ commit }, data) {
    commit('setToken', data)
  },
  updateNotification ({ commit }, data) {
    commit('updateNotification', data)
  },
  setAuthInfo ({ commit }, data) {
    commit('setAuthInfo', data)
  },
}
