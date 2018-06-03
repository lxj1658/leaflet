<template>
  <div style="width: 100%;height: 100%;">
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
      <span style="position: absolute;left: 4%;width: 20%;top:40%;color:blue" id='drving' @click="choseDrving()">驾车</span>
      <span style="position: absolute;left: 28%;width: 20%;top:40%" id='transit' @click="choseTransit()">公交</span>
      <span style="position: absolute;left: 52%;width: 20%;top:40%" id='riding' @click="choseRiding()">骑行</span>
      <span style="position: absolute;left: 76%;width: 20%;top:40%" id='walking' @click="choseWalking()">步行</span>
    </div>
    <div class="bottom1" id="bottom1">
      <!-- <el-button type="primary" style="position: absolute;bottom: 5%;right:5%;z-index: 1010;width: 30%" plain round>开始导航</el-button> -->
      <div>
        <div v-if="transit_chose">
          <div style="background-color: white;z-index: 1010">
            <div v-for="item in transit_routes" >
              <div style="margin-top: 20px;margin-left: 10px;margin-right: 10px;" @click="choseTransitRoutes(item)">
                <div v-if="item.string.tip">
                  <div style="width:100px;height:25px;text-align: center;background-color: blue;color: white;border-radius: 3px">
                    <span>{{ item.string.tip }}</span>
                  </div>
                </div>
                <div v-else>
                  <div style="width: 100%;">
                  </div>
                </div>
                <div style=" ">
                  <span>{{ item.string.time }}</span>
                </div>
                <el-button round size="mini" style="height: 30px;color:blue" disabled>{{item.string.bus}}</el-button>
                <div>
                  <span>{{ item.string.price }}</span>
                </div>
                </div>
                <div style="width: 100%;height: 10px"></div>
                <div style="width: 100%;height: 3px;background-color: #f4f4f4"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="open">
          <i class="el-icon-arrow-up" @click="openList()" style="position: absolute;bottom:0px;z-index: 1010"></i>
          </div>
          <div v-else>
            <i class="el-icon-arrow-down" @click="closeList()" style="z-index: 1010;position: absolute;top:0px;"></i>
            <div style="background-color: white;z-index: 1010">
                <div v-for="item in routes" style="overflow: scroll;padding-right: 15px">
                  <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 10px;margin-right: 10px">
                    <div style="height: 100%; ">
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
        routes:this.$store.state.driving_routes,
        transit_chose:false,
        transit_routes:this.$store.state.transit_routes,
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
      },
      choseDrving(){
        this.transit_chose = false;
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = null;
        var drving = document.getElementById('drving');
        var transit = document.getElementById('transit');
        var riding = document.getElementById('riding');
        var walking = document.getElementById('walking');
        drving.style['color'] = 'blue';
        transit.style['color'] = 'black';
        riding.style['color'] = 'black';
        walking.style['color'] = 'black';
        this.routes = this.$store.state.driving_routes;
      },
      choseTransit(){
        this.transit_chose = true;
        var bottom1 = document.getElementById('bottom1');
        console.log(bottom1);
        bottom1.style['z-index'] = 1010;
        var drving = document.getElementById('drving');
        var transit = document.getElementById('transit');
        var riding = document.getElementById('riding');
        var walking = document.getElementById('walking');
        drving.style['color'] = 'black';
        transit.style['color'] = 'blue';
        riding.style['color'] = 'black';
        walking.style['color'] = 'black';
        console.log(this.$store.state.transit_routes);
        this.routes = this.$store.state.transit_routes;
      },
      choseRiding(){
        this.transit_chose = false;
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = null;
        var drving = document.getElementById('drving');
        var transit = document.getElementById('transit');
        var riding = document.getElementById('riding');
        var walking = document.getElementById('walking');
        drving.style['color'] = 'black';
        transit.style['color'] = 'black';
        riding.style['color'] = 'blue';
        walking.style['color'] = 'black';
        this.routes = this.$store.state.riding_routes;
      },
      choseWalking(){
        this.transit_chose = false;
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = null;
        var drving = document.getElementById('drving');
        var transit = document.getElementById('transit');
        var riding = document.getElementById('riding');
        var walking = document.getElementById('walking');
        drving.style['color'] = 'black';
        transit.style['color'] = 'black';
        riding.style['color'] = 'black';
        walking.style['color'] = 'blue';
        this.routes = this.$store.state.walking_routes;
      },
      choseTransitRoutes(value){
        console.log(value);
        console.log(this.$store.state.driving_routes)
        this.transit_chose = false;
        var bottom1 = document.getElementById('bottom1');
        bottom1.style['z-index'] = null;
        this.routes = value.string.name;
      },
     
    },
    mounted() {

      // this.start1 = this.$store.state.startPosition;
      // this.end1 = this.$store.state.endPosition;
      
    },
    components: {

    },
    watch: {  
      '$route' (to, from) {  
        this.start1 = this.$store.state.startPosition;
        this.end1 = this.$store.state.endPosition;
        console.log("this.$store.state.driving_routesLatLng=====")
        console.log(this.$store.state.driving_routesLatLng);
        // if(this.$store.state.driving_routesLatLng.length != 0){
        //   var polyline = L.polyline(this.$store.state.driving_routesLatLng, {color: 'red'}).addTo(map);
        //   map.fitBounds(polyline.getBounds());
        // }
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
  height: 9%;
  z-index: 1010;
  background-color: white;
}
.bottom1 {
  position: absolute;
  display: inline;
  height: 75%;
  bottom: 0px;
  width: 100%;
  overflow-y: scroll;
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
.el-button--primary.is-plain:hover {
  border-radius: 30px
}

</style>
