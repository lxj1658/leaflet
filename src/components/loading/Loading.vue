<template>
</template>
<script>
	import router from '../../router'
  	import GPS from '../../assets/JS/GPS.js'
  	import state from '../../store/state'
  	import * as mutationTypes from '../../store/mutations-types'
	export default {
		data() {
			return{}
		},
		router:router,
		methods:{},
		mounted(){
			var that = this;
	     	var geolocation = new BMap.Geolocation();
	      	geolocation.getCurrentPosition(function(r){
	        if(this.getStatus() === BMAP_STATUS_SUCCESS){
		          var mk = new BMap.Marker(r.point);
		          console.log(r.point);
		          var lat = r.point.lat;
		          var lng = r.point.lng;
		          var a = GPS.bd_decrypt(lat,lng);
		          var location = [];
		          location.push(a.lat);
		          location.push(a.lon)
		          that.$store.commit(mutationTypes.SET_LOCATION,location);
		          that.$router.replace('/main');
	        }else {
	          console.log(this.getStatus())
	        }
	      	},{enableHighAccutacy:true})
			
		},
	}
</script>
<style></style>