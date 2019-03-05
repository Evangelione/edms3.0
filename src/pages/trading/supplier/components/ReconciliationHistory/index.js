import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { DatePicker, Select, Table, Pagination,Button ,Popconfirm,Modal} from 'antd'
import { connect } from 'dva'
import { IP, PAGE_LIMIT } from '@/common/constants'
import moment from 'moment'
import router from 'umi/router'

const ButtonGroup = Button.Group

const Option = Select.Option

@connect(({supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))
class Index extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,

    supplier_id:'',
    time_start:'',
    time_end:'',
    supp_goods_id:'',
    cust_site_id:'',
    status:'',
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

      if(field==='startValue'){
          this.state.time_start = moment(value).format('YYYY-MM-DD HH:mm');
      }else{
          this.state.time_end = moment(value).format('YYYY-MM-DD HH:mm');
      }
      this.setState({[field]: value},()=>{
          this.supp_fetchReconciliationHistoryPageList();
      });

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
  //列表数据
  supp_fetchReconciliationHistoryPageList = ()=>{
      const methodData = {
          supplier_id:this.state.supplier_id,
          time_start:this.state.time_start,
          time_end:this.state.time_end,
          supp_goods_id:this.state.supp_goods_id,
          cust_site_id:this.state.cust_site_id,
          status:this.state.status,
          page:this.state.page,
          limit:this.state.limit,
      }
      this.props.dispatch({
          type:'supplier/supp_fetchReconciliationHistoryPageList',
          payload:{methodData}
      })
  }

  //删除
  listDelete = (id)=>{
      Modal.confirm({
          title: '是否确认删除?',
    onOk() {
      this.props.dispatch({type:'supplier/supp_fetchCorderDelete',payload:{id:id}});
    },
    onCancel() {},
  });


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

      let {SupplierDetail} = this.props.match.params;
      this.state.supplier_id = SupplierDetail;
      this.props.dispatch({type:'supplier/supp_fetchCorderGoodsConditionList',payload:{id:SupplierDetail}});


  }



  render() {
    const {startValue, endValue, endOpen} = this.state
    const {supplier, loading} = this.props
    const {supp_CorderGoodsConditionList,supp_ReconciliationHistoryPageList} = supplier
    const {cars,goods,sites} = supp_CorderGoodsConditionList ? supp_CorderGoodsConditionList : {cars:null,goods:null,sites:null};
    const {total,list} = supp_ReconciliationHistoryPageList ? supp_ReconciliationHistoryPageList : {total:0,list:[]};


    const columns = [{
        align: 'center',
        title: '操作时间',
        dataIndex: 'check_time',
        key: 'check_time',
    }, {
        align: 'center',
        title: '供应商',
        dataIndex: 'supp_company_name',
        key: 'supp_company_name',
        render: ()=>(<span>{this.props.location.query.company}</span>)
    }, {
        align: 'center',
        title: '气源',
        dataIndex: 'goods_num',
        key: 'goods_num',
    }, {
        align: 'center',
        title: '站点',
        dataIndex: 'site_num',
        key: 'site_num',
    }, {
        align: 'center',
        title: '对账周期',
        dataIndex: 'dzzq',
        key: 'dzzq',
        render:(text, record, index)=>{
            return <span>{`${record.account_cycle_start} 至 ${record.account_cycle_end}`}</span>
        }
    }, {
        align: 'center',
        title: '对账量',
        dataIndex: 'purchase_count',
        key: 'purchase_count',
    }, {
        align: 'center',
        title: '对账额(元)',
        dataIndex: 'total_account',
        key: 'total_account',
    }, {
        align: 'center',
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text, record, index)=>{
            let statusText = '';
            if(record.status==61){statusText='对账中'}
            if(record.status==62){statusText='已对账'}
            if(record.status==63){statusText='待结款'}
            if(record.status==64){statusText='待开票'}
            if(record.status==65){statusText='已完成'}
            if(record.status==66){statusText='已结款'}
            if(record.status==67){statusText='已开票'}
            return <span>{statusText}</span>
        }
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
            router.push(`/${arr[1]}/${arr[2]}/ReconciliationDetails?id=${record.id}`)
          }}>明细</Button>
          <Button className='line-primary' onClick={this.listExport.bind(this,record.id)} >导出</Button>
          <Button className='line-primary' onClick={this.listReconciliation.bind(this,record.id)}  disabled={!(record.status==61)} >确认对账</Button>
          <Button className='line-primary' onClick={this.listPayment.bind(this,record.id)} disabled={!(record.status==63)} >确认结款</Button>
          <Button className='line-primary' onClick={this.listInvoice.bind(this,record.id)} disabled={!(record.status==(63 || 64))} >确认开票</Button>
          <Button onClick={this.listDelete.bind(this,record.id)} className='line-red'>删除</Button>
        </ButtonGroup>
      ),
    }];

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
          <span style={{margin: '0 12px 0 20px',display:'none'}}>车牌</span>
          {null &&
             <Select defaultValue={this.state.car_head_id ? this.state.car_head_id : cars[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.car_head_id = value;
                 this.supp_fetchReconciliationHistoryPageList();
             }} >
            {cars && cars.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.car_code}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>气源</span>
          {goods &&
             <Select defaultValue={this.state.supp_goods_id ? this.state.supp_goods_id : goods[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.supp_goods_id = value;
                 this.supp_fetchReconciliationHistoryPageList();
             }} >
            {goods && goods.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.goods_name}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>站点</span>
          {sites &&
             <Select defaultValue={this.state.cust_site_id ? this.state.cust_site_id : sites[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.cust_site_id = value;
                 this.supp_fetchReconciliationHistoryPageList();
             }} >
            {sites && sites.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.site_name}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>状态</span>
          <Select defaultValue="" style={{width: '8.75rem'}} onChange={(value)=>{
              this.state.status = value;
              this.supp_fetchReconciliationHistoryPageList();
          }}>
            <Option value="" style={{color: '#7B7B7B'}}>全部</Option>
            <Option value="61" style={{color: '#FFAD4D'}}>对账中</Option>
            <Option value="62" style={{color: '#8FCBFF'}}>已对账</Option>
            <Option value="67" style={{color: '#91A5F5'}}>已开票</Option>
          </Select>
        </div>
        <div className='table-container'>
          <Table
            columns={columns}
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
        <div style={{textAlign: 'center', marginTop: 40}}>
          <Pagination current={this.state.page} pageSize={this.state.limit} total={parseInt(total)} onChange={(page)=>{
              this.state.page = page;
              this.supp_fetchReconciliationHistoryPageList();
          }} />
        </div>
      </>
    )
  }
}



export default withRouter(Index)
