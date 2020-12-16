<template>
    <div id="main-wrap">
       <router-view />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    #main-wrap{
        position: fixed;
        left:$NavWidth;
        top:$LayoutHeader;
        right: 0;
        bottom: 0px;
        border:30px solid #f7f7f7;
        border-bottom: none;
        @include webkit('transition',all .3s ease 0s);
    }
    .open{
        #main-wrap{
             left: $NavWidth;
        }
    }
    .close{
        #main-wrap{
             left:64px;
        }
    }
</style>