import React, { Component } from 'react'
import { Col, Modal, Row, Select, Form, Input, Button, DatePicker } from 'antd'
import { connect } from 'dva'
import { IconFont, ClientImg, SiteImg } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.loading,
}))
@Form.create()
class OrderConfirm extends Component {
  state = {
    visible: false,
    visibleSiteInfo: false,
    siteSelectionStatus: false,
    visibleGasInfo: false,
    gasSelectionStatus: false,

  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireOrderInfoByOrderConfirm',
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

  changeSiteSelectionStatus = () => {
    this.setState({
      siteSelectionStatus: !this.state.siteSelectionStatus,
    })
  }

  inquireSiteInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireSiteSelectInfoByOrderConfirm',
      payload: {},
    }).then(() => {
      this.setState({
        visibleSiteInfo: true,
      })
    })
  }

  changeGasSelectionStatus = () => {
    this.setState({
      gasSelectionStatus: !this.state.gasSelectionStatus,
    })
  }

  inquireGasInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireGasSelectInfoByOrderConfirm',
      payload: {},
    }).then(() => {
      this.setState({
        visibleGasInfo: true,
      })
    })
  }

  render() {
    const { visible, visibleSiteInfo, siteSelectionStatus, visibleGasInfo, gasSelectionStatus } = this.state
    const { children, order: { orderInfoByOrderConfirm, siteSelectInfoByOrderConfirm,gasSelectInfoByOrderConfirm }, form: { getFieldDecorator }, loading } = this.props
    const outLayout = {
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
      <div onClick={this.showModal} style={{display: 'inline-block'}}>
        {children}
        <Modal
          title="确认订单"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          bodyStyle={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 10px' }}>
            <Row>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {ClientImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{orderInfoByOrderConfirm.site_name}</div>
                      <div>{orderInfoByOrderConfirm.contact} {orderInfoByOrderConfirm.contact_phone}</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Form>
              <Row style={{ marginTop: 25 }}>
                <Col span={9}>
                  <Form.Item label='销售价格' {...itemLayout}>
                    {getFieldDecorator('balance3')(
                      <Input addonAfter='元/吨' disabled />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '43.4%' }}>
                  <Form.Item label='付款方式' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('balance1')(
                      <Input addonAfter='元/吨' disabled />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={9}>
                  <Form.Item label='配送方式' {...itemLayout}>
                    {getFieldDecorator('bala12nce3', {
                      initialValue: 1,
                    })(
                      <Select placeholder='请选择配送方式'>
                        <Option value={2}>卖方配送</Option>
                        <Option value={3}>买方自提</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '43.4%' }}>
                  <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('bal123ance1')(
                      <Input addonAfter='元' disabled />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />

              {visibleSiteInfo ?
                <>
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
                            <div className={styles['site-name']}>{siteSelectInfoByOrderConfirm.site_name}
                              <span className={styles['blue-font']}
                                    onClick={() => this.setState({ visibleSiteInfo: false })}>更改</span>
                            </div>
                            <div>{siteSelectInfoByOrderConfirm.contact} {siteSelectInfoByOrderConfirm.contact_phone}</div>
                          </div>
                        </div>
                        <div>
                          <div className={styles['blue-background']}>{siteSelectInfoByOrderConfirm.site_type}</div>
                          <div>{siteSelectInfoByOrderConfirm.province} {siteSelectInfoByOrderConfirm.city} {siteSelectInfoByOrderConfirm.area} {siteSelectInfoByOrderConfirm.address}</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col span={9}>
                      <Form.Item label='计划数量' {...itemLayout}>
                        {getFieldDecorator('balance3')(
                          <Input addonAfter='元' disabled />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={10} style={{ width: '43.4%' }}>
                      <Form.Item label='交货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                        {getFieldDecorator('balance1')(
                          <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                      disabled />,
                        )}
                      </Form.Item>
                    </Col>

                  </Row>
                </> :
                <Form.Item label={SiteImg} {...outLayout}>
                  {getFieldDecorator('balance', {
                    rules: [{ required: true }],
                  })(!siteSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                    onClick={this.changeSiteSelectionStatus}>请选择站点</Button> :
                    <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeSiteSelectionStatus}
                            onSelect={this.inquireSiteInfo}>
                      <Option value={1}>123</Option>
                    </Select>)}
                </Form.Item>}
              <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />


              {visibleGasInfo ?
                <>
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
                            <div className={styles['site-name']}>{gasSelectInfoByOrderConfirm.site_name}
                              <span className={styles['blue-font']}
                                    onClick={() => this.setState({ visibleGasInfo: false })}>更改</span>
                            </div>
                            <div>{gasSelectInfoByOrderConfirm.contact} {gasSelectInfoByOrderConfirm.contact_phone}</div>
                          </div>
                        </div>
                        <div>
                          <div className={styles['blue-background']}>{gasSelectInfoByOrderConfirm.site_type}</div>
                          <div>{gasSelectInfoByOrderConfirm.province} {gasSelectInfoByOrderConfirm.city} {gasSelectInfoByOrderConfirm.area} {gasSelectInfoByOrderConfirm.address}</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col span={9}>
                      <Form.Item label='计划数量' {...itemLayout}>
                        {getFieldDecorator('bal341ance3')(
                          <Input addonAfter='元' disabled />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={10} style={{ width: '43.4%' }}>
                      <Form.Item label='装货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                        {getFieldDecorator('b123alance1')(
                          <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                      disabled />,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </> :
                <Form.Item label={SiteImg} {...outLayout}>
                  {getFieldDecorator('balanc123e', {
                    rules: [{ required: true }],
                  })(!gasSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                    onClick={this.changeGasSelectionStatus}>请选择气源</Button> :
                    <Select placeholder='请选择气源' autoFocus={true} defaultOpen={true}
                            onBlur={this.changeGasSelectionStatus}
                            onSelect={this.inquireGasInfo}>
                      <Option value={1}>123</Option>
                    </Select>)}
                </Form.Item>}
            </Form>
          </div>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>采购总量 <span className={styles['red-font']}>20.000 吨</span></div>
                <div style={{ marginLeft: 30 }}>采购总额 <span className={styles['red-font']}>90,000.00 元</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>确认接单</Button>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>下次再说</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default OrderConfirm
