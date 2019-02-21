import { message } from 'antd'
import * as orderService from './service'

export default {
  namespace: 'order',
  state: {
    orderList: [],
    orderPage: 1,
    orderTotal: 0,
    orderStatus: '',
    currentOrderNum: 0,
    orderMapDetail: {
      client: [{
        name: '山东实华天然气',
        contact: '张三',
        contact_phone: '18989898989',
        saler_num: '20.000',
        saler_price: '4500.00',
        saler_total: '90000.00',
        type: '预付款',
      }],
      site: [{
        name: '中石油济南第七加气站（加气站）',
        contact: '张三',
        contact_phone: '18989898989',
        province: '山东省',
        city: '济南市',
        area: '槐荫区',
        address: '王府井公交停车场',
        plan_num: '20.000',
        plan_time: '2019-02-02 14:00',
        site_type: '加气站',
      }],
      supplier: {
        name: '中石油山东昆仑',
        contact: '张三',
        contact_phone: '18989898989',
        purchase_num: '20.000',
        purchase_price: '4500.00',
        purchase_total: '90000.00',
        type: '预付款',
      },
      gas: {
        name: '昆仑黄冈液化天然气',
        contact: '张三',
        contact_phone: '18989898989',
        origin: '董家口气',
        province: '山东省',
        city: '济南市',
        area: '槐荫区',
        address: '王府井公交停车场',
        logistics_type: '我方配送',
        plan_time: '2019-02-02 14:01',
      },
      logistics: {
        name: '中石油山东昆仑',
        contact: '张三',
        contact_phone: '18989898989',
        distance: '200.00',
        log_price: '15.00',
        log_total: '3000.00',
        type: '预付款',
      },
    },
    clientSelectInfoBySalesBilling: {},
    siteSelectInfoBySalesBilling: {},
    logisticsSelectByLogisticsScheduling: {},
    supplierSelectInfoByOrderPurchase: {},
    gasSelectInfoByOrderPurchase: {},
    orderInfoByOrderConfirm: {},
    siteSelectInfoByOrderConfirm: {},
    gasSelectInfoByOrderConfirm: {},
    clientSelectByCreatePlan: [],
    siteSelectByCreatePlan: [],
    logisticsDriverList: [],
    logisticsCarHeadList: [],
    logisticsCarBodyList: [],
    suppInfoByOrderPurchase: [],
    gasInfoByOrderPurchase: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      })
    },
  },

  effects: {
    * fetchOrderList({ payload: { page = 1, status = '' } }, { call, put }) {
      const { data } = yield call(orderService.fetchOrderList, { page, status })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            orderList: data.data.list,
            orderPage: parseInt(page, 10),
            orderTotal: parseInt(data.data.total, 10),
            orderStatus: status,
          },
        })
        :
        message.error(data.msg)
      // yield put({
      //   type: 'save',
      //   payload: {
      //     orderList: data,
      //   },
      // })
    },
    * upLoadExcel({ payload: { file } }, { call }) {
      const { data } = yield call(orderService.upLoadExcel, file)
      try {
        parseInt(data.code, 10) === 1 ?
          message.success(`导入成功 ${data.num.success_num} 条`)
          :
          message.error(data.msg)
      } catch (e) {
        message.error(e)
      }
    },

    * inquireClientSelectInfoBySalesBilling({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireClientSelectInfoBySalesBilling, file)
      yield put({
        type: 'save',
        payload: {
          clientSelectInfoBySalesBilling: data,
        },
      })
    },
    * inquireSiteSelectInfoBySalesBilling({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireSiteSelectInfoBySalesBilling, file)
      yield put({
        type: 'save',
        payload: {
          siteSelectInfoBySalesBilling: data,
        },
      })
    },

    * inquireLogisticsSelectByLogisticsScheduling({ payload }, { call, put }) {
      const { data } = yield call(orderService.inquireLogisticsSelectByLogisticsScheduling)
      yield put({
        type: 'save',
        payload: {
          logisticsSelectByLogisticsScheduling: data.data.list,
        },
      })
    },

    * inquireLogisticsInfoByLogisticsScheduling({ payload: ids }, { call, put }) {
      const { data } = yield call(orderService.inquireLogisticsInfoByLogisticsScheduling, ids)
      let field
      if (ids.car_head_id) { // 请求body
        field = 'logisticsCarBodyList'
      } else if (ids.driver_id) { // 请求head
        field = 'logisticsCarHeadList'
      } else { // 请求driver
        field = 'logisticsDriverList'
      }
      yield put({
        type: 'save',
        payload: {
          [field]: data.data.list,
        },
      })
    },
    * inquireSuppInfoByOrderPurchase({ payload }, { call, put }) {
      const { data } = yield call(orderService.inquireSuppInfoByOrderPurchase)
      yield put({
        type: 'save',
        payload: {
          suppInfoByOrderPurchase: data.data.list,
        },
      })
    },
    * inquireGasInfoByOrderPurchase({ payload: { id } }, { call, put }) {
      const { data } = yield call(orderService.inquireGasInfoByOrderPurchase, id)
      yield put({
        type: 'save',
        payload: {
          gasInfoByOrderPurchase: data.data.list,
        },
      })
    },

    * purchase({ payload: { form } }, { call, put }) {
      const { data } = yield call(orderService.purchase, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },

    * inquireSupplierSelectInfoByOrderPurchase({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireSupplierSelectInfoByOrderPurchase, file)
      yield put({
        type: 'save',
        payload: {
          supplierSelectInfoByOrderPurchase: data,
        },
      })
    },
    * inquireGasSelectInfoByOrderPurchase({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireGasSelectInfoByOrderPurchase, file)
      yield put({
        type: 'save',
        payload: {
          gasSelectInfoByOrderPurchase: data,
        },
      })
    },
    * inquireOrderInfoByOrderConfirm({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireOrderInfoByOrderConfirm, file)
      yield put({
        type: 'save',
        payload: {
          orderInfoByOrderConfirm: data,
        },
      })
    },
    * inquireSiteSelectInfoByOrderConfirm({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireSiteSelectInfoByOrderConfirm, file)
      yield put({
        type: 'save',
        payload: {
          siteSelectInfoByOrderConfirm: data,
        },
      })
    },
    * inquireGasSelectInfoByOrderConfirm({ payload: { file } }, { call, put }) {
      const data = yield call(orderService.inquireGasSelectInfoByOrderConfirm, file)
      yield put({
        type: 'save',
        payload: {
          gasSelectInfoByOrderConfirm: data,
        },
      })
    },
    * fetchClientSelect({ payload }, { call, put }) {
      const { data } = yield call(orderService.fetchClientSelect)
      yield put({
        type: 'save',
        payload: {
          clientSelectByCreatePlan: data.data.list,
        },
      })
    },
    * inquireSiteSelectInfoByCreatePlan({ payload: { id } }, { call, put }) {
      const { data } = yield call(orderService.inquireSiteSelectInfoByCreatePlan, id)
      yield put({
        type: 'save',
        payload: {
          siteSelectByCreatePlan: data.data.list,
        },
      })
    },
    * submitCreatePlan({ payload: { form } }, { call, put }) {
      const { data } = yield call(orderService.submitCreatePlan, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * schedulingLogistics({ payload: { form } }, { call, put }) {
      const { data } = yield call(orderService.schedulingLogistics, form)
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
