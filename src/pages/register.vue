<template>
<div class="register">
  <div class="container clearfix">
    <div class="wapper">
      <div class="logo">
        <a href="/#/index"></a>
      </div>
      <div class="register-form">
        <h3>注册账号</h3>
        <div class="input">
          <input type="text" placeholder="请输入帐号" v-model="username">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="input">
          <input type="email" placeholder="请输入邮箱" v-model="email">
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn" @click="register">注册</a>
        </div>
      </div>
    </div>
  </div>
  <nav-footer></nav-footer>
</div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import NavFooter from './../components/NavFooter'
export default {
  name: 'login',
  components: {
    NavFooter
  },
  setup(){
    const { proxy } = getCurrentInstance()
    let username = ref('')
    let password = ref('')
    let email = ref('')
    const register=()=> {
      let emailTest = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (username.value == '') {
        proxy.$message.error('账号不能为空');
        return;
      }
      if (password.value == '') {
        proxy.$message.error('密码不能为空');
        return;
      }
      if (email.value == '') {
        proxy.$message.error('邮箱不能为空');
        return;
      } else if (!emailTest.test(email.value)) {
        proxy.$message.error('邮箱格式错误');
        return;
      }
      proxy.$axios.post('/user/register', {
        username: username.value,
        password: password.value,
        email: email.value
      }).then(() => {
        proxy.$message.success('注册成功');
        proxy.$router.push('/login');
      })
    }
    return {
      username,
      password,
      email,
      register
    }
  },

}
</script>

<style lang="scss">
@import'./../assets/scss/base.scss';

.register {
  background-color: #f9f9f9;

  .wapper {
    width: 1060px;
    padding-top: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    text-align: center;

    .logo {
      display: inline-block;
      width: 55px;
      height: 55px;
      background-color: #FF6600;

      a {
        @include bgImg(55px, 55px, '/imgs/mi-logo.png', 55px);
      }
    }
  }

  .register-form {
    width: 330px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
    margin-bottom: 50px;

    h3 {
      line-height: 23px;
      font-size: 30px;
      text-align: center;
      margin: 40px auto 49px;
    }

    .input {
      display: inline-block;
      width: 100%;
      height: 50px;
      border: 1px solid #E5E5E5;
      margin-bottom: 20px;

      input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 18px;
      }
    }

  }

  .btn {
    width: 100%;
    line-height: 50px;
    margin-top: 20px;
    font-size: 16px;
  }

}
</style>
