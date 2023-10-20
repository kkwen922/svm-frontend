<template>
  <div class="app-container">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>{{ $t('form.profile')}}</span>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
<!--        <el-table-column :label="$t('table.account')" min-width="200" align="center">-->
<!--          <template slot-scope="scope">{{ scope.row.username }}</template>-->
<!--        </el-table-column>-->
        <el-table-column :label="$t('table.username')" min-width="200" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
<!--        <el-table-column :label="$t('table.org')" min-width="200" align="center">-->
<!--          <template slot-scope="scope">{{ scope.row.orgName }}</template>-->
<!--        </el-table-column>-->
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.last_login')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.loginTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.desc')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>

        <el-table-column :label="$t('table.data_maintenance')" min-width="250" align="center">
          <template slot-scope="scope">

            <el-button size="mini"
                       type="primary"
                       icon="el-icon-setting"
                       @click="handleUpdate(scope.$index, scope.row)">{{ $t('table.change_password')}}
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
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?$t('form.edit_account'):$t('form.new_account')"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="admin"
               ref="adminForm"
               label-width="150px" size="small">
        <div>

          <div v-if="this.isEdit===true">
            <el-form-item :label="$t('table.account')">
              <el-input v-model="admin.username" style="width: 250px" readonly="true"></el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item :label="$t('table.account')">
              <el-input v-model="admin.username" style="width: 250px"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item :label="$t('table.new_password')">
          <el-input v-model="admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">{{$t('form.apply')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {fetchMyList, updateAdmin} from '@/api/login';
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1
};
export default {
  name: 'adminList',
  data() {
    return {
      selectOrgList: [],
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
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
  methods: {

    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },

    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否確認?', this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {

        }
      })
    },


    getList() {
      this.listLoading = true;
      fetchMyList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },


  }
}

</script>
<style></style>


