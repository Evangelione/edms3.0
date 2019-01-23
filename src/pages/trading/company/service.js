import request from '@/common/request'
import { IP } from '@/common/constants'


export function fetchCompanyInfo() {
  return request(`${IP}/index/my-company/info`, {
    method: 'GET',
  })
}

export function updateCompanyInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/my-company/update-company`, {
    method: 'POST',
    body: formData,
  })
}
