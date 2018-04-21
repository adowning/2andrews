import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-localstorage'

Vue.use(Vuex)

// Modules
import auth from './auth.js'
import errors from './errors.js'

const store = new Vuex.Store({
  plugins: [
    persist({
      namespace: 'aws-vuejs-cognito',
      initialState: {},
      expires: 7 * 24 * 60 * 60 * 1e3 // 1 week
    })
  ],
  modules: {
    auth,
    errors
  }
})

export default store
