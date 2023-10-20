import request from '@/utils/request'

export function fetchList(params) {
  console.info("fetchList()->/device/list", params);
  return request({
    url: '/device/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/device/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function updateDevice(id, data) {

  return request({
    url: '/device/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteDevice(id) {

  return request({
    url: '/device/delete/' + id,
    method: 'post'
  })
}

export function createDevice(data) {
  return request({
    url: '/device/create',
    method: 'post',
    data: data
  })
}

export function getDevice(id) {

  return request({
    url: '/device/' + id,
    method: 'get',
  })
}

export function getArea(id) {

  return request({
    url: '/area/' + id,
    method: 'get',
  })
}

export function fetchCityList(params) {

  return request({
    url: '/city/list',
    method: 'get',
    params: params
  })
}

export function fetchAreaList(params) {

  return request({
    url: '/area/list',
    method: 'get',
    params: params
  })
}

export function fetchCityAreaList(id, params) {

  return request({
    url: '/area/listCityArea/' + id,
    method: 'get',
    params: params
  })
}

/listCityArea/

export function fetchDeviceCateList(params) {

  console.info("fetchCateList()->/deviceCategory/list", params);

  return request({
    url: '/deviceCategory/list',
    method: 'get'
  })
}

export function fetchOrgList(params) {

  console.info("fetchOrgList()->/org/listD", params);

  return request({
    url: '/org/listD',
    method: 'get'
  })
}


export function fetchMapList(params) {
  console.info("fetchList()->/device/listmap");
  return request({
    url: '/device/listmap',
    method: 'get'
  })
}

