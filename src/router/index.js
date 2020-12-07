import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/Login'
  },
  {
    path: "/home",
    name: "Home",
    component: () =>import("../views/Home/Index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>import("../views/Login/Index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫 只有登录了才可以跳转
router.beforeEach((to,from,next)=>{
  // console.log(to)  //从哪里来的
  // console.log(from) //到哪里去
  // console.log(next)
  const isLogin = localStorage.getItem('ele_Login') ? true:false
  if(to.path ==='/Login'){
    next()

  }else{
    //是否登录 没有登录重定向到登录页面,如果登录了就正常next
    isLogin ? next() : next('/Login')
  }
})

export default router;