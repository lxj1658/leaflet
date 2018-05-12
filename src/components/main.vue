<template>
  <div >
    <map-view></map-view>
      <div class="routeView">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
  </div>

</template>

<script>
  import router from '../router';
  import mapView from './mapView/MapView.vue';
  import getRouterButton from './Button/getRouterButton.vue';
  export default {
    data() {
      return {}
    },
    router: router,
    methods: {
      
    },
    mounted() {
        this.$router.replace('/main/getRouterButton')
    },
    components: {
      mapView,
      getRouterButton
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .routerView {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 200px;
    /*left: 0px;*/
    /*right: 32px;*/
    z-index: 1010;
  }
  .route{
    position: absolute;
    bottom:10%;
    left:50%;
    margin-left: auto; 
    margin-right: auto;
    z-index: 1010;

  }
</style>
