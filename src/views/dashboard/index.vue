<template>

  <div class="app-container" style="margin-top: 0.2%; margin-left: 2%;margin-right: 2%;">

    <div class="total-layout">
      <el-row :gutter="5">
        <el-col :lg="6" :xs="24">
          <el-card class="box-card" style="background: lightblue">
            <div slot="header" class="clearfix">
              <span class="card-heading">{{ $t('dashboard.sales_amount') }}</span>
              <span class="card-heading-text">$ 140,520</span>
              <!-- <span class="card-heading-text">$ {{ getRandom(140000, 180000) }}</span> -->

              <div class="card-heading" style="margin-top: 20px; text-align: right">
                <trend flag="top" rate="13">
                  <span slot="term">周同比</span>
                </trend>
                <trend flag="top" rate="11">
                  <span slot="term">日同比</span>
                </trend>
              </div>

              <div style="margin-top: 50px">
                <mini-area>
                </mini-area>
              </div>
            </div>
            <el-row>
              <el-col>
                <rank-list :list="rankList" style="text-align: left"/>
                <!--                <rank-list title="門店銷售排行榜" :list="rankList" style="text-align: left"/>-->
              </el-col>
            </el-row>
          </el-card>
        </el-col>


        <el-col :lg="6" :xs="24">
          <el-card class="box-card" style="background: lightsteelblue">
            <div slot="header" class="clearfix">
              <span class="card-heading">{{ $t('dashboard.sales_count') }}</span>
              <span class="card-heading-text">42,301</span>
              <!-- <span class="card-heading-text">{{ getRandom(40000, 80000) }}</span> -->

              <div class="card-heading" style="margin-top: 20px; text-align: right">
                <trend flag="top" rate="2">
                  <span slot="term">周同比</span>
                </trend>
                <trend flag="top" rate="21">
                  <span slot="term">日同比</span>
                </trend>
              </div>

              <div style="margin-top: 50px">
                <mini-bar>
                </mini-bar>
              </div>

            </div>
            <el-row>
              <el-col>
                <rank-list :list="rankList2" style="text-align: left"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-card class="box-card" style="background: lightskyblue">
            <div slot="header" class="clearfix">
              <span class="card-heading">{{ $t('dashboard.shipment_failed') }}</span>
              <span class="card-heading-text">233</span>
              <!-- <span class="card-heading-text">{{ getRandom(200, 300) }}</span> -->

              <div class="card-heading" style="margin-top: 20px; text-align: right">
                <trend flag="top" rate="6">
                  <span slot="term">周同比</span>
                </trend>
                <trend flag="bottom" rate="8">
                  <span slot="term">日同比</span>
                </trend>
              </div>
              <div style="margin-top: 50px">
                <mini-area>
                </mini-area>
              </div>
            </div>
            <el-row>
              <el-col>
                <rank-list :list="rankList3" style="text-align: left"/>
              </el-col>
            </el-row>
          </el-card>

        </el-col>

        <el-col :lg="6" :xs="24">

          <el-card class="box-card" style="background: lightsteelblue">
            <div slot="header" class="clearfix">
              <span class="card-heading">{{ $t('dashboard.out_of_stock') }}</span>
              <span class="card-heading-text">16%</span>
              <!-- <span class="card-heading-text">{{ getRandom(10, 40) }}%</span> -->

              <div class="card-heading" style="margin-top: 20px; text-align: right">
                <trend flag="bottom" rate="4">
                  <span slot="term">周同比</span>
                </trend>
                <trend flag="bottom" rate="1">
                  <span slot="term">日同比</span>
                </trend>
              </div>
              <div style="margin-top: 32px">

                <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="28" height="8px"/>

              </div>
            </div>
            <el-row>
              <el-col>
                <rank-list :list="rankList4" style="text-align: left"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>


      <el-row>
        <el-col :lg="12" :xs="24">
          <bar :list="barData" :title="$t('dashboard.SalesAmountTrend')" />
        </el-col>
        <el-col :lg="12" :xs="24">
          <bar :list="barData2" :title="$t('dashboard.TransactionsTrend')"/>
        </el-col>
      </el-row>


      <back-to-top>
        <button type="button" class="btn-to-top">
        </button>
      </back-to-top>

    </div>
  </div>
</template>

<script>

import "@/assets/css/my.css"
import {setInterval, clearInterval} from 'timers'
import 'echarts/theme/shine.js'
import BackToTop from 'vue-backtotop'
import Trend from '@/components/Trend'
import Bar from '@/components/Bar'
import RankList from '@/components/RankList'
import MiniArea from '@/components/MiniArea'
import MiniBar from "@/components/MiniBar";
import MiniProgress from "@/components/MiniProgress";

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })

}

const device = ["蘇澳國道店", "新福瑞店", "基隆經國店-開刀", "基隆經國店-急診", "聯合大學", "沙鹿靜宜-男宿", "西港港美", "淡大女宿", "文化大學大忠館", "湖口力成", "大雅永勝", "台新銀金控"];

const rankList = []
var rank_set = new Set();

while (true) {
  let i = 0;
  if (rank_set.size < 5) {
    rank_set.add(device[parseInt(Math.random() * device.length, 10)]);
  } else {
    break;
  }
}

var i =0;
for (let t of rank_set) {
  rankList.push({
    name: t,
    total: 8567 - i * (i-9)
  })
  i=i+11;
}


const rankList2 = []
for (let i = 0; i < 5; i++) {
  rankList2.push({
    name: device[parseInt(Math.random() * device.length, 10)],
    total: 322 - i * 10
  })
}


const rankList3 = []

for (let i = 0; i < 5; i++) {
  rankList3.push({

    name: device[parseInt(Math.random() * device.length, 10)],
    total: 31 - i
  })
}

const rankList4 = []
for (let i = 0; i < 5; i++) {
  rankList4.push({
    name: device[parseInt(Math.random() * device.length, 10)],
    total: 122 - i * 10
  })
}

export default {

  components: {
    Trend,
    Bar,
    RankList,
    MiniArea,
    MiniBar,
    MiniProgress,
    BackToTop
  },


  data() {


    return {

      rankList,
      rankList2,
      rankList3,
      rankList4,
      barData,
      barData2,
      timer: null,
      time: 20,
      // back_top,
    }

  },

  created() {


  },

  mounted() {
    this.timer = setInterval(this.countdown, 1000);


  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {

    // getRandom(min, max) {
    //   return String(Math.floor(Math.random() * (max - min + 1)) + min).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    // },
    countdown() {
      this.time--;
      if (this.time == 0) {
        this.time = 20;

      }
    }
  }
}
</script>

<style scoped>

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
  font-weight: bold;
  color: black;
}

.card-heading-text {
  float: right;
  padding: 3px 0;
  font-size: 22px;
  color: black;
}

.card-trend-text {
  margin-bottom: 10px;
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


