import request from '@/utils/request'

export function login(username, password) {
  console.info("login->/admin/login ", username);
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  console.info("getInfo()->/admin/info");
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  console.info("logout()->/admin/logout");
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  console.info("fetchList()->/admin/list", params);
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function fetchMyList(params) {
  console.info("fetchList()->/admin/listMyAccount", params);
  return request({
    url: '/admin/listMyAccount',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  console.info("createAdmin()->/admin/register", data);
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  console.info("updateAdmin()->/admin/update", id, data);

  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  console.info("updateStatus()->/admin/updateStatus", id, params);

  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function updatePassword(id, params) {
  console.info("updatePassword()->/admin/updatePassword", id, params);

  return request({
    url: '/admin/updatePassword/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  console.info("deleteAdmin()->/admin/delete", id);

  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  console.info("getRoleByAdmin()->/admin/role", id);

  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  console.info("allocRole()->/admin/role/update", data);

  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}

export function fetchOrgList(params) {

  console.info("fetchOrgList()->/org/listD", params);

  return request({
    url: '/org/listD',
    method: 'get'
  })
}
