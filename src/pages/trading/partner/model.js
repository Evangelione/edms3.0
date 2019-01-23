import {message} from 'antd'
import * as partnerService from './service'

export default {
  namespace: 'partner',
  state: {
    partnerList: [{
      company_name: 1,
      id: 22,
      user: 111,
      phone: 18989898989
    }],
    partnerPage: 1,
    partnerTotal: 0,
    partner_name: '',
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
      })
    },
  },

  effects: {
    * fetchPartnerList({payload: {page = 1, partner_name = ''}}, {call, put}) {
      const {data} = yield call(partnerService.fetchPartnerList, {page, partner_name})
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            partnerList: data.data.list,
            partnerPage: parseInt(page, 10),
            partnerTotal: parseInt(data.data.total, 10),
            partner_name,
          },
        })
        :
        message.error(data.msg)
    },
    // * upLoadExcel({payload: {file}}, {call}) {
    //   const {data} = yield call(partnerService.upLoadExcel, file)
    //   try {
    //     parseInt(data.code, 10) === 1 ?
    //       message.success(`导入成功 ${data.num.success_num} 条`)
    //       :
    //       message.error(data.msg)
    //   } catch (e) {
    //     message.error(e)
    //   }
    // },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
