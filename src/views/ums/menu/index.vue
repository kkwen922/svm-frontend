<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{ $t('form.datalist') }}</span>
      <el-button
        class="btn-add"
        type="primary"
        icon="el-icon-plus"
        @click="handleAddMenu()"
        size="mini">
        {{ $t('form.add') }}
      </el-button>
    </el-card>


    <div class="table-container">

      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.level')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.front_end_name')" min-width="140" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.front_end_icon')" min-width="100" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.show_flag')" min-width="80" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleHiddenChange(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.hidden">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.sort')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.set_up')" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">{{ $t('table.view_low_level') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.data_maintenance')" min-width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="button"
              icon="el-icon-edit"
              @click="handleUpdate(scope.$index, scope.row)">{{ $t('form.edit') }}
            </el-button>
            <el-button
              size="mini"
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
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>


</template>

<script>
import {fetchList, deleteMenu, updateMenu, updateHidden, listTreeTable} from '@/api/menu'

export default {
  name: "menuList",
  data() {
    return {
      changeFx: false,
      tableData: [],
      listTree: null,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        parentId: 0
      },
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getList();
    this.getTreeList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
      this.getTreeList();
    }
  }
  ,
  methods: {
    changeArrow() {
      this.changeFx = !this.changeFx;
    },
    // 合并单元格
    objectSpanMethod({row, column, rowIndex, columnIndex}) {

      if (columnIndex === 4) {
        return {
          rowspan: 10,
          colspan: 0,
        };
      }
    },

    handleNodeClick(data) {
      console.log(data);
    }
    ,
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    }
    ,
    handleAddMenu() {
      this.$router.push('/ums/addMenu');
    }
    ,
    getTreeList() {
      this.listLoading = true;
      listTreeTable().then(response => {
        this.listLoading = false;
        this.listTree = response.data;
        console.info("size==>" + this.listTree)
      });


    }
    ,
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
    ,
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    }
    ,
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    }
    ,
    handleHiddenChange(index, row) {
      updateHidden(row.id, {hidden: row.hidden}).then(response => {
        this.$message({
          message: this.$t('form.success'),
          type: 'success',
          duration: 1000
        });
      });
    }
    ,
    handleShowNextLevel(index, row) {
      this.$router.push({path: '/ums/menu', query: {parentId: row.id}})
    }
    ,
    handleUpdate(index, row) {
      this.$router.push({path: '/ums/updateMenu', query: {id: row.id}});
    }
    ,
    handleDelete(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        deleteMenu(row.id).then(response => {
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
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一級';
      } else if (value === 1) {
        return '二級';
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  },

}

</script>

<style scoped>

</style>
