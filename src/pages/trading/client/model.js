import { message } from 'antd'
import * as clientService from './service'

export default {
  namespace: 'client',
  state: {
    clientList: [],
    clientPage: 1,
    clientTotal: 0,
    currentClientInfo: {},
    customer_name: '',
    siteList: [],
    sitePage: 1,
    siteTotal: 0,
    currentSiteInfo: {},
    site_name: '',
    salesHistoryList: [],
    salesHistoryPage: 1,
    salesHistoryTotal: 0,
    reconciliationHistoryList: [],
    reconciliationHistoryPage: 1,
    reconciliationHistoryTotal: 0,
    clientCondition: {},
    reconciliationClient: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      })
    },
  },

  effects: {
    * fetchClientList({ payload: { page = 1, customer_name = '' } }, { call, put }) {
      const { data } = yield call(clientService.fetchClientList, { page, customer_name })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            clientList: data.data.list,
            clientPage: parseInt(page, 10),
            clientTotal: parseInt(data.data.total, 10),
            customer_name,
          },
        })
        :
        message.error(data.msg)
    },
    * insertClient({ payload: { form } }, { call }) {
      const { data } = yield call(clientService.insertClient, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateClientInfo({ payload: { form } }, { call }) {
      const { data } = yield call(clientService.updateClientInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateClientContact({ payload: { form } }, { call }) {
      const { data } = yield call(clientService.updateClientContact, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * inquireClientInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(clientService.inquireClientInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentClientInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * setClientFinance({ payload: form }, { call }) {
      const { data } = yield call(clientService.setClientFinance, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * fetchSiteList({ payload: { page = 1, customer_id, site_name = '' } }, { call, put }) {
      const { data } = yield call(clientService.fetchSiteList, { page, customer_id, site_name })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            siteList: data.data.list,
            sitePage: parseInt(page, 10),
            siteTotal: parseInt(data.data.total, 10),
            site_name,
          },
        })
        :
        message.error(data.msg)
    },
    * insertSite({ payload: { form } }, { call }) {
      const { data } = yield call(clientService.insertSite, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateSiteInfo({ payload: { form } }, { call }) {
      const { data } = yield call(clientService.updateSiteInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * inquireSiteInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(clientService.inquireSiteInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentSiteInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * deleteSite({ payload: { id } }, { call }) {
      const { data } = yield call(clientService.deleteSite, id)
      parseInt(data.code, 10) === 1 ?
        message.success('已移除')
        :
        message.error(data.msg)
    },
    * upLoadExcel({ payload: { file } }, { call }) {
      const { data } = yield call(clientService.upLoadExcel, file)
      try {
        parseInt(data.code, 10) === 1 ?
          message.success(`导入成功 ${data.num.success_num} 条`)
          :
          message.error(data.msg)
      } catch (e) {
        message.error(e)
      }
    },
    * fetchOrderCondition({ payload: { customer_id } }, { call, put }) {
      const { data } = yield call(clientService.fetchOrderCondition, customer_id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            clientCondition: data.data,
          },
        })
        :
        message.error(data.msg)
    },
    * fetchClientHistory({ payload: { form, page = 1 } }, { call, put }) {
      const { data } = yield call(clientService.fetchClientHistory, form, page)
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
    * fetchReconciliationHistory({ payload: { form, page = 1 } }, { call, put }) {
      const { data } = yield call(clientService.fetchReconciliationHistory, form, page)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            reconciliationHistoryList: data.data.list,
            reconciliationHistoryPage: parseInt(page, 10),
            reconciliationHistoryTotal: parseInt(data.data.total, 10),
            reconciliationClient: data.data.customer,
          },
        })
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
