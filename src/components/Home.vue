<template>
  <v-container>
    <section>
      <v-layout column align-center justify-center>
        <transition appear name="fadeout">
        <img class="aws-logo mt-5 mb-4" src="../../static/logo.png">
        </transition>
        <h1 class="mb-2 display-2 text-xs-center black--text hidden-xs-only">ANDREWS APP</h1>
        <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">using Amazon Cognito and Vue.js with Material Design</h3>
        <!-- <v-alert v-if="$store.state.authenticated" outline type="success" class="mt-4 mb-4" :value="true">
          <div class="title mt-2 mb-2">You have signed in.</div>
        </v-alert> -->
        <!-- <v-btn v-if="$store.state.authenticated" @click="navSignOut()" color="amber accent-3" dark large>Sign Out</v-btn> -->
      </v-layout>
<!-- <div id="camdemo" style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"></div> -->
      
    </section>
  </v-container>
</template>

<script>
import router from '../router'
export default {
  methods: {
    navRegister: function () {
      console.log('navigatig to sign up')
      router.push('/register')
    },
    navSignOut: function () {
      console.log('signing out')
      this.$store.commit('signOut')
      router.push('/home')
    }
  },
  mounted (){
// var enabled = true;
// // Use require to add webcamjs
// var WebCamera = require("webcamjs");
// enabled = true;
//      WebCamera.attach('#camdemo');
//      console.log("The camera has been started");

  }
}

</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
