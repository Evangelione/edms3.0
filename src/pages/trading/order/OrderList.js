import React, { Component } from 'react'
import { Card, Button, Row, Col, Empty } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import OrderConfirm from './components/Modals/OrderConfirm'
import SalesBilling from './components/Modals/SalesBilling'
import LogisticsScheduling from './components/Modals/LogisticsScheduling'
import OrderPurchase from './components/Modals/OrderPurchase'
import UpLoadPoundList from './components/Modals/UpLoadPoundList'
import styles from './index.less'

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class OrderList extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {},
    })
  }

  mapOrderList = () => {
    const { order: { orderList, currentOrderNum } } = this.props
    return orderList.length ? orderList.map((value, index) => {
      let span = 24 / (value.buyer.length + 1)
      let screenWidth = document.body.scrollWidth
      let lineWidth = (screenWidth / 2 / (value.buyer.length + 1)) - (90 / (value.buyer.length + 1)) * (value.buyer.length + 1)
      let lineLeft = lineWidth / 2
      return <Card key={index} style={{ marginBottom: 18 }} bodyStyle={{ padding: 0 }}
                   className={classnames(currentOrderNum === index ? styles['order-card-active'] : '', styles['order-card'])}>
        <div className={styles['order-card-header']}>
          <div>
            <img src={require('../../../assets/image/car_head_36_36.png')} style={{ width: 32, height: 28 }} alt="" />
            <div style={{ marginLeft: 20 }}>{value.car_body_code}</div>
          </div>
          <div style={{ color: '#FFAD4D', fontWeight: 400, fontSize: '1rem' }}>{value.order_status}</div>
        </div>
        <Row className={styles['order-card-body']}>
          <Col span={span} style={{ position: 'relative' }}>
            <div className={styles['name']}>卖家：{value.seller.name}</div>
            <div
              className={styles['detail']}>{value.seller.buy_num}吨&nbsp;&nbsp;&nbsp;共&nbsp;{value.seller.buy_price}元
            </div>
            <img src={require('@/assets/image/gas_blue.png')} className={styles['img']} alt="" />
            <div className={classnames(styles['gas'], styles['primary-color'])}>
              {value.seller.gas_name}&nbsp;&nbsp;({value.seller.actual_buy_num} 吨)
            </div>
            <div className={classnames(styles['take-time'], styles['primary-color'])}>
              实际装车时间&nbsp;{value.seller.take_time}
            </div>
            <div>
              <div className={styles['dashed-line-blue']} style={{ width: lineWidth, right: -lineLeft }} />
              <div className={styles['logistics-car']} />
            </div>
          </Col>
          {value.buyer.map((value1, index1) => {
            return <Col span={span} key={index1} style={{ position: 'relative' }}>
              <div className={styles['name']}>卖家：{value1.name}</div>
              <div className={styles['detail']}>{value1.sell_num}吨&nbsp;&nbsp;&nbsp;共&nbsp;{value1.sell_price}元</div>
              <img src={require('@/assets/image/site_gray.png')} className={styles['img']} alt="" />
              <div className={classnames(styles['gas'])}>
                {value1.gas_name}&nbsp;&nbsp;({value1.actual_sell_num} 吨)
              </div>
              <div className={classnames(styles['take-time'])}>
                实际卸车时间&nbsp;{value1.take_time}
              </div>
              {value.buyer.length - 1 !== index1 ?
                <div className={styles['solid-line-gray']} style={{ width: lineWidth, right: -lineLeft }} /> : null}
            </Col>
          })}
        </Row>
        <div className={styles['order-card-footer']}>
          <div>
            <div>订单编号：{value.order_id}</div>
            <div>创建时间：{value.order_make_time}</div>
          </div>
          {value.status === '1' ? <div>
              <OrderConfirm>
                <Button type='primary' style={{ marginRight: 10 }}>确认收货</Button>
              </OrderConfirm>
              <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
              <Button className='line-primary'>取消订单</Button>
            </div> :
            value.status === '2' ? <div>
                <SalesBilling>
                  <Button type='primary' style={{ marginRight: 10 }}>销售开单</Button>
                </SalesBilling>
                <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                <Button className='line-primary'>取消订单</Button>
              </div> :
              value.status === '3' ? <div>
                  <LogisticsScheduling>
                    <Button type='primary' style={{ marginRight: 10 }}>去调度</Button>
                  </LogisticsScheduling>
                  <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                  <Button className='line-primary'>取消订单</Button>
                </div> :
                value.status === '4' ? <div>
                  <UpLoadPoundList>
                    <Button type='primary' style={{ marginRight: 10 }}>上传装车磅单</Button>
                  </UpLoadPoundList>
                  <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                  <Button className='line-primary'>取消订单</Button>
                </div> : <div>
                  <OrderPurchase>
                    <Button type='primary' style={{ marginRight: 10 }}>去采购</Button>
                  </OrderPurchase>
                  <Button type='primary' style={{ marginRight: 10 }}>修改订单</Button>
                  <Button className='line-primary'>取消订单</Button>
                </div>}
        </div>
      </Card>
    }) : <Empty />
  }

  render() {
    return (
      <div style={{ padding: '20px 0' }}>
        {this.mapOrderList()}
      </div>
    )
  }
}

export default OrderList
