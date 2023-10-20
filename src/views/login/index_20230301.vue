<template>
  <div class="htmlBox">
    <el-card class="login_center">

      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <h1 class="login-title">{{ $t('message.welcome') }}</h1>
        <br><br>

        <!--使用者帳號------------------------------------------------------------------------------>
        <div className='login__field'>

          <Label class="field-label">{{ $t('message.username') }}</Label>


          <el-form-item prop="username">
            <el-input style="font-size:16px;"
                      name="username"
                      type="email"
                      v-model="loginForm.username"
                      autoComplete="on"
                      :placeholder="$t('placeholder.username')">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
        </div>
        <!--使用者帳號-------------------------------------------------------------------------End-->

        <!--使用者密碼------------------------------------------------------------------------------>

        <div className='login__field'>

          <Label class="field-label">{{ $t('message.password') }}</Label>

          <el-form-item prop="password">
            <el-input style="font-size:16px;"
                      name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      :placeholder="$t('placeholder.password')">

              <span slot="suffix" @click="showPwd">
                <div v-if="this.pwdType==='password'">
                    <svg-icon icon-class="eye-off" class="color-main"></svg-icon>
                </div>
                <div v-else>
                    <svg-icon icon-class="eye-on" class="color-main"></svg-icon>
                </div>
              </span>
            </el-input>
          </el-form-item>


        </div>
        <!--使用者密碼-------------------------------------------------------------------------End-->


        <br>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 100%"
                     type="primary" plain
                     size="default"
                     :loading="loading"
                     @click.native.prevent="handleLogin">
            {{ $t('message.login') }}
          </el-button>
        </el-form-item>

      </el-form>


    </el-card>

    <img :src="login_center_bg" class="login-center-layout">

  </div>
</template>


<script>

import {isValidUsername} from '@/utils/validate';
import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
import login_center_bg from '@/assets/images/bgn.png';


export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('請輸入正確帳號'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 8 && value.length > 14) {
        callback(new Error('密碼長度介於8~13'))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      dialogVisible: false,
      login_center_bg,
      supportDialogVisible: false
    }
  },

  created() {
    // this.loginForm.username = getCookie("username");
    // this.loginForm.password = getCookie("password");
    if (this.loginForm.username === undefined || this.loginForm.username == null || this.loginForm.username === '') {
      this.loginForm.username = '';
    }
    if (this.loginForm.password === undefined || this.loginForm.password == null) {
      this.loginForm.password = '';
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            setCookie("username", this.loginForm.username, 15);
            setCookie("password", this.loginForm.password, 15);

            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('參數驗證失敗！');
          return false
        }
      })
    },

    handleTry() {
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    }
  }
}


</script>

<style scoped>

.back-img {
  background-size: auto;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 80%;

  margin: 10% auto;;
  vertical-align: center;
  border-top: 10px solid #fcfeff;
}

.login-title {
  text-align: center;
  color: black;
}

.login-center-layout {
  /*background: #144a87;*/
  background-size: auto;
  background-size: cover;
  width: 100%;
  height: 100%;
  /*width: auto;*/
  /*height: auto;*/
  /*max-width: 100%;*/
  /*max-height: 100%;*/
  /*margin-top: 200px;*/
  /*background-color: #5d9df0;*/
}

/*最底層設定7*/
.htmlBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;

  /*background-image: linear-gradient(-180deg, #C3CBD6 20%, #52B788 80%);*/
}

.login_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 91%;
  max-width: 580px;
  padding: 40px;


  /*box-sizing: border-box;*/
  /*border: 1px solid transparent;*/
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  /*background: #b3e19d;*/
  /*background: rgba(103, 134, 35, 0.8);*/
  /*background: rgba(0, 0, 0, .8);*/

}

.login {
  position: relative;
  width: 100%;
  height: 100%;
  /*font-family:  PingFangSC-Semibold;*/
  font-family: sans-serif;
  /*background: url(bg.jpg) no-repeat center 0px;*/
  /*background-attachment: scroll;*/
  /*background-size: auto;*/
  /*background-size: cover;*/
  /*background-attachment: fixed;*/
  top: 0;
  left: 0;
}

.login__center .login__field {
  position: relative;
}

.field-label {
  font-size: 18px;
  /*color: darkgreen;*/
}

.kk-main {
  background: hsla(0, 0%, 100%, .4);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3rem;
  box-shadow: 0 0 8px -5px #000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: Poppins, sans-serif;
}


</style>
