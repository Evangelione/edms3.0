import { message } from 'antd'
import * as logisticsService from './service'
import * as clientService from '@/pages/trading/client/service'

// 有些是假数据，未对接口
export default {
  namespace: 'logistics',
  state: {
    logisticsInfoCurrentTabs: '1',
    logisticsList: [],
    logisticsPage: 1,
    logisticsTotal: 0,
    currentLogisticsInfo: {},
    fleetList: [],
    fleetPage: 1,
    fleetTotal: 0,
    logisticsHistoryList: [],
    logisticsHistoryPage: 1,
    logisticsHistoryTotal: 0,
    reconciliationHistoryList: [],
    reconciliationHistoryPage: 0,
    reconciliationHistoryTotal: 0,
    logisticsCondition: {},
    detailHistoryList: [],
    detailHistoryPage: 1,
    detailHistoryTotal: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      })
    },
  },

  effects: {
    // 获取物流列表
    * fetchLogisticsList({ payload: { page = 1, logistics_name = '' } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchLogisticsList, { page, logistics_name })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            logisticsList: data.data.list,
            logisticsPage: parseInt(page, 10),
            logisticsTotal: parseInt(data.data.total, 10),
            logistics_name,
          },
        })
        :
        message.error(data.msg)
    },
    // 新增物流
    * insertLogistics({ payload: { form } }, { call }) {
      const { data } = yield call(logisticsService.insertLogistics, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 修改物流
    * updateLogisticsInfo({ payload: { form } }, { call }) {
      const { data } = yield call(logisticsService.updateLogisticsInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 根据id查询物流详情
    * inquireLogisticsInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(logisticsService.inquireLogisticsInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentLogisticsInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    // 删除物流
    * deleteLogistics({ payload: { id } }, { call }) {
      const { data } = yield call(logisticsService.deleteLogistics, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 获取车队列表
    * fetchFleetList({ payload: { page = 1, id } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchFleetList, { page, id })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            fleetList: data.data.list,
            fleetPage: parseInt(page, 10),
            fleetTotal: parseInt(data.data.total, 10),
          },
        })
        :
        message.error(data.msg)
    },
    // 新增车队
    * insertFleet({ payload: { form } }, { call }) {
      const { data } = yield call(logisticsService.insertFleet, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 更新车队
    * updateFleet({ payload: { form } }, { call }) {
      const { data } = yield call(logisticsService.updateFleet, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 删除车队
    * deleteFleet({ payload: { id } }, { call }) {
      const { data } = yield call(logisticsService.deleteFleet, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    // 上传excel
    * upLoadExcel({ payload: { file } }, { call }) {
      const { data } = yield call(logisticsService.upLoadExcel, file)
      try {
        parseInt(data.code, 10) === 1 ?
          message.success(`导入成功 ${data.num.success_num} 条`)
          :
          message.error(data.msg)
      } catch (e) {
        message.error(e)
      }
    },
    // 删除车队中的车挂
    * deleteFleetCarBody({ payload: { id, car_body_id } }, { call }) {
      const { data } = yield call(logisticsService.deleteFleetCarBody, id, car_body_id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * fetchLogisticsHistory({ payload: { page = 1, form } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchLogisticsHistory, form, page)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            logisticsHistoryList: data.data.list,
            logisticsHistoryPage: parseInt(page, 10),
            logisticsHistoryTotal: parseInt(data.data.total, 10),
          },
        })
        :
        message.error(data.msg)
    },
    * fetchLogisticsCondition({ payload: { logistics_id } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchLogisticsCondition, logistics_id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            logisticsCondition: data.data,
          },
        })
        :
        message.error(data.msg)
    },
    * fetchReconciliationHistory({ payload: { form, page = 1 } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchReconciliationHistory, form, page)
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
    * deleteReconciliationHistory({ payload: { id } }, { call, put }) {
      const { data } = yield call(logisticsService.deleteReconciliationHistory, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * confirmReconciliation({ payload: { id } }, { call, put }) {
      const { data } = yield call(logisticsService.confirmReconciliation, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * payment({ payload: { id } }, { call, put }) {
      const { data } = yield call(logisticsService.payment, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * billing({ payload: { id } }, { call, put }) {
      const { data } = yield call(logisticsService.billing, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * fetchReconciliationDetail({ payload: { page = 1, id } }, { call, put }) {
      const { data } = yield call(logisticsService.fetchReconciliationDetail, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            detailHistoryList: data.data.list,
            detailHistoryPage: parseInt(page, 10),
            detailHistoryTotal: parseInt(data.data.total, 10),
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
