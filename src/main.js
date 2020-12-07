import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

Vue.use(ElementUI);
// console.log(process.evn.NODE_ENV)

//导入css入口文件
import  "./styles/main.scss" 

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");