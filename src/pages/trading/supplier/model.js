import { message } from 'antd'
import * as supplierService from './service'

export default {
  namespace: 'supplier',
  state: {
    supplierInfoCurrentTabs: '1',
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
    salesHistoryList: [{
      id: '1',
      cp: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      id: '2',
      cp: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }],
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
