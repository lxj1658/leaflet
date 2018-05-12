<template>
  <div class="main">
    <div class="head">
      <i class="el-icon-arrow-left" style="position: absolute;top: 45%;left: 5%;" @clcik="fanhui()"></i>
      <div style="position: absolute;top: 10%;left: 20%;">
        <el-input placeholder="输入起点" v-model="start"></el-input>
      </div>
      <div style="position: absolute;bottom: 10%;left: 20%;">
        <el-input placeholder="输入终点" v-model="end" ></el-input>
      </div>
      <i class="el-icon-sort" style="position: absolute;top: 45%;right: 15%;" @click="exchange()"></i>
    </div>
    <div class="center">
      <i class="el-icon-location" style="position: absolute;top:45%;left: 2.5%;width: 30%" @clcik="choseMe()">我的位置</i>
      <i class="el-icon-star-on" style="position: absolute;top: 45%;left: 35%;width: 30%;" @click="choseCollection()">收藏的点</i>
      <i class="el-icon-location-outline" style="position: absolute;top: 45%;left: 67.5%;width: 30%" @click="choseOnMap()">地图选点</i>
    </div>
    <div class="bottom">
      <div v-for="item in sites" style="overflow: scroll;">
        <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;
        margin-right: 10px" @click="chose(item)">
          <i class="el-icon-search" style="width: 10%;height: 100%"></i>
          <div style="width: 80%;height: 100%;text-align: center; ">
            <span>{{ item.name }}</span>
          </div>
          <i class="el-icon-back" style="width: 10%;height: 100%"></i>
        </div>
        <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router';
  import * as mutationTypes from '../../store/mutations-types'
  export default {
    data() {
      return {
        start:'我的位置',
        end:'',
        sites:[{name:'合肥工业大学'},{name:'合肥南站'},{name:'安徽大学'},{name:'合肥火车站'},{name:'大润发(中环店)'}]
      }
    },
    router: router,
    methods: {
      fanhui(){
        console.log("fanhui");
        this.$router.push('/main/getRouterButton');
      },
      exchange(){
        console.log("exchange")
      },
      chose(value){
        console.log("chose");
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
            console.log("=======")
            console.log(movie);
            path = movie.result.routes[0].steps;
            //路线信息
              function directionChange(direction){
              var num = Number(direction);
              if(num>=0 && num <= 45 || num>=315&&num<=360){
                return "北"
              }else if(num >= 45 && num <= 135){
                return "东"
              }else if(num >= 135 && num <= 225){
                return "南";
              }else if(num >= 225 && num <= 315){
                return "西"
              }
            }
            for(var i=0;i<path.length;i++){
              var dire = directionChange(path[i].direction)
              var instruct = path[i].instructions;
              console.log(instruct.indexOf("</"))
              if(instruct.indexOf("<") >= 0){
                instruct = "沿着" + instruct.slice(instruct.indexOf("<")+3);
                
              }
              if(instruct.indexOf("</") >= 0){
                instruct = instruct.replace('</b>','');
              }
              var string = "向"+dire+instruct+"后"+path[i].turn_type;
              this.$store.commit(mutationTypes.SET_ROUTES, {route: {name:string}});
            }

          //路径信息
            let path0 = path[0].path.split(";")
            function changeToLatLng(path){
              let latlng = path.split(",");
              let lat = Number(latlng[1]);
              let lng = Number(latlng[0]);
              return [lat,lng];
            }

            for(let i=0;i<path.length;i++){
              var pathI = path[i].path.split(";");
              for(let j=0;j<pathI.length;j++){
                latlngs.push(changeToLatLng(pathI[j]));
              }
            }
            // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
            // map.fitBounds(polyline.getBounds());

          })
        
        // let url='http://api.map.baidu.com/direction/v2/riding?origin=31.773582,117.201429&destination=31.780970,117.209208&ak=nLpN5iKztxIWsPqgwsyrruUG';
        // // let url = 'http://api.map.baidu.com/location/ip?&ak=nLpN5iKztxIWsPqgwsyrruUG&coor=bd09ll'
        // // 发送请求
        // var path = [];
        // var x,y = 0.0;
        // let that = this;
        // this.$http.jsonp(url,{},{
        //   headers:{},
        //   emulateJson:true}).then((response) => {
        //     var movie = response.data;
        //     var latlngs = [];
        //     console.log("=======")
        //     console.log(movie);
        //     path = movie.result.routes[0].steps;




        this.$router.push('/main/RouterList')
      },
    },
    mounted() {

      
    },
    components: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.main {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  z-index: 1010;
}
.head {
  position: absolute;
  display:inline-flex;
  top: 0px;
  padding: 10px;
  width: 100%;
  height: 15%;
  background-color: white;
}
.center {
  position: absolute;
  display:inline-flex;
  top: 20%;
  padding: 10px;
  width: 100%;
  height: 10%;
  background-color: white;
}
.bottom {
  position: absolute;
  display: inline;
  top:35%;
  padding: 10px;
  bottom: 0px;
  width: 100%;
  background-color: white;
}
.el-input .el-input__inner{
  color: black;
  background-color: #f4f4f4;
}
</style>
