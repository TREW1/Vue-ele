<template>
    <div id="header-warp">
        <div class="pull-left header-icon" @click="toggleMenu">
            <svg-icon iconName="menu" />
        </div>
        <div class="pull-right">
            <div class="pull-left userinfo">
                <img src="../../../assets/user.png" alt="">
            </div>
            <div class="pull-right header-icon" @click="exit"> 
                <svg-icon iconName="exit" />
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../../Icons/components/SvgIcon.vue'
export default {
  components: { SvgIcon },
  name:'Heder',
  setup(props,{root}){
      //触发vuex mutations
      const toggleMenu =(() =>{
          root.$store.commit('app/SET_COLLAPSE',)
      })
      const exit =(()=>{
          root.$store.dispatch('app/exit').then(res=>{
             root.$router.push({
                 name:'Login'
             })
          })
      })
      return {
          toggleMenu,
          exit
      }
  }
    
}
</script>
<style lang="scss" scoped>
    #header-warp{
        position: fixed;
        top: 0;
        left: $NavWidth;
        right: 0;
        height: $LayoutHeader;
        background-color:#fff;
        .header-icon{
            padding: 20px 20px;
            svg{
                font-size: 25px;
            }
           
        }
    } 
    .userinfo{
                height: $LayoutHeader;
                padding: 15px 22px;
                border-right: 1px solid #ccc;
                img{
                    display:inline-block;
                    width: 35px;
                    height: 35px;
                    margin-bottom: -12px;
                    margin-right: 20px;
                    border-radius: 50%;
                }
            }
    .open{
        #header-warp{
             left: $NavWidth;
        }
    }
    .close{
        #header-warp{
             left:64px;
        }
    }
</style>