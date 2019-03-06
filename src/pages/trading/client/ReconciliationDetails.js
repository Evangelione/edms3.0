import React, { Component } from 'react'
import { Button, DatePicker, Select, Table, Pagination } from 'antd'
import { connect } from 'dva'
import { salesHistoryColumns } from '@/common/tableColumns'
import router from 'umi/router'
import { IP } from '@/common/constants'

const Option = Select.Option

@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))
class ReconciliationDetails extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    selectedRowKeys: [],
  }

  componentDidMount() {
    console.log(this.props)
    this.props.dispatch({
      type: 'client/fetchOrderCondition',
      payload: {
        customer_id: this.props.location.query.id,
      },
    }).then(() => {
      const { clientCondition } = this.props.client
      console.log(clientCondition)
      this.setState({
        supp_goods_id: clientCondition.goods[0].id,
        cust_site_id: clientCondition.sites[0].id,
      })
      this.props.dispatch({
        type: 'client/fetchReconciliationDetail',
        payload: {
          id: this.props.location.query.id,
        },
      })
    })
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  pageChange = (page) => {
    this.props.dispatch({
      type: 'client/fetchReconciliationDetail',
      payload: {
        id: this.props.location.query.id,
        page,
      },
    })
  }

  confirmReconciliation = (id) => {
    this.props.dispatch({
      type: 'client/confirmReconciliation',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'client/fetchReconciliationDetail',
        payload: {
          id: this.props.location.query.id,
        },
      })
    })
  }

  payment = (id) => {
    this.props.dispatch({
      type: 'client/payment',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'client/fetchReconciliationDetail',
        payload: {
          id: this.props.location.query.id,
        },
      })
    })
  }

  billing = (id) => {
    this.props.dispatch({
      type: 'client/billing',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'client/fetchReconciliationDetail',
        payload: {
          id: this.props.location.query.id,
        },
      })
    })
  }

  render() {
    const { company } = this.props.location.query
    const { startValue, endValue, endOpen } = this.state
    const { client, loading } = this.props
    const { detailHistoryList, detailHistoryPage, detailHistoryTotal } = client
    console.log(this.props)
    return (
      <div>
        <div className='toolbar'>
          <Button type='primary' icon='rollback' onClick={() => router.goBack()}>返回</Button>
          <img src={require('@/assets/image/point.png')}
               style={{ margin: '0 20px 0 40px' }} alt="" />
          <span className='font-purple-color' style={{ fontWeight: 'bold' }}>{company}</span>
          <span className='font-purple-color'
                style={{ marginLeft: 40 }}>销售对账明细&nbsp;&nbsp;&nbsp;&nbsp;{company} 至 {company}</span>
          <div style={{ float: 'right' }}>
            <Button type='primary' style={{ marginRight: 10 }} onClick={() => {
              window.location.href = `${IP}/index/cust/corder-export?id=${this.props.location.query.id}`
            }}>全部导出</Button>
            <Button type='primary' style={{ marginRight: 10 }} disabled={this.props.location.query.status !== '61'}
                    onClick={this.confirmReconciliation.bind(null, this.props.location.query.id)}>确认对账</Button>
            <Button type='primary' style={{ marginRight: 10 }}
                    disabled={this.props.location.query.payment_status === '1'}
                    onClick={this.payment.bind(null, this.props.location.query.id)}>确认付款</Button>
            <Button type='primary' onClick={this.billing.bind(null, this.props.location.query.id)}
                    disabled={this.props.location.query.invoice_status === '1'}>确认开票</Button>
          </div>
        </div>
        {/*<Tabs defaultActiveKey='1' style={{padding: '12px 24px 60px'}}>*/}
        {/*<TabPane tab="对账明细" key="1">*/}
        {/**/}
        {/*</TabPane>*/}
        {/*</Tabs>*/}
        <div style={{ padding: '0px 24px 60px' }}>
          <div style={{ textAlign: 'right', fontSize: '1rem', margin: '20px 0px' }}>
            <span style={{ marginRight: 10 }}>装车时间</span>
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime
              format="YYYY-MM-DD HH:mm"
              value={startValue}
              placeholder="起始时间"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <span style={{ margin: '0 10px' }}>-</span>
            <DatePicker
              disabledDate={this.disabledEndDate}
              showTime
              format="YYYY-MM-DD HH:mm"
              value={endValue}
              placeholder="截止时间"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
            />
            <span style={{ margin: '0 12px 0 20px' }}>车牌</span>
            <Select defaultValue="jack" style={{ width: '8.75rem' }}>
              <Option value="jack">销售额</Option>
              <Option value="lucy">利润贡献</Option>
              <Option value="Yiminghe">贡献占比</Option>
            </Select>
            <span style={{ margin: '0 12px 0 20px' }}>气源</span>
            <Select defaultValue="jack" style={{ width: '8.75rem' }}>
              <Option value="jack">销售额</Option>
              <Option value="lucy">利润贡献</Option>
              <Option value="Yiminghe">贡献占比</Option>
            </Select>
            <span style={{ margin: '0 12px 0 20px' }}>站点</span>
            <Select defaultValue="jack" style={{ width: '8.75rem' }}>
              <Option value="jack">销售额</Option>
              <Option value="lucy">利润贡献</Option>
              <Option value="Yiminghe">贡献占比</Option>
            </Select>
            {/*<span style={{ margin: '0 12px 0 20px' }}>状态</span>*/}
            {/*<Select defaultValue="" style={{ width: '8.75rem' }}>*/}
            {/*<Option value="" style={{ color: '#7B7B7B' }}>全部</Option>*/}
            {/*<Option value="1" style={{ color: '#FFAD4D' }}>对账中</Option>*/}
            {/*<Option value="2" style={{ color: '#8FCBFF' }}>已对账</Option>*/}
            {/*<Option value="3" style={{ color: '#91A5F5' }}>已开票</Option>*/}
            {/*</Select>*/}
          </div>
          <div className='table-container'>
            <Table
              columns={salesHistoryColumns}
              dataSource={detailHistoryList}
              loading={loading}
              pagination={false}
              rowKey={record => record.id}
              highLightColor={'#aaa'}
              rowClassName={(record, index) => {
                return index % 2 === 0 ? 'oddRow' : 'evenRow'
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Pagination defaultCurrent={detailHistoryPage} total={detailHistoryTotal} onChange={this.pageChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default ReconciliationDetails
