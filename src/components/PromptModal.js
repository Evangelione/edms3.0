import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { connect } from 'dva'
import images from '../utils/images'
import router from 'umi/router'

@connect()
class PromptModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modalState: {
        deleteSite: {
          icon: 'cancel',
          okText: '确认移除',
          cancelText: '取消',
          text: '是否确认移除站点？',
          okHandler: this.delteSite,
        },
        allClientReconciliation: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '确认后，以下全部页面显示的订单都将加入对账单，是否继续操作？',
          okHandler: this.allClientReconciliation,
        },
        disablePartner: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '是否禁用伙伴？（禁用后可以重新启用）',
          okHandler: this.disablePartner,
        },
        enablePartner: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '是否启用伙伴？',
          okHandler: this.enablePartner,
        },
        deleteLogistics: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '是否确认删除此条物流信息？',
          okHandler: this.deleteLogistics,
        },
        deleteClient: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '是否确认删除此条客户信息？',
          okHandler: this.deleteClient,
        },
        deleteSupp: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '是否确认删除此条供应商信息？',
          okHandler: this.deleteSupp,
        },
      },
    }
  }

  showModel = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModel = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
    })
  }
  delteSite = (e) => {
    e && e.stopPropagation()
    this.props.dispatch({
      type: 'client/deleteSite',
      payload: {
        id: this.props.id,
      },
    }).then(this.hideModel())
  }

  allClientReconciliation = (e) => {
    e && e.stopPropagation()
    this.props.dispatch({
      type: 'supplier/Reconciliation2',
      payload: {
        stime: this.props.stime,
        etime: this.props.etime,
        account_status: this.props.account_status,
        supp_id: this.props.supp_id,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
      this.props.dispatch({
        type: 'supplier/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          supp_id: this.props.supp_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
      this.props.callback()
    })
  }

  disablePartner = () => {
    this.props.dispatch({
      type: 'partner/disabledPartner',
      payload: {
        id: this.props.id,
      },
    }).then(() => {
      this.hideModel()
      this.props.dispatch({
        type: 'partner/fetchPartnerList',
        payload: {
          page: this.props.page,
        },
      })
    })
  }

  enablePartner = () => {
    this.props.dispatch({
      type: 'partner/disabledPartner',
      payload: {
        id: this.props.id,
      },
    }).then(() => {
      this.hideModel()
      this.props.dispatch({
        type: 'partner/fetchPartnerList',
        payload: {
          page: this.props.page,
        },
      })
    })
  }

  deleteLogistics = (e) => {
    e && e.stopPropagation()
    this.props.dispatch({
      type: 'logistics/deleteLogistics',
      payload: {
        id: this.props.id,
      },
    }).then(() => {
      router.push({
        pathname: '/trading/logistics',
      })
    })
  }

  deleteClient = (e) => {
    e && e.stopPropagation()
    this.props.dispatch({
      type: 'client/deleteClient',
      payload: {
        id: this.props.id,
      },
    }).then(() => {
      router.push({
        pathname: '/trading/client',
      })
    })
  }

  deleteSupp = (e) => {
    e && e.stopPropagation()
    this.props.dispatch({
      type: 'supplier/deleteSupp',
      payload: {
        id: this.props.id,
      },
    }).then(() => {
      router.push({
        pathname: '/trading/supplier',
      })
    })
  }

  render() {
    const { children, state } = this.props
    const modalState = this.state.modalState[state]
    return (
      <div style={{ display: 'inline-block' }} onClick={this.showModel}>
        {children}
        <Modal
          title='提示'
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModel}
          bodyStyle={{ textAlign: 'center', fontSize: '1rem' }}
          destroyOnClose={true}
          width={600}
        >
          <img src={images[modalState.icon]} alt="" style={{ marginTop: 10 }} />
          <div style={{ marginTop: 10, marginLeft: 20 }} className='font-purple-color'>{modalState.text}</div>
          <div style={{ margin: '55px 0 30px' }}>
            <Button onClick={modalState.okHandler} style={{ marginRight: 20 }}
                    className='ant-btn-primary'>{modalState.okText}</Button>
            <Button
              onClick={modalState.cancelHandler ? modalState.cancelHandler : this.hideModel}>{modalState.cancelText}</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default PromptModal
