<template>
  <v-container>
    <section>
      <v-layout column align-center justify-center>
        <transition appear name="fadeout">
          <img class="aws-logo mt-5 mb-4" src="../../static/logo.png">
        </transition>
        <!-- <h4 class="headline mb-0" grey--text >Andrews Admin Application</h4> -->
        <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">Andrews Administration</h3>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
// import router from '../router'
export default {
  mounted() {
    // var enabled = true
    // // Use require to add webcamjs
    // var WebCamera = require("webcamjs")
    // enabled = true
    //      WebCamera.attach('#camdemo')
    //      console.log("The camera has been started")
  },
  methods: {
    // navRegister: function() {
    //   console.log('navigatig to sign up')
    //   router.push('/register')
    // },
    // navSignOut: function() {
    //   console.log('signing out')
    //   this.$store.commit('signOut')
    //   router.push('/home')
    // }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
