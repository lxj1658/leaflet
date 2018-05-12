<template>
  <div>
    <div class="routerStyle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import router from './router'

  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
    },
    router: router,
  }
</script>

<style>
  body {
    margin: 0px;
  }

  .mu-switch-wrapper {
    -webkit-transform: rotate(90deg);
  }

  .compass {
    position: absolute;
    top: 480px !important;
    left: 220px !important;
    display: block;
    z-index: 1001;
  }

  .distance-legend {
    position: absolute;
    bottom: 60px;
    left: -30px;
    -webkit-transform: rotate(90deg);
    z-index: 1001;
  }

  .navigation-controls {
    position: absolute;
    right: 10px;
    top: 200px;
  }

  .el-message {
    left: 35% !important;
    top: 50% !important;
    -webkit-transform: rotate(90deg) !important;
  }

  .el-input-number {
    -webkit-transform: rotate(90deg) !important;
  }

  .el-select-dropdown {
    -webkit-transform: rotate(90deg);
  }

  .el-zoom-in-top-leave-active {
    opacity: 0 !important;
  }

  .el-zoom-in-top-enter-active {
    opacity: 0 !important;
  }

  .el-zoom-in-center-leave-active {
    opacity: 0 !important;
  }

  .el-zoom-in-center-enter-active {
    opacity: 0 !important;
  }

  .el-loading-mask.is-fullscreen {
    -webkit-transform: rotate(90deg);
  }

  /*取消长按复制功能*/
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*input {*/
    /*-webkit-user-select: auto;*/
  /*}*/
  /*DuChangjiang 2017-8-3*/
  .el-submenu__icon-arrow {
    visibility: hidden;
  }
  .el-input .el-input__inner{
    background-color:rgba(72,87,106,0);
    color: white;
    border: 0.2px solid rgba(191,225,236,0.8);
  }
  .el-menu-item, .el-submenu__title{
    position: relative;
    height: 40px;
    line-height: 45px;
    font-size: 15px;
    color: #73cc44;
    background-color: rgba(72,87,106,0);
    padding: 0px;
  }
  .el-menu--dark .el-menu-item:hover,.el-menu--dark .el-submenu__title:hover{
    background-color:rgba(30%,35%,35%,0);
  }
  .el-menu--dark .el-menu-item{
    background-color:rgba(0,0,0,0);
  }
  .el-submenu .el-menu-item{
    min-width: 0px;
  }
  .cesium-viewer-bottom {
    display:none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-right: 5px;
  }
  .el-card__header{
    padding: 6px 8px;
    border-bottom: 1px solid #d1dfff;
    box-sizing: border-box;
  }
  .el-card__body{
    padding: 6px 8px;
  }
  .el-carousel{
    position:absolute;
    bottom:0px;
    width: 100%;
    height: 80%;
  }
  .el-carousel__container {
    position:absolute;
    width: 100%;
  }
  .el-carousel__indicator {
    display: inline-block;
    background-color: transparent;
    padding: 1px 2px;
    cursor: pointer;
  }
  .el-carousel__indicators--outside {
    position: absolute;
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    bottom: 0%;
    height: 15%;
    width: 100%;
    left: 0%;
  }
</style>
