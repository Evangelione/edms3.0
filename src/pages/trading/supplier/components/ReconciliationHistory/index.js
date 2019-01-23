import React, { Component } from 'react'
import { DatePicker, Select, Table, Pagination } from 'antd'
import { connect } from 'dva'
import { clientReconciliationHistoryColumns } from '@/common/tableColumns'

const Option = Select.Option

@connect(({supplier, loading}) => ({
  supplier,
  loading: loading.models.supplier,
}))
class Index extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
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
      this.setState({endOpen: true})
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open})
  }


  render() {
    const {startValue, endValue, endOpen} = this.state
    const {supplier, loading} = this.props
    const {reconciliationHistoryList, reconciliationHistoryPage, reconciliationHistoryTotal} = supplier
    return (
      <>
        <div style={{textAlign: 'right', fontSize: '1rem', margin: '5px 0 20px'}}>
          <span style={{marginRight: 10}}>装车时间</span>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm"
            value={startValue}
            placeholder="起始时间"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <span style={{margin: '0 10px'}}>-</span>
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
          <span style={{margin: '0 12px 0 20px'}}>车牌</span>
          <Select defaultValue="jack" style={{width: '8.75rem'}}>
            <Option value="jack">销售额</Option>
            <Option value="lucy">利润贡献</Option>
            <Option value="Yiminghe">贡献占比</Option>
          </Select>
          <span style={{margin: '0 12px 0 20px'}}>气源</span>
          <Select defaultValue="jack" style={{width: '8.75rem'}}>
            <Option value="jack">销售额</Option>
            <Option value="lucy">利润贡献</Option>
            <Option value="Yiminghe">贡献占比</Option>
          </Select>
          <span style={{margin: '0 12px 0 20px'}}>站点</span>
          <Select defaultValue="jack" style={{width: '8.75rem'}}>
            <Option value="jack">销售额</Option>
            <Option value="lucy">利润贡献</Option>
            <Option value="Yiminghe">贡献占比</Option>
          </Select>
          <span style={{margin: '0 12px 0 20px'}}>状态</span>
          <Select defaultValue="" style={{width: '8.75rem'}}>
            <Option value="" style={{color: '#7B7B7B'}}>全部</Option>
            <Option value="1" style={{color: '#FFAD4D'}}>对账中</Option>
            <Option value="2" style={{color: '#8FCBFF'}}>已对账</Option>
            <Option value="3" style={{color: '#91A5F5'}}>已开票</Option>
          </Select>
        </div>
        <div className='table-container'>
          <Table
            columns={clientReconciliationHistoryColumns}
            dataSource={reconciliationHistoryList}
            loading={loading}
            pagination={false}
            rowKey={record => record.id}
            highLightColor={'#aaa'}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? 'oddRow' : 'evenRow'
            }}
          />
        </div>
        <div style={{textAlign: 'center', marginTop: 40}}>
          <Pagination current={reconciliationHistoryPage} total={reconciliationHistoryTotal} />
        </div>
      </>
    )
  }
}

export default Index
