import React, { Component } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'
import { Map } from 'react-amap'
import styles from './index.less'


@connect(({order, loading}) => ({
  order,
  loading: loading.models.order,
}))
class OrderMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barState: '下拉查看详情',
      detailHeight: 0,
    }
  }

  pullDetail = () => {
    this.setState({
      barState: this.state.barState === '下拉查看详情' ? '收起' : '下拉查看详情',
      detailHeight: this.state.barState === '下拉查看详情' ? 310 : 0,
    })
  }


  renderDetailItems = () => {
    const {order: {orderMapDetail}} = this.props
    return <>
      {orderMapDetail.client.map((value, index) => {
        return <div className={styles['detail-item']} key={index}>
          <div>
            <div className={styles['blue-color']}>客户：{value.name}</div>
            <div style={{paddingLeft: 41}}>{value.contact}&nbsp;&nbsp;&nbsp;&nbsp;{value.contact_phone}</div>
          </div>
          <div>
            <div>
              <div>销售总量&nbsp;&nbsp;&nbsp;{value.saler_num}吨</div>
              <div>收款方式&nbsp;&nbsp;&nbsp;{value.type}</div>
            </div>
            <div>
              <div>销售价格&nbsp;&nbsp;&nbsp;{value.saler_price}元/吨</div>
              <div>销售总额&nbsp;&nbsp;&nbsp;{value.saler_total}元</div>
            </div>
          </div>
        </div>
      })}
      {orderMapDetail.site.map((value, index) => {
        return <div className={styles['detail-item-area']} key={index}>
          <div>
            <div className={styles['blue-color']}>站点：{value.name}</div>
            <div style={{paddingLeft: 41}}>{value.contact}&nbsp;&nbsp;&nbsp;&nbsp;{value.contact_phone}</div>
          </div>
          <div>
            <div>
              <div className={styles['blue-background']}>{value.site_type}</div>
              &nbsp;&nbsp;&nbsp;{value.province} {value.city} {value.area} {value.address}</div>
            <div>
              <div>计划数量&nbsp;&nbsp;&nbsp;{value.plan_num}</div>
              <div>预计交货&nbsp;&nbsp;&nbsp;{value.plan_time}</div>
            </div>
          </div>
        </div>
      })}
      <div className={styles['detail-item']}>
        <div style={{paddingLeft: 12}}>
          <div className={styles['blue-color']}>供应商：{orderMapDetail.supplier.name}</div>
          <div
            style={{paddingLeft: 55}}>{orderMapDetail.supplier.contact}&nbsp;&nbsp;&nbsp;&nbsp;{orderMapDetail.supplier.contact_phone}</div>
        </div>
        <div style={{paddingLeft: 12}}>
          <div>
            <div>采购总量&nbsp;&nbsp;&nbsp;{orderMapDetail.supplier.purchase_num}吨</div>
            <div>收款方式&nbsp;&nbsp;&nbsp;{orderMapDetail.supplier.type}</div>
          </div>
          <div>
            <div>采购价格&nbsp;&nbsp;&nbsp;{orderMapDetail.supplier.purchase_price}元/吨</div>
            <div>采购总额&nbsp;&nbsp;&nbsp;{orderMapDetail.supplier.purchase_total}元</div>
          </div>
        </div>
      </div>
      <div className={styles['detail-item-area']}>
        <div>
          <div className={styles['blue-color']}>气源：{orderMapDetail.gas.name}</div>
          <div
            style={{paddingLeft: 41}}>{orderMapDetail.gas.contact}&nbsp;&nbsp;&nbsp;&nbsp;{orderMapDetail.gas.contact_phone}</div>
        </div>
        <div>
          <div>
            <div className={styles['blue-background']}>{orderMapDetail.gas.origin}</div>
            &nbsp;&nbsp;&nbsp;{orderMapDetail.gas.province} {orderMapDetail.gas.city} {orderMapDetail.gas.area} {orderMapDetail.gas.address}
          </div>
          <div>
            <div>配送方式&nbsp;&nbsp;&nbsp;{orderMapDetail.gas.logistics_type}</div>
            <div>预计装货&nbsp;&nbsp;&nbsp;{orderMapDetail.gas.plan_time}</div>
          </div>
        </div>
      </div>
      <div className={styles['detail-item']}>
        <div style={{paddingLeft: 12}}>
          <div className={styles['blue-color']}>物流：{orderMapDetail.logistics.name}</div>
          <div
            style={{paddingLeft: 55}}>{orderMapDetail.logistics.contact}&nbsp;&nbsp;&nbsp;&nbsp;{orderMapDetail.logistics.contact_phone}</div>
        </div>
        <div style={{paddingLeft: 12}}>
          <div>
            <div>运输距离&nbsp;&nbsp;&nbsp;{orderMapDetail.logistics.distance}公里</div>
            <div>付款方式&nbsp;&nbsp;&nbsp;{orderMapDetail.logistics.type}</div>
          </div>
          <div>
            <div>运输价格&nbsp;&nbsp;&nbsp;{orderMapDetail.logistics.log_price}元/吨</div>
            <div>运输费用&nbsp;&nbsp;&nbsp;{orderMapDetail.logistics.log_total}元</div>
          </div>
        </div>
      </div>
    </>
  }

  render() {
    const {barState, detailHeight} = this.state
    return (
      <div style={{padding: '20px 0', height: 500}}>
        <Card bodyStyle={{padding: 0, position: 'relative'}}>
          <div className={styles['map-title']}>
            <div>订单编号：DD2030124012509120334</div>
            <div className={styles['distance']}>已行驶 34公里 <span>/ 共125公里</span></div>
          </div>
          <div className={styles['map-detail-min']}>
            <div>
              <img src={require('@/assets/image/car_driver.png')} alt="" />
              <span>张三丰&nbsp;&nbsp;17878787878</span>
            </div>
            <div>
              <img src={require('@/assets/image/car_head.png')} alt="" />
              <span>京BS2341</span>
            </div>
            <div>
              <img src={require('@/assets/image/car_body.png')} alt="" />
              <span>京BF2341</span>
            </div>
            <div>
              <img src={require('@/assets/image/car_driver.png')} alt="" />
              <span>张三丰&nbsp;&nbsp;17878787878</span>
            </div>
            <div className={styles['map-detail-box-bar']} style={{top: 40 + detailHeight}}>
              <span style={{cursor: 'pointer'}} onClick={this.pullDetail}>{barState}</span>
            </div>
          </div>
          <div className={styles['map-detail-box']} style={{height: detailHeight}}>
            <div className={styles['map-detail-items']}>
              {this.renderDetailItems()}
            </div>
          </div>
          <div style={{height: 610}}>
            <Map amapkey='c189acdbb56b56e76b4757d770c32e6c' />
          </div>
        </Card>
      </div>
    )
  }
}

export default OrderMap
