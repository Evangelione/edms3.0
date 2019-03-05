import request from '@/common/request'
import { IP, PAGE_LIMIT } from '@/common/constants'


//我的供应商：对账历史-车牌-气源-站点Select
export function supp_fetchCorderGoodsConditionList({ id }) {
  return request(`${IP}/index/supp/corder-condition?id=${id}`)
}
//我的供应商：对账历史列表
export function supp_fetchReconciliationHistoryPageList({methodData}) {
    const {
        supplier_id,
        time_start,
        time_end,
        supp_goods_id,
        cust_site_id,
        status,
        page,
        limit,
    } = methodData;
  return request(`${IP}/index/supp/corder-page?supplier_id=${
      supplier_id
  }&time_start=${
      time_start
  }&time_end=${
      time_end
  }&supp_goods_id=${
      supp_goods_id
  }&cust_site_id=${
      cust_site_id
  }&status=${
      status
  }&page=${
      page
  }&limit=${
      limit
  }`)
}
//我的供应商：对账历史-明细
export function supp_fetchCorderDetail({id}) {
  return request(`${IP}/index/supp/corder-detail?id=${id}`)
}
//我的供应商：对账历史-删除
export function supp_fetchCorderDelete({ id }) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/supp/corder-delete`, {
    method: 'POST',
    body: formData,
  })
}
//我的供应商：对账历史-对账
export function supp_fetchCorderReconciliation({ id }) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/supp/corder-confirm`, {
    method: 'POST',
    body: formData,
  })
}
//我的供应商：对账历史-结款
export function supp_fetchCorderPayment({ id }) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/supp/corder-pay`, {
    method: 'POST',
    body: formData,
  })
}
//我的供应商：对账历史-开票
export function supp_fetchCorderInvoice({ id }) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/supp/invoice`, {
    method: 'POST',
    body: formData,
  })
}
//我的供应商：对账历史-导出
export function supp_fetchCorderExport({ id }) {
  return request(`${IP}/index/supp/corder-export?id=${id}`)
}


export function fetchSupplierList({ page, supp_name }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('supp_name', supp_name)
  return request(`${IP}/index/supp/page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertSupplier(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/supp/add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateSupplierInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/supp/update`, {
    method: 'POST',
    body: formData,
  })
}

export function updateSupplierContact(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/supp/update-contact`, {
    method: 'POST',
    body: formData,
  })
}


export function getSupplierInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/supp/info`, {
    method: 'POST',
    body: formData,
  })
}

export function setSupplierFinance(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/supp/set-finance`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchGasSourceList({ page, supp_id, goods_name }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('supp_id', supp_id)
  formData.append('goods_name', goods_name)
  return request(`${IP}/index/goods/page`, {
    method: 'POST',
    body: formData,
  })
}

export function insertGasSource(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/goods/add`, {
    method: 'POST',
    body: formData,
  })
}

export function updateGasSourceInfo(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key] || '')
  })
  return request(`${IP}/index/goods/update`, {
    method: 'POST',
    body: formData,
  })
}

export function inquireGasSourceInfoById(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/goods/info`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteGasSource(id) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/index/goods/delete`, {
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

export function postReport({ file, id }) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  formData.append('id', id)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}


export function fetchSalesHistoryList({ page, supplier_id }) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_LIMIT)
  formData.append('supplier_id', supplier_id)
  return request(`${IP}/index/supp/order-page`, {
    method: 'POST',
    body: formData,
  })
}
