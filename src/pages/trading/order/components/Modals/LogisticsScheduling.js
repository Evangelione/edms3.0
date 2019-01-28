import React, { Component } from 'react'
import { Col, Modal, Row, Select, Form, Input, Button, DatePicker, AutoComplete } from 'antd'
import { connect } from 'dva'
import { IconFont, SiteImg } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class LogisticsScheduling extends Component {
  state = {
    visible: false,
    selectionStatus: false,
    visibleLogisticsInfo: false,
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireSiteInfoByLogisticsScheduling',
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

  changeSelectionStatus = () => {
    this.setState({
      selectionStatus: !this.state.selectionStatus,
    })
  }

  inquireLogisticsInfo = (value) => {
    console.log(value)
    this.props.dispatch({
      type: 'order/inquireLogisticsInfoByLogisticsScheduling',
      payload: {},
    }).then(() => {
      this.setState({
        visibleLogisticsInfo: true,
      })
      console.log(this.props.order.siteSelectInfoByCreatePlan)
    })
  }

  render() {
    const { visible, selectionStatus, visibleLogisticsInfo } = this.state
    const { children, order: { siteInfoByLogisticsScheduling, logisticsInfoByLogisticsScheduling }, form: { getFieldDecorator }, loading } = this.props
    const siteInfoLayout = {
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
        sm: { span: 16 },
      },
    }
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="物流调度"
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
                      <div className={styles['site-name']}>{siteInfoByLogisticsScheduling.site_name}</div>
                      <div>{siteInfoByLogisticsScheduling.contact} {siteInfoByLogisticsScheduling.contact_phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{siteInfoByLogisticsScheduling.site_type}</div>
                    <div>{siteInfoByLogisticsScheduling.province} {siteInfoByLogisticsScheduling.city} {siteInfoByLogisticsScheduling.area} {siteInfoByLogisticsScheduling.address}</div>
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
                  <Input value={siteInfoByLogisticsScheduling.plan_num} disabled />
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
                              style={{ width: '100%' }} disabled value={siteInfoByLogisticsScheduling.plan_time} placeholder='暂无卸货时间'/>
                </Col>
              </Col>
            </Row>
            <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24, marginTop: 24 }} />
            <Form>
              {visibleLogisticsInfo ? <>
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
                          <div className={styles['site-name']}>{logisticsInfoByLogisticsScheduling.site_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleLogisticsInfo: false })}>更改</span>
                          </div>
                          <div>{logisticsInfoByLogisticsScheduling.contact} {logisticsInfoByLogisticsScheduling.contact_phone}</div>
                        </div>
                        <div>
                          <div>预付款额 <span
                            className={styles['red-font']}>{logisticsInfoByLogisticsScheduling.balance}元</span>
                          </div>
                          <div>信用额度 <span
                            className={styles['red-font']}>{logisticsInfoByLogisticsScheduling.credit}元</span></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 25 }}>
                  <Col span={9}>
                    <Form.Item label='计价方式' {...itemLayout}>
                      {getFieldDecorator('balance3', {
                        initialValue: 1,
                      })(
                        <Select>
                          <Option value={1}>元/吨</Option>
                          <Option value={2}>元/吨·公里</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='付款方式' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('balance1', {
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
                    <Form.Item label='运输距离' {...itemLayout}>
                      {getFieldDecorator('balance32', {
                        rules: [{ required: true }],
                      })(
                        <Input addonAfter='公里' placeholder='请输入运输距离' />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='运输价格' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('balance14', {
                        rules: [{ required: true }],
                      })(
                        <Input addonAfter='元/吨' placeholder='请输入金额' />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item label='额外费用' {...itemLayout}>
                      {getFieldDecorator('balanc2e32', {
                        rules: [{ required: true }],
                      })(
                        <Input addonAfter='元' placeholder='请输入金额' />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='装货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('b1alance14', {
                        rules: [{ required: true }],
                      })(
                        <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                    style={{ width: '100%' }} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item label='司机选择' {...itemLayout}>
                      {getFieldDecorator('bal34anc2e32', {
                        rules: [{ required: true }],
                      })(
                        <AutoComplete placeholder="请选择司机" />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='押运选择' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('b1ala2nce14')(
                        <AutoComplete placeholder="请选择押运" />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item label='车头选择' {...itemLayout}>
                      {getFieldDecorator('bal3434anc2e32', {
                        rules: [{ required: true }],
                      })(
                        <AutoComplete placeholder="请选择车头" />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='车挂选择' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('b1ala2n123ce14')(
                        <AutoComplete placeholder="请选择车挂" />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </> : <Form.Item label={SiteImg} {...siteInfoLayout}>
                {getFieldDecorator('balance', {
                  rules: [{ required: true }],
                })(!selectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                              onClick={this.changeSelectionStatus}>请选择承运物流商</Button> :
                  <Select placeholder='请选择承运物流商' autoFocus={true} defaultOpen={true} onBlur={this.changeSelectionStatus}
                          onSelect={this.inquireLogisticsInfo}>
                    <Option value={1}>123</Option>
                  </Select>)}
              </Form.Item>}
            </Form>
          </div>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>销售总量 <span className={styles['red-font']}>20.000 吨</span></div>
                <div style={{ marginLeft: 30 }}>销售总额 <span className={styles['red-font']}>20.000 吨</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>确认调度</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LogisticsScheduling
