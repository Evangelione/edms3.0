import request from '@/common/request'
// import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchOrderList({page}) {
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
