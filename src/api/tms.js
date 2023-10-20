import request from '@/utils/request'

export function fetchList(params) {

  console.info("fetchList()->/tms/list", params);

  return request({
    url: '/tms/list',
    method: 'get',
    params: params
  })
}



