<template>
  <div class="logout">
    <button class="btn btn-primary" @click="logout">Logout</button>
  </div>
</template>


<script>
  export default {
    name: 'logout',
    data() {
      return {}
    },
    computed: {},
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {}
  }
</script>


<style scoped>
  .logout {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  }
</style>