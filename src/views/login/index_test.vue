<template>
  <div class="login-container">

    <div class="login-weaper animated bounceInDown">
      <div class="login-left">

        <img :src="login_logo" alt="" class="img">
        <h2>智能販賣機後台</h2>

      </div>

      <div class="login-border">
        <div class="login-main">
          <el-form>

            <el-input>dasdasdasd</el-input>

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
