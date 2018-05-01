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
    attributes: null,
  },

  getters: {
    profile: state => state.profile,
    user: state => state.user,
    userId: state => state.userId,
    attributes: state => state.attributes,
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user
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
    signout: function (context) {
      context.commit('setUser', null)
      context.commit('setUserId', null)
      context.commit('setProfile', null)
      context.commit('setAttributes', null)
      context.commit('setIsAuthenticated', null)

      router.push({
        name: 'login',
      })
    },
    setAttributes: function (context, payload) {
      context.commit('setAttributes', payload.attributes)
      router.push({
        name: 'home',
      })
    },
    authenticate: function (context, payload) {
      context.commit('setUser', payload.user)
    },
  },
  modules: {
    // auth,
    errors
  }
})

export default store
