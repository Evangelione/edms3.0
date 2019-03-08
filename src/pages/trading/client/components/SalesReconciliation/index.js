import React, { Component } from 'react'
import { Row, Col, Icon, DatePicker, Select, Button, Pagination, Table } from 'antd'
import { connect } from 'dva'
import { salesReconciliationBox } from '@/common/constants'
import { salesHistoryColumns } from '@/common/tableColumns'
import styles from '../../index.less'
import widthRouter from 'umi/withRouter'

const Option = Select.Option

@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))
class Index extends Component {
  state = {
    load_time_start: null,
    load_time_end: null,
    endOpen: false,
    selectedRowKeys: [],
    car_head_id: '',
    supp_goods_id: '',
    cust_site_id: '',
    status: '',
  }

  componentDidMount() {
    console.log(this.props)
    this.props.dispatch({
      type: 'client/fetchOrderCondition',
      payload: {
        customer_id: this.props.match.params.ClientDetail,
      },
    }).then(() => {
      const { clientCondition } = this.props.client
      console.log(clientCondition)
      this.setState({
        car_head_id: '27',
        supp_goods_id: clientCondition.goods.length ? clientCondition.goods[0].id : '',
        cust_site_id: clientCondition.sites.length ? clientCondition.sites[0].id : '',
      })
      this.props.dispatch({
        type: 'client/fetchClientHistory',
        payload: {
          form: {
            cust_id: this.props.match.params.ClientDetail,
            load_time_start: '',
            load_time_end: '',
            // car_head_id: clientCondition.cars[0].id,
            car_head_id: '27',
            supp_goods_id: clientCondition.goods.length ? clientCondition.goods[0].id : '',
            cust_site_id: clientCondition.sites.length ? clientCondition.sites[0].id : '',
            status: '',
          },
        },
      })
    })


  }

  disabledStartDate = (load_time_start) => {
    const load_time_end = this.state.load_time_end
    if (!load_time_start || !load_time_end) {
      return false
    }
    return load_time_start.valueOf() > load_time_end.valueOf()
  }

  disabledEndDate = (load_time_end) => {
    const load_time_start = this.state.load_time_start
    if (!load_time_end || !load_time_start) {
      return false
    }
    return load_time_end.valueOf() <= load_time_start.valueOf()
  }

  onChange = (field, value) => {
    // this.setState({
    //   [field]: value,
    // })
    this.fetchHistoryList(field, value)
  }

  onStartChange = (value) => {
    this.onChange('load_time_start', value)
  }

  onEndChange = (value) => {
    this.onChange('load_time_end', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  renderStatusBox = () => {
    return <Row gutter={26} className={styles['status-box']} style={{ margin: 0 }}>
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
    this.setState({ selectedRowKeys })
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
    this.setState({ selectedRowKeys })
  }

  fetchHistoryList = (field, val) => {
    console.log(field)
    console.log(val)
    this.setState({
      [field]: val,
    }, () => {
      if (field === 'load_time_start' || field === 'load_time_end') {
        val = val ? val.format('YYYY-MM-DD') : val
      }
      this.props.dispatch({
        type: 'client/fetchClientHistory',
        payload: {
          form: {
            cust_id: this.props.match.params.ClientDetail,
            load_time_start: this.state.load_time_start ? this.state.load_time_start.format('YYYY-MM-DD') : '',
            load_time_end: this.state.load_time_end ? this.state.load_time_end.format('YYYY-MM-DD') : '',
            car_head_id: this.state.car_head_id,
            supp_goods_id: this.state.supp_goods_id,
            cust_site_id: this.state.cust_site_id,
            status: this.state.status,
            ...{ [field]: val },
          },
        },
      })
    })
  }

  pageChange = (page) => {
    const { load_time_start, load_time_end, car_head_id, supp_goods_id, cust_site_id, status } = this.state
    this.props.dispatch({
      type: 'client/fetchClientHistory',
      payload: {
        form: {
          cust_id: this.props.match.params.ClientDetail,
          load_time_start,
          load_time_end,
          car_head_id,
          supp_goods_id,
          cust_site_id,
          status,
        },
        page,
      },
    })
  }

  render() {
    const { load_time_start, load_time_end, endOpen, selectedRowKeys, car_head_id, supp_goods_id, cust_site_id, status } = this.state
    const { client, loading } = this.props
    const { salesHistoryList, salesHistoryPage, salesHistoryTotal, clientCondition } = client
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
            format="YYYY-MM-DD"
            value={load_time_start}
            placeholder="起始时间"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <span style={{ margin: '0 10px' }}>-</span>
          <DatePicker
            disabledDate={this.disabledEndDate}
            format="YYYY-MM-DD"
            value={load_time_end}
            placeholder="截止时间"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
          <span style={{ margin: '0 12px 0 20px' }}>车牌</span>
          <Select value={clientCondition.cars && clientCondition.cars[0].id} style={{ width: '8.75rem' }}
                  onChange={this.fetchHistoryList.bind(null, 'car_head_id')}>
            {clientCondition.cars && clientCondition.cars.map((value, index) => {
              return <Option key={index} value={value.id}>{value.car_code}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>气源</span>
          <Select value={supp_goods_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchHistoryList.bind(null, 'supp_goods_id')}>
            {clientCondition.goods && clientCondition.goods.map((value, index) => {
              return <Option key={index} value={value.id}>{value.goods_name}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>站点</span>
          <Select value={cust_site_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchHistoryList.bind(null, 'cust_site_id')}>
            {clientCondition.sites && clientCondition.sites.map((value, index) => {
              return <Option key={index} value={value.id}>{value.site_name}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>状态</span>
          <Select value={status} style={{ width: '8.75rem', marginRight: 20 }}
                  onChange={this.fetchHistoryList.bind(null, 'status')}>
            <Option value={''}>全部</Option>
            <Option value={21}>待我方确认</Option>
            <Option value={22}>待采购</Option>
            <Option value={23}>待供应商接单</Option>
            <Option value={24}>待调度</Option>
            <Option value={25}>待出发</Option>
            <Option value={26}>待装货</Option>
            <Option value={27}>待卸货</Option>
            <Option value={28}>待对账</Option>
            <Option value={29}>对账中</Option>
            <Option value={30}>已对账</Option>
            <Option value={31}>待结款</Option>
            <Option value={32}>已开票</Option>
            <Option value={33}>已完成</Option>
            <Option value={34}>已取消</Option>
          </Select>
          {/*<Button className={!selectedRowKeys.length ? '' : 'ant-btn-primary'} style={{ marginRight: 10 }}*/}
          {/*disabled={!selectedRowKeys.length}>对账</Button>*/}
          <Button type='primary'>全部对账</Button>
        </div>
        <div className='table-container'>
          <Table
            columns={salesHistoryColumns}
            dataSource={salesHistoryList}
            // rowSelection={rowSelection}
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
          <Pagination current={salesHistoryPage} total={salesHistoryTotal} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default widthRouter(Index)
