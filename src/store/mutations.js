import * as mutationTypes  from './mutations-types'

export default {
  	[mutationTypes.SET_LOCATION](state, location){
  	state.location = [].concat(location);
  	},

  	//存储道路信息_步行
  	[mutationTypes.SET_WALKING_ROUTES](state, route){
    state.walking_routes.push(route);
  	},

    //清空道路信息_步行
    [mutationTypes.DEL_WALKING_ROUTES](state){
    state.walking_routes = [];
    },

  	//存储道路信息_驾车
  	[mutationTypes.SET_DRIVING_ROUTES](state, route){
    state.driving_routes.push(route);
  	},

    //清空道路信息_驾车
    [mutationTypes.DEL_DRIVING_ROUTES](state){
    state.driving_routes = [];
    },

  	//存储道路信息_骑行
  	[mutationTypes.SET_RIDING_ROUTES](state, route){
    state.riding_routes.push(route);
  	},

    //清空道路信息_骑行
    [mutationTypes.DEL_RIDING_ROUTES](state){
    state.riding_routes = [];
    },

  	//存储道路信息_公交
  	[mutationTypes.SET_TRANSIT_ROUTES](state, route){
    state.transit_routes.push(route);
  	},

    //清空道路信息_公交
    [mutationTypes.DEL_TRANSIT_ROUTES](state){
    state.transit_routes = [];
    },

  	//存储经纬度信息_步行
  	[mutationTypes.SET_WALKING_ROUTESLATLNG](state, latlng){
  		state.walking_routesLatLng.push(latlng);
  	},

    //清空经纬度信息_步行
    [mutationTypes.DEL_WALKING_ROUTESLATLNG](state){
      state.walking_routesLatLng = [];
    },

  	//存储经纬度信息_驾车
  	[mutationTypes.SET_DRIVING_ROUTESLATLNG](state, latlng){
  		state.driving_routesLatLng.push(latlng);
  	},

    //清空经纬度信息_驾车
    [mutationTypes.DEL_DRIVING_ROUTESLATLNG](state){
      state.driving_routesLatLng = [];
    },

  	//存储经纬度信息_骑行
  	[mutationTypes.SET_RIDING_ROUTESLATLNG](state, latlng){
  		state.riding_routesLatLng.push(latlng);
  	},

    //清空经纬度信息_骑行
    [mutationTypes.DEL_RIDING_ROUTESLATLNG](state){
      state.riding_routesLatLng = [];
    },

  	//存储经纬度信息_公交
  	[mutationTypes.SET_TRANSIT_ROUTESLATLNG](state, latlng){
  		state.transit_routesLatLng.push(latlng);
  	},

    //清空经纬度信息_公交
    [mutationTypes.DEL_TRANSIT_ROUTESLATLNG](state){
      state.transit_routesLatLng = [];
    },

  	[mutationTypes.SET_STARTPOSITION](state, startPosition){
  		state.startPosition = startPosition;
  	},

  	[mutationTypes.DEL_STARTPOSITION](state){
  		state.startPosition = '';
  	},

  	[mutationTypes.SET_ENDPOSITION](state, endPosition){
  		state.endPosition = endPosition;
  	},

  	[mutationTypes.DEL_ENDPOSITION](state){
  		state.endPosition = '';
  	},

  	[mutationTypes.SET_STARTSITES](state, site){
  	state.startSites.push(site);
  	},

  	[mutationTypes.DEL_STARTSITES](state){
  	state.startSites = [];
  	},

  	[mutationTypes.SET_ENDSITES](state, site){
  	state.endSites.push(site);
  	},

  	[mutationTypes.DEL_ENDSITES](state){
  	state.endSites = [];
  	}

}
