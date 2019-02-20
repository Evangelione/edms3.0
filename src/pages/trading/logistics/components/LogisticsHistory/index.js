import React, { Component } from 'react'
import { DatePicker, Select, Button, Pagination, Table } from 'antd'
import { connect } from 'dva'
import { logisticsHistoryColumns } from '@/common/tableColumns'

const Option = Select.Option

// 物流历史
// 链接model
@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
class Index extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    selectedRowKeys: [],
  }

  // 日期组件可选开始时间
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  // 日期组件可选结束时间
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  // 开始时间修改
  onStartChange = (value) => {
    this.onChange('startValue', value)
  }

  // 结束时间修改
  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  // 将选择的行记录到state
  onSelectedRowKeysChange = (selectedRowKeys, datasource) => {
    this.setState({ selectedRowKeys })
  }

  // 点击行改变选中状态
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
    } else {
      selectedRowKeys.push(record.id)
    }
    // if (record.account_status !== '1') {
    //   return false
    // }
    this.setState({ selectedRowKeys })
  }

  render() {
    const { startValue, endValue, endOpen, selectedRowKeys } = this.state
    const { logistics, loading } = this.props
    const { logisticsHistoryList, logisticsHistoryPage, logisticsHistoryTotal } = logistics
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      // getCheckboxProps: record => ({
      //   disabled: record.account_status !== '1', // Column configuration not to be checked
      //   // name: record.name,
      // }),
    }
    return (
      <>
        {/*{this.renderStatusBox()}*/}
        <div style={{ textAlign: 'right', fontSize: '1rem', margin: '5px 0 20px' }}>
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
          <span style={{ margin: '0 12px 0 20px' }}>状态</span>
          <Select defaultValue="jack" style={{ width: '8.75rem', marginRight: 20 }}>
            <Option value="jack">销售额</Option>
            <Option value="lucy">利润贡献</Option>
            <Option value="Yiminghe">贡献占比</Option>
          </Select>
          <Button className={!selectedRowKeys.length ? '' : 'ant-btn-primary'} style={{ marginRight: 10 }}
                  disabled={!selectedRowKeys.length}>对账</Button>
          <Button type='primary'>全部对账</Button>
        </div>
        <div className='table-container'>
          <Table
            columns={logisticsHistoryColumns}
            dataSource={logisticsHistoryList}
            rowSelection={rowSelection}
            loading={loading}
            pagination={false}
            rowKey={record => record.id}
            highLightColor={'#aaa'}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? 'oddRow' : 'evenRow'
            }}
            onRow={(record) => ({
              onClick: () => {
                this.selectRow(record)
              },
            })}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Pagination current={logisticsHistoryPage} total={logisticsHistoryTotal} />
        </div>
      </>
    )
  }
}

export default Index
