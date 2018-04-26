<template>
  <!-- <div v-if="hydrated" id="app"> -->
  <div id="app">
    <v-app>
      <div
        v-if="hydrated"
        :key="$route.fullPath"
      >
        <router-view/>
      </div>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  // data: () => ({ hydrated: false })
  // async mounted() {
  //   await this.$apollo.provider.defaultClient.hydrated()
  //   this.hydrated = true
  // }
    data() {
    return {
      hydrated: false,
    }
  },
  mounted() {
    this.$apollo.provider.defaultClient
      .hydrated()
      .then(() => (this.hydrated = true))
  },
}
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

.fadeout-enter-active,
.fadeout-leave-active {
  transition: opacity 1s;
}
.fadeout-enter,
.fadeout-leave-to {
  opacity: 0;
}
</style>
