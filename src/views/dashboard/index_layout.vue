<template>
  <div class="app-container" style="margin-top: 0.2%; margin-left: 2%;margin-right: 2%;">
    <div>
      <label style="font-size: small">{{$t('form.layout')}}</label>
      <!-- 选择屏幕框 -->
      <select v-model="selected" @change="selectbj(selected)">
        <option v-for="option in layouts" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </div>


    <div>
      <el-main v-model="value">
        <div style="height:750px">
          <!-- {{selected}} -->
          <div style="height:100%;width:100%" v-if="selected==0">
            <!-- 1*1布局 -->
            <el-row :gutter="10" type="flex" class="grid-one-contentheight" justify="center">
              <el-col :span="24">

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

              </el-col>
            </el-row>
          </div>

          <!-- 2*2 -->
          <div style="height:100%;width:100%" v-else-if="selected==1">
            <el-row :gutter="5" type="flex" justify="center">
              <el-col :lg="6" :xs="24">
                <el-card class="box-card" style="background: #5e6ac0;">
                  <div slot="header" class="clearfix">
                    <span class="card-heading">{{ $t('dashboard.sales_amount') }}</span>
                    <span class="card-heading-text">$65,221</span>
                  </div>
                  <el-row>
                    <span class="card-body">沙鹿靜宜-男宿</span>
                    <span class="card-body-value">9,513</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">新福瑞店</span>
                    <span class="card-body-value">9,414</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">淡水校園</span>
                    <span class="card-body-value">9,226</span>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :lg="6" :xs="24">

                <el-card class="box-card" style="background: #66bb6a">
                  <div slot="header" class="clearfix">
                    <span class="card-heading">{{ $t('dashboard.sales_count') }}</span>
                    <span class="card-heading-text">15,522</span>
                  </div>
                  <el-row>
                    <span class="card-body">新福瑞店</span>
                    <span class="card-body-value">2,950</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">淡水校園</span>
                    <span class="card-body-value">2,785</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">沙鹿靜宜-男宿</span>
                    <span class="card-body-value">2,580</span>
                  </el-row>

                </el-card>

              </el-col>

              <el-col :lg="6" :xs="24">

                <el-card class="box-card" style="background: #fea724">
                  <div slot="header" class="clearfix">
                    <span class="card-heading">{{ $t('dashboard.shipment_failed') }}</span>
                    <span class="card-heading-text">56</span>
                  </div>
                  <el-row>
                    <span class="card-body">沙鹿靜宜-男宿</span>
                    <span class="card-body-value">15</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">大雅永勝</span>
                    <span class="card-body-value">12</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">湖口力成</span>
                    <span class="card-body-value">11</span>
                  </el-row>
                </el-card>


              </el-col>
              <el-col :lg="6" :xs="24">
                <el-card class="box-card" style="background: #9c65e4">
                  <div slot="header" class="clearfix">
                    <span class="card-heading">{{ $t('dashboard.out_of_stock') }}</span>
                    <span class="card-heading-text">365</span>
                  </div>
                  <el-row>
                    <span class="card-body">沙鹿靜宜-男宿</span>
                    <span class="card-body-value">143</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">大雅永勝</span>
                    <span class="card-body-value">128</span>
                  </el-row>
                  <el-row>
                    <span class="card-body">湖口力成</span>
                    <span class="card-body-value">56</span>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="10" type="flex" justify="center">

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


            </el-row>
          </div>


          <!-- 模式 -->
          <div style="height:100%;width:100%" v-else-if="selected==2">


          </div>

        </div>
      </el-main>
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

  },

  data() {
    return {
      selected: 0,

      layouts: [
        {'name': '1x1 mode', 'value': '0'},
        {'name': '1+4 mode', 'value': '1'},
        // {'name': '4x2 mode', 'value': '2'}
      ],


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
      },
    }
  }
}
</script>


<style scoped>
.app-container {
  margin-top: 1px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  /*background: #F2F6FC;*/
  background: darkseagreen;
  font-weight: bold;
  color: white;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  /*border: 1px solid #DCDFE6;*/
}

.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}

.address-content {
  padding: 20px;
  font-size: 18px
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.box-card {
  width: 380px;
  margin: 20px auto;
}

.box-card-k {
  width: 550px;
  margin: 20px auto;
}

.box-card-kh {
  width: 550px;
  height: 300px;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
  background-color: rgb(27, 16, 16);
}

.alert-item {
  margin-bottom: 10px;
}

.tag-item {
  margin-right: 15px;
}

.link-title {
  margin-left: 35px;
}

.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #F38181;
  height: 100%;
}

.right-container {
  background-color: #FCE38A;
  height: 200px;
}

.top-container {
  background-color: #FCE38A;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}

.left-container-twoOne {
  background-color: rgb(110, 75, 75);
  height: 100%;
}

.container-onetoOne {
  background-color: rgb(47, 80, 74);
  height: 100%;
  width: 50%;
}

.container-onetoTwo {
  background-color: rgb(61, 19, 56);
  height: 100%;
  width: 50%;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #57926b;
}

.bg-purple {
  background: #7e2970;
}

.bg-purple-light {
  background: #071c4d;
}

.grid-content {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 150px;
  min-width: 100px;
}

.grid-contentB {
  background-color: rgb(64, 56, 134);
  border-radius: 4px;
  min-height: 150px;
  min-width: 100px;
}

.grid-a-contentWidth {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 100px;
}

.grid-a-content-a-Width {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 220px;
}

.grid-one-contentheight {
  background-color: rgb(44, 143, 121);
  border-radius: 4px;
  min-height: 100%;
}

.el-row-two {
  margin-bottom: 80px;
  margin-top: 80px;

}


.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 15px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  width: 60px;
  height: 60px;
}

.total-title-w {

  position: relative;
  font-size: 20px;
  color: white;
  left: 70px;
  top: -50px;
}

.total-title-b {
  position: relative;
  font-size: 20px;
  color: grey;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}

.address-content {
  padding: 20px;
  font-size: 18px
}

.card-heading {
  font-size: 20px;
  color: white;
}

.card-heading-text {
  float: right;
  padding: 3px 0;
  font-size: 20px;
  color: white;
}

.card-body {
  font-size: 16px;
  color: white;
}

.card-body-value {
  float: right;
  padding: 3px 0;
  font-size: 16px;
  color: white;
}
</style>
