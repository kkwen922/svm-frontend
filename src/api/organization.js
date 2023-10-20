import request from '@/utils/request'

export function listTreeTable() {
  return request({
    url: '/org/treeList/',
    method: 'get',
  })
}

export function listLevel(params) {
  return request({
    url: '/org/listLevel/',
    method: 'get',
    params: params
  })
}

export function fetchList(parentId, params) {
  return request({
    url: '/org/list/' + parentId,
    method: 'get',
    params: params
  })
}

export function createOrganization(data) {
  return request({
    url: '/org/create',
    method: 'post',
    data: data
  })
}

export function updateOrganization(id, data) {

  console.info("org updateOrganization: ", id);

  return request({
    url: '/org/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  console.info("org updateStatus:", id, params);
  return request({
    url: '/org/updateStatus/' + id,
    method: 'post',
    params: params
  })

}

export function deleteOrganization(id) {
  console.info("deleteOrganization()->/org/delete", id);

  return request({
    url: '/org/delete/' + id,
    method: 'post'
  })
}

export function getOrganization(id) {

  console.info("getOrganization()->/org/", id);

  return request({
    url: '/org/' + id,
    method: 'get',
  })
}


