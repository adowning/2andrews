<template>
  <div>
    <h1>Authenticating...</h1>
  </div>
</template>

<script>

import store from '../../store'
import router from '../../router'

export default {
  created () {
    var accessToken = this.$route.hash.match(/(?:access_token)=([^&]+)/)
    var idToken = this.$route.hash.match(/(?:id_token)=([^&]+)/)
    var verification = this.$route.hash.match(/(?:state)=([^&]+)/)
    var expiresIn = this.$route.hash.match(/(?:expires_in)=(\d+)/)
console.log(accessToken)
    if (!accessToken) {
      router.push({ name: 'error', params: { message: 'The authentication response did not contain a valid access_token' } })
      return
    }

    if (!idToken) {
      router.push({ name: 'error', params: { message: 'The authentication response did not contain a valid id_token' } })
      return
    }

    if (!verification) {
      router.push({ name: 'error', params: { message: 'The authentication response did not contain a valid verification state value' } })
      return
    }

    if (!expiresIn) {
      router.push({ name: 'error', params: { message: 'The authentication response did not contain a valid token expiry date' } })
      return
    }
 console.log(accessToken[1])
   console.log(idToken[1])
     console.log( verification[1])
      console.log(expiresIn[1])
    store.dispatch('authenticate', {
      accessToken: accessToken[1],
      idToken: idToken[1],
      verification: verification[1],
      expiresIn: expiresIn[1]
    })
  }
}

</script>