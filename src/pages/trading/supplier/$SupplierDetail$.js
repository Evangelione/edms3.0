import React, { Component } from 'react'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import SupplierInfo from './components/SupplierInfo/index'
import PurchasingGasSource from './components/PurchasingGasSource/index'
import PurchaseHistory from './components/PurchaseReconciliation/index'
import ReconciliationHistory from './components/ReconciliationHistory/index'

const TabPane = Tabs.TabPane

@connect(({supplier, loading}) => ({
  supplier,
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
      type: 'supplier/save',
      payload: {
        supplierInfoCurrentTabs: activeKey,
      },
    })
  }

  render() {
    const {supplierInfoCurrentTabs, currentSupplierInfo} = this.props.supplier
    const {company} = this.props.location.query
    return (
      <>
        <div className='toolbar'>
          <Button type='primary' icon='rollback' onClick={() => router.goBack()}>返回</Button>
          <img src={require('@/assets/image/point.png')}
               style={{margin: '0 20px 0 40px'}} alt="" />
          <span className='font-purple-color' style={{fontWeight: 'bold'}}>{company}</span>
          {supplierInfoCurrentTabs === '1' ?
            <Button className='red-btn-line' style={{float: 'right', marginTop: 20}}>删除供应商</Button>
            :
            null}
        </div>
        <Tabs activeKey={supplierInfoCurrentTabs} onChange={this.changeCurrentTabs} style={{padding: '12px 24px 60px'}}>
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
