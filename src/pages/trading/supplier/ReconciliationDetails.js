import React, { Component } from 'react'
import { Button, DatePicker, Select, Table, Pagination,Modal } from 'antd'
import { connect } from 'dva'
import { IP, PAGE_LIMIT } from '@/common/constants'
import router from 'umi/router'

const Option = Select.Option

const { MonthPicker, RangePicker, WeekPicker } = DatePicker

@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))



class ReconciliationDetails extends Component {
  state = {

    page:1,
    limit:PAGE_LIMIT,
  }


  //对账
  listReconciliation = (id)=>{
      Modal.confirm({
          title: '是否确认对账?',
    onOk() {
      this.props.dispatch({type:'supplier/supp_fetchCorderReconciliation',payload:{id:id}});
    },
    onCancel() {},
  });

  }
  //结款
  listPayment = (id)=>{
      Modal.confirm({
          title: '是否确认对账?',
    onOk() {
      this.props.dispatch({type:'supplier/supp_fetchCorderPayment',payload:{id:id}});
    },
    onCancel() {},
  });


  }
  //开票
  listInvoice = (id)=>{
      Modal.confirm({
          title: '是否确认结款?',
    onOk() {
      this.props.dispatch({type:'supplier/supp_fetchCorderInvoice',payload:{id:id}});
    },
    onCancel() {},
  });

  }
  //导出
  listExport = (id)=>{
      this.props.dispatch({type:'supplier/supp_fetchCorderExport',payload:{id:id}});
  }

  componentWillMount(){
      const {id} = this.props.location.query;
      this.state.id = id;
      this.props.dispatch({type:'supplier/supp_fetchCorderDetail',payload:{id:id}});
  }





  render() {

    const {company,start,end,status} = this.props.location.query

    const { startValue, endValue, endOpen } = this.state
    const { supplier, loading } = this.props
    const { supp_CorderDetail,supp_CorderGoodsConditionList } = supplier
    const {cars,goods,sites} = supp_CorderGoodsConditionList ? supp_CorderGoodsConditionList : {cars:null,goods:null,sites:null};
    const {total,list} = supp_CorderDetail ? supp_CorderDetail : {total:0,list:[]};


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
                style={{ marginLeft: 40 }}>销售对账明细<span style={{color:'#999',marginLeft:40}} >{start}</span> 至 <span style={{color:'#999'}} >{end}</span></span>
          <div style={{ float: 'right' }}>
            <Button type='primary' style={{ marginRight: 10 }} onClick={this.listExport.bind(this,this.state.id)} >全部导出</Button>
            <Button type='primary' style={{ marginRight: 10 }} onClick={this.listReconciliation.bind(this,this.state.id)} style={{display:status==61 ? 'inline-block' : 'none'}} >确认对账</Button>
            <Button type='primary' style={{ marginRight: 10 }} onClick={this.listPayment.bind(this,this.state.id)} style={{display:status==63 ? 'inline-block' : 'none'}} >确认结款</Button>
            <Button type='primary' onClick={this.listInvoice.bind(this,this.state.id)} style={{display:status==(63 || 64) ? 'inline-block' : 'none'}} >确认开票</Button>

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
            <RangePicker
                showTime
                style={{width:440}}
                format="YYYY-MM-DD HH:mm"
                onChange={(moment,timeText)=>{

                }}
                onOk={()=>{

                }}
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
          </div>
          <div className='table-container'>
            <Table
              columns={salesHistoryColumns}
              dataSource={list}
              loading={loading}
              pagination={{pageSize:this.state.limit}}
              highLightColor={'#aaa'}
              rowKey = {(record)=>(record.id)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ReconciliationDetails
