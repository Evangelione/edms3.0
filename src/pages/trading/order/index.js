import React, { Component } from 'react'
import { Button, Popover, Row, Col, Upload, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { order_type } from '@/common/constants'
import OrderList from './OrderList'
import OrderMap from './OrderMap'
import { IP } from '@/common/constants'
import styles from './index.less'
import CreatePlan from './components/Modals/CreatePlan'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class Index extends Component {

  state = {
    currBarStatus: '筛选',
    filterHei: 80,
    filter_condition: {
      car_head_id: undefined,
      customer_id: undefined,
      supplier_id: undefined,
      cust_site_id: undefined,
      supp_goods_id: undefined,
      load_time_start: '',
      load_time_end: '',
      rece_time_start: '',
      rece_time_end: '',
      real_load_time_start: '',
      real_load_time_end: '',
      unload_time_start: '',
      unload_time_end: '',
    },
  }


  componentDidMount() {
    this.props.dispatch({
      type: 'order/fetchFilterCondition',
      payload: {},
    })
  }

  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'order/upLoadExcel',
      payload: {
        file,
      },
    })
  }

  changeOrderStatus = (status) => {
    if (this.props.loading) {
      return false
    }
    console.log(status)
    this.props.dispatch({
      type: 'order/save',
      payload: {
        orderStatus: status,
      },
    })
    this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {
        status,
      },
    })
  }

  changeFilter = () => {
    if (this.state.currBarStatus === '筛选') {
      this.setState({
        currBarStatus: '收起',
        filterHei: 220,
      })
    } else {
      this.setState({
        currBarStatus: '筛选',
        filterHei: 80,
      })
    }
  }

  onChange = (field, value) => {
    value.format && (value = value.format('YYYY-MM-DD'))
    // this.filter_condition[field] = value
    this.setState({
      filter_condition: {
        ...this.state.filter_condition,
        [field]: value,
      },
    })
  }

  searchOrderList = () => {
    console.log(this.state.filter_condition)
    this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {
        status: this.props.order.orderStatus,
        ...this.state.filter_condition,
      },
    })
  }

  resetCondition = () => {
    this.setState({
      filter_condition: {
        car_head_id: undefined,
        customer_id: undefined,
        supplier_id: undefined,
        cust_site_id: undefined,
        supp_goods_id: undefined,
        load_time_start: '',
        load_time_end: '',
        rece_time_start: '',
        rece_time_end: '',
        real_load_time_start: '',
        real_load_time_end: '',
        unload_time_start: '',
        unload_time_end: '',
      },
    })
  }

  render() {
    const { currBarStatus, filterHei } = this.state
    const { loading, order } = this.props
    const { orderStatus, filter_condition, cust_list, supp_list } = order
    console.log(filter_condition)
    const popTitle = <div>
      导入信息
    </div>
    const popContent = <>
      <div>
        <p>1. 上传信息文件时，请使用excel文件，支持文件格式为.xls或者.xlsx；</p>
        <p>2. 信息文件内容，请严格按照模板样式填写，红色的字段必须填写， <br />其余字段若没有则可以不填；</p>
        <p>3. 导入信息时，如果和已有的信息相同，则导入后自动更新其信息；</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button className='light-btn'>下载信息模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/order/order-import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{ marginLeft: 20 }} loading={loading}>上传信息文件</Button>
        </Upload>
      </div>
    </>
    return (
      <div>
        <div className='toolbar' style={{ height: filterHei, transition: 'all 0.5s', overflow: 'hidden' }}>
          <CreatePlan>
            <Button type='primary'>新增订单</Button>
          </CreatePlan>
          <Popover placement="bottomLeft" title={popTitle} content={popContent}
                   trigger="click">
            <Button type='primary' style={{ marginLeft: 10 }}>导入信息</Button>
          </Popover>
          <Button type='primary' style={{ float: 'right', marginTop: 20 }}
                  onClick={this.changeFilter}>{currBarStatus}</Button>
          <Button type='primary'
                  style={{
                    float: 'right',
                    marginTop: 20,
                    marginRight: 10,
                    display: currBarStatus === '筛选' ? 'none' : 'block',
                  }}
                  onClick={this.searchOrderList} loading={loading}>确定筛选</Button>
          <Button className='red-btn'
                  style={{
                    float: 'right',
                    marginTop: 20,
                    marginRight: 10,
                    display: currBarStatus === '筛选' ? 'none' : 'block',
                  }}
                  onClick={this.resetCondition} loading={loading}>清空条件</Button>
          <div style={{ height: 69 }} className={styles['filter-box']}>
            {/*<div className={styles['filter-item']}>*/}
            {/*<div>订单类型</div>*/}
            {/*<Select style={{ width: 140 }} placeholder='请选择订单类型'>*/}
            {/*<Option value='1'>预付款</Option>*/}
            {/*<Option value='2'>信用额</Option>*/}
            {/*</Select>*/}
            {/*</div>*/}
            <div className={styles['filter-item']}>
              <div>车牌号</div>
              <Select style={{ width: 140 }} placeholder='请选择车牌'
                      onChange={this.onChange.bind(null, 'car_head_id')}
                      value={this.state.filter_condition.car_head_id}
              >
                {filter_condition.cars && filter_condition.cars.map((value, index) => {
                  return <Option key={index} value={value.id}>{value.car_code}</Option>
                })}
              </Select>
            </div>
            <div className={styles['filter-item']}>
              <div>客户</div>
              <Select style={{ width: 140 }} placeholder='请选择客户'
                      onChange={this.onChange.bind(null, 'customer_id')}
                      value={this.state.filter_condition.customer_id}

              >
                {cust_list.length && cust_list.map((value, index) => {
                  return <Option key={index} value={value.id}>{value.company_name}</Option>
                })}
              </Select>
            </div>
            <div className={styles['filter-item']}>
              <div>供应商</div>
              <Select style={{ width: 140 }} placeholder='请选择供应商'
                      onChange={this.onChange.bind(null, 'supplier_id')}
                      value={this.state.filter_condition.supplier_id}

              >
                {supp_list.length && supp_list.map((value, index) => {
                  return <Option key={index} value={value.id}>{value.company_name}</Option>
                })}
              </Select>
            </div>
            <div className={styles['filter-item']}>
              <div>站点</div>
              <Select style={{ width: 140 }} placeholder='请选择站点'
                      onChange={this.onChange.bind(null, 'cust_site_id')}
                      value={this.state.filter_condition.cust_site_id}

              >
                {filter_condition.sites && filter_condition.sites.map((value, index) => {
                  return <Option key={index} value={value.id}>{value.site_name}</Option>
                })}
              </Select>
            </div>
            <div className={styles['filter-item']}>
              <div>气源</div>
              <Select style={{ width: 140 }} placeholder='请选择气源'
                      onChange={this.onChange.bind(null, 'supp_goods_id')}
                      value={this.state.filter_condition.supp_goods_id}
              >
                {filter_condition.goods && filter_condition.goods.map((value, index) => {
                  return <Option key={index} value={value.id}>{value.goods_name}</Option>
                })}
              </Select>
            </div>
          </div>
          <div style={{ width: '115%', backgroundColor: '#e9e9e9', height: 1, marginLeft: '-30px' }} />
          <div style={{ height: 70 }} className={styles['filter-box']}>
            <div className={styles['filter-item']}>
              <div>预计装车时间</div>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="起始时间"
                onChange={this.onChange.bind(null, 'load_time_start')}
              />
              <span style={{ margin: '0 10px' }}>-</span>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="截止时间"
                onChange={this.onChange.bind(null, 'load_time_end')}
              />
            </div>
            <div className={styles['filter-item']}>
              <div>预计卸车时间</div>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="起始时间"
                onChange={this.onChange.bind(null, 'rece_time_start')}
              />
              <span style={{ margin: '0 10px' }}>-</span>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="截止时间"
                onChange={this.onChange.bind(null, 'rece_time_end')}
              />
            </div>
            <div className={styles['filter-item']}>
              <div>实际装车时间</div>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="起始时间"
                onChange={this.onChange.bind(null, 'real_load_time_start')}
              />
              <span style={{ margin: '0 10px' }}>-</span>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="截止时间"
                onChange={this.onChange.bind(null, 'real_load_time_end')}
              />
            </div>
            <div className={styles['filter-item']}>
              <div>实际卸车时间</div>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="起始时间"
                onChange={this.onChange.bind(null, 'unload_time_start')}
              />
              <span style={{ margin: '0 10px' }}>-</span>
              <DatePicker
                style={{ width: 160 }}
                format="YYYY-MM-DD"
                placeholder="截止时间"
                onChange={this.onChange.bind(null, 'unload_time_end')}
              />
            </div>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <div>
            {order_type.map((value, index) => {
              return <div key={index} className={styles['order-type']}
                          onClick={this.changeOrderStatus.bind(null, value.value)}
                          style={{ color: orderStatus === value.value && '#91A5F5' }}>
                <div>{value.label}</div>
              </div>
            })}
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <OrderList />
            </Col>
            <Col span={12}>
              <OrderMap />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Index
