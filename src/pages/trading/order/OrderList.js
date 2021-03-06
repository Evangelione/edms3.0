import React, { Component } from 'react'
import { Card, Button, Row, Col, Empty, Pagination, Dropdown, Menu } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import OrderConfirm from './components/Modals/OrderConfirm'
import OrderModify from './components/Modals/OrderModify'
import SalesBilling from './components/Modals/SalesBilling'
import LogisticsScheduling from './components/Modals/LogisticsScheduling'
import OrderPurchase from './components/Modals/OrderPurchase'
import UpLoadPoundList from './components/Modals/UpLoadPoundList'
import styles from './index.less'
import router from 'umi/router'
import { toFixed } from '@/utils/Math'

const ORDER_STATUS = ['', '待我方确认', '待调度', '待采购', '待供应商接单', '待装货', '待卸货', '待对账', '已完成', '已开票', '已取消']

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class OrderList extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {
        status: this.props.order.orderStatus,
      },
    })
  }

  changeCurrentOrder = (index) => {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        currentOrderNum: index,
      },
    })
  }

  goSupplierHistory = (id, name) => {
    router.push(`/trading/supplier/${id}?company=${name}`)
    this.props.dispatch({
      type: 'global/save',
      payload: {
        supplierInfoCurrentTabs: '3',
      },
    })
  }

  goClientHistory = (id, name) => {
    router.push(`/trading/client/${id}?company=${name}`)
    this.props.dispatch({
      type: 'global/save',
      payload: {
        clientInfoCurrentTabs: '3',
      },
    })
  }

  calcTotal = (price, quancity) => {
    return toFixed((price - 0) * (quancity - 0), 2)
  }

  mapOrderList = () => {
    const { order: { orderList, currentOrderNum } } = this.props
    return orderList.length ? orderList.map((value, index) => {
      let span = 24 / (value.sites.length + 1)
      let screenWidth = document.body.scrollWidth
      let lineWidth = (screenWidth / 2 / (value.sites.length + 1)) - (90 / (value.sites.length + 1)) * (value.sites.length + 1)
      let lineLeft = lineWidth / 2
      let menu = <Menu>
        {value.sites.map((val, index) => {
          return <Menu.Item key={index}
                            onClick={this.goClientHistory.bind(null, val.customer_id, val.company_name)}>{val.company_name}</Menu.Item>
        })}
      </Menu>
      return <Card key={index} style={{ marginBottom: 18 }} bodyStyle={{ padding: 0 }}
                   className={classnames(currentOrderNum === index ? styles['order-card-active'] : '', styles['order-card'])}
                   onClick={this.changeCurrentOrder.bind(null, index)}>
        <div className={styles['order-card-header']}>
          <div>
            <img src={require('../../../assets/image/car_head_36_36.png')} style={{ width: 32, height: 28 }} alt="" />
            <div style={{ marginLeft: 20 }}>{value.car_head_code ? value.car_head_code : '暂无车头信息'}</div>
          </div>
          <div style={{
            color: value.status === '8' ? '#00CD93' : '#FFAD4D',
            fontWeight: 400,
            fontSize: '1rem',
          }}>{ORDER_STATUS[value.status]}</div>
        </div>
        <Row className={styles['order-card-body']}>
          <Col span={span} style={{ position: 'relative' }}>
            <div className={styles['name']}>卖家：{value.supp_name ? value.supp_name : '暂无信息'}</div>
            <div
              className={styles['detail']}>购 {value.quantity ? value.quantity : '-'} 吨&nbsp;&nbsp;&nbsp;共&nbsp;{this.calcTotal(value.supp_price, value.quantity)}元
            </div>
            <img src={require('@/assets/image/gas_blue.png')} className={styles['img']} alt="" />
            <div className={classnames(styles['gas'], styles['primary-color'])}>
              {value.supp_goods_name ? value.supp_goods_name : '暂无气源信息'}&nbsp;&nbsp;({value.load_quantity ? value.load_quantity : '-'} 吨)
            </div>
            <div className={classnames(styles['take-time'], styles['primary-color'])}>
              预计装车时间&nbsp;{value.load_time}
            </div>
            {value.current_site === 0 ? <div>
                <div className={styles['solid-line-gray']} style={{ width: lineWidth, right: -lineLeft }} />
              </div>
              :
              value.current_site === 1 ? <div>
                  <div className={styles['dashed-line-blue']} style={{ width: lineWidth, right: -lineLeft }} />
                  <div className={styles['logistics-car']} />
                </div>
                :
                <div>
                  <div className={styles['solid-line-blue']} style={{ width: lineWidth, right: -lineLeft }} />
                </div>}
          </Col>
          {value.sites.map((value1, index1) => {
            return <Col span={span} key={index1} style={{ position: 'relative' }}>
              <div className={styles['name']}>买家：{value1.company_name ? value1.company_name : '暂无信息'}</div>
              <div
                className={styles['detail']}>售 {value1.quantity ? value1.quantity : '-'} 吨&nbsp;&nbsp;&nbsp;共&nbsp;{this.calcTotal(value1.price, value1.quantity)}元
              </div>
              {value.current_site > index1 + 1 ?
                <img src={require('@/assets/image/site_blue.png')} className={styles['img']} alt="" />
                :
                <img src={require('@/assets/image/site_gray.png')} className={styles['img']} alt="" />}
              <div className={classnames(styles['gas'])}>
                {value1.site_name ? value1.site_name : '暂无站点信息'}&nbsp;&nbsp;({value1.unload_quantity ? value1.unload_quantity : '-'} 吨)
              </div>
              <div className={classnames(styles['take-time'])}>
                预计卸车时间&nbsp;{value1.rece_time}
              </div>
              {value.sites.length - 1 !== index1 ?
                value.current_site > index1 + 1 ?
                  value.current_site === index1 + 2 ?
                    <div>
                      <div className={styles['dashed-line-blue']} style={{ width: lineWidth, right: -lineLeft }} />
                      <div className={styles['logistics-car']} />
                    </div> :
                    <div>
                      <div className={styles['solid-line-blue']} style={{ width: lineWidth, right: -lineLeft }} />
                    </div> :
                  <div className={styles['solid-line-gray']} style={{ width: lineWidth, right: -lineLeft }} />
                : null}
            </Col>
          })}
        </Row>
        <div className={styles['order-card-footer']}>
          <div>
            <div>订单编号：{value.order_no}</div>
            <div>创建时间：{value.create_time}</div>
          </div>
          {value.status === '1' ? <div>
              <OrderConfirm>
                <Button type='primary' style={{ marginRight: 10 }}>确认订单</Button>
              </OrderConfirm>
              <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
              <Button className='line-primary'>取消订单</Button>
            </div> :
            value.status === '2' ? <div>
                <LogisticsScheduling sites={JSON.stringify(value.sites)} id={value.id}>
                  <Button type='primary' style={{ marginRight: 10 }}>去调度</Button>
                </LogisticsScheduling>
                <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                <Button className='line-primary'>取消订单</Button>
              </div> :
              value.status === '3' ? <div>
                  <OrderPurchase sites={JSON.stringify(value.sites)} delivery_type={value.delivery_type} id={value.id}>
                    <Button type='primary' style={{ marginRight: 10 }}>去采购</Button>
                  </OrderPurchase>
                  <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                  <Button className='line-primary'>取消订单</Button>
                </div> :
                value.status === '4' ? <div>
                    <div>待供应商接单</div>
                    {/*<UpLoadPoundList>*/}
                    {/*<Button type='primary' style={{ marginRight: 10 }}>上传装车磅单</Button>*/}
                    {/*</UpLoadPoundList>*/}
                    {/*<Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>*/}
                    {/*<Button className='line-primary'>取消订单</Button>*/}
                  </div> :
                  value.status === '5' ? <div>
                      <UpLoadPoundList sites={JSON.stringify(value.sites)} current_site={value.current_site}
                                       supp_goods_name={value.supp_goods_name} uploading={true} id={value.id}>
                        <Button type='primary' style={{ marginRight: 10 }}>确认装货</Button>
                      </UpLoadPoundList>
                      <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                      <Button className='line-primary'>取消订单</Button>
                    </div> :
                    value.status === '6' ? <div>
                        <UpLoadPoundList sites={JSON.stringify(value.sites)} current_site={value.current_site}
                                         supp_goods_name={value.supp_goods_name} unloading={true} id={value.id}>
                          <Button type='primary' style={{ marginRight: 10 }}>确认收货</Button>
                        </UpLoadPoundList>
                        <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                        <Button className='line-primary'>取消订单</Button>
                      </div> :
                      value.status === '7' ? <div>
                          <Button className='yellow-btn' style={{ marginRight: 10 }}
                                  onClick={this.goSupplierHistory.bind(null, value.supp_id, value.supp_name)}>采购对账</Button>
                          <Dropdown overlay={menu}>
                            <Button className='yellow-btn' style={{ marginRight: 10 }}>销售对账</Button>
                          </Dropdown>
                          <OrderModify id={value.id} status={5}>
                            <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                          </OrderModify>
                          <UpLoadPoundList sites={JSON.stringify(value.sites)} current_site={value.current_site}
                                           supp_goods_name={value.supp_goods_name} id={value.id} readOnly={true}>
                            <Button type='primary' style={{ marginRight: 10 }}>磅票信息</Button>
                          </UpLoadPoundList>
                        </div> :
                        value.status === '8' ? <div>
                            <Button className='yellow-btn' style={{ marginRight: 10 }}>采购开票</Button>
                            <SalesBilling>
                              <Button type='primary' style={{ marginRight: 10 }}>销售开票</Button>
                            </SalesBilling>
                            <Button type='primary' style={{ marginRight: 10 }}>再来一单</Button>
                            <Button type='primary' style={{ marginRight: 10 }}>磅票信息</Button>
                          </div> :
                          value.status === '9' ? <div>
                              <Button type='primary' style={{ marginRight: 10 }}>再来一单</Button>
                              <Button type='primary' style={{ marginRight: 10 }}>磅票信息</Button>
                            </div> :
                            value.status === '10' ? <div>
                              <Button type='primary' style={{ marginRight: 10 }}>恢复订单</Button>
                              <Button className='red-btn' style={{ marginRight: 10 }}>删除订单</Button>
                            </div> : null
          }
        </div>
      </Card>
    }) : <Empty />
  }

  fetchOrderList = (page) => {
    this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {
        page,
        orderStatus: this.props.order.orderStatus,
      },
    })
  }

  render() {
    const { orderPage, orderTotal } = this.props.order
    const { order_modify_id, order_modify_type, order_modify_visible } = this.props.order

    return (
      <div style={{ padding: '20px 0' }}>
        {this.mapOrderList()}
        <OrderModify visible={order_modify_visible} />
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Pagination current={orderPage} total={orderTotal} onChange={this.fetchOrderList} />
        </div>
      </div>
    )
  }
}

export default OrderList
