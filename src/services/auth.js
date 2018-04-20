import store from '../store'

export default {
  authenticate: function (provider) {
    var domain = process.env.AWS_COGNITO_USER_POOL_DOMAIN
    var clientId = process.env.AWS_COGNITO_CLIENT_ID
    var type = 'token'
    var scope = 'openid profile'

    var callback =
      window.location.protocol + '//' + window.location.host + '/callback'

    // Save the 'verification' value, so it can be verified later to prevent CSRF attacks
    var verification = generateVerification()
    store.commit('setVerification', verification)

    if (provider !== undefined) {
      // Go straight to the provider, skipping the hosted UI
      window.location.href =
        'https://' +
        domain +
        '/authorize?identity_provider=' +
        provider +
        '&response_type=' +
        type +
        '&client_id=' +
        clientId +
        '&redirect_uri=' +
        callback +
        '&state=' +
        verification +
        '&scope=' +
        scope
    } else {
      // Use the hosted UI
      window.location.href =
        'https://' +
        domain +
        '/login?response_type=' +
        type +
        '&client_id=' +
        clientId +
        '&redirect_uri=' +
        callback +
        '&state=' +
        verification +
        '&scope=' +
        scope
    }
  }
}

// generateVerification creates a random string for including in the OAuth2
// request, which is then validated in the response.
function generateVerification () {
  var verification = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 32; i++) {
    verification += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return verification
}

// import router from '../router'
// import jwt from 'jwt-decode'

// export default {
//   state: {
//     profile: null,
//     accessToken: null,
//     verification: null,
//     isAuthenticated: false,
//     count: 0
//   },

//   getters: {
//     profile: state => state.profile,
//     verification: state => state.verification,
//     accessToken: state => state.accessToken,
//     idToken: state => state.idToken,
//     isAuthenticated: state => state.isAuthenticated
//   },

//   mutations: {
//     setProfile: (state, profile) => {
//       state.profile = profile
//     },
//     setAccessToken: (state, accessToken) => {
//       state.accessToken = accessToken
//     },
//     setIdToken: (state, idToken) => {
//       state.idToken = idToken
//     },
//     setVerification: (state, verification) => {
//       state.verification = verification
//     },
//     setAuthenticated: (state, isAuthenticated) => {
//       state.isAuthenticated = isAuthenticated
//     }
//   },

//   actions: {
//     signout: function (context, payload) {
//       context.commit('setProfile', null)
//       context.commit('setAccessToken', null)
//       context.commit('setAuthenticated', false)
//       router.push({ name: 'login' })
//     },
//     authenticate: function (context, payload) {
//       if (payload.verification === null || payload.verification !== context.getters.verification) {
//         router.push({ name: 'error', params: { message: 'The verification state in the authentication response did not match our original request' } })
//         return
//       }

//       if (payload.idToken === null || (jwt(payload.idToken).token_use || null) !== 'id') {
//         router.push({ name: 'error', params: { message: 'The authentication response did not include a valid ID token' } })
//         return
//       }

//       context.commit('setProfile', jwt(payload.idToken))
//       context.commit('setAccessToken', payload.accessToken)
//       context.commit('setIdToken', payload.idToken)
//       context.commit('setAuthenticated', true)
//       router.push({ name: 'home' })
//     }
//   }
// }
