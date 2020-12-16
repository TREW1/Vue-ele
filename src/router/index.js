import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/Login',
    hidden:true,
    mate:{
      name:''
    },
  },
  {
    path: "/home",
    name: "Home",
    hidden:false,
    mate:{
      name:'控制台',
      icon:'console'
    },
    component: () =>import("../views/Layout/Index.vue"),
    redirect:'/Index',
    children:[
      {
        path:'/index',
        name:'HomeIndex',
        mate:{name:'首页'},
        component: () =>import("../views/Home/Index.vue"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    hidden:false,
    mate:{
      name:'信息管理',
      icon:'info'
    },
    component: () =>import("../views/Layout/Index.vue"),
    redirect:'/Index',
    children:[
      {
        path:'/infoindex',
        name:'InfoIndex',
        mate:{name:'信息列表'},
        component: () =>import("../views/Info/Index.vue"),
      },
      {
        path:'/InfoCate',
        name:'InfoCate',
        mate:{name:'信息分类'},
        component: () =>import("../views/Info/Cate.vue"),
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hidden:false,
    mate:{
      name:'用户管理',
      icon:'user'
    },
    component: () =>import("../views/Layout/Index.vue"),
    redirect:'/Index',
    children:[
      {
        path:'/userindex',
        name:'UserIndex',
        mate:{name:'用户管理'},
        component: () =>import("../views/User/Index.vue"),
      },
      {
        path:'/UserCate',
        name:'UserCate',
        mate:{name:'用户分类'},
        component: () =>import("../views/User/Cate.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    mate:{
      name:'登录'
    },
    component: () =>import("../views/Login/Index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;