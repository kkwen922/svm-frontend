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
            <el-input v-model="listQuery.nameKeyword"
                      class="input-width"
                      :placeholder="$t('placeholder.resource_name')"
                      v-on:keyup.13
                      clearable>

            </el-input>
          </el-form-item>

          <el-form-item :label="$t('table.resource_path')">
            <el-input v-model="listQuery.urlKeyword"
                      class="input-width"
                      :placeholder="$t('placeholder.resource_path')"
                      v-on:keyup.13
                      clearable>
              </el-input>
          </el-form-item>


          <el-form-item :label="$t('table.resource_type')">
            <el-select v-model="listQuery.categoryId"
                       :placeholder="$t('placeholder.all')" clearable class="input-width">
              <el-option v-for="item in categoryOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
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
            @click="downloadCSV()"
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


        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>{{ $t('form.datalist') }}</span>
      <el-button size="mini"
                 class="btn-add"
                 @click="handleAdd()"
                 type="primary"
                 icon="el-icon-plus"
                 style="margin-left: 20px">{{ $t('form.add') }}
      </el-button>
      <el-button size="mini"
                 class="btn-add"
                 type="primary"
                 @click="handleShowCategory()">{{ $t('table.resource_type') }}</el-button>
    </el-card>

    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column :label="$t('table.serial_number')" min-width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.resource_path')" min-width="150" align="center">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.desc')" min-width="250" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.create_date')" min-width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.data_maintenance')" min-width="300" align="center">
          <template slot-scope="scope">
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
      <el-form :model="resource"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item :label="$t('table.name')">
          <el-input v-model="resource.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.resource_path')">
          <el-input v-model="resource.url" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.resource_type')">
          <el-select v-model="resource.categoryId"
                     :placeholder="$t('placeholder.all')" clearable style="width: 250px">
            <el-option v-for="item in categoryOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.desc')">
          <el-input v-model="resource.description"
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
import {fetchList, createResource, updateResource, deleteResource,downloadResourceList} from '@/api/resource';
import {listAllCate} from '@/api/resourceCategory';
import {formatDate} from '@/utils/date';
import axios from 'axios';
import Papa from 'papaparse';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  nameKeyword: null,
  urlKeyword: null,
  categoryId: null
};
const defaultResource = {
  id: null,
  name: null,
  url: null,
  categoryId: null,
  description: ''
};
export default {
  name: 'resourceList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      categoryOptions: [],
      defaultCategoryId: null
    }
  },
  created() {
    this.getList();
    this.getCateList();
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

    // 將JSON轉換為CSV格式並下載文件
    downloadCSV() {

      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;

        const jsonData = response.data.list;
      // const jsonData = [
      //   // 這裡放入你的JSON數據
      //   { name: 'John Doe', age: 30, email: 'john@example.com' },
      //   { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      //   // ...
      // ];

      // 將JSON數據轉換為CSV格式
      const csv = Papa.unparse(jsonData);

      // 創建一個Blob對象
      const blob = new Blob([csv], { type: 'text/csv' });

      // 創建一個URL，用於生成下載連結
      const url = window.URL.createObjectURL(blob);

      // 創建一個a標籤，並設置其屬性
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';

      // 模擬點擊a標籤，觸發下載
      a.click();

      // 釋放URL對象
      window.URL.revokeObjectURL(url);
      });

 
    },

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
      this.resource = Object.assign({}, defaultResource);
      this.resource.categoryId = this.defaultCategoryId;
    },
    handleDelete(index, row) {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        deleteResource(row.id).then(response => {
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
      this.resource = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
        confirmButtonText: this.$t('form.apply'),
        cancelButtonText: this.$t('form.cancel'),
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateResource(this.resource.id, this.resource).then(response => {
            this.$message({
              message: this.$t('form.success'),
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          createResource(this.resource).then(response => {
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
    handleShowCategory() {
      this.$router.push({path: '/ums/resourceCategory'})
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getCateList() {
      listAllCate().then(response => {
        let cateList = response.data;
        for (let i = 0; i < cateList.length; i++) {
          let cate = cateList[i];
          console.info(cate.name);
          this.categoryOptions.push({label: cate.name, value: cate.id});
        }
        this.defaultCategoryId = cateList[0].id;
      })
    }
  }
}

</script>
<style></style>


