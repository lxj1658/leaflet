<template>
  <div style="width: 100%;height: 100%;">
    <div class="choseHead">
      <div style="position: absolute;left: 5%;width: 15%;height: 100%" @click="fanhui()">
        <i class="el-icon-arrow-left" style="position: absolute;top:15%"></i>
      </div>
      <div style="position: absolute;left: 10%;top: 28%">
        <span>地图选点</span>
      </div>
      <div style="position: absolute;right:15%;width: 15%;height: 50%" @click="chosePosition()">
        <el-button type="primary" size="mini">确认选择</el-button>
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

      }
    },
    router: router,
    methods: {
     chosePosition(){
      this.$router.replace('/main/getRoute');
     },
     fanhui(){
      this.$router.replace('/main/getRoute');
     }  
    },
    mounted() {
    },
    components: {
    },
    watch:{
     
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/*.choseMain {
  position: fixed;
  width: 100%;
  height: 100%;
   background-color: white;
  z-index:1020;
}*/
.choseHead {
  position: absolute;
  display:inline-flex;
  top: 0px;
  padding: 10px;
  width: 100%;
  height: 5%;
  background-color: white;
  z-index: 1010
}


</style>
