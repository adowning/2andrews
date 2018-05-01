import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-localstorage'
import router from '../router'

// Modules
// import auth from './auth.js'
import errors from './errors.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    persist({
      namespace: 'aws-vuejs-cognito',
      initialState: {},
      expires: 99 * 24 * 60 * 60 * 1e3 // 1 week
    })
  ],
  state: {
    profile: null,
    user: null,
    userId: null,
    userVerification: [],
    accessToken: null,
    verification: null,
    isAuthenticated: false,
    count: 0,
  },

  getters: {
    profile: state => state.profile,
    user: state => state.user,
    userId: state => state.userId,
    verification: state => state.verification,
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    isAuthenticated: state => state.isAuthenticated,
  },

  mutations: {
    setUser: (state, user) => {
      console.log(user)
      state.user = user
    },
    setUserVerification(state, data) {
      state.userVerification = data
    },
    setUserId: (state, userId) => {
      state.userId = userId
    },
    setProfile: (state, profile) => {
      console.log(profile)
      state.profile = profile
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    setIdToken: (state, idToken) => {
      state.idToken = idToken
    },
    setVerification: (state, verification) => {
      state.verification = verification
    },
    setAuthenticated: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    },
  },

  actions: {
    signout: function (context) {
      context.commit('setUser', null)
      context.commit('setUserId', null)
      context.commit('setAuthenticated', false)

      context.commit('setProfile', null)
      // context.commit('setAccessToken', null)
      // context.commit('setIdToken', null)
      // context.commit('setAuthenticated', false)
      router.push({
        name: 'login',
      })
    },
    authenticate: function (context, payload) {
      // console.log(jwt(payload.idToken.jwtToken))
      context.commit('setUser', payload.user)
      context.commit('setProfile', payload.attributes)
      // context.commit('setProfile', jwt(payload.idToken.jwtToken))
      // context.commit('setAccessToken', payload.accessToken)
      // context.commit('setIdToken', payload.idToken)
      context.commit('setAuthenticated', true)
      router.push({
        name: 'home',
      })
    },
  },
  modules: {
    // auth,
    errors
  }
})

export default store
