<!-- <template>
  <div style="width: 95%;height: 50px;position: fixed;z-index: 1020;margin:10px;background-color: white">
    <div style="position: absolute;left: 10px;width: 10%;top:15px;z-index:1020;" @click="fanhui()" >
        <i class="el-icon-arrow-left" style="position: absolute;top: 35%"></i>
      </div>
    <div id="search" style="position:absolute;background-color: white;margin:5px;left:10%;width: 85%;z-index:1020;">
      <el-input
        placeholder="查找地址"
        prefix-icon="el-icon-search"
        v-model="input1"
        onfocus="this.select()">
      </el-input>
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
        sites:this.$store.state.historyStart,
        input1:'合肥南站',
      }
    },
    router: router,
    methods: {
        
    },
    mounted() {

      // this.start1 = this.$store.state.startPosition;
      // this.end1 = this.$store.state.endPosition;
      
    },
    components: {

    },
    watch: {  
      input1:{
        handler:function(val,oldval){
          let that = this;
          that.$store.commit(mutationTypes.DEL_STARTSITES);
          var query = val;
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query + 
          '&region=合肥市&city_limit=true&output=json&ak=YWdGplhYjUGQ3GtpKNeuTM2S' 
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
              }
          })
        }
      },
    }

  }
</script>


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


</style>
 -->
<template>
  <div style="width: 100%;height: 100%;background-color: #f4f4f4;z-index:1010;position: fixed;">
    <div style="position: absolute;left: 10px;width: 10%;top:15px" @click="fanhui()">
        <i class="el-icon-arrow-left" style="position: absolute;top: 35%"></i>
      </div>
    <div id="search" style="position:absolute;background-color: white;margin:5px;left:10%;width: 85%">
      <el-input
        placeholder="查找地址"
        prefix-icon="el-icon-search"
        v-model="input1"
        onfocus="this.select()">
      </el-input>
    </div>
    <div style="position:absolute;width: 100%;top:50px;background-color:white">
      <div v-for="item in sites" style="overflow: scroll;">
              <div style="width: 100%;height: 50px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px;background-color:white" >
                <i class="el-icon-location-outline" style="width: 10%;height: 100%"></i>
                <div style="width: 80%;height: 100%;text-align: center; ">
                  <span>{{ item.name }}</span>
                </div>
              </div>
              <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
       </div>
    </div>
    <div style="width: 100%;height: 100%;position: fixed;z-index: 1020;">
      <div style="background-color: #ccc;opacity:0.5;width: 100%;height: 100%;"></div>
      <div style="position:absolute;width: 100%;bottom:0px;background-color: white;opacity:1;">
        <div style="width: 100%;height: 30px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
          <div style="height: 100%; margin-left: 10px;position: absolute;left: 45%" >
                  <span style="color: blue">收藏</span>
                  </div>
        </div>
        <div style="width: 100%;height: 1px;background-color: #f4f4f4"></div>
        <div style="width: 100%;height: 30px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
          <div style="height: 100%; margin-left: 10px;position: absolute;left: 45%" >
                  <span style="color: red">删除</span>
                  </div>
        </div>
        <div style="width: 100%;height: 3px;background-color: #f4f4f4"></div>
        <div style="width: 100%;height: 30px;display: flex;margin-top: 20px;margin-left: 5px;margin-right: 10px">
          <div style="height: 100%; margin-left: 10px;position: absolute;left: 45%" >
                  <span >取消</span>
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
        sites:this.$store.state.historyStart,
        input1:'',
      }
    },
    router: router,
    methods: {
        
    },
    mounted() {

      // this.start1 = this.$store.state.startPosition;
      // this.end1 = this.$store.state.endPosition;
      
    },
    components: {

    },
    watch: {  
      input1:{
        handler:function(val,oldval){
          let that = this;
          that.$store.commit(mutationTypes.DEL_STARTSITES);
          var query = val;
          var url = 'http://api.map.baidu.com/place/v2/suggestion?query='+ query + 
          '&region=合肥市&city_limit=true&output=json&ak=YWdGplhYjUGQ3GtpKNeuTM2S' 
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
              }
          })
        }
      },
    }

  }
</script>


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


</style>
