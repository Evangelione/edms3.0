import React, { Component } from 'react'
import { Button } from 'antd'
import CreatePlan from './Modals/CreatePlan'
import SalesBilling from './Modals/SalesBilling'
import LogisticsScheduling from './Modals/LogisticsScheduling'
import OrderPurchase from './Modals/OrderPurchase'
import OrderConfirm from './Modals/OrderConfirm'

class JudgeModal extends Component {
  state = {
    modal: 'SalesBilling',
  }

  render() {
    const { modal } = this.state
    return (
      <div style={{ display: 'inline-block' }}>
        {modal === 'CreatePlan' ? <CreatePlan>
            <Button type='primary'>新增订单</Button>
          </CreatePlan> :
          modal === 'SalesBilling' ? <SalesBilling>
              <Button type='primary'>新增订单</Button>
            </SalesBilling> :
            modal === 'LogisticsScheduling' ? <LogisticsScheduling>
                <Button type='primary'>新增订单</Button>
              </LogisticsScheduling> :
              modal === 'OrderPurchase' ? <OrderPurchase>
                  <Button type='primary'>新增订单</Button>
                </OrderPurchase> :
                modal === 'OrderConfirm' ? <OrderConfirm>
                    <Button type='primary'>新增订单</Button>
                  </OrderConfirm> :
                  null}
      </div>
    )
  }
}

export default JudgeModal
