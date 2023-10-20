import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'
import i18n from '../i18n/i18n'

// 創建axios實例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 請求超時時間
})

// request攔截器
service.interceptors.request.use(config => {

  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 讓每個請求攜帶自定義token 請根據實際情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response 攔截器
service.interceptors.response.use(
  response => {
    /**
     * code 200 == 成功回覆，非200是回覆異常
     */
    const res = response.data
    console.info("response:", response.data);

    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:尚未登入;
      if (res.code === 401) {
        MessageBox.confirm(i18n.t('message.logoutMsg'), i18n.t('form.confirm'), {
          confirmButtonText: i18n.t('form.re_login'),
          cancelButtonText: i18n.t('form.cancel'),
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新實例化vue-router對象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
