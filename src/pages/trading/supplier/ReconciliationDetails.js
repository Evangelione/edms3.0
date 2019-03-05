import React, { Component } from 'react'
import { Button, DatePicker, Select, Table, Pagination } from 'antd'
import { connect } from 'dva'
import { IP, PAGE_LIMIT } from '@/common/constants'
import router from 'umi/router'

const Option = Select.Option

@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))



class ReconciliationDetails extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,


    id:'',
    page:1,
    limit:PAGE_LIMIT,
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

  componentWillMount(){
      const {id} = this.props.location.query;
      this.state.id = id;
      this.props.dispatch({type:'supplier/supp_fetchCorderDetail',payload:{id:id}});
  }

  render() {
    const { company } = this.props.location.query

    const { startValue, endValue, endOpen } = this.state
    const { supplier, loading } = this.props
    const { supp_CorderDetail,supp_CorderGoodsConditionList } = supplier
    const {cars,goods,sites} = supp_CorderGoodsConditionList ? supp_CorderGoodsConditionList : {cars:null,goods:null,sites:null};
    const {total,list} = supp_CorderDetail ? supp_CorderDetail : {total:0,list:[]};
    console.log(supp_CorderDetail);

    console.log(supplier);

    const salesHistoryColumns = [{
      align: 'center',
      title: '装车时间',
      dataIndex: 'real_load_time',
      key: 'real_load_time',
    }, {
      align: 'center',
      title: '车牌',
      dataIndex: 'car_head_code',
      key: 'car_head_code',
    }, {
      align: 'center',
      title: '客户',
      dataIndex: 'supp_company_name',
      key: 'supp_company_name',
    }, {
      align: 'center',
      title: '气源',
      dataIndex: 'goods_name',
      key: 'goods_name',
    }, {
      align: 'center',
      title: '站点',
      dataIndex: 'site_num',
      key: 'site_num',
    }, {
      align: 'center',
      title: '装货量（吨）',
      dataIndex: 'load_quantity',
      key: 'load_quantity',
    }, {
      align: 'center',
      title: '卸货量（吨）',
      dataIndex: 'unload_quantity',
      key: 'unload_quantity',
    }, {
      align: 'center',
      title: '结算量（吨）',
      dataIndex: 'charge_quantity',
      key: 'charge_quantity',
    }, {
      align: 'center',
      title: '销售价（元/吨）',
      dataIndex: 'price',
      key: 'price',
    }, {
      align: 'center',
      title: '销售额（元）',
      dataIndex: 'fee_sum',
      key: 'fee_sum',
    }, {
      align: 'center',
      title: '额外费用（元）',
      dataIndex: 'extra_fee',
      key: 'extra_fee',
    }, {
      align: 'center',
      title: '合计金额（元）',
      dataIndex: 'total_sum',
      key: 'total_sum',
    }, {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index)=>{
          let statusText = '';
          if(record.status==28){statusText='待对账'}
          if(record.status==29){statusText='对账中'}
          if(record.status==30){statusText='已对账'}
          if(record.status==31){statusText='待结款'}
          if(record.status==32){statusText='已开票'}
          if(record.status==33){statusText='已完成'}
          if(record.status==34){statusText='已取消'}
          return <span>{statusText}</span>
      }
    }]

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
            <Button type='primary' style={{ marginRight: 10 }}>全部导出</Button>
            <Button type='primary' style={{ marginRight: 10 }}>确认对账</Button>
            <Button type='primary' style={{ marginRight: 10 }}>确认付款</Button>
            <Button type='primary'>确认开票</Button>

          </div>
        </div>
        {/*<Tabs defaultActiveKey='1' style={{padding: '12px 24px 60px'}}>*/}
        {/*<TabPane tab="对账明细" key="1">*/}
        {/**/}
        {/*</TabPane>*/}
        {/*</Tabs>*/}
        <div style={{ padding: '0px 24px 60px' }}>
          <div style={{ textAlign: 'right', fontSize: '1rem', margin: '20px 0px' }}>
            <span style={{ marginRight: 10 }}>对账时间</span>
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
            <Select defaultValue="" style={{ width: '8.75rem' }}>
              <Option value="" style={{ color: '#7B7B7B' }}>全部</Option>
              <Option value="1" style={{ color: '#FFAD4D' }}>对账中</Option>
              <Option value="2" style={{ color: '#8FCBFF' }}>已对账</Option>
              <Option value="3" style={{ color: '#91A5F5' }}>已开票</Option>
            </Select>
          </div>
          <div className='table-container'>
            <Table
              columns={salesHistoryColumns}
              dataSource={list}
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
            <Pagination current={this.state.page} pageSize={this.state.limit} total={parseInt(total)} />
          </div>
        </div>
      </div>
    )
  }
}

export default ReconciliationDetails
