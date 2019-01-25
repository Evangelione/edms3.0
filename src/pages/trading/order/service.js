import request from '@/common/request'

// import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchOrderList({ page }) {
  return fetch('/api/order-list').then(response => response.json()).then(data => {
    return data
  })
  // let formData = new FormData()
  // formData.append('page', page)
  // formData.append('limit', PAGE_LIMIT)
  // return request(`${IP}/index/cust/cust-list`, {
  //   method: 'POST',
  //   body: formData,
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

export function inquireSiteSelectInfoByCreatePlan() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
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

export function inquireSiteInfoByLogisticsScheduling() {
  return fetch('/api/site-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireLogisticsInfoByLogisticsScheduling() {
  return fetch('/api/client-select').then(response => response.json()).then(data => {
    return data
  })
}

export function inquireSiteInfoByOrderPurchase() {
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
