import { message } from 'antd'
import * as companyService from './service'

export default {
  namespace: 'company',
  state: {
    companyInfoCurrentTabs: '1',
    currentCompanyInfo: {},
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
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
    * fetchCompanyInfo({payload}, {call, put}) {
      const {data} = yield call(companyService.fetchCompanyInfo)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            currentCompanyInfo: data.data.info,
          },
        })
        :
        message.error(data.msg)
    },
    * updateCompanyInfo({payload: {form}}, {call}) {
      const {data} = yield call(companyService.updateCompanyInfo, form)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
