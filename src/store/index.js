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
      expires: 99 * 24 * 60 * 60 * 1e3, // 1 week
    }),
  ],
  state: {
    profile: null,
    user: null,
    userId: null,
    attributes: null,
    isAuthenticated: null,
  },

  getters: {
    profile: state => state.profile,
    user: state => state.user,
    userId: state => state.userId,
    attributes: state => state.attributes,
    isAuthenticated: state => state.isAuthenticated,
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setisAuthenticated: (state, auth) => {
      state.isAuthenticated = auth
    },
    setUserId: (state, userId) => {
      state.userId = userId
    },
    setProfile: (state, profile) => {
      console.log(profile)
      state.profile = profile
    },
    setAttributes: (state, attributes) => {
      state.attributes = attributes
    },
  },

  actions: {
    signout: function(context) {
      context.commit('setUser', null)
      context.commit('setUserId', null)
      context.commit('setProfile', null)
      context.commit('setAttributes', null)
      context.commit('setisAuthenticated', false)

      router.push({
        name: 'login',
      })
    },
    authenticate: function(context, payload) {
      context.commit('setUser', payload.user)
      context.commit('setisAuthenticated', true)

      router.push({
        name: 'home',
      })
    },
  },
  modules: {
    // auth,
    errors,
  },
})

export default store
