import router from './index'
import {getToken} from '../utils/cookie'
import {removeUsername,removeToken} from '../utils/cookie'
import store from '../store'
// 白名单 未登录状态下可以访问的路由
const writeRouter = ['/login','/home','/datail']
//路由相关逻辑
router.beforeEach((to,from,next)=>{
    //判断登录的唯一标识就是token是否存在
    if(getToken()){
        //存在 登录了
        if(to.path=='/login'){//如果访问的是login的话就是要重新登录
            removeUsername()
            removeToken()
            //清理Vuex中的数据
            store.commit('app/SET_USERNAME','')
            store.commit('app/SET_TOKEN','')
        }
        next()
    }else{
        if(writeRouter.indexOf(to.path)!==-1){//如果访问的是登录 应该执行next()
            next()
        }else{//不存在 未登录 跳转到登录执行登录
            next('/login')
        }

    }
})