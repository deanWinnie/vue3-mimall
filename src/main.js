import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import AntD,{message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'; 
import App from './App.vue'
import store from './store/index'
import cookie from 'vue-cookie'

axios.defaults.baseURL='/api'; //跨域方式为代理的时候用这种方法 不然则要写全域名
axios.defaults.timeout=8000;
// axios.defaults.baseURL=env.baseURL;
console.log(process.env.NODE_ENV)

//接口错误拦截
axios.interceptors.response.use(function(response){
    let res=response.data;
    let path=location.hash;
    if(res.status==0){
      return res.data;
    }else if(res.status==10){
      if(path !='#/index'){
        window.location.href='/#/login';
      }
      return Promise.reject();
    }else{
        message.warning(res.msg)
      return Promise.reject();
    }
  },(error)=>{
    let res=error.response;
    message.error(res.data.message);
    return Promise.reject(error);
  });
const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$cookie = cookie;

app.use(router).use(store).use(AntD).mount('#app')
