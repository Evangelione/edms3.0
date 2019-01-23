export default {
  namespace: 'trading',
  state: {},

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

  effects: {},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
