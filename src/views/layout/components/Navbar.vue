<template>
  <el-menu class="navbar" mode="horizontal" style="background-color: #e5e1d8">

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb></breadcrumb>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">

        <i class="el-icon-caret-bottom"></i>
        <img style="height: 15px; width: 15px" class="user-avatar" src="../../../assets/images/ums-admin.svg" alt="">
        <a>{{getaccount()}}</a>

      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/pms/pwd">
          <el-dropdown-item>
            {{ $t('route.pwd') }}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">
            {{ $t('message.logout') }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  date:{

    return(){
      // message: "Hello World";
    }
  },
  mounted() {
    console.info("xx localStorage-->"+localStorage.getItem("username"));

    // console.info("this.loginForm.username==>"+localStorage.getItem("username"));
    // console.info("getCookie(\"usernaem\")====>"+getCookie("usernaem"));
    // console.info("this.account====>"+this.account);
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {

  },
  methods: {
    getaccount: function(){
      return localStorage.getItem("username");
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    resetPassword() {
      this.$store.dispatch('Reset Password').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

