import React, { Component } from 'react'
import { Modal, Row, Col, Button, Input, Select, Form } from 'antd'
import { connect } from 'dva'
import { SuppImg, SiteImg } from '@/common/constants'
import styles from '../../index.less'

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
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireSiteInfoByOrderPurchase',
      payload: {},
    })
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
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

  inquireSupplierInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireSupplierSelectInfoByOrderPurchase',
      payload: {},
    }).then(() => {
      this.setState({
        visibleSupplierInfo: true,
      })
    })
  }

  inquireGasInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireGasSelectInfoByOrderPurchase',
      payload: {},
    }).then(() => {
      this.setState({
        visibleGasInfo: true,
      })
    })
  }

  render() {
    const { visible, supplierSelectionStatus, visibleSupplierInfo, gasSelectionStatus, visibleGasInfo } = this.state
    const { children, order: { siteInfoByOrderPurchase, supplierSelectInfoByOrderPurchase, gasSelectInfoByOrderPurchase }, loading, form: { getFieldDecorator } } = this.props
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
      <div onClick={this.showModal}>
        {children}
        <Modal
          title="采购下单"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          bodyStyle={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 10px' }}>
            <Row>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {SiteImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{siteInfoByOrderPurchase.site_name}</div>
                      <div>{siteInfoByOrderPurchase.contact} {siteInfoByOrderPurchase.contact_phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{siteInfoByOrderPurchase.site_type}</div>
                    <div>{siteInfoByOrderPurchase.province} {siteInfoByOrderPurchase.city} {siteInfoByOrderPurchase.area} {siteInfoByOrderPurchase.address}</div>
                  </div>
                </div>
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
                  <Input value={siteInfoByOrderPurchase.plan_num} disabled />
                </Col>
              </Col>
              <Col span={11} style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={8}>
                  <div className={styles['custom-label']} style={{ paddingRight: 3 }}>
                    交货时间
                  </div>
                </Col>
                <Col span={15} style={{ marginLeft: 17 }}>
                  <Input value={siteInfoByOrderPurchase.plan_time} disabled />
                </Col>
              </Col>
            </Row>
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
                          <div className={styles['site-name']}>{supplierSelectInfoByOrderPurchase.site_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleSupplierInfo: false })}>更改</span>
                          </div>
                          <div>{supplierSelectInfoByOrderPurchase.contact} {supplierSelectInfoByOrderPurchase.contact_phone}</div>
                        </div>
                        <div>
                          <div>预付款额 <span
                            className={styles['red-font']}>{supplierSelectInfoByOrderPurchase.balance}元</span>
                          </div>
                          <div>信用额度 <span
                            className={styles['red-font']}>{supplierSelectInfoByOrderPurchase.credit}元</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> :
                <Form.Item label={SuppImg} {...supplierInfoLayout}>
                  {getFieldDecorator('balance', {
                    rules: [{ required: true }],
                  })(!supplierSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                        onClick={this.changeSupplierSelectionStatus}>请选择供应商</Button> :
                    <Select placeholder='请选择供应商' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeSupplierSelectionStatus}
                            onSelect={this.inquireSupplierInfo}>
                      <Option value={1}>123</Option>
                    </Select>)}
                </Form.Item>}
              <Row style={{ marginTop: 25 }}>
                <Col span={9}>
                  <Form.Item label='采购价格' {...itemLayout}>
                    {getFieldDecorator('1balance3', {
                      rules: [{ required: true }],
                    })(
                      <Input addonAfter='元/吨' placeholder='请输入价格' />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='付款方式' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('2balance1', {
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
                    {getFieldDecorator('21balance3', {
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
                    {getFieldDecorator('22balance1')(
                      <Input addonAfter='元' placeholder='请输入费用' />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <div className='modal-line'
                   style={{ width: 828, marginLeft: '-12px', marginBottom: 24, marginTop: 24 }} />


              {visibleGasInfo ?
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
                          <div className={styles['site-name']}>{gasSelectInfoByOrderPurchase.site_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleGasInfo: false })}>更改</span>
                          </div>
                          <div>{gasSelectInfoByOrderPurchase.contact} {gasSelectInfoByOrderPurchase.contact_phone}</div>
                        </div>
                        <div>
                          <div>预付款额 <span
                            className={styles['red-font']}>{gasSelectInfoByOrderPurchase.balance}元</span>
                          </div>
                          <div>信用额度 <span
                            className={styles['red-font']}>{gasSelectInfoByOrderPurchase.credit}元</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> :
                <Form.Item label={SuppImg} {...supplierInfoLayout}>
                  {getFieldDecorator('balance', {
                    rules: [{ required: true }],
                  })(!gasSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                   onClick={this.changeGasSelectionStatus}>请选择气源</Button> :
                    <Select placeholder='请选择气源' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeGasSelectionStatus}
                            onSelect={this.inquireGasInfo}>
                      <Option value={1}>123</Option>
                    </Select>)}
                </Form.Item>}
              <Row style={{ marginTop: 25 }}>
                <Col span={9}>
                  <Form.Item label='采购价格' {...itemLayout}>
                    {getFieldDecorator('1balance3', {
                      rules: [{ required: true }],
                    })(
                      <Input addonAfter='元/吨' placeholder='请输入价格' />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='付款方式' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('2balance1', {
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
                    {getFieldDecorator('21balance3', {
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
                    {getFieldDecorator('22balance1')(
                      <Input addonAfter='元' placeholder='请输入费用' />,
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
                <div style={{ marginLeft: 30 }}>采购总额 <span className={styles['red-font']}>20.000 吨</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>确认调度</Button>
                <Button className='red-btn'>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default OrderPurchase
