<template>
  <div id="app">
    小米商城
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from 'vue-cookie'
import axios from 'axios'
// import { userStore} from 'vuex'
export default {
  name:'app',
  components:{

  },
  data(){
    return{
    }
  },
  setup(){
    //const store = userStore()
  },
  mounted(){
    if(cookie.get('userId')){
      // this.getUser();
      // this.getCartCount();
    }
  },
  methods:{
    getUser(){
      axios.get('/user').then((res={})=>{
        this.store.commit('saveUserName',res.username)
      })
    },
    getCartCount(){
      axios.get('/carts/products/sum').then((res=0)=>{
        this.store.commit('saveCartCount',res)
      })
    }
  }
  
}
</script>
<style lang="scss">
    @import './assets/scss/reset.scss';
    @import './assets/scss/config.scss';
    @import './assets/scss/button.scss';
</style>
