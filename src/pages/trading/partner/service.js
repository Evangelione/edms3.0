import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchPartnerList({ page, find_str }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('find_str', find_str)
  return request(`${IP}/index/partner/list`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchMenuList() {
  return request(`${IP}/index/role/menu-list`, {
    method: 'GET',
  })
}

export function insertPartner(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    if (key === 'role_menu') {
      formData.append(key, JSON.stringify(form[key]) || '')
    } else {
      formData.append(key, form[key] || '')
    }
  })
  return request(`${IP}/index/partner/add`, {
    method: 'POST',
    body: formData,
  })
}


export function inquirePartnerInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/partner/info`, {
    method: 'POST',
    body: formData,
  })
}

export function updatePartnerInfoById(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    if (key === 'role_menu') {
      formData.append(key, JSON.stringify(form[key]) || '')
    } else {
      formData.append(key, form[key] || '')
    }
  })
  return request(`${IP}/index/partner/update`, {
    method: 'POST',
    body: formData,
  })
}

export function disabledPartner(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/partner/forbidden`, {
    method: 'POST',
    body: formData,
  })
}

// export function upLoadExcel(file) {
//   let formData = new FormData()
//   formData.append(file.filename, file.file)
//   return request(file.action, {
//     method: 'POST',
//     body: formData,
//   })
// }
