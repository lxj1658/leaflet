<template>
  <div style="width: 100%;height: 100%;">
    <div class="navi">
      <div style="position:absolute;top:20px;display:table-cell;height:100%;width:100%;vertical-align:middle;text-align:center;">

  <span style="color: white">

    沿香樟东路走10米,右转进入丹霞路

  </span>

</div>
        <!-- <span style="text-align: center;display:block;width: 80%;height: 100%;">dafsadfasfasfsda</span> -->
       
    </div>
    <div style="position: absolute;width: 100%;bottom: 5%;height: 10%;z-index: 1010;">
    <el-button type="primary" style="position: absolute;right:5%;width: 30%" plain round>退出导航</el-button>
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
.navi {
  position: absolute;
  display:inline-flex;
  top: 0px;

  width: 100%;
  height: 10%;
  background-color: #606266;
  z-index: 1010
}


</style>
