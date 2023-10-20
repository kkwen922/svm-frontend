<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{$t('form.datalist')}}</span>
      <el-button
        class="btn-add"
        icon="el-icon-plus"
        @click="handleAddCompany()"
        size="mini">
        {{$t('form.add')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="companyTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" align="center">
          <template slot-scope="scope">{{ scope.row.companyName }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.uniform')" align="center">
          <template slot-scope="scope">{{ scope.row.invoiceNumber }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.enabled')" min-width="200" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column :label="$t('table.data_maintenance')" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="button"
              icon="el-icon-edit"
              @click="handleUpdate(scope.$index, scope.row)">{{$t('form.edit')}}
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
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {fetchList, updateStatus, updateCompany, deleteCompany} from '@/api/company'

export default {
  name: "companyList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddCompany() {
      this.$router.push('/oms/addCompany');
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

    handleUpdate(index, row) {
      this.$router.push({path: '/oms/updateCompany', query: {id: row.id}});
    },

  },

}

</script>

<style scoped>

</style>
