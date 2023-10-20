<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <div>
        <el-form :inline="true"
                 @submit.native.prevent
                 :model="listQuery"
                 size="small" label-width="140px">

          <i class="el-icon-search"></i>
          <span style="font-weight: bold">{{ $t('form.search') }}</span>

          <el-form-item :label="$t('form.key_word')">
            <el-input v-model="listQuery.keyword"
                      class="input-width"
                      :placeholder="$t('placeholder.keyword')"
                      v-on:keyup.13
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


          <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            icon="el-icon-search"
            size="small">
            {{ $t('form.query') }}
          </el-button>
          <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            icon="el-icon-remove"
            type="primary"
            size="small">
            {{ $t('form.clear') }}
          </el-button>

        </el-form>
      </div>
    </el-card>

    <!--    <el-card class="operate-container" shadow="never" >-->
    <!--      <i class="el-icon-tickets"></i>-->
    <!--      <span>{{ $t('form.datalist')}}</span>-->
    <!--    </el-card>-->

    <div class="table-container">
      <el-table
        ref="companyTable"
        style="width: 100%"
        :data="list"
        :cell-style="{'text-align':'left'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        v-loading="listLoading" border>

        <el-table-column :label="$t('table.serial_number')" min-width="80" align="left">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>

        <el-table-column :label="$t('table.account')" min-width="200" align="left">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>

        <el-table-column :label="$t('table.event')" min-width="200" align="left">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag v-if="scope.row.requestMethod=='GET'">{{ scope.row.requestMethod }}</el-tag>
              <el-tag v-if="scope.row.requestMethod=='POST'" type="success">{{ scope.row.requestMethod }}</el-tag>
              <el-tag v-if="scope.row.requestMethod=='PUT'" type="warning">{{ scope.row.requestMethod }}</el-tag>
              <el-tag v-if="scope.row.requestMethod=='DELETE'" type="danger">{{ scope.row.requestMethod }}</el-tag>
              {{ scope.row.event }}
            </div>
          </template>
          <!--          <template slot-scope="scope">{{ scope.row.event }}</template>-->
        </el-table-column>

        <el-table-column :label="$t('table.ipAddress')" min-width="120" align="left">
          <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
        </el-table-column>

        <el-table-column prop="result" :label="$t('table.light')" width="70%">
          <template slot-scope="scope">
            <span slot="reference" v-if="scope.row.status == 1">
              <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span slot="reference" v-if="scope.row.status == 0">
              <i class="dotClass" style="background-color: red"></i>
            </span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('table.create_date')" min-width="180" align="left">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>

        <el-table-column :label="$t('table.desc')" min-width="250" align="left">
          <template slot-scope="scope">{{ scope.row.memo }}</template>
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
import {fetchListType} from '@/api/event'
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  startDateTime: null,
  endDateTime: null,
  logType: 1,
  keyword: null
};

export default {
  name: "loginList",
  data() {
    return {
      value4: '',
      list: null,
      total: null,
      listLoading: true,
      startDateTime: '',
      endDateTime: '',
      listQuery: Object.assign({}, defaultListQuery),
      parentId: 0,
      queryParams: {
        contactTimeStart: "",
        contactTimeEnd: "",
      },
    }
  },
  created() {
    // this.resetParentId();
    this.getList();
  },
  mounted() {

    // ***************************************************監聽Key的動作
    // 也可以將這段寫在created()
    this.$nextTick(() => {
      document.onkeydown = (key_event) => {
        if (key_event.keyCode === 13) {//这是Enter健，
          this.handleSearchList()//操作方法
        }
      }
    });
    // ***************************************************監聽Key的動作
  },
  watch: {
    $route(route) {
      // this.resetParentId();
      this.getList();
    },
    value4(val) {
      if (val != null && val.length) {
        this.queryParams.contactTimeStart = val[0];
        this.queryParams.contactTimeEnd = val[1];
      } else {
        this.queryParams.contactTimeStart = "";
        this.queryParams.contactTimeEnd = "";
      }
      // console.info("=====>" + this.queryParams.contactTimeStart);
      // console.info("=====>" + this.queryParams.contactTimeEnd);
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
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    handleSearchList() {
      this.listQuery.startDateTime = this.queryParams.contactTimeStart;
      this.listQuery.endDateTime = this.queryParams.contactTimeEnd;
      this.listQuery.pageNum = 1;

      console.info("=====>" + this.listQuery.startDateTime);
      console.info("=====>" + this.listQuery.endDateTime);

      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchListType(this.listQuery).then(response => {
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

  },

}

</script>

<style scoped>

.dotClass {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  margin-left: 10px;
}
</style>
