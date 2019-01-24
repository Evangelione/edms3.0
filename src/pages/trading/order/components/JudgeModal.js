import React, { Component } from 'react'
import { Button } from 'antd'
import CreatePlan from './Modals/CreatePlan'
import SalesBilling from './Modals/SalesBilling'
import LogisticsScheduling from './Modals/LogisticsScheduling'

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
            </LogisticsScheduling> : null}
      </div>
    )
  }
}

export default JudgeModal
