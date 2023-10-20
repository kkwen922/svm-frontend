<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>

        <el-form :inline="true"
                 :model="listQuery"
                 @submit.native.prevent
                 size="small"
                 label-width="140px">

          <i class="el-icon-search"></i>
          <span>{{ $t('form.search') }}</span>

          <el-form-item style="margin-left: 15px">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              :placeholder="$t('placeholder.device_type')"
              v-on:keyup.13
              clearable></el-input>
          </el-form-item>

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
            icon="el-icon-remove"
            @click="handleResetSearch()"
            size="small">
            {{ $t('form.clear') }}
          </el-button>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>{{ $t('form.datalist') }}</span>
      <el-button size="mini"
                 class="btn-add"
                 icon="el-icon-plus"
                 @click="handleAdd()"
                 style="margin-left: 20px">{{ $t('form.add') }}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.device_type')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.desc')" min-width="200" align="center">
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.sort')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.data_maintenance')"  min-width="250" align="center">
          <template slot-scope="scope">

            <el-row>
              <el-button size="mini"
                         type="button"
                         icon="el-icon-edit"
                         @click="handleUpdate(scope.$index, scope.row)">{{ $t('form.edit') }}
              </el-button>
              <el-button size="mini"
                         type="button"
                         icon="el-icon-delete"
                         @click="handleDelete(scope.$index, scope.row)">{{ $t('form.delete') }}
              </el-button>
            </el-row>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?$t('form.edit'):$t('form.add')"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="deviceCate"
               ref="deviceCateForm"
               label-width="150px" size="small">
        <el-form-item :label="$t('table.device_type')">
          <el-input v-model="deviceCate.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.desc')">
          <el-input v-model="deviceCate.note"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">{{ $t('form.cancel') }}</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">{{ $t('form.apply') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {fetchList, deleteDeviceCate, updateDeviceCate, createDeviceCate} from '@/api/deviceCate';
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultDeviceCate = {
  id: null,
  name: null,
  note: null,
  sort: 0
};
export default {
  name: 'roleList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      deviceCate: Object.assign({}, defaultDeviceCate),
      isEdit: false
    }
  },
  created() {
    this.getList();
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
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.deviceCate = Object.assign({}, defaultDeviceCate);
    },
    handleStatusChange(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, {status: row.status}).then(response => {
          this.$message({
            type: 'success',
            message: this.$t('form.success')
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('form.cancel')
        });
        this.getList();
      });
    },
    handleDelete(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        deleteDeviceCate(row.id).then(response => {
          this.$message({
            type: 'success',
            message: this.$t('form.success')
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.deviceCate = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateDeviceCate(this.deviceCate.id, this.deviceCate).then(response => {
            this.$message({
              message: this.$t('form.success'),
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          createDeviceCate(this.deviceCate).then(response => {
            this.$message({
              message: this.$t('form.success'),
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
  }
}

</script>
<style></style>


