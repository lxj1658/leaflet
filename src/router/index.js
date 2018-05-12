import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main';
import Loading from '@/components/loading/Loading';
// import MapView from '@/components/mapView/MapView';
import GetRoute from '@/components/getRoute/GetRoute';
import RouterList from '@/components/getRoute/RouterList';
import GetRouterButton from '@/components/Button/GetRouterButton';
Vue.use(Router);

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path:'/main/getRoute',
          name:'GetRoute',
          component:GetRoute,
        },
        {
          path:'/main/getRouterButton',
          name:'GetRouterButton',
          component:GetRouterButton,
        },
        {
          path:'/main/RouterList',
          name:'RouterList',
          component:RouterList,
        }
      ]
    },
    
  ]
});

export default router;
