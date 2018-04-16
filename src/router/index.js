import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main';
import home from '@/components/homeView/home';
import Loading from '@/components/loading/Loading';
import MapView from '@/components/mapView/MapView';

Vue.use(Router);

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading,
    },
    // {
    //   path: '/map',
    //   name: 'MapView',
    //   component: MapView,
    // },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      // children:[
      //   {
      //     path:'/main/home',
      //     name:'home',
      //     component:home,
      //   }
      //   ]
    }
  ]
});

export default router;
