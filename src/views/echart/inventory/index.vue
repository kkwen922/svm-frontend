<template>

  <div class="app-container">

    <!--    <el-card class="operate-container" shadow="never">-->

    <!--      <el-select v-model="device.cityId"-->
    <!--                 @change="changeCity"-->
    <!--                 placeholder="請選擇縣市">-->
    <!--        <el-option-->
    <!--          v-for="item in selectCityList"-->
    <!--          :key="item.id"-->
    <!--          :label="item.name"-->
    <!--          :value="item.id">-->
    <!--        </el-option>-->
    <!--      </el-select>-->

    <!--      <el-select v-model="device.areaId"-->
    <!--                 placeholder="請選擇行政區">-->
    <!--        <el-option-->
    <!--          v-for="item in areaName"-->
    <!--          :key="item.id"-->
    <!--          :label="item.name"-->
    <!--          :value="item.id">-->
    <!--        </el-option>-->
    <!--      </el-select>-->

    <!--    </el-card>-->
    <!--    <br>-->
    <div>
      <!-- 初始化地圖設定 -->
      <l-map
        ref="myMap"
        :zoom="zoom"
        :center="center"
        :options="options"
        style="height: 100vh;">
        <!-- 載入圖資 -->
        <l-tile-layer :url="url" :attribution="attribution"/>

        <!-- 自己所在位置 -->
        <!-- 創建標記點 -->
        <l-marker :lat-lng="item.local" v-for="item in selectDeviceList" :key="item.id">
          <!-- 標記點樣式判斷 -->

          <!-- 彈出視窗 -->
          <l-popup>
            {{ item.name }}
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>

import {
  fetchList, createDevice, updateDevice,
  getDevice, fetchOrgList, fetchCityList,
  fetchDeviceCateList, fetchCityAreaList, fetchMapList
} from '@/api/device';

const defaultDevice = {
  title: '',
  deviceSn: '',
  address: '',
  cityId: null,
  status: 1
};

export default {
  name: "App",
  data() {
    return {
      // 模擬資料
      device: Object.assign({}, defaultDevice),
      selectDeviceList: [],
      selectCityList: [], //城市列表
      selectAreaList: [], //行政區列表
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      areaName: [],
      // data: [
      //   { id: 1, name: "北投活動中心#一號機",namec: "d一號機", local: [25.1255096,121.488043] },
      //   { id: 2, name: "士林活動中心#一號機", namec: "d一號機",local: [25.0893594,121.5193471] },
      //   { id: 3, name: "內湖活動中心#一號機", namec: "d一號機" ,local: [25.0772151,121.5735998] },
      //   { id: 4, name: "天母公園#一號機", namec: "d一號機",local: [25.1136872,121.5203246] }
      // ],
      maxZoom: 14,
      zoom: 12,
      center: [25.1028549, 121.5259909],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
          gold:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    };
  },
  created() {
    this.getSelectCityList();
    this.getSelectDeviceList();
  },

  methods: {

    getSelectDeviceList() {
      fetchMapList(this.listQuery).then(response => {
        this.selectDeviceList = response.data;
        console.log("xxx====>" + this.selectDeviceList);
      });

    },
    changeCity(val) {
      console.log("val====>" + val);
      if (val === null) {

      } else {
        console.log(val);
        //
      }
    },
    getSelectCityList() {
      fetchCityList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectCityList = response.data.list;
      });
    },
  },
  mounted() {
    // 等地圖創建後執行
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        //const p = position.coords;
        // 將中心點設為目前的位置
        // this.center = [24.22335080, 120.62536790];
        // 將目前的位置的標記點彈跳視窗打開
        this.$refs.location.mapObject.openPopup();
      });
    });

  }
};
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
</style>
