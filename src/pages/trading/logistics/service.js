import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchLogisticsList({page, logistics_name}) {
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

export function fetchFleetList({page, id}) {
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
