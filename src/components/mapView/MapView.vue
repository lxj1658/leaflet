<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
  import router from '../../router'
  import GPS from '../../assets/JS/GPS.js'
  import state from '../../store/state'
  import * as mutationTypes from '../../store/mutations-types'
  export default {
    name: 'mapview',
    data() {
      return {}
    },
    router: router,
    method: {},
    mounted(){
      console.log(this.$store.state.location)
      var location = [this.$store.state.location[0],this.$store.state.location[1]]
      console.log(location);
      window.map = L.map('map',{
        center:location,//设置地图中心点,location为当前用户位置的经纬度
        zoom:17,//默认加载时地图缩放水平
        maxZoom:18,//地图最大缩放水平
      });
      map.on('click', function(e) {
        console.log(e.latlng);
      });

        // var marker = L.marker(location, {
        //             // icon:myIcon
        //             }).addTo(map)
        //             // 设置label
        //             .bindTooltip("This is a test.", {
        //                 permanent : true,
        //                 offset : [ 0, 0 ],// 偏移
        //                 direction : "right",// 放置位置
        //                 // sticky:true,//是否标记在点上面
        //                 className : 'anim-tooltip',// CSS控制
        //             }).openTooltip();


      // L.marker(location).addTo(map).openPopup();
    //   var popup = L.popup()
    // .setLatLng(location)
    // .setContent('起点')
    // .openOn(map);
        // let url='http://api.map.baidu.com/direction/v2/riding?origin=31.773582,117.201429&destination=31.780970,117.209208&ak=nLpN5iKztxIWsPqgwsyrruUG';
        // // let url = 'http://api.map.baidu.com/location/ip?&ak=nLpN5iKztxIWsPqgwsyrruUG&coor=bd09ll'
        // // 发送请求
        // var path = [];
        // var x,y = 0.0;
        // this.$http.jsonp(url,{},{
        //   headers:{},
        //   emulateJson:true}).then((response) => {
        //     var movie = response.data;
        //     var latlngs = [];
        //     console.log(movie);
        //     path = movie.result.routes[0].steps;
        //     let path0 = path[0].path.split(";")
            
        //     console.log("========转换")
        //     console.log(GPS.bd_decrypt(31.773582,117.201429))
        //     function changeToLatLng(path){
        //       var latlng = path.split(",");
        //       var lat = Number(latlng[1]);
        //       var lng = Number(latlng[0]);
        //       var a = GPS.bd_decrypt(lat,lng);
        //       var b = GPS.gcj_decrypt_exact(a.lat,a.lon);
        //       var c = GPS.mercator_encrypt(b.lat,b.lon)
        //       return [a.lat,a.lon];
        //     }

        //     for(let i=0;i<path.length;i++){
        //       var pathI = path[i].path.split(";");
        //       for(let j=0;j<pathI.length;j++){
        //         latlngs.push(changeToLatLng(pathI[j]));
        //       }
        //     }
            
        //     console.log("=========");
        //     console.log(latlngs);
            
        //画出路线图
        // console.log(this.$store.state.routesLatLng);
        // if(this.$store.state.routesLatLng.length != 0){
        //   var polyline = L.polyline(this.$store.state.routesLatLng[], {color: 'red'}).addTo(map);
        //   map.fitBounds(polyline.getBounds());
        // }
        
        //     var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
        //     map.fitBounds(polyline.getBounds());



        //     console.log(typeof (path0[0]))
        //     console.log(path)
        //     console.log(movie.result.routes[0].steps[0].path)
        //     console.log(typeof (path[0].path))
        //     // x = movie.content.point.x;
        //     // y = movie.content.point.y
        //   })


      // L.circle([31.77358245052529,117.20142960548402], {radius: 5}).addTo(map);
      //
      var locationP = L.circleMarker(location,{
        radius:6,//
        color:'white',
        weight:2,
        fillOpacity:1,
        fillColor:'blue',
      }).addTo(map);


     // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
      // L.tileLayer.chinaProvider('TianDiTu.Normal.Map',{maxZoom:30,minZoom:5}).addTo(map);
      // L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion',{maxZoom:30,minZoom:5}).addTo(map);
      //加载高德地图贴图
      L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:22,minZoom:5}).addTo(map);
       // L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:18,minZoom:5}).addTo(map);
       //  L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:18,minZoom:5}).addTo(map);
      // L.marker([39.92,	116.46]).addTo(map).bindPopup('北京').openPopup();
      // 
      // var bmap = new BMap.Map("map");
      
    },
    watch: {  
      '$route' (to, from) {  
        console.log(this.$store.state.driving_routesLatLng);
        console.log("this.$store.state.transit_routesLatLng=====")
        console.log(this.$store.state.transit_routesLatLng);
        if(this.$store.state.walking_routesLatLng.length != 0){
          var polyline = L.polyline(this.$store.state.walking_routesLatLng, {color: 'red'}).addTo(map);
          map.fitBounds(polyline.getBounds());
        }
      } 
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
