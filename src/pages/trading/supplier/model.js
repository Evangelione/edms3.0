import { message } from 'antd'
import * as supplierService from './service'
import { IP, PAGE_LIMIT } from '@/common/constants'

export default {
  namespace: 'supplier',
  state: {
    supplierList: [],
    supplierPage: 1,
    supplierTotal: 0,
    currentSupplierInfo: {},
    supp_name: '',
    gasSourceList: [],
    gasSourcePage: 1,
    gasSourceTotal: 0,
    currentGasSourceInfo: {},
    report_url: '',
    file_name: '',
    goods_name: '',
    salesHistoryList: [],
    salesHistoryPage: 1,
    salesHistoryTotal: 0,
    reconciliationHistoryList: [{
      id: '1',
      kh: '胡彦斌12',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      id: '2',
      kh: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }],
    reconciliationHistoryPage: 1,
    reconciliationHistoryTotal: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // if (pathname === '/') {
        //   dispatch({type: 'count', payload: query})
        //   dispatch({type: 'customerPer', payload: query})
        //   dispatch({type: 'supplierPer', payload: query})
        //   dispatch({type: 'logistics', payload: query})
        //   dispatch({type: 'trend', payload: query})
        // }
        // dispatch({
        //   type: `${pathname.substr(1)}/fetch`,
        //   payload: {},
        // })
      })
    },
  },

  effects: {

    //我的供应商：对账历史-车牌-气源-站点Select
    * supp_fetchCorderGoodsConditionList({ payload: { id } }, { call, put }) {
      const { data } = yield call(supplierService.supp_fetchCorderGoodsConditionList, { id })
      if (parseInt(data.code, 10) === 1) {
        yield put({
          type: 'save',
          payload: {
            supp_CorderGoodsConditionList: data.data,
          },
        })
        const methodData = {
          supplier_id: id,
          time_start: '',
          time_end: '',
          supp_goods_id: data.data.goods[0].id,
          cust_site_id: data.data.sites[0].id,
          status: '',
          page: 1,
          limit: PAGE_LIMIT,
        }
        yield put({ type: 'supplier/supp_fetchReconciliationHistoryPageList', payload: { methodData } })
      } else {
        message.error(data.msg)
      }

    },
    //我的供应商：对账历史列表
    * supp_fetchReconciliationHistoryPageList({ payload: { methodData } }, { call, put }) {
      const { data } = yield call(supplierService.supp_fetchReconciliationHistoryPageList, { methodData })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            supp_ReconciliationHistoryPageList: data.data,
            supp_ReconciliationHistoryPageListMethod: methodData,
          },
        })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-明细
    * supp_fetchCorderDetail({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderDetail, { id })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            supp_CorderDetail: data.data,
          },
        })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-删除
    * supp_fetchCorderDelete({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderDelete, { id })
      const methodData = yield select(state => state.supplier.supp_ReconciliationHistoryPageListMethod)
      parseInt(data.code, 10) === 1 ?
        yield put({ type: 'supplier/supp_fetchReconciliationHistoryPageList', payload: { methodData } })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-对账
    * supp_fetchCorderReconciliation({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderReconciliation, { id })
      const methodData = yield select(state => state.supplier.supp_ReconciliationHistoryPageListMethod)
      parseInt(data.code, 10) === 1 ?
        yield put({ type: 'supplier/supp_fetchReconciliationHistoryPageList', payload: { methodData } })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-结款
    * supp_fetchCorderPayment({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderPayment, { id })
      const methodData = yield select(state => state.supplier.supp_ReconciliationHistoryPageListMethod)
      parseInt(data.code, 10) === 1 ?
        yield put({ type: 'supplier/supp_fetchReconciliationHistoryPageList', payload: { methodData } })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-开票
    * supp_fetchCorderInvoice({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderInvoice, { id })
      const methodData = yield select(state => state.supplier.supp_ReconciliationHistoryPageListMethod)
      parseInt(data.code, 10) === 1 ?
        yield put({ type: 'supplier/supp_fetchReconciliationHistoryPageList', payload: { methodData } })
        :
        message.error(data.msg)
    },
    //我的供应商：对账历史-导出
    * supp_fetchCorderExport({ payload: { id } }, { call, put, select }) {
      const { data } = yield call(supplierService.supp_fetchCorderExport, { id })
      if (!(parseInt(data.code, 10) === 1)) {
        message.error(data.msg)
      }
    },


    * fetchSupplierList({ payload: { page = 1, supp_name = '' } }, { call, put }) {
      const { data } = yield call(supplierService.fetchSupplierList, { page, supp_name })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            supplierList: data.data.list,
            supplierPage: parseInt(page, 10),
            supplierTotal: parseInt(data.data.total, 10),
            supp_name,
          },
        })
        :
        message.error(data.msg)
    },
    * insertSupplier({ payload: { form } }, { call }) {
      const { data } = yield call(supplierService.insertSupplier, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateSupplierInfo({ payload: { form } }, { call }) {
      const { data } = yield call(supplierService.updateSupplierInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateSupplierContact({ payload: { form } }, { call }) {
      const { data } = yield call(supplierService.updateSupplierContact, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * getSupplierInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(supplierService.getSupplierInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentSupplierInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * setSupplierFinance({ payload: form }, { call }) {
      const { data } = yield call(supplierService.setSupplierFinance, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * fetchGasSourceList({ payload: { page = 1, supp_id, goods_name = '' } }, { call, put }) {
      const { data } = yield call(supplierService.fetchGasSourceList, { page, supp_id, goods_name })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            gasSourceList: data.data.list,
            gasSourcePage: parseInt(page, 10),
            gasSourceTotal: parseInt(data.data.total, 10),
            goods_name,
          },
        })
        :
        message.error(data.msg)
    },
    * insertGasSource({ payload: { form } }, { call }) {
      const { data } = yield call(supplierService.insertGasSource, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateGasSourceInfo({ payload: { form } }, { call }) {
      const { data } = yield call(supplierService.updateGasSourceInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * inquireGasSourceInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(supplierService.inquireGasSourceInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentGasSourceInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * deleteGasSource({ payload: { id } }, { call }) {
      const { data } = yield call(supplierService.deleteGasSource, id)
      parseInt(data.code, 10) === 1 ?
        message.success('已移除')
        :
        message.error(data.msg)
    },
    * upLoadExcel({ payload: { file } }, { call }) {
      const { data } = yield call(supplierService.upLoadExcel, file)
      try {
        parseInt(data.code, 10) === 1 ?
          message.success(`导入成功 ${data.num.success_num} 条`)
          :
          message.error(data.msg)
      } catch (e) {
        message.error(e)
      }
    },
    * postReport({ payload: { file, id } }, { call, put }) {
      const { data } = yield call(supplierService.postReport, { file, id })
      if (data.code === 1) {
        file.onProgress({ percent: 100 })
        file.onSuccess()
        yield put({
          type: 'save',
          payload: {
            report_url: data.data.report_url,
            file_name: data.data.filename,
          },
        })
      }
    },
    * fetchSalesHistoryList({ payload: { page = 1, supplier_id } }, { call, put }) {
      const { data } = yield call(supplierService.fetchSalesHistoryList, { page, supplier_id })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            salesHistoryList: data.data.list,
            salesHistoryPage: parseInt(page, 10),
            salesHistoryTotal: parseInt(data.data.total, 10),
          },
        })
        :
        message.error(data.msg)
    },
    * deleteSupp({ payload: { id } }, { call }) {
      const { data } = yield call(supplierService.deleteSupp, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
