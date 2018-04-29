<template>
  <div id="app">
    <v-app>
      <app-layout/>

    </v-app>
  </div>
</template>
<script>
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
</script>
<script>
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
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
