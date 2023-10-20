<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{$t('form.datalist')}}</span>
      <el-button
        class="btn-add"
        icon="el-icon-plus"
        @click="handleAddDevice()"
        size="mini">
        {{$t('form.add')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
<!--        <el-table-column :label="$t('table.device_type')" min-width="150" align="center">-->
<!--          <template slot-scope="scope">{{ scope.row.deviceTypeName }}</template>-->
<!--        </el-table-column>-->
        <el-table-column :label="$t('table.device_number')" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.deviceSn }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.device_custodian')" min-width="120" align="center">
          <template slot-scope="scope">{{ scope.row.orgName }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.city')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.cityName }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.address')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.fullAddress }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.enabled')" min-width="80" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column :label="$t('table.data_maintenance')"  min-width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="button"
              icon="el-icon-edit"
              @click="handleUpdate(scope.$index, scope.row)">{{$t('form.edit')}}
            </el-button>
            <el-button
              size="mini"
              type="button"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">{{$t('form.delete')}}
            </el-button>
          </template>
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
import {fetchList, updateStatus, deleteDevice} from '@/api/device'

export default {
  name: "deviceList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
      },

    }
  },
  created() {
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    }
  },
  methods: {

    handleAddDevice() {
      this.$router.push('/dms/addDevice');
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/dms/updateDevice', query: {id: row.id}});
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
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

    handleStatusChange(index, row) {
      updateStatus(row.id, {status: row.status}).then(response => {
        this.$message({
          message: this.$t('form.success'),
          type: 'success',
          duration: 1000
        });
      });
    },

    handleDelete(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        deleteDevice(row.id).then(response => {
          this.$message({
            message: this.$t('form.success'),
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      });
    }
  },
  filters: {}
}

</script>

<style scoped>

</style>
