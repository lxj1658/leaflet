import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main';
import Loading from '@/components/loading/Loading';
// import MapView from '@/components/mapView/MapView';
import GetRoute from '@/components/getRoute/GetRoute';
import RouterList from '@/components/getRoute/RouterList';
import GetRouterButton from '@/components/Button/GetRouterButton';
import ChosePosition from '@/components/Chose/ChosePosition';
import Navigation from '@/components/Chose/Navigation';
import Search from '@/components/Chose/Search';
Vue.use(Router);

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading,
      meta: { scrollToTop: true }
    },
    {
      path: '/main',
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
          meta: { scrollToTop: true }
        },
        {
          path:'/main/RouterList',
          name:'RouterList',
          component:RouterList,
        },
        {
          path:'/main/ChosePosition',
          name:'ChosePosition',
          component:ChosePosition,
        },
        {
          path:'/main/Navigation',
          name:'Navigation',
          component:Navigation,
        },
        {
          path:'/main/Search',
          name:'Search',
          component:Search,
        }
      ]
    },  
  ],
  scrollBehavior(to,from,savedPosition) {
    return {
      x:0,
      y:0
    }
  }
});

export default router;
