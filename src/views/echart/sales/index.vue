<template>
  <div class="app-container" style="margin-left: 2%;margin-right: 2%;">

    <div class="statistics-layout">

      <el-row  :gutter="5">
        <el-col :lg="6" :xs="24">
          <div class="out-border">
            <div class="layout-title">{{$t('dashboard.sales_amount')}}</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="SalesAmountGraph" style="height: 300px;"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :lg="6" :xs="24">
          <div class="out-border">
            <div class="layout-title">{{$t('dashboard.hot_sale')}} (TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="HotProdGraph" style="height: 300px;"></div>
              </div>
            </div>
          </div>

        </el-col>

        <el-col :lg="6" :xs="24">
          <div class="out-border">
            <div class="layout-title">{{$t('dashboard.sales_count')}}</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="SalesCountGraph" style="height: 300px;"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :lg="6" :xs="24">
          <div class="out-border">
            <div class="layout-title">{{$t('dashboard.hot_point')}} (TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="hotMachineGraph" style="height: 300px;"></div>
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
import {fetchSaleProdCount, fetchTimeAmount, fetchTimeCount, fetchHotMachineCount} from '@/api/sales'

import echarts from "echarts";
import  'echarts/theme/shine.js'
import BackToTop from 'vue-backtotop'

export default {

  components: {BackToTop},

  data() {

    return {
      charts_1: '', //交易次數
      charts_2: '', //熱賣商品
      charts_3: '', //交易金額
      charts_4: '', //熱點銷冠

      count_sumList: null,
      count_timeList: null,

      //7天
      sumList_week: null,
      timeList_week: null,
      //30天
      sumList_month: null,
      timeList_month: null,

      typeData: null,
      typeHotMachine: null,

      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      // img_home_order,
      // img_home_today_amount,
      // img_home_yesterday_amount
    }
  },
  created() {
    this.getList();
    this.getTimeAmountList();
    this.getTimeCountList();
    this.getHotMachine();
  },
  mounted() {

  },
  methods: {

    getTimeCountList() { //交易次數

      fetchTimeCount(this.listQuery).then(response => {
        this.count_sumList = response.data.sumList;
        this.count_timeList = response.data.timeList;
        console.info("count_sumList:" + this.count_sumList);
        console.info("count_timeList:" + this.count_timeList);
        this.drawSalesCount("SalesCountGraph");
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
    getHotMachine() { //熱賣商品

      fetchHotMachineCount(this.listQuery).then(response => {
        this.typeHotMachine = response.data;
        this.drawHotMachine("hotMachineGraph");
      });

    },

    getList() { //熱賣商品
      fetchSaleProdCount(this.listQuery).then(response => {
        console.log("kkkkkkkkkkkkkkkkkkkkkkk" + response.data[0].name);
        console.log("kkkkkkkkkkkkkkkkkkkkkkk" + response.data[0].value);
        this.typeData = response.data;
        this.drawPie("HotProdGraph");

      });

    },
    drawSalesCount(id) {
      this.charts_3 = echarts.init(document.getElementById(id),'shine');
      this.charts_3.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: [],
          bottom: 0
        },
        xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: this.count_timeList
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: '前30日',
            type: 'line',
            symbol: 'none',

            lineStyle: {color: ' #005ea8'},
            areaStyle: {color: ' #005ea8'},
            smooth: true,
            data: this.count_sumList
          }
        ]
      })
    },
    drawSalesAmount(id) {
      var kkweek = this.timeList_week;
      var kkmonth = this.timeList_month;
      var myChart = echarts.init(document.getElementById(id),'shine');
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
          name: this.$t('form.thousand'),
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
            smooth: true,
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

    drawHotMachine(id) {
      this.charts_4 = echarts.init(document.getElementById(id),'shine');
      this.charts_4.setOption({

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
            name: '熱點銷冠',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeHotMachine,
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

    drawPie(id) {
      this.charts_2 = echarts.init(document.getElementById(id),'shine');
      this.charts_2.setOption({
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
            name: '熱賣商品',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeData,
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
</style>
