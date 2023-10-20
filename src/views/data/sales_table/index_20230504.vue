<template>
  <div class="app-container">

    <el-card class="filter-container" shadow="never">
      <div>

        <el-form
          :inline="true"
          :model="listQuery"
          style="align-items: center; "
          size="small"
          @submit.native.prevent
          label-width="140px">

          <i class="el-icon-search"></i>
          <span>{{ $t('form.search') }}</span>
          <el-button
            style="float:right"
            type="primary"
            icon="el-icon-search"
            @click="handleSearchList()"
            size="small">
            {{ $t('form.query') }}
          </el-button>
          <el-button
            style="float:right;margin-right: 15px"
            type="primary"
            @click="handleDownload()"
            icon="el-icon-download"
            size="small">
            {{ $t('form.download') }}
          </el-button>
          <el-button
            style="float:right;margin-right: 15px"
            type="primary"
            @click="handleResetSearch()"
            icon="el-icon-remove"
            size="small">
            {{ $t('form.clear') }}
          </el-button>

          <br>

          <div>
            <div>
              <el-form-item :label="$t('table.name')">
                <el-input v-model="listQuery.keyword"
                          class="input-width"
                          :placeholder="$t('placeholder.sales_search')"
                          clearable>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item :label="$t('form.start_datetime')">
                <el-date-picker
                  v-model="startDate"
                  align="right"
                  type="date"
                  :placeholder="$t('placeholder.select_start_date')"
                  :picker-options="pickerOptions1"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-time-select
                  :placeholder="$t('placeholder.select_start_time')"
                  v-model="startTime"
                  :picker-options="{start: '00:00',step: '00:10',end: '23:59'}">
                </el-time-select>

              </el-form-item>
            </div>
            <div>
              <el-form-item :label="$t('form.end_datetime')">
                <el-date-picker
                  v-model="endDate"
                  align="right"
                  type="date"
                  :placeholder="$t('placeholder.select_end_date')"
                  :picker-options="pickerOptions1"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-time-select
                  :placeholder="$t('placeholder.select_end_time')"
                  v-model="endTime"
                  :picker-options="{start: '00:00',step: '00:05',end: '23:59',minTime: startTime}">
                </el-time-select>
              </el-form-item>
            </div>
          </div>


        </el-form>
      </div>
    </el-card>

<!--    <el-card class="operate-container" shadow="never">-->
<!--      <i class="el-icon-tickets" style="margin-top: 5px"></i>-->
<!--      <span style="margin-top: 5px">{{ $t('form.datalist') }}</span>-->
<!--    </el-card>-->
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.cp_name')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.cpname }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.machine_id')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.machine }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.prod_name')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.sales_amount')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.volume')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.volume }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.sales_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.txTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {fetchSaleList} from '@/api/sales'
import axios from "axios";
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
  // startDate: null,
  // endDate: null,
  // startTime: null,
  // endTime: null,
  startDateTime: null,
  endDateTime: null,
};

export default {
  name: "salesList",

  data() {

    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
          text: '30天前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }]
      },

      startDate: '',
      startTime: '',
      endDate:'',
      endTime: '',
      startDateTime: '',
      endDateTime:'',

      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,

    }
  },
  created() {
    this.getList();
  },
  watch: {},
  methods: {
    handleDownload() {
      console.log("hello");

      axios.get('http://localhost:8080/resource/download',
        {responseType: 'blob'}
      ).then((res) => {
        console.log('文件下载成功');
        const blob = new Blob([res.data]);
        const fileName = "sample.csv";

        //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        //IE10以上支持blob，但是依然不支持download
        if ('download' in document.createElement('a')) {
          //支持a标签download的浏览器
          const link = document.createElement('a');//创建a标签
          link.download = fileName;//a标签添加属性
          link.style.display = 'none';
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();//执行下载
          URL.revokeObjectURL(link.href); //释放url
          document.body.removeChild(link);//释放标签
        } else {
          navigator.msSaveBlob(blob, fileName);
        }
      }).catch((res) => {
        console.log('文件下载失败');
      });
    },
    getList() {
      this.listLoading = true;
      fetchSaleList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleHiddenChange(index, row) {
      updateHidden(row.id, {hidden: row.hidden}).then(response => {
        this.$message({
          message: this.$t('form.success'),
          type: 'success',
          duration: 1000
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.listQuery.startDateTime = this.startDate+" "+this.startTime;
      this.listQuery.endDateTime = this.endDate+" "+this.endTime;
      console.info("===>"+this.listQuery.startDateTime);
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
}

</script>

<style scoped>

</style>
