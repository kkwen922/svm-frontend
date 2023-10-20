import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import VCharts from 'v-charts'

import {LMap, LTileLayer, LMarker, LPopup, LIcon} from "vue2-leaflet";
import watermark from 'watermark-dom'
import "leaflet/dist/leaflet.css";
import i18n from './i18n/i18n'
import Viser from 'viser-vue';
import ZkTable from 'vue-table-with-tree-grid'


Vue.use(ElementUI, {locale})
Vue.use(VCharts)
Vue.use(Viser)
Vue.use(ZkTable)



// 啟用載入的各組件
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);

// 設定預設 icon
import {Icon} from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
