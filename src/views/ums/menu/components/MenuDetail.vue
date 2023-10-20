<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="menu"
             :rules="rules"
             ref="menuFrom"
             label-width="150px">
      <el-form-item :label="$t('table.name')" prop="title">
        <el-input v-model="menu.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.upper_level')">
        <el-select v-model="menu.parentId"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in selectMenuList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.front_end_name')" prop="name">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.front_end_icon')" prop="icon">
        <el-input v-model="menu.icon" style="width: 80%"></el-input>
        <svg-icon style="margin-left: 8px" :icon-class="menu.icon"></svg-icon>
      </el-form-item>
      <el-form-item :label="$t('table.show_flag')">
        <el-radio-group v-model="menu.hidden">
          <el-radio :label="0">{{ $t('form.yes') }}</el-radio>
          <el-radio :label="1">{{ $t('form.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('table.sort')">
        <el-input v-model="menu.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">{{ $t('form.apply') }}</el-button>
        <el-button v-if="!isEdit" @click="resetForm('menuFrom')">{{ $t('form.clear') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createMenu, updateMenu, getMenu} from '@/api/menu';

const defaultMenu = {
  title: '',
  parentId: 0,
  name: '',
  icon: '',
  hidden: 0,
  sort: 0
};
export default {
  name: "MenuDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: Object.assign({}, defaultMenu),
      selectMenuList: [],
      rules: {
        title: [
          {required: true, message: '請輸入選單名稱', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '請輸入前端名稱', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        icon: [
          {required: true, message: '請輸入前端圖標', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      getMenu(this.$route.query.id).then(response => {
        this.menu = response.data;
      });
    } else {
      this.menu = Object.assign({}, defaultMenu);
    }
    this.getSelectMenuList();
  },
  methods: {
    getSelectMenuList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectMenuList = response.data.list;
        this.selectMenuList.unshift({id: 0, title: '無上級選單'});
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
            confirmButtonText: this.$t('form.apply'),
            cancelButtonText: this.$t('form.cancel'),
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateMenu(this.$route.query.id, this.menu).then(response => {
                this.$message({
                  message: this.$t('form.success'),
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createMenu(this.menu).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: this.$t('form.success'),
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            }
          });

        } else {
          this.$message({
            message: this.$t('form.fail'),
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.menu = Object.assign({}, defaultMenu);
      this.getSelectMenuList();
    },
  }
}

</script>

<style scoped>

</style>
