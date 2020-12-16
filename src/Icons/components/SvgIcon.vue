<template>
  <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="name"></use>
  </svg>
</template>
<script>
import { onMounted,reactive,ref,computed} from '@vue/composition-api'
export default {
    // props:['iconName'],
    props:{
        iconName:{
            type:String,
            default:'',
            required:true,
        }
    },
    iconClass:{
         iconName:{
            type:String,
            default:'',
        }
    },
    setup(props,{root,refs}){
        const svgClass=computed(()=>{
            if(props.iconClass){
                return `svg-icon ${props.iconClass}`
            }else{
                return `svg-icon`
            }
        })
        const name =computed(()=>`#icon-${props.iconName}`)
        return{
            svgClass,
            name
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    fill:currentColor;
    color: #fff;
    margin-right: 10px;
}
</style>