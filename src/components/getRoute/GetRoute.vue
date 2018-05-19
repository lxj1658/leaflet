<template>
  <div class="main">
    <div class="head">
      <div style="position: absolute;left: 5%;width: 15%;height: 100%" @click="fanhui()">
        <i class="el-icon-arrow-left" style="position: absolute;top: 35%"></i>
      </div>
      <div style="position: absolute;top: 10%;left: 20%;" @click="setStartPosition()">
        <el-input placeholder="输入起点" v-model="start" onfocus="this.select()"></el-input>
      </div>
      <div style="position: absolute;bottom: 10%;left: 20%;" @click="setEndPosition()">
        <el-input placeholder="输入终点" v-model="end" onfocus="this.select()"></el-input>
      </div>
      <div style="position: absolute;right: 5%;width: 15%;height: 100%" @click="exchange()">
        <i class="el-icon-sort" style="position: absolute;top: 35%"></i>
      </div>
    </div>
    
    <div class="bottom">
      <div v-for="item in historySites" style="overflow: scroll;">
        <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;
        margin-right: 10px" @click="chose(item)">
          <i class="el-icon-time" style="width: 10%;height: 100%;margin-top: 1%"></i>
          <div style="height: 100%;text-align: center; ">
            <span>{{ item.name }}</span>
          </div>
          <i class="el-icon-d-arrow-right" style="height: 100%;margin-top: 1%;margin-left:3%;margin-right: 3%"></i>
          <div style="height: 100%;text-align: center; ">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
      </div>
    </div>
    <div >
      <div v-if='collection'></div>
      <div v-else>
        <div class="collection">
          <div style="position: absolute;top: 0;height: 50%;width: 100%;background-color: #ccc;opacity:0.3;"></div>
          <div style="position: absolute;top: 50%;height: 50%;width: 100%;background-color: white;">
            <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
                  <div style="width: 100%;height: 100%;text-align: center; ">
                  <span>收藏的点</span>
                  </div>
                </div>
            <div style="width: 100%;height: 2px;background-color: #f4f4f4"></div>
            <div>
              <div v-for="item in collections" style="overflow: scroll;">
                <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
                  <div style="width: 100%;height: 100%; margin-left: 10px" @click = "choseCollect(item)">
                  <span>{{ item.name }}</span>
                  </div>
                </div>
                <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
              </div>
            </div>
            <el-button type="info" @click="closeCollection()">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if='showPosition'></div>
      <div v-else>
        <div class="showPosition">
          <div class="center">
            <i class="el-icon-location" style="position: absolute;top:45%;left: 2.5%;width: 30%" @click="choseMe()">我的位置</i>
            <i class="el-icon-star-on" style="position: absolute;top: 45%;left: 35%;width: 30%;" @click="choseCollection()">收藏的点</i>
            <i class="el-icon-location-outline" style="position: absolute;top: 45%;left: 67.5%;width: 30%" @click="choseOnMap()">地图选点</i>
          </div>
          <div class="bottom_show">
            <div v-for="item in sites" style="overflow: scroll;">
              <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px" @click="show_chose(item)">
                <i class="el-icon-location-outline" style="width: 10%;height: 100%"></i>
                <div style="width: 80%;height: 100%;text-align: center; ">
                  <span>{{ item.name }}</span>
                </div>

              </div>
              <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import router from '../../router';
  import * as mutationTypes from '../../store/mutations-types'
  import GPS from '../../assets/JS/GPS.js'
  export default {
    data() {
      return {
        start:'我的位置',
        end:'',
        historySites:[{name:'合肥工业大学'},{name:'合肥南站'},{name:'安徽大学'},{name:'合肥火车站'},{name:'大润发(中环店)'}],
        sites:this.$store.state.historyStart,
        collections:[{name:'合肥工业大学'},{name:'合肥南站'}],
        positionType:'',
        showPosition:true,
        collection:true,
      }
    },
    router: router,
    methods: {
      fanhui(){
        console.log("fanhui");
        if(this.showPosition === false){
          this.showPosition = true;
        }else {
          this.$router.push('/main/getRouterButton');
        }
      },
      exchange(){
        console.log("exchange")
        var change = this.start;
        this.start = this.end;
        this.end = change;
      },
      choseMe(){
        console.log("choseMe")
        if(this.positionType === 'start'){
          this.start = '我的位置';
        }else if(this.positionType === 'end'){
          this.end = '我的位置';
        }
      },
      choseCollection(){
        console.log("showCollection")
        // var collection = document.getElementById('collection');
        // collection.style['z-index'] = 1011;
        this.collection = false;
      },
      choseCollect(item){
        if(this.positionType === 'start'){
          this.start = item.name;
          this.collection = true;
        }else if(this.positionType === 'end'){
          this.end = item.name;
          this.collection = true;
        }
      },
      closeCollection(){
        console.log("closeCollection")
        this.collection = true;
      },
      choseOnMap(){

      },
      chose(value){
        console.log("chose");
        this.end = value.name;
        this.$store.commit(mutationTypes.SET_STARTPOSITION,this.start);
        this.$store.commit(mutationTypes.SET_ENDPOSITION,this.end);
        console.log(this.$store.state.startPosition);
        console.log(this.$store.state.endPosition);
        var startPosition;
        var endPosition;
        // let url='http://api.map.baidu.com/direction/v2/riding?origin=31.773582,117.201429&destination=31.780970,117.209208&ak=nLpN5iKztxIWsPqgwsyrruUG';
        let url = 'http://api.map.baidu.com/direction/v1?mode=walking&origin=合肥工业大学(翡翠湖校区)-实验楼&destination=安徽大学(磬苑校区)&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
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
              this.$store.commit(mutationTypes.SET_ROUTES, {name:string});
            }

          //路径信息(经纬度)
            let path0 = path[0].path.split(";")
            function changeToLatLng(path){
              var latlng = path.split(",");
              var lat = Number(latlng[1]);
              var lng = Number(latlng[0]);
              var a = GPS.bd_decrypt(lat,lng);
              return [a.lat,a.lon];
            }

            for(let i=0;i<path.length;i++){
              var pathI = path[i].path.split(";");
              for(let j=0;j<pathI.length;j++){
                var latlng = changeToLatLng(pathI[j])
                this.$store.commit(mutationTypes.SET_ROUTESLATLNG,latlng);

                // latlngs.push(changeToLatLng(pathI[j]));
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




        this.$router.replace('/main/RouterList')
      },
      show_chose(value){
        let that = this;
        if(this.positionType === 'start'){
          this.start = value.name;
          this.collection = true;
          this.showPosition = true;
          
        }else if(this.positionType === 'end'){
          this.end = value.name;
          this.collection = true;
          this.showPosition = true;
          
        }
        
        
        console.log(this.start);
        console.log(this.end)
        if(this.start != '' && this.end != ''){
          that.$store.commit(mutationTypes.DEL_STARTPOSITION);
          that.$store.commit(mutationTypes.SET_STARTPOSITION,this.start);
          that.$store.commit(mutationTypes.DEL_ENDPOSITION);
          that.$store.commit(mutationTypes.SET_ENDPOSITION,this.end);

          let url = 'http://api.map.baidu.com/direction/v1?mode=walking&origin='+ this.start +'&destination='+ this.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
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
                this.$store.commit(mutationTypes.SET_ROUTES, {name:string});
              }

            //路径信息(经纬度)
              let path0 = path[0].path.split(";")
              function changeToLatLng(path){
                var latlng = path.split(",");
                var lat = Number(latlng[1]);
                var lng = Number(latlng[0]);
                var a = GPS.bd_decrypt(lat,lng);
                return [a.lat,a.lon];
              }

              for(let i=0;i<path.length;i++){
                var pathI = path[i].path.split(";");
                for(let j=0;j<pathI.length;j++){
                  var latlng = changeToLatLng(pathI[j])
                  this.$store.commit(mutationTypes.SET_ROUTESLATLNG,latlng);

                  // latlngs.push(changeToLatLng(pathI[j]));
                }
              }
              // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
              // map.fitBounds(polyline.getBounds());

            })


          that.$router.push('/main/RouterList')
        }
      },
      setStartPosition(){
        console.log("设置起点")
        this.positionType = 'start';
        this.showPosition = false;
        this.$store.commit(mutationTypes.DEL_ENDSITES);
        console.log(this.showPosition);
        console.log(this.sites);
      },
      setEndPosition(){
        console.log("设置终点")
        this.positionType = 'end';
        this.showPosition = false;
        this.$store.commit(mutationTypes.DEL_STARTSITES);
      },
      // showSites(){
      //   if(this.$store.state.sites.length === 0){
      //     return this.$store.state.historyStart;
      //   }else {
      //     return this.$store.state.sites;
      //   }
      // },
    },
    mounted() {
    },
    components: {
    },
    watch:{
      start:{
        handler:function(val,oldval){
          let that = this;
          that.$store.commit(mutationTypes.DEL_STARTSITES);
          var query = val
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query+'&region=合肥&city_limit=true&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG' 
          this.$http.jsonp(url,{},{
            headers:{},
            emulateJson:true}).then((response) =>{
              var data = response.data;
              console.log(data);
              if(data.message === 'ok'){
                for(var i=0;i<data.result.length;i++){
                  that.$store.commit(mutationTypes.SET_STARTSITES,data.result[i]);
                  that.sites = that.$store.state.startSites;
                }
              }else {

              }
          })
        }
      },
      end:{
        handler:function(val,oldval){
          let that = this;
          that.$store.commit(mutationTypes.DEL_ENDSITES);
          var query = val
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query+'&region=合肥&city_limit=true&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG' 
          this.$http.jsonp(url,{},{
            headers:{},
            emulateJson:true}).then((response) =>{
              var data = response.data;
              console.log(data);
              if(data.message === 'ok'){
                for(var i=0;i<data.result.length;i++){
                  that.$store.commit(mutationTypes.SET_ENDSITES,data.result[i]);
                  that.sites = that.$store.state.endSites;
                }
              }else {

              }
          })
        }
      }
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
  top: 0;
  padding: 10px;
  width: 100%;
  height: 10%;
  background-color: white;
}
.bottom {
  position: absolute;
  display: inline;
  top:20%;
  padding: 10px;
  bottom: 0px;
  width: 100%;
  background-color: white;
}
.el-input .el-input__inner{
  color: black;
  background-color: #f4f4f4;
}
.collection {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1020
}
.showPosition {
  position: absolute;
  width: 100%;
  top: 20%;
  height: 80%;
  background-color: #f4f4f4;

}
.bottom_show {
  position: absolute;
  display: inline;
  top:15%;
  padding: 10px;
  bottom: 0px;
  width: 100%;
  background-color: white;
}
.el-button--info{
  position: absolute;
  left:2.5%;
  bottom:5px;
  width: 95%;
}

</style>
