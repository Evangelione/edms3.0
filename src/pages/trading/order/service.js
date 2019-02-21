import request from '@/common/request'

import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchOrderList({ page, status }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('status', status)
  return request(`${IP}/index/order/page`, {
    method: 'POST',
    body: formData,
  })
  // return fetch('/api/order-list').then(response => response.json()).then(data => {
  //   return data
  // })
}

export function upLoadExcel(file) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function inquireSiteSelectInfoByCreatePlan(id) {
  let formData = new FormData()
  formData.append('customer_id', id)
  return request(`${IP}/index/site/list`, {
    method: 'POST',
    body: formData,
  })
}


export function submitCreatePlan(form) {
  let formData = new FormData()
  formData.append('sites', JSON.stringify(form))
  return request(`${IP}/index/order/customer-order-add`, {
    method: 'POST',
    body: formData,
  })
}

export function schedulingLogistics(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/order/dispatch`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireLogisticsSelectByLogisticsScheduling() {
  return request(`${IP}/index/logistics/list`, {
    method: 'GET',
  })
}


export function inquireLogisticsInfoByLogisticsScheduling(ids) {
  let formData = new FormData()
  Object.keys(ids).forEach((key, i) => {
    formData.append(key, ids[key] || '')
  })
  return request(`${IP}/index/driver/driver-car-ganged-list`, {
    method: 'POST',
    body: formData,
  })
}


export function inquireSuppInfoByOrderPurchase() {
  return request(`${IP}/index/supp/list`, {
    method: 'GET',
  })
}

export function inquireGasInfoByOrderPurchase(id) {
  let formData = new FormData()
  formData.append('supp_id', id)
  return request(`${IP}/index/goods/list`, {
    method: 'POST',
    body: formData,
  })
}

export function purchase(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/order/purchase`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireClientSelectInfoBySalesBilling() {
  return fetch('/api/client-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireSiteSelectInfoBySalesBilling() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}


export function inquireSupplierSelectInfoByOrderPurchase() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireGasSelectInfoByOrderPurchase() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireOrderInfoByOrderConfirm() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireSiteSelectInfoByOrderConfirm() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireGasSelectInfoByOrderConfirm() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function fetchClientSelect() {
  return request(`${IP}/index/cust/list`, {
    method: 'GET',
  })
}
