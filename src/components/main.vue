<template>
  <div>
    <map-view></map-view>
    <div class="routerView">
    </div>
  </div>

</template>

<script>
  import router from '../router';
  import mapView from './mapView/MapView.vue';
  export default {
    data() {
      return {}
    },
    router: router,
    methods: {},
    mounted() {
      
    },
    components: {
      mapView,
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .routerView {
    position: absolute;
    width: 100%;
    /*max-height: 200px;*/
    /*left: 0px;*/
    /*right: 32px;*/
    z-index: 1010;
  }
</style>
