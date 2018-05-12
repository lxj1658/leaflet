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
    mounted(){
        var GPS = {  
          PI : 3.14159265358979324,  
          x_pi : 3.14159265358979324 * 3000.0 / 180.0,  
          delta : function (lat, lon) {  
              // Krasovsky 1940  
              //  
              // a = 6378245.0, 1/f = 298.3  
              // b = a * (1 - f)  
              // ee = (a^2 - b^2) / a^2;  
              var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。  
              var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。  
              var dLat = this.transformLat(lon - 105.0, lat - 35.0);  
              var dLon = this.transformLon(lon - 105.0, lat - 35.0);  
              var radLat = lat / 180.0 * this.PI;  
              var magic = Math.sin(radLat);  
              magic = 1 - ee * magic * magic;  
              var sqrtMagic = Math.sqrt(magic);  
              dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);  
              dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);  
              return {'lat': dLat, 'lon': dLon};  
          },  
             
          //WGS-84 to GCJ-02  
          gcj_encrypt : function (wgsLat, wgsLon) {  
              if (this.outOfChina(wgsLat, wgsLon))  
                  return {'lat': wgsLat, 'lon': wgsLon};  
         
              var d = this.delta(wgsLat, wgsLon);  
              return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};  
          },  
          //GCJ-02 to WGS-84  
          gcj_decrypt : function (gcjLat, gcjLon) {  
              if (this.outOfChina(gcjLat, gcjLon))  
                  return {'lat': gcjLat, 'lon': gcjLon};  
                 
              var d = this.delta(gcjLat, gcjLon);  
              return {'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon};  
          },  
          //GCJ-02 to WGS-84 exactly  
          gcj_decrypt_exact : function (gcjLat, gcjLon) {  
              var initDelta = 0.01;  
              var threshold = 0.000000001;  
              var dLat = initDelta, dLon = initDelta;  
              var mLat = gcjLat - dLat, mLon = gcjLon - dLon;  
              var pLat = gcjLat + dLat, pLon = gcjLon + dLon;  
              var wgsLat, wgsLon, i = 0;  
              while (1) {  
                  wgsLat = (mLat + pLat) / 2;  
                  wgsLon = (mLon + pLon) / 2;  
                  var tmp = this.gcj_encrypt(wgsLat, wgsLon)  
                  dLat = tmp.lat - gcjLat;  
                  dLon = tmp.lon - gcjLon;  
                  if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))  
                      break;  
         
                  if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;  
                  if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;  
         
                  if (++i > 10000) break;  
              }  
              //console.log(i);  
              return {'lat': wgsLat, 'lon': wgsLon};  
          },  
          //GCJ-02 to BD-09  
          bd_encrypt : function (gcjLat, gcjLon) {  
              var x = gcjLon, y = gcjLat;    
              var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);    
              var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);    
              bdLon = z * Math.cos(theta) + 0.0065;    
              bdLat = z * Math.sin(theta) + 0.006;   
              return {'lat' : bdLat,'lon' : bdLon};  
          },  
          //BD-09 to GCJ-02  
          bd_decrypt : function (bdLat, bdLon) {  
              var x = bdLon - 0.0065, y = bdLat - 0.006;    
              var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);    
              var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);    
              var gcjLon = z * Math.cos(theta);    
              var gcjLat = z * Math.sin(theta);  
              return {'lat' : gcjLat, 'lon' : gcjLon};  
          },  
          //WGS-84 to Web mercator  
          //mercatorLat -> y mercatorLon -> x  
          mercator_encrypt : function(wgsLat, wgsLon) {  
              var x = wgsLon * 20037508.34 / 180.;  
              var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);  
              y = y * 20037508.34 / 180.;  
              return {'lat' : y, 'lon' : x};  
              /* 
              if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90)) 
                  return null; 
              var x = 6378137.0 * wgsLon * 0.017453292519943295; 
              var a = wgsLat * 0.017453292519943295; 
              var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a))); 
              return {'lat' : y, 'lon' : x}; 
              //*/  
          },  
          // Web mercator to WGS-84  
          // mercatorLat -> y mercatorLon -> x  
          mercator_decrypt : function(mercatorLat, mercatorLon) {  
              var x = mercatorLon / 20037508.34 * 180.;  
              var y = mercatorLat / 20037508.34 * 180.;  
              y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);  
              return {'lat' : y, 'lon' : x};  
              /* 
              if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90) 
                  return null; 
              if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892)) 
                  return null; 
              var a = mercatorLon / 6378137.0 * 57.295779513082323; 
              var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0); 
              var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323; 
              return {'lat' : y, 'lon' : x}; 
              //*/  
          },  
          // two point's distance  
          distance : function (latA, lonA, latB, lonB) {  
              var earthR = 6371000.;  
              var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);  
              var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);  
              var s = x + y;  
              if (s > 1) s = 1;  
              if (s < -1) s = -1;  
              var alpha = Math.acos(s);  
              var distance = alpha * earthR;  
              return distance;  
          },  
          outOfChina : function (lat, lon) {  
              if (lon < 72.004 || lon > 137.8347)  
                  return true;  
              if (lat < 0.8293 || lat > 55.8271)  
                  return true;  
              return false;  
          },  
          transformLat : function (x, y) {  
              var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));  
              ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;  
              ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;  
              ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;  
              return ret;  
          },  
          transformLon : function (x, y) {  
              var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));  
              ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;  
              ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;  
              ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;  
              return ret;  
          }  
      };
      console.log(GPS.PI)
      let map = L.map('map',{center:[31.768355989867946,117.19595789909364],zoom:17,maxZoom:18});
      map.on('click', function(e) {
        console.log(e.latlng);
      } );
              let url='http://api.map.baidu.com/direction/v2/riding?origin=31.773582,117.201429&destination=31.780970,117.209208&ak=nLpN5iKztxIWsPqgwsyrruUG';
        // let url = 'http://api.map.baidu.com/location/ip?&ak=nLpN5iKztxIWsPqgwsyrruUG&coor=bd09ll'
        // 发送请求
        var path = [];
        var x,y = 0.0;
        this.$http.jsonp(url,{},{
          headers:{},
          emulateJson:true}).then((response) => {
            var movie = response.data;
            var latlngs = [];
            console.log(movie);
            path = movie.result.routes[0].steps;
            let path0 = path[0].path.split(";")
            
            console.log("========转换")
            console.log(GPS.bd_decrypt(31.773582,117.201429))
            function changeToLatLng(path){
              var latlng = path.split(",");
              var lat = Number(latlng[1]);
              var lng = Number(latlng[0]);
              var a = GPS.bd_decrypt(lat,lng);

              var b = GPS.gcj_decrypt_exact(a.lat,a.lon);

              var c = GPS.mercator_encrypt(b.lat,b.lon)

              return [a.lat,a.lon];
            }



            for(let i=0;i<path.length;i++){
              var pathI = path[i].path.split(";");
              for(let j=0;j<pathI.length;j++){
                latlngs.push(changeToLatLng(pathI[j]));
              }
            }
            

            console.log("=========");
            console.log(latlngs);
            

            var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
            map.fitBounds(polyline.getBounds());



            console.log(typeof (path0[0]))
            console.log(path)
            console.log(movie.result.routes[0].steps[0].path)
            console.log(typeof (path[0].path))
            // x = movie.content.point.x;
            // y = movie.content.point.y
          })






      // L.circle([31.77358245052529,117.20142960548402], {radius: 5}).addTo(map);
      L.circleMarker([31.768355989867946,117.19595789909364],{redius:1}).addTo(map)
     // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
      // L.tileLayer.chinaProvider('TianDiTu.Normal.Map',{maxZoom:30,minZoom:5}).addTo(map);
      // L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion',{maxZoom:30,minZoom:5}).addTo(map);
      L.tileLayer.chinaProvider('GaoDe.Normal.Map',{maxZoom:22,minZoom:5}).addTo(map);
       // L.tileLayer.chinaProvider('GaoDe.Satellite.Map',{maxZoom:18,minZoom:5}).addTo(map);
       //  L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion',{maxZoom:18,minZoom:5}).addTo(map);
      // L.marker([39.92,	116.46]).addTo(map).bindPopup('北京').openPopup();
      // 
      // var bmap = new BMap.Map("map");
      console.log(map)
      var lat=0.0,lng=0.0;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() === BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          lat = r.point.lat;
          lng = r.point.lng;
          // alert('您的位置：'+r.point.lng+','+r.point.lat)
          console.log(r.point);
        }else {
          console.log(this.getStatus())
        }
      },{enableHighAccutacy:true})
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
