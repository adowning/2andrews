<template>
  <div id="app">
    <v-app>
      <app-layout></app-layout>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // this.$http.get('/.netlify/functions/hello').then(result => {console.log(result)})
    // this.$http.get('http://localhost:9000/hello').then(result => {console.log(result)})

}
}
</script>

<style>

body {
  margin: 0px;
  padding: 0px;
}

.fadeout-enter-active, .fadeout-leave-active {
  transition: opacity 1s;
}
.fadeout-enter, .fadeout-leave-to {
  opacity: 0;
}

</style>
