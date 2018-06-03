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
        <div style="width: 90%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 20px" @click="chose(item)">
          <i class="el-icon-time" style="width: 10%;height: 100%;margin-top: 1%"></i>
          <div style="height: 100%;font-size: 15px">
            <span>{{ item.start }} → {{item.end}}</span>
          </div>
          <!-- <i class="el-icon-d-arrow-right" style="height: 100%;margin-top: 1%;margin-left:3%;margin-right: 3%"></i>
          <div style="height: 100%;white-space:nowrap;font-size: 15px ">
            <span>{{ item.end }}</span>
          </div> -->
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
        historySites:this.$store.state.historySites,
        sites:this.$store.state.historyStart,
        collections:this.$store.state.collections,
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
        this.$router.push('/main/ChosePosition');

      },
      chose(value){

      // var fs = require('fs');
         // var Client = require('../../../node_modules/mysql').Client;
        
        // var client = new Client();
        // client.user = 'root';
        // client.password = '199678xj';
        // console.log("Connecting to MySQL")
        
        // var connection = mysql.createConnection({
        //   host: 'localhost',  //主机
        //   user: 'root',    //MySQL认证用户名
        //   password: '199678xj',  //MySQL认证用户密码
        //   database: 'leaflet',
        //   port: '3306'     //端口号
        // });
        // console.log(connection);


        console.log("chose");
        this.start = value.start;
        this.end = value.end;
        this.$store.commit(mutationTypes.SET_STARTPOSITION,this.start);
        this.$store.commit(mutationTypes.SET_ENDPOSITION,this.end);
        console.log(this.$store.state.startPosition);
        console.log(this.$store.state.endPosition);
        var distance;//距离(从walking中获取,为下一步自动选择路线做准备)
        var startPosition;
        var endPosition;
        
        /**
         * 请求：
         * walking：步行
         * driving：驾车
         * riding：骑行
         * transit：公交
         */
        let url_walking = 'http://api.map.baidu.com/direction/v1?mode=walking&origin='+ value.start +'&destination='+ value.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
        let url_driving = 'http://api.map.baidu.com/direction/v1?mode=driving&origin='+ value.start +'&destination='+ value.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
        let url_riding = 'http://api.map.baidu.com/direction/v1?mode=riding&origin='+ value.start +'&destination='+ value.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
        let url_transit = 'http://api.map.baidu.com/direction/v1?mode=transit&origin='+ value.start +'&destination='+ value.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
        // let url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=31.780970,117.209208&output=json&pois=1&ak=nLpN5iKztxIWsPqgwsyrruUG'
        // let url2 = 'http://api.map.baidu.com/geocoder/v2/?address=合肥南站&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG&callback=showLocation'

        // this.$http.jsonp(url,{},{
        //   headers:{},
        //   emulateJson:true}).then((response) => {
        //     var movie = response.data;
        //     console.log("===========逆地理检索===========")
        //     console.log(movie);
        //   })

        //   this.$http.jsonp(url2,{},{
        //   headers:{},
        //   emulateJson:true}).then((response) => {
        //     var movie = response.data;
        //     console.log("===========逆地理检索_合肥南站===========")
        //     console.log(movie);
        //   })

        // 发送请求
        /**
         * walking
         * 步行线路请求
         */
        this.$http.jsonp(url_walking,{},{
          headers:{},
          emulateJson:true}).then((response) => {
            this.$store.commit(mutationTypes.DEL_WALKING_ROUTESLATLNG);
            this.$store.commit(mutationTypes.DEL_WALKING_ROUTES);
            var movie = response.data;
            var latlngs = [];
            console.log("=======walking=========")
            console.log(movie);
            distance = movie.result.routes[0].distance;
            var path = [];
            path = movie.result.routes[0].steps;
            //路线信息
            for(var i=0;i<path.length;i++){
                var instruct = path[i].instructions;
                while(instruct.indexOf("<b>") >= 0){
                  instruct = instruct.replace('<b>','');
                }
                while(instruct.indexOf("</b>") >= 0){
                  instruct = instruct.replace('</b>','');
                }
                var string = instruct;
                
                this.$store.commit(mutationTypes.SET_WALKING_ROUTES, {name:string});
              }

            //路径信息(经纬度)
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
                
                this.$store.commit(mutationTypes.SET_WALKING_ROUTESLATLNG,latlng);
              }
            }
          })

        /**
         * driving
         * 驾车线路请求
         */
        this.$http.jsonp(url_driving,{},{
          headers:{},
          emulateJson:true}).then((response) => {
            this.$store.commit(mutationTypes.DEL_DRIVING_ROUTESLATLNG);
            this.$store.commit(mutationTypes.DEL_DRIVING_ROUTES);
            var movie = response.data;
            console.log("======driving========");
            console.log(movie);
            var steps = movie.result.routes[0].steps;
            for(var i=0;i<steps.length;i++){
              //路线描述信息
              var instruct = steps[i].instructions;
              while(instruct.indexOf('<b>') >= 0){
                  instruct = instruct.replace('<b>','');
              }
              while(instruct.indexOf("</b>") >= 0){
                  instruct = instruct.replace('</b>','');
              }
              var string = instruct;
                
              this.$store.commit(mutationTypes.SET_DRIVING_ROUTES, {name:string});

              //路线经纬度
              function changeToLatLng(path){
              var latlng = path.split(",");
              var lat = Number(latlng[1]);
              var lng = Number(latlng[0]);
              var a = GPS.bd_decrypt(lat,lng);
              return [a.lat,a.lon];
              }
              
              var pathI = steps[i].path.split(";");
              for(let j=0;j<pathI.length;j++){
                var latlng = changeToLatLng(pathI[j])
                
                this.$store.commit(mutationTypes.SET_DRIVING_ROUTESLATLNG,latlng);
                // latlngs.push(changeToLatLng(pathI[j]));
              }
            }           
          })

        /**
         * riding
         * 驾车线路请求
         */
        this.$http.jsonp(url_riding,{},{
          headers:{},
          emulateJson:true}).then((response) => {
            this.$store.commit(mutationTypes.DEL_RIDING_ROUTESLATLNG);
            this.$store.commit(mutationTypes.DEL_RIDING_ROUTES);
            var movie = response.data;
            console.log("======riding========");
            console.log(movie);
            var steps = movie.result.routes[0].steps;
            for(var i=0;i<steps.length;i++){
              //路线描述信息
              var instruct = steps[i].instructions;
              while(instruct.indexOf('<b>') >= 0){
                  instruct = instruct.replace('<b>','');
              }
              while(instruct.indexOf("</b>") >= 0){
                  instruct = instruct.replace('</b>','');
              }
              var string = instruct;
                
              this.$store.commit(mutationTypes.SET_RIDING_ROUTES, {name:string});

              //路线经纬度
              function changeToLatLng(path){
              var latlng = path.split(",");
              var lat = Number(latlng[1]);
              var lng = Number(latlng[0]);
              var a = GPS.bd_decrypt(lat,lng);
              return [a.lat,a.lon];
              }
              
              var pathI = steps[i].path.split(";");
              for(let j=0;j<pathI.length;j++){
                var latlng = changeToLatLng(pathI[j])
                
                this.$store.commit(mutationTypes.SET_RIDING_ROUTESLATLNG,latlng);
                // latlngs.push(changeToLatLng(pathI[j]));
              }
            }
          })

        /**
         * transit
         * 公交线路请求
         */
        this.$http.jsonp(url_transit,{},{
          headers:{},
          emulateJson:true}).then((response) => {
            this.$store.commit(mutationTypes.DEL_TRANSIT_ROUTES);
            this.$store.commit(mutationTypes.DEL_TRANSIT_ROUTESLATLNG);
            var movie = response.data;
            console.log("=======transit======")
            console.log(movie);
            var routes_transit = [];
            routes_transit = movie.result.routes;
            function setTime(time){
              var result = '';
              var hour=0,minute=0;
              if(time >= 3600){
                hour = parseInt(time/3600);
                time = time%3600;
                minute = parseInt(time/60);
              } else if(time >= 60 && time < 3600){
                hour = 0;
                minute = parseInt(time/60);
              }
              if(hour === 0 && minute != 0){
                result = minute + '分钟'
              }else if(minute === 0 && hour != 0){
                result = hour + '小时'
              }else if(hour != 0 && minute != 0){
                result = hour + '小时' + minute + '分'
              }else if (hour===0 && minute ===0){
                console.log('时间获取错误==============');
              }
              return result;
            }
            function setPrice(price){
              var result;
              var yuan=0,jiao=0;
              if(price >= 100){
                yuan = parseInt(price/100);
                price = price % 100;
                jiao = parseInt(price/10);
              } else {
                yuan = 0;
                jiao = parseInt(price/10);
              }
              if(yuan === 0 && jiao != 0){
                result = jiao + '角';
              }else if(yuan != 0 && jiao === 0){
                result = yuan + '元';
              }else if (yuan !=0 && jiao != 0){
                result = yuan + '元' + jiao + '角';
              }
              return result
            }
            function setTip(tip){
              if(tip === 0){
                return ""
              }else if(tip === 1){
                return "时间短"
              }else if(tip === 2){
                return "少换乘"
              }else if(tip === 3){
                return "少步行"
              }else if(tip === 4){
                return "上车站离起点近"
              }else if(tip === 5){
                return "上车站离终点近"
              }else if(tip === 6){
                return "直达"
              }else if(tip === 7){
                return "无堵车风险"
              }else if(tip === 8){
                return "堵车风险小"
              }
            }

            for(var i=0;i<routes_transit.length;i++){
              var path = routes_transit[i].scheme[0];
              var time = setTime(path.duration);
              var price = setPrice(path.price);
              var tip = setTip(path.tip_label_type);
              var bus = [];
              var string = {time:time,price:price,bus:"",tip:tip,name:[]};
              var latlng=[];
              for(var j=0;j<path.steps.length;j++){
                if(path.steps[j][0].vehicle){
                  bus.push(path.steps[j][0].vehicle.name);
                }
                //路线描述信息
                var instruct = path.steps[j][0].stepInstruction;
                while(instruct.indexOf('<font color="#313233">') >= 0){
                  instruct = instruct.replace('<font color="#313233">','');
                }
                while(instruct.indexOf("</font>") >= 0){
                  instruct = instruct.replace('</font>','');
                }
                if(path.steps[j][0].end_address){
                  instruct += '到达'+path.steps[j][0].end_address;
                }
                if(j === path.steps.length - 1){
                  instruct += '到达终点';
                }
                string.name.push({name:instruct});
                
                //路线经纬度
                function changeToLatLng(path){
                  var latlng = path.split(",");
                  var lat = Number(latlng[1]);
                  var lng = Number(latlng[0]);
                  var a = GPS.bd_decrypt(lat,lng);
                  return [a.lat,a.lon];
                }
                var pathI = path.steps[j][0].path.split(";");
                for(let j=0;j<pathI.length;j++){
                  var latlngI = changeToLatLng(pathI[j])
                  latlng.push(latlngI);
                }
              }
              // console.log(time);
              // console.log(price);
              // console.log(bus);
              // console.log(string);
              // console.log(latlng);
              console.log("bususususuusususu")
              console.log(bus)
              if(bus.length < 2){
                string.bus = bus[0];
              } else {
                var string_bus = "";
                for(var k=0;k<bus.length;k++){
                  if(k < bus.length-1){
                    string_bus += bus[k];
                    string_bus += "/"; 
                  } else {
                    string_bus += bus[k];
                  }
                }
                string.bus = string_bus;
              }
              console.log(string.bus)
              console.log(this.$store.state.transit_routes)
              
              this.$store.commit(mutationTypes.SET_TRANSIT_ROUTESLATLNG,latlng);
              this.$store.commit(mutationTypes.SET_TRANSIT_ROUTES, {string});
            }

          })
        // var polyline = L.polyline(this.$store.state.driving_routesLatLng, {color: 'red'}).addTo(map);
        // map.fitBounds(polyline.getBounds());
        this.$router.replace('/main/RouterList')
      },
      show_chose(value){
        let that = this;
        var distance;
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

          /**
           * 请求：
           * walking：步行
           * driving：驾车
           * riding：骑行
           * transit：公交
           */
          let url_walking = 'http://api.map.baidu.com/direction/v1?mode=walking&origin='+ this.start +'&destination='+ this.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
          let url_driving = 'http://api.map.baidu.com/direction/v1?mode=driving&origin='+ this.start +'&destination='+ this.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
          let url_riding = 'http://api.map.baidu.com/direction/v1?mode=riding&origin='+ this.start +'&destination='+ this.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
          let url_transit = 'http://api.map.baidu.com/direction/v1?mode=transit&origin='+ this.start +'&destination='+ this.end +'&origin_region=合肥&destination_region=合肥&output=json&ak=nLpN5iKztxIWsPqgwsyrruUG'
        
          /**
           * walking
           * 步行线路请求
           */
          this.$http.jsonp(url_walking,{},{
            headers:{},
            emulateJson:true}).then((response) => {
              var movie = response.data;
              var latlngs = [];
              console.log("=======walking=========")
              console.log(movie);
              distance = movie.result.routes[0].distance;
              var path = [];
              path = movie.result.routes[0].steps;
              //路线信息
              for(var i=0;i<path.length;i++){
                  var instruct = path[i].instructions;
                  while(instruct.indexOf("<b>") >= 0){
                    instruct = instruct.replace('<b>','');
                  }
                  while(instruct.indexOf("</b>") >= 0){
                    instruct = instruct.replace('</b>','');
                  }
                  var string = instruct;
                  
                  this.$store.commit(mutationTypes.SET_WALKING_ROUTES, {name:string});
                }

              //路径信息(经纬度)
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
                  this.$store.commit(mutationTypes.SET_WALKING_ROUTESLATLNG,latlng);
                }
              }
            })

          /**
           * driving
           * 驾车线路请求
           */
          this.$http.jsonp(url_driving,{},{
            headers:{},
            emulateJson:true}).then((response) => {
              var movie = response.data;
              console.log("======driving========");
              console.log(movie);
              var steps = movie.result.routes[0].steps;
              for(var i=0;i<steps.length;i++){
                //路线描述信息
                var instruct = steps[i].instructions;
                while(instruct.indexOf('<b>') >= 0){
                    instruct = instruct.replace('<b>','');
                }
                while(instruct.indexOf("</b>") >= 0){
                    instruct = instruct.replace('</b>','');
                }
                var string = instruct;
                  
                this.$store.commit(mutationTypes.SET_DRIVING_ROUTES, {name:string});

                //路线经纬度
                function changeToLatLng(path){
                var latlng = path.split(",");
                var lat = Number(latlng[1]);
                var lng = Number(latlng[0]);
                var a = GPS.bd_decrypt(lat,lng);
                return [a.lat,a.lon];
                }

                var pathI = steps[i].path.split(";");
                for(let j=0;j<pathI.length;j++){
                  var latlng = changeToLatLng(pathI[j])
                  this.$store.commit(mutationTypes.SET_DRIVING_ROUTESLATLNG,latlng);
                  // latlngs.push(changeToLatLng(pathI[j]));
                }
              }           
            })

          /**
           * riding
           * 驾车线路请求
           */
          this.$http.jsonp(url_riding,{},{
            headers:{},
            emulateJson:true}).then((response) => {
              var movie = response.data;
              console.log("======riding========");
              console.log(movie);
              var steps = movie.result.routes[0].steps;
              for(var i=0;i<steps.length;i++){
                //路线描述信息
                var instruct = steps[i].instructions;
                while(instruct.indexOf('<b>') >= 0){
                    instruct = instruct.replace('<b>','');
                }
                while(instruct.indexOf("</b>") >= 0){
                    instruct = instruct.replace('</b>','');
                }
                var string = instruct;
                  
                this.$store.commit(mutationTypes.SET_RIDING_ROUTES, {name:string});

                //路线经纬度
                function changeToLatLng(path){
                var latlng = path.split(",");
                var lat = Number(latlng[1]);
                var lng = Number(latlng[0]);
                var a = GPS.bd_decrypt(lat,lng);
                return [a.lat,a.lon];
                }

                var pathI = steps[i].path.split(";");
                for(let j=0;j<pathI.length;j++){
                  var latlng = changeToLatLng(pathI[j])
                  this.$store.commit(mutationTypes.SET_RIDING_ROUTESLATLNG,latlng);
                  // latlngs.push(changeToLatLng(pathI[j]));
                }
              }
            })

          /**
           * transit
           * 公交线路请求
           */
          this.$http.jsonp(url_transit,{},{
            headers:{},
            emulateJson:true}).then((response) => {
              var movie = response.data;
              console.log("=======transit======")
              console.log(movie);
              var routes_transit = [];
              routes_transit = movie.result.routes;
              function setTime(time){
                var result = '';
                var hour=0,minute=0;
                if(time >= 3600){
                  hour = parseInt(time/3600);
                  time = time%3600;
                  minute = parseInt(time/60);
                } else if(time >= 60 && time < 3600){
                  hour = 0;
                  minute = parseInt(time/60);
                }
                if(hour === 0 && minute != 0){
                  result = minute + '分钟'
                }else if(minute === 0 && hour != 0){
                  result = hour + '小时'
                }else if(hour != 0 && minute != 0){
                  result = hour + '小时' + minute + '分'
                }else if (hour===0 && minute ===0){
                  console.log('时间获取错误==============');
                }
                return result;
              }
              function setPrice(price){
                var result;
                var yuan=0,jiao=0;
                if(price >= 100){
                  yuan = parseInt(price/100);
                  price = price % 100;
                  jiao = parseInt(price/10);
                } else {
                  yuan = 0;
                  jiao = parseInt(price/10);
                }
                if(yuan === 0 && jiao != 0){
                  result = jiao + '角';
                }else if(yuan != 0 && jiao === 0){
                  result = yuan + '元';
                }else if (yuan !=0 && jiao != 0){
                  result = yuan + '元' + jiao + '角';
                }
                return result
              }
              function setTip(tip){
                if(tip === 0){
                  return ""
                }else if(tip === 1){
                  return "时间短"
                }else if(tip === 2){
                  return "少换乘"
                }else if(tip === 3){
                  return "少步行"
                }else if(tip === 4){
                  return "上车站离起点近"
                }else if(tip === 5){
                  return "上车站离终点近"
                }else if(tip === 6){
                  return "直达"
                }else if(tip === 7){
                  return "无堵车风险"
                }else if(tip === 8){
                  return "堵车风险小"
                }
              }
              for(var i=0;i<routes_transit.length;i++){
                var path = routes_transit[i].scheme[0];
                var time = setTime(path.duration);
                var price = setPrice(path.price);
                var tip = setTip(path.tip_label_type);
                var bus = [];
                var string = {time:time,price:price,bus:"",tip:tip,name:[]};
                var latlng=[];
                for(var j=0;j<path.steps.length;j++){
                  if(path.steps[j][0].vehicle){
                    bus.push(path.steps[j][0].vehicle.name);
                  }
                  //路线描述信息
                  var instruct = path.steps[j][0].stepInstruction;
                  while(instruct.indexOf('<font color="#313233">') >= 0){
                    instruct = instruct.replace('<font color="#313233">','');
                  }
                  while(instruct.indexOf("</font>") >= 0){
                    instruct = instruct.replace('</font>','');
                  }
                  if(path.steps[j][0].end_address){
                    instruct += '到达'+path.steps[j][0].end_address;
                  }
                  if(j === path.steps.length - 1){
                    instruct += '到达终点';
                  }
                  string.name.push(instruct);
                  
                  //路线经纬度
                  function changeToLatLng(path){
                    var latlng = path.split(",");
                    var lat = Number(latlng[1]);
                    var lng = Number(latlng[0]);
                    var a = GPS.bd_decrypt(lat,lng);
                    return [a.lat,a.lon];
                  }
                  var pathI = path.steps[j][0].path.split(";");
                  for(let j=0;j<pathI.length;j++){
                    var latlngI = changeToLatLng(pathI[j])
                    latlng.push(latlngI);
                  }
                }
                // console.log(time);
                // console.log(price);
                // console.log(bus);
                // console.log(string);
                // console.log(latlng);
                console.log("bususususuusususu")
                console.log(bus)
                if(bus.length < 2){
                  string.bus = bus[0];
                } else {
                  var string_bus = "";
                  for(var k=0;k<bus.length;k++){
                    if(k < bus.length-1){
                      string_bus += bus[k];
                      string_bus += "/"; 
                    } else {
                      string_bus += bus[k];
                    }
                  }
                  string.bus = string_bus;
                }
                console.log(string.bus)
                console.log(this.$store.state.transit_routes)
                this.$store.commit(mutationTypes.SET_TRANSIT_ROUTESLATLNG,latlng);
                this.$store.commit(mutationTypes.SET_TRANSIT_ROUTES, {string});
              }
            })
          
          that.$router.replace('/main/RouterList')
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
          var query = val;
          console.log(query)
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query + '&region=合肥市&city_limit=true&output=json&ak=YWdGplhYjUGQ3GtpKNeuTM2S' 
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
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query+'&region=合肥市&city_limit=true&output=json&ak=YWdGplhYjUGQ3GtpKNeuTM2S' 
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
  overflow-y: scroll;
}
.el-button--info{
  position: absolute;
  left:2.5%;
  bottom:5px;
  width: 95%;
}

</style>
