<template>
  <div>
    <div class="head1">
      <div style="position: absolute;left: 5%;width: 15%;height: 100%" @click="fanhui()">
        <i class="el-icon-arrow-left" style="position: absolute;top: 35%"></i>
      </div>
      <div style="position: absolute;top: 10%;left: 20%;">
        <el-input placeholder="输入起点" v-model="start1" onfocus="this.select()"></el-input>
      </div>
      <div style="position: absolute;bottom: 10%;left: 20%;">
        <el-input placeholder="输入终点" v-model="end1" onfocus="this.select()"></el-input>
      </div>
      <div style="position: absolute;right: 5%;width: 15%;height: 100%" @click="exchange()">
        <i class="el-icon-sort" style="position: absolute;top: 35%"></i>
      </div>
    </div>
    <div class="center1">
      <span style="position: absolute;left: 4%;width: 20%;top:40%">驾车</span>
      <span style="position: absolute;left: 28%;width: 20%;top:40%">公交</span>
      <span style="position: absolute;left: 52%;width: 20%;top:40%;color: blue">骑行</span>
      <span style="position: absolute;left: 76%;width: 20%;top:40%">步行</span>
    </div>
    <div class="bottom1" id="bottom1">
      <div v-if="open">
        <i class="el-icon-arrow-up" @click="openList()" style="position: absolute;bottom:0px;z-index: 1010"></i>
      </div>
      <div v-else>
        <i class="el-icon-arrow-down" @click="closeList()" style="z-index: 1010"></i>
        <div style="background-color: white;z-index: 1010">
            <div v-for="item in routes" style="overflow: scroll;">
              <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
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
</template>

<script>
  import router from '../../router';
  import state from '../../store/state';
  import * as mutationTypes from '../../store/mutations-types'
  
  export default {
    data() {
      return {
        start1:'',
        end1:'',
        open:true,
        routes:this.$store.state.routes,
      }
    },
    router: router,
    methods: {
      setEndPosition(){
        return this.$store.state.endPosition;
      },
      fanhui(){
        console.log("fanhui");
        this.$router.push('/main/getRoute');
      },
      exchange(){
        console.log("exchange")
        var change = this.start1;
        this.start1 = this.end1;
        this.end1 = change;
      },
      closeList() {
        console.log("closeList")
        this.open = true;
        console.log(this.$store.state.routes)
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = null;
      },
      openList() {
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = 1010;
        console.log("openList")
        this.open = false;
        console.log(this.end1)
        console.log("**********************************")
        console.log(this.$store.state.routes)
        console.log(this.$store.state.startPosition);
        console.log(this.$store.state.endPosition);
      }
     
    },
    mounted() {

      this.start1 = this.$store.state.startPosition;
      this.end1 = this.$store.state.endPosition;
      // console.log(this.$store.state.routesLatLng);
      // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
      // console.log(this.$store.state.routes)
      //   let url='http://api.map.baidu.com/direction/v2/riding?origin=31.773582,117.201429&destination=31.780970,117.209208&ak=nLpN5iKztxIWsPqgwsyrruUG';
      //   // 发送请求
      //   var path = [];
      //   var x,y = 0.0;
      //   let that = this;
      //   this.$http.jsonp(url,{},{
      //     headers:{},
      //     emulateJson:true}).then((response) => {
      //       var movie = response.data;
      //       var latlngs = [];
      //       console.log("=======")
      //       console.log(movie);
      //       path = movie.result.routes[0].steps;
      //       function directionChange(direction){
      //         var num = Number(direction);
      //         if(num>=0 && num <= 45 || num>=315&&num<=360){
      //           return "北"
      //         }else if(num >= 45 && num <= 135){
      //           return "东"
      //         }else if(num >= 135 && num <= 225){
      //           return "南";
      //         }else if(num >= 225 && num <= 315){
      //           return "西"
      //         }
      //       }
      //       for(var i=0;i<path.length;i++){
      //         var dire = directionChange(path[i].direction)
      //         var instruct = path[i].instructions;
      //         console.log(instruct.indexOf("</"))
      //         if(instruct.indexOf("<") >= 0){
      //           instruct = "沿着" + instruct.slice(instruct.indexOf("<")+3);
                
      //         }
      //         if(instruct.indexOf("</") >= 0){
      //           instruct = instruct.replace('</b>','');
      //         }
      //         var string = "向"+dire+instruct+"后"+path[i].turn_type;
      //         that.routes.push({name:string});
      //         console.log(that.routes)
      //       }
      //     })
      
    },
    components: {

    },
    watch: {  
      '$route' (to, from) {  
        this.start1 = this.$store.state.startPosition;
        this.end1 = this.$store.state.endPosition;
      } 
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.head1 {
  position: absolute;
  display:inline-flex;
  top: 0px;
  padding: 10px;
  width: 100%;
  height: 15%;
  background-color: white;
  z-index: 1010
}
.center1 {
  position: absolute;
  display:inline-flex;
  top: 16%;
  padding: 10px;
  width: 100%;
  height: 5%;
  z-index: 1010;
  background-color: white;
}
.bottom1 {
  position: absolute;
  display: inline;
  height: 80%;
  bottom: 0px;
  width: 100%;
  /*z-index: 900*/
  /*background-color: white;*/
}
.el-input .el-input__inner{
  color: black;
  background-color: #f4f4f4;
}
/*.startPoint .el-input__inner {
  color:black;
}*/
</style>
