/*eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AppHome from './components/Home.vue'
import AppSignin from './components/auth/Signin.vue'
import AppRegister from './components/auth/Register.vue'
import AppRegistered from './components/auth/Registered.vue'
import AppForgot from './components/auth/Forgot.vue'
import AppConfirm from './components/auth/Confirm.vue'
import AppChanged from './components/auth/Changed.vue'
import AppProfile from './components/Profile/'
import store from './store/'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.config.productionTip = false
Vue.use( VueAxios, axios )
Vue.use( Vuetify, {
  theme: {
    primary: '#3FBA84',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
} )

Vue.component( 'app-layout', function ( resolve ) {
  //eslint-disable-next-line
  require( [ './components/layout/Layout.vue' ], resolve )
} )
Vue.component( 'app-home', AppHome )
Vue.component( 'app-signin', AppSignin )
Vue.component( 'app-register', AppRegister )
Vue.component( 'app-registered', AppRegistered )
Vue.component( 'app-forgot', AppForgot )
Vue.component( 'app-confirm', AppConfirm )
Vue.component( 'app-changed', AppChanged )
Vue.component( 'app-profile', AppProfile )


/* eslint-disable no-new */
new Vue( {
  el: '#app',
  router,
  store,
  // provide: appsyncProvider.provide(),
  components: {
    App
  },
  render: h => h( App )
} )
