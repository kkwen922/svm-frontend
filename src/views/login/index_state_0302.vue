<template>
  <div class="login-container">

    <div class="login-weaper animated bounceInDown">
      <div class="login-left">

        <img :src="login_logo" alt="" class="img">
        <h2>智能販賣機後台</h2>

      </div>

      <div class="login-border">
        <div class="login-main">


          <el-form autoComplete="on"
                   :model="loginForm"
                   :rules="loginRules"
                   ref="loginForm"
                   label-position="left">

            <div class="login-title">{{ $t('message.welcome') }}</div>

            <!--使用者帳號------------------------------------------------------------------------------>

            <el-form-item prop="username">

              <el-input name="username"
                        type="email"
                        v-model="loginForm.username"
                        autoComplete="on"
                        tabindex="1"
                        :placeholder="$t('placeholder.username')">
                <span slot="prefix">
                  <svg-icon icon-class="user" class="color-main"></svg-icon>
                </span>
              </el-input>

            </el-form-item>

            <!--使用者帳號-------------------------------------------------------------------------End-->

            <!--使用者密碼------------------------------------------------------------------------------>

            <el-form-item prop="password">
              <el-input
                        name="password"
                        :type="pwdType"
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.password"
                        autoComplete="on"
                        :placeholder="$t('placeholder.password')">
                  <span slot="prefix">
                    <svg-icon icon-class="password" class="color-main"></svg-icon>
                  </span>

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


            <!--使用者密碼-------------------------------------------------------------------------End-->

<!--            <el-form-item prop="captcha">-->
<!--              <el-input style="font-size:16px;"-->
<!--                        name="captcha"-->
<!--                        :type="text"-->
<!--                        @keyup.enter.native="handleLogin"-->
<!--                        v-model="loginForm.captcha"-->
<!--                        autoComplete="on"-->
<!--                        :placeholder="$t('placeholder.captcha')">-->

<!--                  <span slot="prefix">-->
<!--                    <svg-icon icon-class="ums" class="color-main"></svg-icon>-->
<!--                  </span>-->

<!--              </el-input>-->
<!--            </el-form-item>-->


            <br>
            <el-form-item style="margin-bottom: 60px;text-align: center">
              <el-button style="width: 100%"
                         type="primary"
                         size="default"
                         :loading="loading"
                         @click.native.prevent="handleLogin">
                {{ $t('message.login') }}
              </el-button>
            </el-form-item>

          </el-form>


        </div>


      </div>
    </div>


  </div>
</template>


<script>

import {isValidUsername} from '@/utils/validate';
import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
import login_center_bg from '@/assets/images/login.png';
import login_logo from '@/assets/images/logo.svg';


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
        captcha: '',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      dialogVisible: false,
      login_center_bg,
      login_logo,
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


<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url("../../assets/images/login.png") no-repeat;
  background-color: #0e6cff;
  position: relative;
  background-size: cover;
  height: 100vh;
  background-position: 50%;
}

#particles-js {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
}

.login-weaper {
  margin: 0 auto;
  width: 1000px;
  -webkit-box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
  box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.login-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: rgba(64, 158, 255, 0);
  color: #fff;
  float: left;
  width: 50%;
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  .login-time {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 100%;
    color: #fff;
    opacity: 0.9;
    font-size: 18px;
    overflow: hidden;
    font-weight: 500;
  }
}

.login-left .img {
  width: 90px;
  height: 90px;
  border-radius: 3px;
}

.login-left .title {
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: 600;
}

.login-border {
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.9);
  width: 50%;
  float: left;
}

.login-main {
  margin: 0 auto;
  width: 65%;
}

.login-title {
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  ::v-deep .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: #333;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    color: #454545;
  }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
    .login-weaper {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      box-shadow: none;
    }
    .login-main {
      width: 80%;
    }
    .login-left {
      display: none !important;
    }
    .login-border {
      width: 100%;
    }
  }
}

</style>
