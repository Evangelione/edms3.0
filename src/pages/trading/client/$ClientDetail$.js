import React, { Component } from 'react'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import ClientInfo from './components/ClientInfo/index'
import SupplySite from './components/SupplySite/index'
import SalesHistory from './components/SalesReconciliation/index'
import ReconciliationHistory from './components/ReconciliationHistory/index'
import PromptModal from '../../../components/PromptModal'

const TabPane = Tabs.TabPane

@connect(({ client, global, loading }) => ({
  client,
  global,
  loading: loading.models.client,
}))
class clientDetail extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'client/inquireClientInfoById',
      payload: {
        id: this.props.match.params.ClientDetail,
      },
    })
  }

  changeCurrentTabs = (activeKey) => {
    this.props.dispatch({
      type: 'global/save',
      payload: {
        clientInfoCurrentTabs: activeKey,
      },
    })
  }

  render() {
    const { currentClientInfo } = this.props.client
    console.log(currentClientInfo)
    const { clientInfoCurrentTabs } = this.props.global
    const { company } = this.props.location.query
    const { ClientDetail } = this.props.match.params
    return (
      <>
        <div className='toolbar'>
          <Button type='primary' icon='rollback' onClick={() => router.goBack()}>返回</Button>
          <img src={require('@/assets/image/point.png')}
               style={{ margin: '0 20px 0 40px' }} alt="" />
          <span className='font-purple-color' style={{ fontWeight: 'bold' }}>{company}</span>
          {clientInfoCurrentTabs === '1' ?
            <div style={{ float: 'right' }}>
              <PromptModal state='deleteClient' id={ClientDetail}>
                <Button className='red-btn-line'>删除客户</Button>
              </PromptModal>
            </div>
            :
            null}
        </div>
        <Tabs activeKey={clientInfoCurrentTabs} onChange={this.changeCurrentTabs} style={{ padding: '12px 24px 60px' }}>
          <TabPane tab="客户信息" key="1">
            {currentClientInfo.id && <ClientInfo />}
          </TabPane>
          <TabPane tab="供应站点" key="2">
            <SupplySite />
          </TabPane>
          <TabPane tab="销售历史" key="3">
            <SalesHistory />
          </TabPane>
          <TabPane tab="对账历史" key="4">
            <ReconciliationHistory />
          </TabPane>
        </Tabs>
      </>
    )
  }
}

export default clientDetail
