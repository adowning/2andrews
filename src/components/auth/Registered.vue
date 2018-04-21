<template>
  <v-container>

    <section>
      <v-layout 
        column 
        align-center 
        justify-center>
        <v-alert 
          :value="true" 
          outline 
          type="success" 
          class="mt-4 mb-4">
          <div class="title mt-2 mb-2">You have successfully registered.</div>
        </v-alert>
        <transition 
          appear 
          name="fadeout">
          <v-btn 
            color="#82B1FF" 
            dark 
            large 
            @click="navSignIn()">Get started</v-btn>
        </transition>
      </v-layout>
    </section>

  </v-container>
</template>

<script>
import router from "../../router"

export default {
  methods: {
    navSignIn: function () {
      console.log("navigating to sign in")
      router.push("/employeeApplication")
    }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
