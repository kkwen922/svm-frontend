import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/deviceCategory/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/deviceCategory/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function updateDeviceCate(id, data) {

  return request({
    url: '/deviceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteDeviceCate(id) {

  return request({
    url: '/deviceCategory/delete/' + id,
    method: 'post'
  })
}

export function createDeviceCate(data) {
  return request({
    url: '/deviceCategory/create',
    method: 'post',
    data: data
  })
}


