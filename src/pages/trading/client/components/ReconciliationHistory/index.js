import React, { Component } from 'react'
import { DatePicker, Select, Table, Pagination } from 'antd'
import { connect } from 'dva'
import { clientReconciliationHistoryColumns } from '@/common/tableColumns'
import widthRouter from 'umi/withRouter'

const Option = Select.Option

@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
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
      type: 'client/fetchOrderCondition',
      payload: {
        customer_id: this.props.match.params.ClientDetail,
      },
    }).then(() => {
      const { clientCondition } = this.props.client
      console.log(clientCondition)
      this.setState({
        supp_goods_id: clientCondition.goods[0].id,
        cust_site_id: clientCondition.sites[0].id,
      })
      this.props.dispatch({
        type: 'client/fetchReconciliationHistory',
        payload: {
          form: {
            cust_id: this.props.match.params.ClientDetail,
            time_start: '',
            time_end: '',
            supp_goods_id: clientCondition.goods[0].id,
            cust_site_id: clientCondition.sites[0].id,
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

  fetchReconciliationHistoryList = (field, val) => {
    console.log(field)
    console.log(val)
    this.setState({
      [field]: val,
    }, () => {
      if (field === 'time_start' || field === 'time_end') {
        val = val.format('YYYY-MM-DD')
      }
      this.props.dispatch({
        type: 'client/fetchReconciliationHistory',
        payload: {
          form: {
            cust_id: this.props.match.params.ClientDetail,
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


  render() {
    const { time_start, time_end, endOpen, supp_goods_id, cust_site_id, status } = this.state
    const { client, loading } = this.props
    const { reconciliationHistoryList, reconciliationHistoryPage, reconciliationHistoryTotal, clientCondition } = client
    return (
      <>
        <div style={{ textAlign: 'right', fontSize: '1rem', margin: '5px 0 20px' }}>
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
          {/*<span style={{ margin: '0 12px 0 20px' }}>操作人</span>*/}
          {/*<Select defaultValue="jack" style={{ width: '8.75rem' }}>*/}
          {/*<Option value="jack">销售额</Option>*/}
          {/*<Option value="lucy">利润贡献</Option>*/}
          {/*<Option value="Yiminghe">贡献占比</Option>*/}
          {/*</Select>*/}
          <span style={{ margin: '0 12px 0 20px' }}>气源</span>
          <Select value={supp_goods_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchReconciliationHistoryList.bind(null, 'supp_goods_id')}>
            {clientCondition.goods && clientCondition.goods.map((value, index) => {
              return <Option key={index} value={value.id}>{value.goods_name}</Option>
            })}
          </Select>
          <span style={{ margin: '0 12px 0 20px' }}>站点</span>
          <Select value={cust_site_id} style={{ width: '8.75rem' }}
                  onChange={this.fetchReconciliationHistoryList.bind(null, 'cust_site_id')}>
            {clientCondition.sites && clientCondition.sites.map((value, index) => {
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
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Pagination current={reconciliationHistoryPage} total={reconciliationHistoryTotal} />
        </div>
      </>
    )
  }
}

export default widthRouter(Index)
