<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="device"
             :rules="rules"
             ref="deviceForm"
             label-width="150px">


      <div v-if="this.isEdit===true">
        <el-form-item :label="$t('table.device_number')">
          <el-input v-model="device.deviceSn" style="width: 250px" disabled></el-input>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item :label="$t('table.device_number')">
          <el-input v-model="device.deviceSn" style="width: 250px"></el-input>
        </el-form-item>
      </div>

      <el-form-item :label="$t('table.device_custodian')">
        <el-select v-model="device.orgId"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in selectOrgList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('table.city')">
        <el-select v-model="device.cityId"
                   @change="changeCity"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in selectCityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item :label="$t('table.area')">
        <el-select v-model="device.areaId"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in areaName"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('table.address')" prop="name">
        <el-input v-model="device.address"></el-input>
      </el-form-item>

      <el-form-item :label="$t('table.device_type')">
        <el-select v-model="device.deviceType"
                   :placeholder="$t('placeholder.choose')">
          <el-option
            v-for="item in selectDeviceCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('table.enabled')">
        <el-radio-group v-model="device.status">
          <el-radio :label="1">{{ $t('form.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('form.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('deviceForm')">{{ $t('form.apply') }}</el-button>
        <el-button type="primary" @click="onCancel('deviceForm')">{{ $t('form.cancel') }}</el-button>
        <el-button type="primary" v-if="!isEdit" @click="resetForm('deviceForm')">{{ $t('form.clear') }}</el-button>

      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  fetchList, createDevice, updateDevice,
  getDevice, fetchOrgList, fetchCityList,
  fetchDeviceCateList, fetchCityAreaList
} from '@/api/device';

const defaultDevice = {
  title: '',
  deviceSn: '',
  address: '',
  cityId: null,
  status: 1
};
export default {
  name: "DeviceDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      device: Object.assign({}, defaultDevice),
      selectDeviceList: [],
      selectOrgList: [],
      selectCityList: [], //城市列表
      selectAreaList: [], //行政區列表
      selectDeviceCateList: [],
      areaName: [],
      cityId: 0,
      areaId: 0,
      cityFlag: false,
      areaFlag: false,
      rules: {}
    }
  },
  created() {
    if (this.isEdit) {
      getDevice(this.$route.query.id).then(response => {
        this.device = response.data;
        console.log("cityId====>" + this.device.cityId);
        this.areaName = [];
        fetchCityAreaList(this.device.cityId, {pageSize: 100, pageNum: 1}).then(response => {
          this.areaName = response.data.list;
        });
      });
    } else {
      this.device = Object.assign({}, defaultDevice);
    }
    this.getSelectDeviceList();
    this.getSelectDeviceCateList();
    this.getSelectOrgList();
    this.getSelectCityList();

  },
  methods: {
    //根據cityId獲取行政區列表
    changeCity(val) {
      console.log("val====>" + val);
      if (val === null) {

      } else {
        console.log(val);
        // const roles=[];
        this.areaName = [];
        fetchCityAreaList(val, {pageSize: 100, pageNum: 1}).then(response => {
          this.areaName = response.data.list;
        });
        // for(var i of this.selectAreaList){
        //   if(val === i.cityId){
        //     console.log(i.name);
        //     roles.push({id:i.id,name:i.name})
        //   }
        // }
        //this.areaName= roles;
      }
    },
    getSelectDeviceList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectDeviceList = response.data.list;
        this.selectDeviceList.unshift({id: 0, title: '無上級選單'});
      });
    },
    getSelectOrgList() {
      fetchOrgList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectOrgList = response.data.list;
        this.selectOrgList.unshift({id: 0, name: '請設定單位'});
      });
    },
    getSelectCityList() {
      fetchCityList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectCityList = response.data.list;
        this.selectCityList.unshift({id: 0, name: '請設定所屬縣市'});
      });
    },

    getSelectDeviceCateList() {
      fetchDeviceCateList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectDeviceCateList = response.data.list;
        this.selectDeviceCateList.unshift({id: 0, name: '請選擇設備類型'});
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
              updateDevice(this.$route.query.id, this.device).then(response => {
                this.$message({
                  message: this.$t('form.success'),
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createDevice(this.device).then(response => {
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
      this.device = Object.assign({}, defaultDevice);
      this.getSelectDeviceList();
    },
    onCancel(formName){
      this.$router.back();
    }
  }
}

</script>

<style scoped>

</style>
