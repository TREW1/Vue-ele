<template>
  <div id="nav-warp">
    <!-- logo -->
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt="" />
    </h1>
    <!-- 菜单列表 -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router=""
    >
    <template v-for='(item,index) in routes'>
      <el-submenu :index="index+''" v-if="!item.hidden" :key='index'>
        <!-- 一级路由 -->
        <template slot="title">
         <svg-icon :iconName='item.mate.icon' :iconClass='item.mate.icon'/>
          <span slot="title">{{item.mate.name}}</span>
        </template>
        <!-- 二级路由 -->
         <el-menu-item :index="itemChild.path" v-for="(itemChild,_index) in item.children" :key="_index">{{itemChild.mate.name}}</el-menu-item>
      </el-submenu>
    </template>
    </el-menu>
    <!-- 菜单结束 -->
  </div>
</template>
<script>
import {ref,reactive, computed} from '@vue/composition-api'
import SvgIcon from '../../../Icons/components/SvgIcon.vue';
export default {
  components: { SvgIcon },
    name:"Main",
    setup(porps,{root,refs}){
      //读取vuex中的state
        const isCollapse =  computed(()=>{
          return root.$store.getters['app/isCollapse']
        })
        //获取路由信息
       const routes =reactive(root.$router.options.routes)
        return {
            isCollapse,
            routes,
        }
    }
};3
</script>
<style lang="scss" scoped>
#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $NavWidth;
  background-color: #344a5f;
  @include webkit('transition',all .3s ease 0s);
  .logo {
    text-align: center;

    img {
      margin: 30px auto 30px;
      width: 70px;
    }
  }
}
.open{
  #nav-warp{
    width: $NavWidth ;
  }
}
.close{
  #nav-warp{
    width: 64px;
    .logo img{
      width: 50%;
    }
  }
}
</style>