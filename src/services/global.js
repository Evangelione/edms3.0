import request from '@/common/request'
import { IP } from '@/common/constants'


export function inquireCascadeOptions({ module, district_name }) {
  let formData = new FormData()
  formData.append('district_name', district_name)
  return request(`${IP}/index/${module}/district`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireCascadeOptionsAll({ module, province, city }) {
  let formData = new FormData()
  formData.append('province', province)
  formData.append('city', city)
  return request(`${IP}/index/${module}/district-all`, {
    method: 'POST',
    body: formData,
  })
}

export function login({ account, pwd, platform_id, remember }) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  formData.append('platform_id', platform_id)
  formData.append('remember', remember)
  return request(`${IP}/index/login/login`, {
    method: 'POST',
    body: formData,
  })
}

export function logout() {
  return request(`${IP}/index/login/logout`, {
    method: 'GET',
  })
}

export function checkLogin() {
  return request(`${IP}/index/login/check-login?t=${new Date().getTime()}`, {
    method: 'GET',
  })
}
