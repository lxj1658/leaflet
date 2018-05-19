import * as mutationTypes  from './mutations-types'

export default {
	[mutationTypes.SET_ROUTES](state, route){
    state.routes.push(route);
  	},

  	[mutationTypes.SET_LOCATION](state, location){
  	state.location = [].concat(location);
  	},

  	[mutationTypes.SET_ROUTESLATLNG](state, latlng){
  		state.routesLatLng.push(latlng);
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
