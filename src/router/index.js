import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Signin'
import Register from '@/components/auth/Register'
import Confirm from '@/components/auth/Confirm'
import Callback from '@/components/auth/Callback'
import ErrorMsg from '@/components/auth/ErrorMsg'
import TimeClock from '@/components/people/TimeClock'
import Hardware from '@/components/assets/Hardware'
import Consumables from '@/components/assets/Consumables'
import Profile from '@/components/Profile/'
import Logout from '@/components/auth/Logout'


Vue.use( Router )

const router = new Router( {
  mode: 'history',
  routes: [ {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
        auth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register',
        auth: false
      }
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
      meta: {
        title: 'Confirm',
        auth: false
      }
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      meta: {
        title: 'Authenticating...',
        auth: false
      }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorMsg,
      props: true,
      meta: {
        title: 'Error',
        auth: false
      }
    },
    {
      path: '/timeclock',
      name: 'timeclock',
      component: TimeClock,
      props: true,
      meta: {
        title: 'TimeClock',
        auth: true
      }
    },
    {
      path: '/hardware',
      name: 'hardware',
      component: Hardware,
      props: true,
      meta: {
        title: 'Hardware',
        auth: true
      }
    },
    {
      path: '/consumables',
      name: 'consumables',
      component: Consumables,
      props: true,
      meta: {
        title: 'Consumables',
        auth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true,
      meta: {
        title: 'Profile',
        auth: true
      }
    },
    {
      path: '/logout',
      component: Logout,
      props: true,
      meta: {
        auth: true
      }
    },
    // {
    //   path: '*',
    //   name: 'home',
    //   component: Home,
    //   props: true,
    //   meta: {
    //     title: 'Home',
    //     auth: true
    //   }
    // }
  ]
} )

router.beforeEach( ( to, from, next ) => {
  // Use the page's router title to name the page
  if ( to.meta && to.meta.title ) {
    document.title = to.meta.title
  }

  // Redirect to the login page if not authenticated
  // for pages that have 'auth: true' set
  if ( to.meta && to.meta.auth !== undefined ) {
    if ( to.meta.auth ) {
      if ( store.getters.isAuthenticated ) {
        // if (store.getters.authenticated) {
        next()
      } else {
        router.push( {
          name: 'login'
        } )
      }
    } else {
      if ( store.getters.isAuthenticated ) {
        // if (store.getters.authenticated) {
        router.push( {
          name: 'home'
        } )
      } else {
        next()
      }
    }
  } else {
    next()
  }
} )

export default router
