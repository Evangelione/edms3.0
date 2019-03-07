import React, { Component } from 'react'
import { Button, Popover, Row, Col, Upload } from 'antd'
import { connect } from 'dva'
import { order_type } from '@/common/constants'
import OrderList from './OrderList'
import OrderMap from './OrderMap'
import { IP } from '@/common/constants'
import styles from './index.less'
import CreatePlan from './components/Modals/CreatePlan'

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class Index extends Component {

  state = {
    currBarStatus: '筛选',
    filterHei: 80,
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

  render() {
    const { currBarStatus, filterHei } = this.state
    const { loading, order } = this.props
    const { orderStatus } = order
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
        <div className='toolbar' style={{ height: filterHei, transition: 'all 0.5s' }}>
          <CreatePlan>
            <Button type='primary'>新增订单</Button>
          </CreatePlan>
          <Popover placement="bottomLeft" title={popTitle} content={popContent}
                   trigger="click">
            <Button type='primary' style={{ marginLeft: 10 }}>导入信息</Button>
          </Popover>
          <Button type='primary' style={{ float: 'right', marginTop: 20 }}
                  onClick={this.changeFilter}>{currBarStatus}</Button>
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
