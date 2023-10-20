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

          <el-form-item :label="$t('table.name')">
            <el-input
              v-model="listQuery.keyword"
              class="input-width,variableInput"
              :placeholder="$t('placeholder.role_name')"
              v-on:keyup.13
              clearable>

            </el-input>
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
            type="primary"
            @click="handleResetSearch()"
            icon="el-icon-remove"
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
                 @click="handleAdd()"
                 icon="el-icon-plus"
                 type="primary"
                 style="margin-left: 20px">{{ $t('form.add') }}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.desc')" min-width="200" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.user_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.adminCount }}</template>
        </el-table-column>
<!--        <el-table-column :label="$t('table.create_date')" min-width="200" align="center">-->
<!--          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>-->
<!--        </el-table-column>-->
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
        <el-table-column :label="$t('table.data_maintenance')" min-width="400" align="center">
          <template slot-scope="scope">
            <!--            <el-row>-->
            <el-button size="mini"
                       type="button"
                       icon="el-icon-plus"
                       @click="handleSelectMenu(scope.$index, scope.row)">{{ $t('table.assign_menu') }}
            </el-button>
            <el-button size="mini"
                       type="button"
                       icon="el-icon-plus"
                       @click="handleSelectResource(scope.$index, scope.row)">{{ $t('table.assign_resource') }}
            </el-button>
            <el-button size="mini"
                       type="button"
                       icon="el-icon-edit"
                       @click="handleUpdate(scope.$index, scope.row)">
              {{ $t('form.edit') }}
            </el-button>
            <el-button size="mini"
                       type="button"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.$index, scope.row)">{{ $t('form.delete') }}
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
      <el-form :model="role"
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item :label="$t('table.name')">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.desc')">
          <el-input v-model="role.description"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.enabled')">
          <el-radio-group v-model="role.status">
            <el-radio :label="1">{{ $t('form.yes') }}</el-radio>
            <el-radio :label="0">{{ $t('form.no') }}</el-radio>
          </el-radio-group>
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
import {fetchList, createRole, updateRole, updateStatus, deleteRole} from '@/api/role';
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1
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
      role: Object.assign({}, defaultRole),
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
      this.role = Object.assign({}, defaultRole);
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
      this.$confirm(this.$t('form.delete_role'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteRole(params).then(response => {
          this.$message({
            type: 'success',
            message: this.$t('form.delete_success')
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateRole(this.role.id, this.role).then(response => {
            this.$message({
              message: this.$t('form.success'),
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          createRole(this.role).then(response => {
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
    handleSelectMenu(index, row) {
      this.$router.push({path: '/ums/allocMenu', query: {roleId: row.id}})
    },
    handleSelectResource(index, row) {
      this.$router.push({path: '/ums/allocResource', query: {roleId: row.id}})
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
<style>


</style>


