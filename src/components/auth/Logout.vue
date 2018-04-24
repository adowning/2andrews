<template>
  <div>
    <h2>Logging out..</h2>
  </div>
</template>

<script>
export default {
  name: 'Error',
  computed: {},
  mounted() {
    window.sessionStorage.clear()
    window.localStorage.clear()
    // this.$store.state.authenticated = false
    // this.$store.state.username = null
    // this.username = null
    this.$router.push('/login')
  }
}
</script>
