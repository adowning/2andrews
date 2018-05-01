// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import AppHome from './components/Home.vue'
// import AppSignin from './components/auth/Signin.vue'
// import AppRegister from './components/auth/Register.vue'
// import AppRegistered from './components/auth/Registered.vue'
// import AppForgot from './components/auth/Forgot.vue'
// import AppConfirm from './components/auth/Confirm.vue'
// import AppChanged from './components/auth/Changed.vue'
// import AppProfile from './components/Profile/'
// import fullCalendar from 'vue-fullcalendar'
import store from './store/'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'
import awsExports from '../awsmobilejs/#current-backend-info/aws-exports'

import Amplify, {
  Auth,
  Logger
} from 'aws-amplify'

Vue.config.productionTip = false

Amplify.configure(awsExports)
Amplify.Logger.LOG_LEVEL = 'INFO'

const logger = new Logger('MAIN')

Auth.currentUserInfo()
  .then(user => logger.info(user.attributes['custom:humanity']))
  .catch(err => logger.info(err))

Vue.prototype.$ht = {}

axios
  // eslint-disable-next-line
  .get(process.env.LAMBDA_API + '/initHumanity')
  .then(response => {
    Vue.prototype.$ht = response.data.access_token
  })
  .catch(error => {
    console.log(error)
  })

Vue.use(VueAxios, axios) // Ensure you are using css-loader
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

Vue.component('app-layout', function (resolve) {
  // eslint-disable-next-line
  require(['./components/layout/Layout.vue'], resolve)
})
Vue.component('app-home', AppHome)
// Vue.component('app-signin', AppSignin)
// Vue.component('app-register', AppRegister)
// Vue.component('app-registered', AppRegistered)
// Vue.component('app-forgot', AppForgot)
// Vue.component('app-confirm', AppConfirm)
// Vue.component('app-changed', AppChanged)
// Vue.component('app-profile', AppProfile)
// Vue.component('full-calendar', fullCalendar)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
})
