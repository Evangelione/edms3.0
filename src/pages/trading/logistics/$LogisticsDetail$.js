import React, { Component } from 'react'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PromptModal from '../../../components/PromptModal'
import LogisticsInfo from './components/LogisticsInfo/index'
import FleetList from './components/FleetList/index'
import LogisticsHistory from './components/LogisticsHistory/index'
import ReconciliationHistory from './components/ReconciliationHistory/index'

const TabPane = Tabs.TabPane

@connect(({logistics, loading}) => ({
  logistics,
  loading: loading.models.logistics,
}))

  // 动态路由页面，参考https://umijs.org/zh/guide/router.html#%E5%8F%AF%E9%80%89%E7%9A%84%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1
class logisticsDetail extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'logistics/inquireLogisticsInfoById',
      payload: {
        id: this.props.match.params.LogisticsDetail,
      },
    })
  }

  changeCurrentTabs = (activeKey) => {
    this.props.dispatch({
      type: 'logistics/save',
      payload: {
        logisticsInfoCurrentTabs: activeKey,
      },
    })
  }

  deleteLogistics = (id) => {
    this.props.dispatch({
      type: 'logistics/deleteLogistics',
      payload: {
        id,
      },
    })
  }

  render() {
    const {logisticsInfoCurrentTabs} = this.props.logistics
    const {company} = this.props.location.query
    const {LogisticsDetail} = this.props.match.params
    return (
      <>
        <div className='toolbar'>
          <Button type='primary' icon='rollback' onClick={() => router.goBack()}>返回</Button>
          <img src={require('@/assets/image/point.png')}
               style={{margin: '0 20px 0 40px'}} alt="" />
          <span className='font-purple-color' style={{fontWeight: 'bold'}}>{company}</span>
          {logisticsInfoCurrentTabs === '1' ?
            <div style={{float: 'right'}}>
              <PromptModal state='deleteLogistics' id={LogisticsDetail}>
                <Button className='red-btn-line'>删除物流</Button>
              </PromptModal>
            </div>
            :
            null}
        </div>
        {/*antd组件->页签*/}
        <Tabs activeKey={logisticsInfoCurrentTabs} onChange={this.changeCurrentTabs}
              style={{padding: '12px 24px 60px'}}>
          {/*单个页签*/}
          <TabPane tab="物流信息" key="1">
            <LogisticsInfo />
          </TabPane>
          <TabPane tab="车队列表" key="2">
            <FleetList />
          </TabPane>
          <TabPane tab="物流历史" key="3">
            <LogisticsHistory />
          </TabPane>
          <TabPane tab="对账历史" key="4">
            <ReconciliationHistory />
          </TabPane>
        </Tabs>
      </>
    )
  }
}

export default logisticsDetail
