import request from '@/utils/request'

export function fetchList(params) {

  console.info("fetchList()->/inventory/list", params);

  return request({
    url: '/inventory/list',
    method: 'get',
    params: params
  })
}



