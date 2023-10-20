<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="organization"
             :rules="rules"
             ref="organizationFrom"
             label-width="150px">


      <el-form-item :label="$t('table.name')" prop="name">
        <el-input v-model="organization.name"></el-input>
      </el-form-item>

      <el-form-item :label="$t('table.upper_level')">
        <el-select v-model="organization.parentId"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in selectOrgList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('table.enabled')">
        <el-radio-group v-model="organization.status">
          <el-radio :label="1">{{ $t('form.yes') }}</el-radio>
          <el-radio :label="2">{{ $t('form.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('table.sort')">
        <el-input v-model="organization.sort"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('organizationFrom')">{{$t('form.apply')}}</el-button>
        <el-button v-if="!isEdit" @click="resetForm('organizationFrom')">{{$t('form.clear')}}</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import {fetchList, listLevel, getOrganization, updateOrganization, createOrganization} from '@/api/organization';

const defaultOrg = {
  name: '',
  nameSn: '',
  parentId: 0,
  level: 0,
  status: 0,
  sort: 0
};
export default {
  name: "OrgDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      organization: Object.assign({}, defaultOrg),
      selectOrgList: [],
      rules: {
        name: [
          {required: true, message: '請輸入單位名稱', trigger: 'blur'},
          {min: 2, max: 20, message: '長度在 6 到 20 個字', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      getOrganization(this.$route.query.id).then(response => {
        this.organization = response.data;
      });
    } else {
      this.organization = Object.assign({}, defaultOrg);
    }
    this.getSelectOrgList();
  },
  methods: {
    getSelectOrgList() {
      listLevel({pageSize: 100, pageNum: 1}).then(response => {
        this.selectOrgList = response.data.list;
        this.selectOrgList.unshift({id: 0, name: '無上級單位'});
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
              updateOrganization(this.$route.query.id, this.organization).then(response => {
                this.$message({
                  message: this.$t('form.success'),
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createOrganization(this.organization).then(response => {
                this.$refs[formName].resetFields();
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
      this.organization = Object.assign({}, defaultOrg);
      this.getSelectOrganizationList();
    },
  }
}

</script>

<style scoped>

</style>
