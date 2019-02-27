import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchClientList({page, customer_name}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('customer_name', customer_name)
  return request(`${IP}/index/cust/page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertClient(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/cust/add-cust`, {
    method: 'POST',
    body: formData,
  })
}

export function updateClientInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/cust/update-cust`, {
    method: 'POST',
    body: formData,
  })
}

export function updateClientContact(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/cust/update-contact`, {
    method: 'POST',
    body: formData,
  })
}


export function inquireClientInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/cust-info`, {
    method: 'POST',
    body: formData,
  })
}

export function setClientFinance(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/cust/set-finance`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchSiteList({page, customer_id, site_name}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('customer_id', customer_id)
  formData.append('site_name', site_name)
  return request(`${IP}/index/site/list`, {
    method: 'POST',
    body: formData,
  })
}

export function insertSite(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/site/add-site`, {
    method: 'POST',
    body: formData,
  })
}

export function updateSiteInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/site/update-site`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireSiteInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/site/site-info`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteSite(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/site/delete`, {
    method: 'POST',
    body: formData,
  })
}


export function upLoadExcel(file) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}
