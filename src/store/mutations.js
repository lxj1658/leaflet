import * as mutationTypes  from './mutations-types'

export default {
	[mutationTypes.SET_ROUTES](state, route){
    state.routes.push(route);
  	},

}
