<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="company"
             :rules="rules"
             ref="companyFrom"
             label-width="150px">


      <el-form-item :label="$t('table.name')" prop="name">
        <el-input v-model="company.companyName"></el-input>
      </el-form-item>


      <el-form-item :label="$t('table.enabled')">
        <el-radio-group v-model="company.status">
          <el-radio :label="1">{{ $t('form.yes') }}</el-radio>
          <el-radio :label="2">{{ $t('form.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('table.uniform')" prop="invoiceNumber">
        <el-input v-model="company.invoiceNumber"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   icon="el-icon-edit"
                   @click="onSubmit('companyFrom')">{{$t('form.apply')}}</el-button>
        <el-button v-if="!isEdit" @click="resetForm('companyFrom')">{{$t('form.clear')}}</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import {fetchList, getCompany, updateCompany, createCompany} from '@/api/company';

const defaultCompany = {
  companyName: '',
  status: 0,
  invoiceNumber: ''
};
export default {
  name: "CompanyDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      company: Object.assign({}, defaultCompany),
      selectCompanyList: [],

    }
  },
  created() {
    if (this.isEdit) {
      getCompany(this.$route.query.id).then(response => {
        this.company = response.data;
      });
    } else {
      this.company = Object.assign({}, defaultCompany);
    }
    this.getSelectCompanyList();
  },
  methods: {

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('form.confirm'), this.$t('form.hint'), {
            confirmButtonText: this.$t('form.apply'),
            cancelButtonText: this.$t('form.cancel'),
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateCompany(this.$route.query.id, this.company).then(response => {
                this.$message({
                  message: this.$t('form.success'),
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createCompany(this.company).then(response => {
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
      this.company = Object.assign({}, defaultCompany);
      this.getSelectCompanyList();
    },
  }
}

</script>

<style scoped>

</style>
