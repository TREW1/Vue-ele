import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入路由权限限制
import './router/permit.js'
import store from "./store/index.js";
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api'; 
import './Icons/Index';
Vue.use(VueCompositionApi);

Vue.use(ElementUI);
//导入css入口文件
import  "./styles/main.scss" 

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");