import * as globalServices from '../services/global'
import router from 'umi/router'
import { message } from 'antd'

export default {
  namespace: 'global',
  state: {
    menuPath: '/trading',
    linkPath: '/report',
    cascadeOptions: [],
    clientInfoCurrentTabs: '1',
    supplierInfoCurrentTabs: '1',
    platformId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
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
    //退出登录
    * fetchLogout({ payload: {} }, { call, put }) {
      const { data } = yield call(globalServices.fetchLogout, {})
      if (parseInt(data.code) === 1) {
        localStorage.removeItem('userData')
        router.push({ pathname: '/login' })
      } else {
        message.error(data.msg)
      }


    },

    * inquireCascadeOptions({ payload: { module, district_name = '', targetOption } }, { call, put, select }) {
      const { data } = yield call(globalServices.inquireCascadeOptions, { module, district_name })
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
    * inquireCascadeOptionsAll({ payload: { module, province, city } }, { call, put }) {
      const { data } = yield call(globalServices.inquireCascadeOptionsAll, { module, province, city })
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
    * login({ payload: { form } }, { call }) {
      const { data } = yield call(globalServices.login, form)
      if (parseInt(data.code, 10) === 1) {
        message.success(data.msg)
        localStorage.setItem('userData', JSON.stringify(data.data.user))
        router.push({
          pathname: '/trading/order',
        })
      } else {
        message.error(data.msg)
        localStorage.removeItem('userData')
      }

    },
    * logout({ payload }, { call, put }) {
      const { data } = yield call(globalServices.logout)
      parseInt(data.code, 10) === 1 ?
        message.success(data.msg)
        :
        message.error(data.msg)
    },
    * checkLogin({ payload }, { call, put }) {
      const { data } = yield call(globalServices.checkLogin)
      if (parseInt(data.code, 10) === 1) {
        console.log(data)
        message.success(data.msg)
        localStorage.setItem('userData', JSON.stringify(data.data.user))
        router.push({
          pathname: '/trading/order',
        })
      } else {
        // message.error(data.msg)
        localStorage.removeItem('userData')
      }
    },
    * getPlatFormId({ payload: { str } }, { call, put }) {
      const { data } = yield call(globalServices.getPlatFormId, str)
      parseInt(data.code, 10) === 1 ?
        yield put({
          type: 'save',
          payload: {
            platformId: data.data.id,
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
