// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './routes'
import router from './router'
import Vuetify from 'vuetify'
import AppLayout from './components/layout/Layout.vue'
import AppHome from './components/Home.vue'
import AppSignin from './components/auth/Signin.vue'
import AppRegister from './components/auth/Register.vue'
import AppRegistered from './components/auth/Registered.vue'
import AppForgot from './components/auth/Forgot.vue'
import AppConfirm from './components/auth/Confirm.vue'
import AppChanged from './components/auth/Changed.vue'
import AppProfile from './components/Profile/'
import store from './store/'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// import awsExports from '../awsmobilejs/#current-backend-info/aws_exports'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  theme: {
    // primary: '#1976D2',
    
    primary: '#3FBA84',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
    // primary: '#512DA8',
    // secondary: '#D1C4E9',
    // accent: '#FFC107',
    // error: '#f44336',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107'
  }
})

Vue.config.productionTip = false

Vue.component('app-layout', AppLayout)
Vue.component('app-home', AppHome)
Vue.component('app-signin', AppSignin)
Vue.component('app-register', AppRegister)
Vue.component('app-registered', AppRegistered)
Vue.component('app-forgot', AppForgot)
Vue.component('app-confirm', AppConfirm)
Vue.component('app-changed', AppChanged)
Vue.component('app-profile', AppProfile)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
