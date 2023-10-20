import request from '@/utils/request'


export function fetchSaleList(params) {

  console.info("fetchList()->/sales/list");

  return request({
    url: '/sales/list',
    method: 'get',
    params: params
  })
}

export function fetchSaleProdCount() {

  console.info("fetchList()->/sales/getSaleProdCount");

  return request({
    url: '/sales/getSaleProdCount',
    method: 'get',

  })
}

export function fetchTimeAmount() {

  console.info("fetchList()->/sales/getSalesAmount");

  return request({
    url: '/sales/getSalesAmount',
    method: 'get'
  })
}

export function fetchTimeCount() {

  console.info("fetchList()->/sales/getSalesCount");

  return request({
    url: '/sales/getSalesCount',
    method: 'get'
  })
}

export function fetchTodaySalesCount() {

  console.info("fetchList()->/sales/fetchTodaySalesCount");

  return request({
    url: '/sales/getTodaySalesCount',
    method: 'get'
  })
}


export function fetchHotMachineCount() {

  console.info("fetchList()->/sales/getHotMachineCount");

  return request({
    url: '/sales/getHotMachineCount',
    method: 'get'
  })
}


