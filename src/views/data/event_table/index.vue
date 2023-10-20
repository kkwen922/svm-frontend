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
            style="float:right ;margin-right: 15px"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload()"
            size="small">
            {{ $t('form.download') }}
          </el-button>

          <el-button
            style="float:right ;margin-right: 15px"
            type="primary"
            icon="el-icon-search"
            @click="handleSearchList()"
            size="small">
            {{ $t('form.query') }}
          </el-button>

          <el-button
            style="float:right;margin-right: 15px"
            type="primary"
            icon="el-icon-remove"
            @click="handleResetSearch()"
            size="small">
            {{ $t('form.clear') }}
          </el-button>



          <el-form-item :label="$t('table.name')">
            <el-input v-model="listQuery.keyword"
                      class="input-width"
                      :placeholder="$t('placeholder.sales_search')"
                      clearable>
            </el-input>
          </el-form-item>


          <el-form-item :label="$t('form.begin_end_datetime')">

            <el-date-picker
              v-model="value4"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss">
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>


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
        <el-table-column :label="$t('table.event_type')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.product_name')" min-width="250" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.sales_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.eventTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.eventTime | formatDateTime }}</template>
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

import {fetchEventList} from '@/api/event'
import axios from "axios";
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
  startDateTime: null,
  endDateTime: null,
};

export default {
  name: "salesList",

  data() {

    return {

      value4: '',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      startDateTime: '',
      endDateTime: '',
      queryParams: {
        contactTimeStart: "",
        contactTimeEnd: "",
      },
    }
  },
  created() {
    this.getList();
  },
  watch: {
    value4(val) {
      if (val != null && val.length) {
        this.queryParams.contactTimeStart = val[0];
        this.queryParams.contactTimeEnd = val[1];
      } else {
        this.queryParams.contactTimeStart = "";
        this.queryParams.contactTimeEnd = "";
      }
    },

  },
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
      fetchEventList(this.listQuery).then(response => {
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

      this.listQuery.startDateTime = this.queryParams.contactTimeStart;
      this.listQuery.endDateTime = this.queryParams.contactTimeEnd;

      console.info("=====>" + this.listQuery.startDateTime);
      console.info("=====>" + this.listQuery.endDateTime);
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
