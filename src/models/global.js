import * as globalServices from '../services/global'
import { message } from 'antd'

export default {
  namespace: 'global',
  state: {
    menuPath: '/trading',
    linkPath: '/report',
    cascadeOptions: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        let arr = pathname.split('/')
        dispatch({
          type: 'save',
          payload: {
            menuPath: '/' + arr[1],
            linkPath: '/' + arr[2],
          },
        })
      })
    },
  },

  effects: {
    * inquireCascadeOptions({payload: {module, district_name = '', targetOption}}, {call, put, select}) {
      const {data} = yield call(globalServices.inquireCascadeOptions, {module, district_name})
      if (parseInt(data.code) === 1) {
        if (!targetOption) {
          // 根节点数据
          yield put({
            type: 'save',
            payload: {
              cascadeOptions: data.data.list,
            },
          })
        } else {
          // 非根节点
          targetOption.loading = false
          targetOption.children = data.data.list
          const cascadeOptions = yield select(state => state.global.cascadeOptions)
          yield put({
            type: 'save',
            payload: {
              cascadeOptions: [...cascadeOptions],
            },
          })
        }
      }
    },
    * inquireCascadeOptionsAll({payload: {module, province, city}}, {call, put}) {
      const {data} = yield call(globalServices.inquireCascadeOptionsAll, {module, province, city})
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            cascadeOptions: data.data,
          },
        })
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
