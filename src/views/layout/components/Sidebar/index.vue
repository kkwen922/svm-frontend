<template>

  <el-scrollbar style="background-color:#232f3e">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#232f3e"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
      :collapse-transition="true"
      mode="vertical"

    >


      <div v-if="isLogo">
        <div class="kk_logo" v-if="isCollapse">
          <img style="height: 30px; width: 30px;;" src="../../../../assets/images/familymark.jpg">
        </div>
        <div class="kk_logo" style="margin-top: 30px" v-else="!isCollapse">
          <img style="height: 30px; width: 30px;;" src="../../../../assets/images/familymark.jpg">
          <br><br>
          <label style="font-size: 20px;font-weight: bold; vertical-align: middle">{{$t('message.apname')}}</label>
          <br><br>
        </div>
      </div>

<!--      <div class="kk_logo" v-if="isCollapse">-->
<!--        <img style="height: 30px; width: 30px;;" src="../../../../assets/images/familymark.jpg">-->
<!--      </div>-->
<!--      <div class="kk_logo" style="margin-top: 30px" v-else="!isCollapse">-->
<!--        <label style="font-size: 20px;font-weight: bold; vertical-align: middle">{{$t('message.apname')}}</label>-->
<!--      </div>-->


      <!--      <div class="kk_logo" v-if="isCollapse">-->
      <!--        <img style="height: 30px; width: 30px;;" src="../../../../assets/images/logo.svg">-->
      <!--      </div>-->
      <!--      <div class="kk_logo" style="margin-top: 30px" v-else>-->
      <!--        <label style="font-size: 20px;font-weight: bold; vertical-align: middle">後台系統</label>-->
      <!--      </div>-->

      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarItem from './SidebarItem'

export default {

  components: {SidebarItem},
  created() {
    return {
      showLogo: '',
    }
  },
  data(){
    return{

    }

  },
  computed: {
    ...mapGetters([
      'sidebar', 'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
    isCollapse() {
      console.info("this.sidebar.opened=>" + !this.sidebar.opened)
      console.info("showLogo=>" + localStorage.getItem('showLogo'))
      this.showLogo = localStorage.getItem('showLogo')

      return !this.sidebar.opened
    },
    isLogo() {
      console.info("this.showLogo=>" + this.showLogo)
      if(this.showLogo === 'true'){
        return true
      }else{
        return false
      }
    }

  },
  methods: {

    getLogoFlag(){
      return this.isLogo;
    }
  }
}
</script>


<style>
.kk_logo {
  color: white;
  font-size: small;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
