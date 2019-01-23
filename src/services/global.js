import request from '@/common/request'
import { IP } from '@/common/constants'


export function inquireCascadeOptions({module, district_name}) {
  let formData = new FormData()
  formData.append('district_name', district_name)
  return request(`${IP}/index/${module}/district`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireCascadeOptionsAll({module, province, city}) {
  let formData = new FormData()
  formData.append('province', province)
  formData.append('city', city)
  return request(`${IP}/index/${module}/district-all`, {
    method: 'POST',
    body: formData,
  })
}
