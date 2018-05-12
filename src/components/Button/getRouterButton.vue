<template>
  <div>
    <div id="navButton">
      <router-link to="/main/getRoute">
        <el-button id="startNaviBtn" @click="clickBtn">
          <img class="routeImg" src="../../../static/Icon/arrow.png"/><br>路线
        </el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import router from '../../router';

  export default {
    name: 'getRouterButton',
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      clickBtn() {
        this.$router.push('/main/getRoute');
      },
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #navButton {
    position: absolute;
    bottom: 5%;
    right: 10%;
    z-index: 1010;
  }

  #oldVersion {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

  #startNaviBtn {
    background-color: rgba(7, 7, 7, 0.90);
    font-family: 宋体;
    color: rgba(255, 255, 255, 0.8);
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 4px solid rgb(125, 125, 125);
    padding: 0px;
  }

  #oldBtn {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-family: 宋体;
    font-size: 14px;
    text-align: right;
    height: 35px;
    width: 35px;
    padding: 0px;
    border-radius: 0px;
    border-top-left-radius: 35px;
    border-top: 6px solid rgba(125, 125, 125, 0.5);
  }

  .routeImg {
    height: 15px;
    width: 15px;
  }
</style>

