import { message } from 'antd'
import * as orderService from './service'

export default {
  namespace: 'order',
  state: {
    orderList: [{
      id: 1,
      order_status: '待收货',
      order_make_time: '19-09-04 14:00:22',
      order_id: 'DD2029391029394123',
      car_body_code: '京AB3412',
      seller: {
        name: '济南实华',
        buy_num: '20.000',
        buy_price: '186000.00',
        gas_name: '董家口气',
        actual_buy_num: '20.000',
        take_time: '19-12-02 16:12',
      },
      buyer: [{
        name: '奥德燃气',
        sell_num: '10.000',
        sell_price: '142345.00',
        gas_name: '大同加气站',
        actual_sell_num: '3.000',
        take_time: '19-12-02 6:12',
      }],
    }, {
      id: 2,
      order_status: '2',
      order_make_time: '19-09-04 14:00:22',
      order_id: 'DD2029391029394122',
      car_body_code: '京AB3413',
      seller: {
        name: '济南实华',
        buy_num: '20.000',
        buy_price: '186000.00',
        gas_name: '董家口气',
        actual_buy_num: '20.000',
        take_time: '19-12-02 11:12',
      },
      buyer: [{
        name: '奥德燃气',
        sell_num: '10.000',
        sell_price: '188900.00',
        gas_name: '凯旋LNG加气站',
        actual_sell_num: '9.000',
        take_time: '19-12-02 12:12',
      }, {
        name: '奥德燃气',
        sell_num: '10.000',
        sell_price: '186000.00',
        gas_name: '大同加气站',
        actual_sell_num: '8.000',
        take_time: '19-12-02 16:12',
      }],
    }],
    orderPage: 1,
    orderTotal: 0,
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
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
      })
    },
  },

  effects: {
    * fetchOrderList({payload: {page = 1}}, {call, put}) {
      const data = yield call(orderService.fetchOrderList, {page})
      // parseInt(data.code, 10) === 1 ?
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       orderList: data.data.list,
      //       orderPage: parseInt(page, 10),
      //       orderTotal: parseInt(data.data.total, 10),
      //     },
      //   })
      //   :
      //   message.error(data.msg)
      yield put({
        type: 'save',
        payload: {
          orderList: data,
        },
      })
    },
    * upLoadExcel({payload: {file}}, {call}) {
      const {data} = yield call(orderService.upLoadExcel, file)
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
