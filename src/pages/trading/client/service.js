import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchClientList({ page, customer_name }) {
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
  return request(`${IP}/index/cust/add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateClientInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/cust/update`, {
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
  return request(`${IP}/index/cust/info`, {
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

export function fetchSiteList({ page, customer_id, site_name }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('customer_id', customer_id)
  formData.append('site_name', site_name)
  return request(`${IP}/index/site/page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertSite(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/site/add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateSiteInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/site/update`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireSiteInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/site/info`, {
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

export function fetchOrderCondition(customer_id) {
  let formData = new FormData()
  formData.append('customer_id', customer_id)
  return request(`${IP}/index/cust/corder-condition`, {
    method: 'POST',
    body: formData,
  })
}


export function fetchClientHistory(form, page) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  return request(`${IP}/index/cust/order-page`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchReconciliationHistory(form, page) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  return request(`${IP}/index/cust/corder-page`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteReconciliationHistory(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/corder-delete`, {
    method: 'POST',
    body: formData,
  })
}


export function confirmReconciliation(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/corder-confirm`, {
    method: 'POST',
    body: formData,
  })
}

export function payment(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/corder-pay`, {
    method: 'POST',
    body: formData,
  })
}

export function billing(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/corder-invoice`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchReconciliationDetail(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/corder-detail`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteClient(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/cust/delete`, {
    method: 'POST',
    body: formData,
  })
}
