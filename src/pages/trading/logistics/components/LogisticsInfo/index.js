import React, { Component } from 'react'
import { Row, Col } from 'antd'
import InfoCard from './InfoCard'
import ContactCard from './ContactCard'
import FinanceCard from './FinanceCard'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: false,
      editContact: false,
      editFinance: false,
    }
  }

  render() {
    return (
      // 分三个组件写的，都在./目录下
      <div style={{marginTop: 5}}>
        <Row gutter={36}>
          <Col span={8}>
            <InfoCard />
          </Col>
          <Col span={7} xxl={8}>
            <ContactCard />
          </Col>
          <Col span={9} xxl={8}>
            <FinanceCard />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index
