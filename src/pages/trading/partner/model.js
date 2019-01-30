import { message } from 'antd'
import * as partnerService from './service'

export default {
  namespace: 'partner',
  state: {
    partnerList: [{
      company_name: 1,
      id: 22,
      user: 111,
      phone: 18989898989,
    }],
    partnerPage: 1,
    partnerTotal: 0,
    find_str: '',
    menu_list: [],
    currentPartnerInfo: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      })
    },
  },

  effects: {
    * fetchPartnerList({ payload: { page = 1, find_str = '' } }, { call, put }) {
      const { data } = yield call(partnerService.fetchPartnerList, { page, find_str })
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            partnerList: data.data.list,
            partnerPage: parseInt(page, 10),
            partnerTotal: parseInt(data.data.total, 10),
            find_str,
          },
        })
        :
        message.error(data.msg)
    },
    * fetchMenuList({ payload }, { call, put }) {
      const { data } = yield call(partnerService.fetchMenuList)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            menu_list: data.data.list,
          },
        })
        :
        message.error(data.msg)
    },
    * insertPartner({ payload: { form } }, { call }) {
      const { data } = yield call(partnerService.insertPartner, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * inquirePartnerInfoById({ payload: { id } }, { call, put }) {
      const { data } = yield call(partnerService.inquirePartnerInfoById, id)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentPartnerInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * updatePartnerInfoById({ payload: { form } }, { call }) {
      const { data } = yield call(partnerService.updatePartnerInfoById, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * disabledPartner({ payload: { id } }, { call }) {
      const { data } = yield call(partnerService.disabledPartner, id)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
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
      return { ...state, ...action.payload }
    },
  },
}
