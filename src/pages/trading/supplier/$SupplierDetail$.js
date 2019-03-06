import React, { Component } from 'react'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import SupplierInfo from './components/SupplierInfo/index'
import PurchasingGasSource from './components/PurchasingGasSource/index'
import PurchaseHistory from './components/PurchaseReconciliation/index'
import PromptModal from '../../../components/PromptModal'
import ReconciliationHistory from './components/ReconciliationHistory/index'

const TabPane = Tabs.TabPane

@connect(({ supplier, global, loading }) => ({
  supplier,
  global,
  loading: loading.models.supplier,
}))
class supplierDetail extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'supplier/getSupplierInfoById',
      payload: {
        id: this.props.match.params.SupplierDetail,
      },
    })
  }

  changeCurrentTabs = (activeKey) => {
    this.props.dispatch({
      type: 'global/save',
      payload: {
        supplierInfoCurrentTabs: activeKey,
      },
    })
  }

  render() {
    const { currentSupplierInfo } = this.props.supplier
    const { supplierInfoCurrentTabs } = this.props.global
    const { company } = this.props.location.query
    const { SupplierDetail } = this.props.match.params
    return (
      <>
        <div className='toolbar'>
          <Button type='primary' icon='rollback' onClick={() => router.goBack()}>返回</Button>
          <img src={require('@/assets/image/point.png')}
               style={{ margin: '0 20px 0 40px' }} alt="" />
          <span className='font-purple-color' style={{ fontWeight: 'bold' }}>{company}</span>
          {supplierInfoCurrentTabs === '1' ?
            <div style={{ float: 'right' }}>
              <PromptModal state='deleteSupp' id={SupplierDetail}>
                <Button className='red-btn-line'>删除供应商</Button>
              </PromptModal>
            </div>
            :
            null}
        </div>
        <Tabs activeKey={supplierInfoCurrentTabs} onChange={this.changeCurrentTabs}
              style={{ padding: '12px 24px 60px' }}>
          <TabPane tab="供应商信息" key="1">
            {currentSupplierInfo.id && <SupplierInfo />}
          </TabPane>
          <TabPane tab="采购气源" key="2">
            <PurchasingGasSource />
          </TabPane>
          <TabPane tab="采购历史" key="3">
            <PurchaseHistory />
          </TabPane>
          <TabPane tab="对账历史" key="4">
            <ReconciliationHistory />
          </TabPane>
        </Tabs>
      </>
    )
  }
}

export default supplierDetail
