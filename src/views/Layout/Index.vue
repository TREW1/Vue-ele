<template>
  <div :class="[isCollapse ? 'close' : 'open']">
      <LayoutHeader/>
      <LayoutNav/>
      <LayoutMain/>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api';
    import LayoutHeader from './Components/Head'
    import LayoutMain from './Components/Main'
    import LayoutNav from './Components/Nav'
    export default {
      name: "Home",
      setup(props,{refs,root}){
        const isCollapse = computed(()=>root.$store.getters['app/isCollapse'])
        return {
          isCollapse
        }
      },
      components:{LayoutHeader,LayoutMain,LayoutNav}
      
    };
</script>
<style lang="scss" scoped>

</style>