// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCordova from 'vue-cordova';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
// import {Icon} from 'element-ui';

// Vue.use(Icon);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueCordova);
console.log(Vue.cordova);
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
