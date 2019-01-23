import { message } from 'antd'
import * as logisticsService from './service'

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
    logisticsHistoryList: [{
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
    logisticsHistoryPage: 1,
    logisticsHistoryTotal: 0,
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
    reconciliationHistoryPage: 0,
    reconciliationHistoryTotal: 0,
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
      })
    },
  },

  effects: {
    * fetchLogisticsList({payload: {page = 1, logistics_name = ''}}, {call, put}) {
      const {data} = yield call(logisticsService.fetchLogisticsList, {page, logistics_name})
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
    * insertLogistics({payload: {form}}, {call}) {
      const {data} = yield call(logisticsService.insertLogistics, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * updateLogisticsInfo({payload: {form}}, {call}) {
      const {data} = yield call(logisticsService.updateLogisticsInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * inquireLogisticsInfoById({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.inquireLogisticsInfoById, id)
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
    * deleteLogistics({payload: {id}}, {call}) {
      const {data} = yield call(logisticsService.deleteLogistics, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * fetchFleetList({payload: {page = 1, id}}, {call, put}) {
      const {data} = yield call(logisticsService.fetchFleetList, {page, id})
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
    * insertFleet({payload: {form}}, {call}) {
      const {data} = yield call(logisticsService.insertFleet, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * deleteFleet({payload: {id}}, {call}) {
      const {data} = yield call(logisticsService.deleteFleet, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * upLoadExcel({payload: {file}}, {call}) {
      const {data} = yield call(logisticsService.upLoadExcel, file)
      try {
        parseInt(data.code, 10) === 1 ?
          message.success(`导入成功 ${data.num.success_num} 条`)
          :
          message.error(data.msg)
      } catch (e) {
        message.error(e)
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
