<template>

  <div class="app-container" style="margin-top: 0.2%; margin-left: 2%;margin-right: 2%;">

    <div class="total-layout">
      <el-row :gutter="5">
        <el-col :lg="6" :xs="24">
          <el-card class="box-card" style="background: #5e6ac0;">
            <div slot="header" class="clearfix">
              <span class="card-heading">{{$t('dashboard.sales_amount')}}</span>
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

      <br>

      <el-row :gutter="5">
        <el-col :lg="16" :xs="24">
          <div class="out-border">
            <div class="layout-title" style="background: darkseagreen;color: darkgreen">{{$t('dashboard.sales_amount')}}</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="SalesAmountGraph" style="height: 250px;"></div>
              </div>
            </div>
          </div>
        </el-col>



        <el-col :lg="8" :xs="24">
          <div class="out-border">
            <div class="layout-title" style="background: #f56c6c;color: white">{{ $t('dashboard.off_line') }} (TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="OffLineGraph" style="height: 250px;"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>


    </div>




    <back-to-top>
      <button type="button" class="btn-to-top">
      </button>
    </back-to-top>


  </div>
</template>

<script>

import "@/assets/css/my.css"
import {setInterval, clearInterval} from 'timers'
import {fetchTodaySalesCount} from '@/api/sales'

import {fetchSaleProdCount, fetchTimeAmount, fetchTimeCount, fetchHotMachineCount} from '@/api/sales'
import echarts from "echarts";
import {fetchEventFail, fetchDeliverEventFail, fetchEventCount} from '@/api/event';
import 'echarts/theme/shine.js'
import BackToTop from 'vue-backtotop'


const defaultDevice = {
  title: '',
  deviceSn: '',
  address: '',
  cityId: null,
  status: 1
};

export default {

  components: {BackToTop},



  data() {

    return {


      sumList_week: null,
      timeList_week: null,
      typeOffLineEvent: null,
      charts_offline: '', //離線30分鐘
      TodaySalesCount: null,

      timer: null,
      time: 20,
      // back_top,
    }

  },

  created() {
    this.getTimeAmountList();
    this.getTodaySalesCount();
    this.getOffLineEvent();

  },

  mounted() {
    this.timer = setInterval(this.countdown, 1000);


  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {



    getTodaySalesCount() {
      fetchTodaySalesCount().then(response => {
        this.TodaySalesCount = response.data;
      });
    },
    getTimeAmountList() { //交易金額
      this.listLoading = true;
      fetchTimeAmount(this.listQuery).then(response => {
        this.listLoading = false;
        //last week
        this.sumList_week = response.data.sumList_week;
        this.timeList_week = response.data.timeList_week;
        //last month
        this.sumList_month = response.data.sumList_month;
        this.timeList_month = response.data.timeList_month;

        console.log("this.timeList_week-->" + this.timeList_week);
        console.log("this.timeList_month-->" + this.timeList_month);

        this.drawSalesAmount("SalesAmountGraph");
      });

    },

    drawSalesAmount(id) {
      var kkweek = this.timeList_week;
      var kkmonth = this.timeList_month;
      var myChart = echarts.init(document.getElementById(id), 'shine');
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: ['月', '週'],
          bottom: 0,
          selectedMode: 'single'
        },
        xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: this.timeList_month
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: "value",
          name: "千元",
          nameTextStyle: {
            color: "#aaa",
            nameLocation: "start",
          },
        },
        series: [
          {
            name: '月',
            type: 'line',
            // lineStyle: {color: ' #005ea8'},
            smooth: false,
            data: this.sumList_month
          },
          {
            name: '週',
            type: 'line',
            smooth: true,
            // lineStyle: {color: 'green'},
            data: this.sumList_week
          }

        ]
      });
      myChart.on('legendselectchanged', function (obj) {
        var name = obj.name;
        var option = myChart.getOption();
        console.info("option===>" + name);
        option.xAxis[0].data = '';
        console.info("init->" + option.xAxis[0].data);
        if (name == '週') {
          option.xAxis[0].data = kkweek;
          console.info("sss1->" + kkweek);
        } else if (name == '月') {
          option.xAxis[0].data = kkmonth;
          console.info("sss2->" + kkmonth);
        }
        console.info("sss->" + option.xAxis[0].data);
        myChart.setOption(option, true);
      });
    },

    getOffLineEvent() {
      fetchEventFail({eventType: '離線超過30分鐘'}).then(response => {
        this.typeOffLineEvent = response.data;
        this.drawOfflineEventPie("OffLineGraph");
      });
    },

    drawOfflineEventPie(id) {
      this.charts_offline = echarts.init(document.getElementById(id), 'shine');
      this.charts_offline.setOption({

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeOffLineEvent,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    countdown() {
      this.time--;
      if (this.time == 0) {
        this.time = 20;
        this.getTimeAmountList();
        this.getTodaySalesCount();
        this.getOffLineEvent();
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


