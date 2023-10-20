import request from '@/utils/request'


export function fetchEventList(params) {

  console.info("fetchList()->/events/list");

  return request({
    url: '/events/list',
    method: 'get',
    params: params
  })
}

export function fetchList(params) {

  console.info("fetchList()->/operate/list", params);
  console.info("fetchList()->/operate/list", params);
  return request({
    url: '/operate/list',
    method: 'get',
    params: params
  })
}

export function fetchListType(params) {

  console.info("fetchList()->/operate/listType", params);
  return request({
    url: '/operate/listType',
    method: 'get',
    params: params
  })
}


export function fetchEventFail(params) {

  return request({
    url: '/events/getEventFail',
    method: 'get',
    params: params
  })
}


export function fetchDeliverEventFail(params) {

  return request({
    url: '/events/getDeliverEventFail',
    method: 'get',
    params: params
  })
}

export function fetchEventCount() {

  return request({
    url: '/events/getEventCount',
    method: 'get'
  })
}
