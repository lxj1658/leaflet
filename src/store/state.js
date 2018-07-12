export default {
	location:[],
	walking_routes:[],//道路信息_步行
	driving_routes:[],//道路信息_驾车
	riding_routes:[],//道路信息_骑行
	transit_routes:[],//道路信息_公交

	walking_routesLatLng:[],//路线经纬度_步行
	driving_routesLatLng:[],//路线经纬度_驾车
	riding_routesLatLng:[],//路线经纬度_骑行
	transit_routesLatLng:[],//路线经纬度_公交

	startPosition:'',
	endPosition:'',
	historyStart:[{name:'合肥工业大学(屯溪路校区)'},{name:'合肥工业大学(翡翠湖校区)'},{name:'合肥南站'},{name:'安徽大学(磬苑校区)'},{name:'合肥汽车站'},{name:'安徽医科大学'},{name:'安徽医科大学第一附属医院'}],
	historyEnd:['安徽大学'],
	startSites:[],//按输入进行地名显示
	endSites:[],//按输入进行地名显示
	historySites:[{start:'合肥工业大学(屯溪路校区)',end:'合肥南站'},{start:'合肥工业大学(翡翠湖校区)-北门',end:'合肥工业大学(屯溪路校区)'},{start:'合肥工业大学(翡翠湖校区)-北门',end:'大润发(翡翠店)'},{start:'合肥工业大学(翡翠湖校区)-北门',end:'安徽大学(磬苑校区)'},],//搜索历史
	collections:[{name:'合肥工业大学(翡翠湖校区)-北门'},{name:'合肥工业大学(屯溪路校区)'},{name:'合肥南站'}],
}
