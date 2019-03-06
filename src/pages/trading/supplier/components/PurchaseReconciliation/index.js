import React, { Component } from 'react'
import { Row, Col, Icon, DatePicker, Select, Button, Pagination, Table, Modal} from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { salesReconciliationBox } from '@/common/constants'
import styles from '../../index.less'
import { IP, PAGE_LIMIT } from '@/common/constants'
import moment from 'moment'
import router from 'umi/router'

const Option = Select.Option

const { MonthPicker, RangePicker, WeekPicker } = DatePicker


@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))
@withRouter

class Index extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,

    supplier_id:'',
    time_start:'',
    time_end:'',
    car_head_id:'',
    supp_goods_id:'',
    cust_site_id:'',
    status:'',
    page:1,
    limit:PAGE_LIMIT,

    visible:false,
    allTime:[],
    allTimeText:[],
  }

  componentWillMount() {

    let {SupplierDetail} = this.props.match.params;
    this.state.supplier_id = SupplierDetail;
    const {supp_CorderGoodsConditionList} = this.props.supplier
    if(!supp_CorderGoodsConditionList){
        this.props.dispatch({type:'supplier/supp_fetchCorderGoodsConditionList',payload:{id:SupplierDetail,type:'cg'}});
    }

  }



  //列表数据
  supp_fetchPurchaseHistoryPageList = ()=>{
      const methodData = {
          supplier_id:this.state.supplier_id,
          time_start:this.state.time_start,
          time_end:this.state.time_end,
          car_head_id:this.state.car_head_id,
          supp_goods_id:this.state.supp_goods_id,
          cust_site_id:this.state.cust_site_id,
          status:this.state.status,
          page:this.state.page,
          limit:this.state.limit,
      }
      this.props.dispatch({
          type:'supplier/supp_fetchPurchaseHistoryPageList',
          payload:{methodData}
      })
  }

  //全部对账
  supp_fetchPurchaseHistoryAllReconciliation = ()=>{
      const supplier_id = this.state.supplier_id;
      const time_start = this.state.allTimeText[0];
      const time_end = this.state.allTimeText[1];
      this.props.dispatch({
          type:'supplier/supp_fetchPurchaseHistoryAllReconciliation',
          payload:{supplier_id,time_start,time_end}
      },()=>{
          this.setState({visible:false,allTime:[],allTimeText:[]})
      })

  }

  // renderStatusBox = () => {
  //   return <Row gutter={26} className={styles['status-box']} style={{ margin: 0 }}>
  //     {salesReconciliationBox.map((value, index) => (
  //       <Col span={3} key={index}>
  //         <div>
  //           <div className={styles['status-title']}>
  //             <Icon type="chrome" />
  //             <div>{value.title}</div>
  //           </div>
  //           <div className={styles['level1']}>
  //             <div>{value.level1}</div>
  //             <div>12</div>
  //           </div>
  //           <div className={styles['level2']}>
  //             <div>{value.level2}</div>
  //             <div>2.1 万</div>
  //           </div>
  //         </div>
  //       </Col>
  //     ))}
  //   </Row>
  // }

  renderAllReconciliation = ()=>{
      return (
        <Modal
            title="对账订单选择"
            visible={this.state.visible}
            onOk={this.supp_fetchPurchaseHistoryAllReconciliation}
            onCancel={()=>{this.setState({visible:false,allTime:[],allTimeText:[]})}}
        >
            <div style={{width:'100%',textAlign:'center'}} >
                <RangePicker
                    showTime
                    style={{width:440}}
                    value={this.state.allTime}
                    format="YYYY-MM-DD HH:mm"
                    onChange={(moment,timeText)=>{
                        this.setState({allTime:moment,allTimeText:timeText})
                }} />
            </div>

        </Modal>
      )
  }



  render() {

      const {startValue, endValue, endOpen,car_head_id,supp_goods_id,cust_site_id} = this.state
      const {supplier, loading} = this.props
      const {supp_CorderGoodsConditionList,supp_PurchaseHistoryPageList} = supplier
      const {cars,goods,sites} = supp_CorderGoodsConditionList ? supp_CorderGoodsConditionList : {cars:null,goods:null,sites:null};
      const {total,list} = supp_PurchaseHistoryPageList ? supp_PurchaseHistoryPageList : {total:0,list:[]};
      if(supp_CorderGoodsConditionList){
          if(!car_head_id){this.state.car_head_id = cars[0].id}
          if(!supp_goods_id){this.state.supp_goods_id = goods[0].id}
          if(!cust_site_id){this.state.cust_site_id = sites[0].id}
      }

      const columns = [{
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
        title: '供应商',
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
        title: '采购价（元/吨）',
        dataIndex: 'price',
        key: 'price',
      }, {
        align: 'center',
        title: '采购额（元）',
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
        render:(text, record, index)=>{
            let statusText = '';
            if(record.status==21){statusText='待我方确认'}
            if(record.status==22){statusText='待采购'}
            if(record.status==23){statusText='待供应商接单'}
            if(record.status==24){statusText='待调度'}
            if(record.status==25){statusText='待出发'}
            if(record.status==26){statusText='待装货'}
            if(record.status==27){statusText='待卸货'}
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
      <>
        {/*{this.renderStatusBox()}*/}
        {this.renderAllReconciliation()}
        <div style={{ textAlign: 'right', fontSize: '1rem', margin: '5px 0 20px' }}>
          <span style={{ marginRight: 10 }}>装车时间</span>
          <RangePicker
              showTime
              style={{width:440}}
              format="YYYY-MM-DD HH:mm"
              onChange={(moment,timeText)=>{
                  this.state.time_start = timeText[0];
                  this.state.time_end = timeText[1];
                  if(!timeText[0]){
                      this.supp_fetchPurchaseHistoryPageList();
                  }
              }}
              onOk={()=>{
                  this.supp_fetchPurchaseHistoryPageList();
              }}
          />
          <span style={{margin: '0 12px 0 20px'}}>车牌</span>
          {cars &&
             <Select defaultValue={this.state.car_head_id ? this.state.car_head_id : cars[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.car_head_id = value;
                 this.supp_fetchPurchaseHistoryPageList();
             }} >
            {cars && cars.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.car_code}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>气源</span>
          {goods &&
             <Select defaultValue={this.state.supp_goods_id ? this.state.supp_goods_id : goods[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.supp_goods_id = value;
                 this.supp_fetchPurchaseHistoryPageList();
             }} >
            {goods && goods.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.goods_name}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>站点</span>
          {sites &&
             <Select defaultValue={this.state.cust_site_id ? this.state.cust_site_id : sites[0].id} style={{width: '8.75rem'}} onChange={(value)=>{
                 this.state.cust_site_id = value;
                 this.supp_fetchPurchaseHistoryPageList();
             }} >
            {sites && sites.map((ele,index)=>{
                return <Option key={index} value={ele.id}>{ele.site_name}</Option>
            })}
          </Select>}
          <span style={{margin: '0 12px 0 20px'}}>状态</span>
          <Select defaultValue="" style={{width: '8.75rem'}} onChange={(value)=>{
              this.state.status = value;
              this.supp_fetchPurchaseHistoryPageList();
          }}>
            <Option value="" >全部</Option>
            <Option value="21" >待我方确认</Option>
            <Option value="22" >待采购</Option>
            <Option value="23" >待供应商接单</Option>
            <Option value="24" >待调度</Option>
            <Option value="25" >待出发</Option>
            <Option value="26" >待装货</Option>
            <Option value="27" >待卸货</Option>
            <Option value="28" >待对账</Option>
            <Option value="29" >对账中</Option>
            <Option value="30" >已对账</Option>
            <Option value="31" >待结款</Option>
            <Option value="32" >已开票</Option>
            <Option value="33" >已完成</Option>
            <Option value="34" >已取消</Option>
          </Select>
          <Button type='primary' style={{marginLeft:40}} onClick={()=>{this.setState({visible:true})}}  >全部对账</Button>
        </div>
        <div className='table-container'>
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            pagination={false}
            highLightColor={'#aaa'}
            rowKey = {(record)=>(record.id)}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Pagination current={this.state.page} pageSize={this.state.limit} total={parseInt(total)} onChange={(page)=>{
            this.state.page = page;
            this.supp_fetchPurchaseHistoryPageList();
        }} />
        </div>
      </>
    )
  }
}

export default Index
