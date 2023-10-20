<template>
 <div class="app-container">

    <div>
      <el-select v-model="$i18n.locale" value-key="value" @change="changeSelect">
        <el-option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang }}
        </el-option>
      </el-select>
    </div>

    <div>
      <h4>{{ $t('message.demo') }}</h4>
    </div>


  </div>

</template>

<script>

import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';

export default {
  data() {
    return {
      langs: ['tw', 'en'],

    };
  },
  methods: {

      changeSelect(val) {
        setCookie("language", val);
        console.info("language===>" + getCookie("language"));
        localStorage.setItem('locale', val)
        this.$i18n.locale = val;
      }
    }

}
</script>

<style scoped>


</style>
