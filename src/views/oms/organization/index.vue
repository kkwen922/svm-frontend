<template>
  <div class="app-container">


    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{ $t('form.datalist') }}</span>
      <el-button
        class="btn-add"
        icon="el-icon-plus"
        @click="handleAddOrganization()"
        size="mini">
        {{ $t('form.add') }}
      </el-button>
    </el-card>

    <div class="table-container">

      <el-table
        v-loading="listTreeLoading"
        :data=treeList
        row-key="id"
        default-expand-all
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" :label="$t('table.name')"  min-width="200" />
        <el-table-column prop="sort" :label="$t('table.sort')" min-width="100" align="center" />
        <el-table-column prop="status" :label="$t('table.level')" min-width="100" align="center">
          <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
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

  </div>
</template>

<script>

import {updateStatus, updateOrganization, deleteOrganization, listTreeTable} from '@/api/organization'


export default {
  name: "organizationList",

  data() {
    return {
      treeList: [],
      listTreeLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getTreeList();
  },
  mounted() {

  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getTreeList();
    }
  },
  methods: {
    getTreeList() {
      this.listTreeLoading = true;
      listTreeTable().then(response => {
        this.listTreeLoading = false;
        this.treeList = response.data;
      });
    },
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddOrganization() {
      this.$router.push('/oms/addOrganization');
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
      this.$router.push({path: '/oms/updateOrganization', query: {id: row.id}});
    },
    handleDelete(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        deleteOrganization(row.id).then(response => {
          this.$message({
            message: this.$t('form.success'),
            type: 'success',
            duration: 1000
          });
          this.getTreeList();
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
      } else if (value == 2) {
        return '三級'
      }
    },
    disableNextLevel(value) {
      if (value === 0 || value === 1) {
        return false;
      } else {
        return true;
      }
    }
  }
}

</script>

<style scoped>

</style>
