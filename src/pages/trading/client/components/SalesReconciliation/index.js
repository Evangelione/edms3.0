import React, { Component } from 'react'
import { Row, Col, Icon, DatePicker, Select, Button, Pagination, Table } from 'antd'
import { connect } from 'dva'
import { salesReconciliationBox } from '@/common/constants'
import { salesHistoryColumns } from '@/common/tableColumns'
import styles from '../../index.less'

const Option = Select.Option

@connect(({client, loading}) => ({
  client,
  loading: loading.models.client,
}))
class Index extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    selectedRowKeys: [],
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

  renderStatusBox = () => {
    return <Row gutter={26} className={styles['status-box']} style={{margin: 0}}>
      {salesReconciliationBox.map((value, index) => (
        <Col span={3} key={index}>
          <div>
            <div className={styles['status-title']}>
              <Icon type="chrome" />
              <div>{value.title}</div>
            </div>
            <div className={styles['level1']}>
              <div>{value.level1}</div>
              <div>12</div>
            </div>
            <div className={styles['level2']}>
              <div>{value.level2}</div>
              <div>2.1 万</div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  }

  onSelectedRowKeysChange = (selectedRowKeys, datasource) => {
    this.setState({selectedRowKeys})
  }

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
    this.setState({selectedRowKeys})
  }

  render() {
    const {startValue, endValue, endOpen, selectedRowKeys} = this.state
    const {client, loading} = this.props
    const {salesHistoryList, salesHistoryPage, salesHistoryTotal} = client
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
          <Select defaultValue="jack" style={{width: '8.75rem', marginRight: 20}}>
            <Option value="jack">销售额</Option>
            <Option value="lucy">利润贡献</Option>
            <Option value="Yiminghe">贡献占比</Option>
          </Select>
          <Button className={!selectedRowKeys.length ? '' : 'ant-btn-primary'} style={{marginRight: 10}}
                  disabled={!selectedRowKeys.length}>对账</Button>
          <Button type='primary'>全部对账</Button>
        </div>
        <div className='table-container'>
          <Table
            columns={salesHistoryColumns}
            dataSource={salesHistoryList}
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
        <div style={{textAlign: 'center', marginTop: 40}}>
          <Pagination current={salesHistoryPage} total={salesHistoryTotal} />
        </div>
      </>
    )
  }
}

export default Index
