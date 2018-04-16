<template>
  <div class="routerStyle">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router'

  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
    },
    router: router,
  }
</script>

<style>
  body {
     margin: 0;
   }
</style>
