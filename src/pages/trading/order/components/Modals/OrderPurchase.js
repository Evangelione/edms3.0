import React, { Component } from 'react'
import { Modal, Row, Col, Button, Input, Select, Form, InputNumber, DatePicker } from 'antd'
import { connect } from 'dva'
import { SuppImg, SiteImg, GasImg, site_type, IconFont } from '@/common/constants'
import styles from '../../index.less'
import moment from 'moment'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.loading,
}))
@Form.create()
class OrderPurchase extends Component {
  state = {
    visible: false,
    supplierSelectionStatus: false,
    visibleSupplierInfo: false,
    gasSelectionStatus: false,
    visibleGasInfo: false,
    sites: [],
    currentSupp: {},
    currentGas: {},
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireSuppInfoByOrderPurchase',
      payload: {},
    })
    this.setState({
      visible: true,
      sites: JSON.parse(this.props.sites),
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      supplierSelectionStatus: false,
      visibleSupplierInfo: false,
      gasSelectionStatus: false,
      visibleGasInfo: false,
    })
  }

  changeSupplierSelectionStatus = () => {
    this.setState({
      supplierSelectionStatus: !this.state.supplierSelectionStatus,
    })
  }

  changeGasSelectionStatus = () => {
    this.setState({
      gasSelectionStatus: !this.state.gasSelectionStatus,
    })
  }

  inquireSupplierInfo = (value, option) => {
    this.props.dispatch({
      type: 'order/inquireGasInfoByOrderPurchase',
      payload: {
        id: value,
      },
    }).then(() => {
      this.setState({
        visibleSupplierInfo: true,
        currentSupp: {
          id: value,
          company_name: option.props.company_name,
          contact: option.props.contact,
          contact_phone: option.props.contact_phone,
          credit: option.props.credit,
          balance: option.props.balance,
        },
      })
    })
  }

  inquireGasInfo = (value, option) => {
    this.setState({
      visibleGasInfo: true,
      currentGas: {
        id: value,
        goods_name: option.props.goods_name,
        goods_place: option.props.goods_place,
        contact: option.props.contact,
        contact_phone: option.props.contact_phone,
        area: option.props.area,
        city: option.props.city,
        province: option.props.province,
        goods_address: option.props.goods_address,
      },
    })
  }

  purchase = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        // this.props.dispatch({
        //   type: 'order/purchase',
        //   payload: {
        //     form: values,
        //   },
        // }).then(() => {
        //   this.props.dispatch({
        //     type: 'order/fetchOrderList',
        //     payload: {},
        //   })
        // })
      }
    })
  }

  render() {
    const { visible, supplierSelectionStatus, visibleSupplierInfo, gasSelectionStatus, visibleGasInfo, sites, currentSupp, currentGas } = this.state
    const { children, order: { suppInfoByOrderPurchase, gasInfoByOrderPurchase }, loading, form: { getFieldDecorator } } = this.props
    const supplierInfoLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const itemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    }
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="采购下单"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}
          style={{ top: 50 }}>
          <div style={{ padding: '24px 24px 10px' }}>
            {sites.length && sites.map((item, index) => {
              return <div key={index}>
                <Row style={index !== 0 ? { marginTop: 20 } : {}}>
                  <Col span={3}>
                    <div style={{ paddingLeft: 31 }}>
                      {SiteImg}
                    </div>
                  </Col>
                  <Col span={15} style={{ marginLeft: 9 }}>
                    {item.site_name ? <div className={styles['site-select-info']}>
                      <div>
                        <div>
                          <div className={styles['site-name']}>{item.site_name}</div>
                          <div>{item.contact} {item.contact_phone}</div>
                        </div>
                      </div>
                      <div>
                        <div className={styles['blue-background']}>{site_type[item.site_type - 1]}</div>
                        <div>{item.province} {item.city} {item.area} {item.address}</div>
                      </div>
                    </div> : <div style={{ marginTop: 10, marginBottom: 30 }} className='font-gray-color'>暂无站点信息</div>}
                  </Col>
                </Row>
                <Row>
                  <Col span={9} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col span={8}>
                      <div className={styles['custom-label']}>
                        计划数量
                      </div>
                    </Col>
                    <Col span={15} style={{ marginLeft: 9 }}>
                      <Input value={item.quantity} disabled addonAfter='吨' />
                    </Col>
                  </Col>
                  <Col span={11} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col span={8}>
                      <div className={styles['custom-label']} style={{ paddingRight: 3 }}>
                        卸货时间
                      </div>
                    </Col>
                    <Col span={15} style={{ marginLeft: 17 }}>
                      <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                  style={{ width: '100%' }} disabled value={item.rece_time && moment(item.rece_time)}
                                  placeholder='暂无卸货时间' />
                    </Col>
                  </Col>
                </Row>
              </div>
            })}
            <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24, marginTop: 24 }} />
            <Form>
              {visibleSupplierInfo ?
                <Row>
                  <Col span={3}>
                    <div style={{ paddingLeft: 31 }}>
                      {SuppImg}
                    </div>
                  </Col>
                  <Col span={15} style={{ marginLeft: 9 }}>
                    <div className={styles['site-select-info']}>
                      <div>
                        <div>
                          <div className={styles['site-name']}>{currentSupp.company_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleSupplierInfo: false })}>更改</span>
                            <span className={styles['delete-font']}
                                  onClick={() => this.setState({
                                    visibleSupplierInfo: false,
                                    supplierSelectionStatus: false,
                                  })}>删除</span>
                          </div>
                          <div>{currentSupp.contact} {currentSupp.contact_phone}</div>
                        </div>
                        <div>
                          <div>预付款额 <span
                            className={styles['red-font']}>{currentSupp.balance}元</span>
                          </div>
                          <div>信用额度 <span
                            className={styles['red-font']}>{currentSupp.credit}元</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> :
                <Form.Item label={SuppImg} {...supplierInfoLayout}>
                  {getFieldDecorator('supplier_id', {
                    rules: [{ required: true }],
                  })(!supplierSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                        onClick={this.changeSupplierSelectionStatus}>请选择供应商</Button> :
                    <Select placeholder='请选择供应商' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeSupplierSelectionStatus}
                            onSelect={this.inquireSupplierInfo}>
                      {suppInfoByOrderPurchase.map((item, index) => {
                        return <Option value={item.id} {...item} key={index}>{item.company_name}</Option>
                      })}
                    </Select>)}
                </Form.Item>}
              <Row style={{ marginTop: 25 }}>
                <Col span={9}>
                  <Form.Item label='采购价格' {...itemLayout}>
                    {getFieldDecorator('price', {
                      rules: [{ required: true }],
                    })(
                      <InputNumber placeholder="请输入价格" min={0} precision={2} style={{ width: '100%' }} />,
                    )}
                    <div className='addonAfter'>元/吨</div>
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='付款方式' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('payment_type', {
                      initialValue: 1,
                    })(
                      <Select>
                        <Option value={1}>预付款</Option>
                        <Option value={2}>信用额</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={9}>
                  <Form.Item label='配送方式' {...itemLayout}>
                    {getFieldDecorator('delivery_type', {
                      initialValue: 1,
                    })(
                      <Select>
                        <Option value={1}>自提</Option>
                        <Option value={2}>信用额</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('extra_fee')(
                      <InputNumber placeholder="请输入价格" min={0} precision={2} style={{ width: '100%' }} />,
                    )}
                    <div className='addonAfter'>元</div>
                  </Form.Item>
                </Col>
              </Row>
              <div className='modal-line'
                   style={{ width: 828, marginLeft: '-12px', marginBottom: 24, marginTop: 24 }} />


              {visibleGasInfo ?
                <Row>
                  <Col span={3}>
                    <div style={{ paddingLeft: 31 }}>
                      {GasImg}
                    </div>
                  </Col>
                  <Col span={15} style={{ marginLeft: 9 }}>
                    <div className={styles['site-select-info']}>
                      <div>
                        <div>
                          <div className={styles['site-name']}>{currentGas.goods_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleGasInfo: false })}>更改</span>
                            <span className={styles['delete-font']}
                                  onClick={() => this.setState({
                                    visibleGasInfo: false,
                                    gasSelectionStatus: false,
                                  })}>删除</span>
                          </div>
                          <div>{currentGas.contact} {currentGas.contact_phone}</div>
                        </div>
                      </div>
                      <div>
                        <div className={styles['blue-background']}>{currentGas.goods_name}</div>
                        <div>{currentGas.province} {currentGas.city} {currentGas.area} {currentGas.goods_address}</div>
                      </div>
                    </div>
                  </Col>
                </Row> :
                <Form.Item label={GasImg} {...supplierInfoLayout}>
                  {getFieldDecorator('supp_goods_id', {
                    rules: [{ required: true }],
                  })(!gasSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                   onClick={this.changeGasSelectionStatus}>请选择气源</Button> :
                    <Select placeholder='请选择气源' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeGasSelectionStatus}
                            onSelect={this.inquireGasInfo}>
                      {gasInfoByOrderPurchase.map((item, index) => {
                        return <Option value={item.id} {...item} key={index}>{item.goods_name}</Option>
                      })}
                    </Select>)}
                </Form.Item>}
              <Row>
                <Col span={9}>
                  <Form.Item label='计划数量' {...itemLayout}>
                    {getFieldDecorator('21balance3', {
                      initialValue: 1,
                    })(
                      <Input disabled addonAfter='吨' />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='装货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('22balance1')(
                      <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                  style={{ width: '100%' }} placeholder='暂无装货时间' />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>采购总量 <span className={styles['red-font']}>20.000 吨</span></div>
                <div style={{ marginLeft: 30 }}>采购总额 <span className={styles['red-font']}>20.000 元</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}
                        onClick={this.purchase}>确认下单</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default OrderPurchase
