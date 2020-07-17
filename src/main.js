// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import('./style.css');
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store/index";
import axios from '@/utils/axios';
import { getToken } from '@/utils/auth'

require('./utils/mock');//模拟接口文件
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;//this.$axios
Vue.prototype.$baseURL = "http://192.168.31.149:8000";// this.$baseURL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (getToken('Token')) { //如果有就直接到首页咯
    next();
  } else {
    if (to.path == '/login') { //如果是登录页面路径，就直接next()
      next();
    } else { //不然就跳转到登录；
      next('/login');
    }

  }
}
)