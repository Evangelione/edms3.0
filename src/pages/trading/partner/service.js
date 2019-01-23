import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


export function fetchPartnerList({page, partner_name}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('partner_name', partner_name)
  return request(`${IP}/index/partner/partner-list`, {
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
