import React, { Component } from 'react'
import { DatePicker, Select, Table, Pagination, Button, Popconfirm } from 'antd'
import { connect } from 'dva'
import widthRouter from 'umi/withRouter'
import { IP, statusVar2 } from '@/common/constants'
import router from 'umi/router'

const Option = Select.Option
const ButtonGroup = Button.Group

@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
class Index extends Component {
  state = {
    time_start: null,
    time_end: null,
    endOpen: false,
    supp_goods_id: '',
    cust_site_id: '',
    status: '',
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'logistics/fetchLogisticsCondition',
      payload: {
        logistics_id: this.props.match.params.LogisticsDetail,
      },
    }).then(() => {
      const { logisticsCondition } = this.props.logistics
      this.setState({
        supp_goods_id: logisticsCondition.goods.length ? logisticsCondition.goods[0].id : '',
        // supp_goods_id: '',
        cust_site_id: logisticsCondition.sites.length ? logisticsCondition.sites[0].id : '',
        // cust_site_id: '',
      })
      this.props.dispatch({
        type: 'logistics/fetchReconciliationHistory',
        payload: {
          form: {
            logistics_id: this.props.match.params.LogisticsDetail,
            time_start: '',
            time_end: '',
            // supp_goods_id: '',
            supp_goods_id: logisticsCondition.goods.length ? logisticsCondition.goods[0].id : '',
            // cust_site_id: '',
            cust_site_id: logisticsCondition.sites.length ? logisticsCondition.sites[0].id : '',
            status: '',
          },
        },
      })
    })
  }

  disabledStartDate = (time_start) => {
    const time_end = this.state.time_end
    if (!time_start || !time_end) {
      return false
    }
    return time_start.valueOf() > time_end.valueOf()
  }

  disabledEndDate = (time_end) => {
    const time_start = this.state.time_start
    if (!time_end || !time_start) {
      return false
    }
    return time_end.valueOf() <= time_start.valueOf()
  }

  onChange = (field, value) => {
    // this.setState({
    //   [field]: value,
    // })
    this.fetchReconciliationHistoryList(field, value)
  }

  fetchReconciliationHistoryList = (field, val) => {
    console.log(field)
    console.log(val)
    this.setState({
      [field]: val,
    }, () => {
      if (field === 'time_start' || field === 'time_end') {
        val = val ? val.format('YYYY-MM-DD') : val
      }
      this.props.dispatch({
        type: 'logistics/fetchReconciliationHistory',
        payload: {
          form: {
            logistics_id: this.props.match.params.LogisticsDetail,
            time_start: this.state.time_start ? this.state.time_start.format('YYYY-MM-DD') : '',
            time_end: this.state.time_end ? this.state.time_end.format('YYYY-MM-DD') : '',
            supp_goods_id: this.state.supp_goods_id,
            cust_site_id: this.state.cust_site_id,
            status: this.state.status,
            ...{ [field]: val },
          },
        },
      })
    })
  }

  onStartChange = (value) => {
    this.onChange('time_start', value)
  }

  onEndChange = (value) => {
    this.onChange('time_end', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }


  confirmReconciliation = (id) => {
    this.props.dispatch({
      type: 'logistics/confirmReconciliation',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchReconciliationHistory',
        payload: {
          form: {
            logistics_id: this.props.match.params.LogisticsDetail,
            time_start: this.state.time_start ? this.state.time_start.format('YYYY-MM-DD') : '',
            time_end: this.state.time_end ? this.state.time_end.format('YYYY-MM-DD') : '',
            supp_goods_id: this.state.supp_goods_id,
            cust_site_id: this.state.cust_site_id,
            status: this.state.status,
          },
        },
      })
    })
  }

  payment = (id) => {
    this.props.dispatch({
      type: 'logistics/payment',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchReconciliationHistory',
        payload: {
          form: {
            logistics_id: this.props.match.params.LogisticsDetail,
            time_start: this.state.time_start ? this.state.time_start.format('YYYY-MM-DD') : '',
            time_end: this.state.time_end ? this.state.time_end.format('YYYY-MM-DD') : '',
            supp_goods_id: this.state.supp_goods_id,
            cust_site_id: this.state.cust_site_id,
            status: this.state.status,
          },
        },
      })
    })
  }

  billing = (id) => {
    this.props.dispatch({
      type: 'logistics/billing',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchReconciliationHistory',
        payload: {
          form: {
            logistics_id: this.props.match.params.LogisticsDetail,
            time_start: this.state.time_start ? this.state.time_start.format('YYYY-MM-DD') : '',
            time_end: this.state.time_end ? this.state.time_end.format('YYYY-MM-DD') : '',
            supp_goods_id: this.state.supp_goods_id,
            cust_site_id: this.state.cust_site_id,
            status: this.state.status,
          },
        },
      })
    })
  }

  render() {
    const { time_start, time_end, endOpen, supp_goods_id, cust_site_id, status } = this.state
    const { logistics, loading } = this.props
    const { reconciliationHistoryList, reconciliationHistoryPage, reconciliationHistoryTotal, logisticsCondition } = logistics
    const logisticsReconciliationHistoryColumns = [{
      align: 'center',
      title: '操作时间',
      dataIndex: 'check_time',
      key: 'check_time',
    }, {
      align: 'center',
      title: '物流',
      dataIndex: 'kh',
      key: 'kh',
    }, {
      align: 'center',
      title: '气源',
      dataIndex: 'goods',
      key: 'goods',
    }, {
      align: 'center',
      title: '站点',
      dataIndex: 'sites',
      key: 'sites',
    }, {
      align: 'center',
      title: '对账周期',
      key: 'dzzq',
      render: (text, record) => {
        return <div>{record.account_cycle_start} - {record.account_cycle_end}</div>
      },
    }, {
      align: 'center',
      title: '对账量',
      dataIndex: 'order_delivery_count',
      key: 'order_delivery_count',
    }, {
      align: 'center',
      title: '对账额（元）',
      dataIndex: 'total_account',
      key: 'total_account',
    }, {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <div>{statusVar2[text]}</div>
      ),
    }, {
      align: 'center',
      title: '操作',
      dataIndex: 'cz',
      key: 'cz',
      render: (text, record, index) => (
        <ButtonGroup className='button-group'>
          <Button className='line-primary' onClick={() => {
            let url = new URL(window.location.href)
            let arr = url.pathname.split('/')
            router.push(`/${arr[1]}/${arr[2]}/ReconciliationDetails?status=${record.status}&payment_status=${record.payment_status}&invoice_status=${record.invoice_status}&id=${record.id}&${url.search.substr(1)}`)
          }}>明细</Button>
          <Button className='line-primary' onClick={() => {
            window.location.href = `${IP}/index/logistics/corder-export?id=${record.id}`
          }}>导出</Button>
          <Button className='line-primary' disabled={record.status !== '61'}
                  onClick={this.confirmReconciliation.bind(null, record.id)}>确认对账</Button>
          <Button className='line-primary' disabled={record.payment_status === '1'}
                  onClick={this.payment.bind(null, record.id)}>确认结款</Button>
          <Button className='line-primary' disabled={record.invoice_status === '1'}
                  onClick={this.billing.bind(null, record.id)}>确认开票</Button>
          <Popconfirm title="确定删除此条记录？" placement="left" onConfirm={() => {
            this.props.dispatch({
              type: 'logistics/deleteReconciliationHistory',
              payload: {
                id: record.id,
              },
            }).then(() => {
              this.props.dispatch({
                type: 'logistics/fetchReconciliationHistory',
                payload: {
                  form: {
                    logistics_id: this.props.match.params.LogisticsDetail,
                    time_start: time_start,
                    time_end: time_end,
                    supp_goods_id: supp_goods_id,
                    cust_site_id: cust_site_id,
                    status: status,
                  },
                  page: reconciliationHistoryPage,
                },
              })
            })
          }}>
            <Button className='line-red'>删除</Button>
          </Popconfirm>
        </ButtonGroup>
      ),
    }]
    return (
      <>
        <div className='tabs-toolbar'>
          <span style={{ marginRight: 10 }}>装车时间</span>
          <DatePicker
            disabledDate={this.disabledStartDate}
            format="YYYY-MM-DD"
            value={time_start}
            placeholder="起始时间"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <span style={{ margin: '0 10px' }}>-</span>
          <DatePicker
            disabledDate={this.disabledEndDate}
            format="YYYY-MM-DD"
            value={time_end}
            placeholder="截止时间"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
          {/*<span style={{ margin: '0 12px 0 20px' }}>车牌</span>*/}
          {/*<Select defaultValue="jack" style={{ width: '8.75rem' }}>*/}
          {/*<Option value="jack">销售额</Option>*/}
          {/*<Option value="lucy">利润贡献</Option>*/}
          {/*<Option value="Yiminghe">贡献占比</Option>*/}
          {/*</Select>*/}
          <span style={{ margin: '0 12px 0 20px' }}>气源</span>
          <Select value={supp_goods_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchReconciliationHistoryList.bind(null, 'supp_goods_id')}>
            {logisticsCondition.goods && logisticsCondition.goods.map((value, index) => {
              return <Option key={index} value={value.id}>{value.goods_name}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>站点</span>
          <Select value={cust_site_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchReconciliationHistoryList.bind(null, 'cust_site_id')}>
            {logisticsCondition.sites && logisticsCondition.sites.map((value, index) => {
              return <Option key={index} value={value.id}>{value.site_name}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>状态</span>
          <Select value={status} style={{ width: '8.75rem' }}>
            <Option value="">全部</Option>
            <Option value={61}>对账中</Option>
            <Option value={62}>已对账</Option>
            <Option value={63}>待结款</Option>
            <Option value={64}>待开票</Option>
            <Option value={65}>已完成</Option>
          </Select>
        </div>
        <div className='table-container'>
          <Table
            columns={logisticsReconciliationHistoryColumns}
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
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Pagination current={reconciliationHistoryPage} total={reconciliationHistoryTotal} />
        </div>
      </>
    )
  }
}

export default widthRouter(Index)
