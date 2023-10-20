<template>
  <div class="app-container">
    <div>
      {{ $t('message.demo') }}
      <el-select v-model="value" value-key="value" @change="changeSelect">
        <el-option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang }}
        </el-option>
      </el-select>
    </div>


    <div>

      {{ $t('message.isShowLogo') }}
      <el-select v-model="xvalue" value-key="value" @change="showLogo">
        <el-option v-for="(show, i) in shows" :key="`Show${i}`" :value="show">
          {{ show }}
        </el-option>
      </el-select>
<!--      <el-select v-model="xvalue" @change="showLogo">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.xvalue"-->
<!--          :label="item.label"-->
<!--          :value="item.xvalue">-->
<!--        </el-option>-->
<!--      </el-select>-->
    </div>


  </div>

</template>

<script>

import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';


export default {

  created() {
    console.info("this.$i18n.locale:"+this.$i18n.locale)
    console.info("localStorage.getItem('language'):"+localStorage.getItem('language'))
    this.xvalue = localStorage.getItem('showLogo')
    this.value =  localStorage.getItem('language')
    // this.value = this.$i18n.locale
  },
  mounted() {
    this.value =  localStorage.getItem('language')
    // this.value = this.$i18n.locale
  },
  data() {
    return {
      langs: ['tw', 'en'],
      shows: ['true','false'],
      //  options: [{
      //   xvalue: true,
      //   label: 'true'
      // }, {
      //   xvalue: false,
      //   label: 'false'
      // }],
      xvalue: '',
      value: '',
    };
  },
  methods: {

    showLogo(val) {
      console.info("val:" + val)
      if (val === 'true') {
        localStorage.setItem('showLogo', true)
      } else {
        localStorage.setItem('showLogo', false)
      }
      // this.reload()
      this.$router.go(0)


    },
    changeSelect(val) {
      setCookie("language", val);
      console.info("language===>" + getCookie("language"));
      localStorage.setItem('locale', val)
      this.$i18n.locale = val;
    },

  }

}
</script>

<style scoped>


</style>
