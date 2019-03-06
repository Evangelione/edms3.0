import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchLogisticsList({ page, logistics_name }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('find_str', logistics_name)
  return request(`${IP}/index/logistics/page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertLogistics(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/logistics/add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateLogisticsInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/logistics/update`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireLogisticsInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/info`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteLogistics(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/delete`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchFleetList({ page, id }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('id', id)
  return request(`${IP}/index/driver/driver-car-page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertFleet(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/driver/driver-car-add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateFleet(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/driver/driver-car-update`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteFleet(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/driver/driver-car-delete`, {
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


export function deleteFleetCarBody(id, car_body_id) {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('car_body_id', car_body_id)
  return request(`${IP}/index/driver/driver-car-remove`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchLogisticsHistory(form, page) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  return request(`${IP}/index/logistics/order-page`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchLogisticsCondition(logistics_id) {
  let formData = new FormData()
  formData.append('logistics_id', logistics_id)
  return request(`${IP}/index/logistics/corder-condition`, {
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
  return request(`${IP}/index/logistics/corder-page`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteReconciliationHistory(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/corder-delete`, {
    method: 'POST',
    body: formData,
  })
}


export function confirmReconciliation(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/corder-confirm`, {
    method: 'POST',
    body: formData,
  })
}

export function payment(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/corder-pay`, {
    method: 'POST',
    body: formData,
  })
}

export function billing(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/corder-invoice`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchReconciliationDetail(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/logistics/corder-detail`, {
    method: 'POST',
    body: formData,
  })
}
