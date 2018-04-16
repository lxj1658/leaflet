<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
  import router from '../../router'
  export default {
    name: 'mapview',
    data() {
      return {}
    },
    router: router,
    method: {},
    mounted() {
      let map = L.map('map').setView([39.92,	116.46], 4.5);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
      // L.marker([39.92,	116.46]).addTo(map).bindPopup('北京').openPopup();
    }
  }
</script>
<style scoped>
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000;
  }
</style>
