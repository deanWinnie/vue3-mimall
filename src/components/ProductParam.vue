<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name='buy'></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref,onUnmounted } from 'vue'
export default {
    name:'nav-bar',
    props:{
      title:String
    },
    setup(){
      let isFixed = ref(false)
      const initHeight = ()=>{
        let scrollTop=window.pageYOffset|| document.documentElement.scrollTop||document.body.scrollTop;
        isFixed.value=scrollTop>152?true:false;
      }
      onMounted(()=>{
        window.addEventListener('scroll',initHeight)
      })
      onUnmounted(()=>{
        window.removeEventListener('scroll',initHeight,false)
      })
      return {
        isFixed,
        initHeight
      }
    },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
    .nav-bar{
        height: 70px;
        line-height: 70px;
        border-top:1px solid #e5e5e5;
        background: #ffffff;
        z-index: 10;
        &.is_fixed{
            position: fixed;
            top: 0;
            width: 100%;
            box-shadow: 0 5px 5px #cccccc;
        }
         .container{
            @include flex();
            .pro-title{
                font-size: $fontH;
                color: $colorB;
                font-weight: bold;
            }
            .pro-param{
                font-size: $fontJ;
                a{
                    color: $colorC;
                }
                span{
                    margin: 0 10px;
                }
            }
        }
    }
</style>