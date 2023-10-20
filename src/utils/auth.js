import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
  //console.info("get token:",TokenKey);
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  //console.info("set token:",token);
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  //console.info("remove token:",TokenKey);
  return Cookies.remove(TokenKey)
}
