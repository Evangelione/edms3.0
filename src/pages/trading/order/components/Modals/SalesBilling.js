import React, { Component } from 'react'
import { Modal, Form, Select, Button, Row, Col, DatePicker, InputNumber } from 'antd'
import { connect } from 'dva'
import { ClientImg, SiteImg, IconFont } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class SalesBilling extends Component {
  state = {
    visible: false,
    clientSelectionStatus: false,
    visibleClientInfo: false,
    siteSelectionStatus: false,
    visibleSiteInfo: false,
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      clientSelectionStatus: false,
      visibleClientInfo: false,
      siteSelectionStatus: false,
      visibleSiteInfo: false,
    })
  }

  changeClientSelectionStatus = () => {
    this.setState({
      clientSelectionStatus: !this.state.clientSelectionStatus,
    })
  }

  inquireClientInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireClientSelectInfoBySalesBilling',
      payload: {},
    }).then(() => {
      this.setState({
        visibleClientInfo: true,
      })
    })
  }

  changeSiteSelectionStatus = () => {
    this.setState({
      siteSelectionStatus: !this.state.siteSelectionStatus,
    })
  }

  inquireSiteInfo = (value) => {
    this.props.dispatch({
      type: 'order/inquireSiteSelectInfoBySalesBilling',
      payload: {},
    }).then(() => {
      this.setState({
        visibleSiteInfo: true,
      })
    })
  }

  render() {
    const { clientSelectionStatus, visibleClientInfo, siteSelectionStatus, visibleSiteInfo } = this.state
    const { form: { getFieldDecorator }, order: { clientSelectInfoBySalesBilling, siteSelectInfoBySalesBilling }, children, loading } = this.props
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
        sm: { span: 15 },
      },
    }
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="销售开单"
          visible={this.state.visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}>
          <Form style={{ padding: '24px 24px 10px' }}>
            {visibleClientInfo ? <Row>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {ClientImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{clientSelectInfoBySalesBilling.site_name}
                        <span className={styles['blue-font']}
                              onClick={() => this.setState({ visibleClientInfo: false })}>更改</span>
                        <span className={styles['delete-font']}
                              onClick={() => this.setState({
                                visibleClientInfo: false,
                                clientSelectionStatus: false,
                              })}>删除</span>
                      </div>
                      <div>{clientSelectInfoBySalesBilling.contact} {clientSelectInfoBySalesBilling.contact_phone}</div>
                    </div>
                    <div>
                      <div>预付款额 <span className={styles['red-font']}>{clientSelectInfoBySalesBilling.balance}元</span>
                      </div>
                      <div>信用额度 <span className={styles['red-font']}>{clientSelectInfoBySalesBilling.credit}元</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row> : <Form.Item label={ClientImg} {...siteInfoLayout}>
              {getFieldDecorator('balance', {
                rules: [{ required: true }],
              })(!clientSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                  onClick={this.changeClientSelectionStatus}>请选择客户</Button> :
                <Select placeholder='请选择客户' autoFocus={true} defaultOpen={true}
                        onBlur={this.changeClientSelectionStatus}
                        onSelect={this.inquireClientInfo}>
                  <Option value={1}>123</Option>
                </Select>)}
            </Form.Item>}
            <Row style={{ marginTop: 30 }}>
              <Col span={9}>
                <Form.Item label='收款方式' {...itemLayout}>
                  {getFieldDecorator('balance3', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>预付款</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '43.4%' }}>
                <Form.Item label='配送方式' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('balance1', {
                    rules: [{ required: true }],
                  })(
                    <Select placeholder='请选择配送方式'>
                      <Option value={1}>我方配送</Option>
                      <Option value={2}>卖方配送</Option>
                      <Option value={3}>买方自提</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col span={9}>
                <Form.Item label='销售价格' {...itemLayout}>
                  {getFieldDecorator('balance2', {
                    rules: [{ required: true }],
                  })(
                    <InputNumber placeholder="请输入金额" min={0} precision={2} style={{ width: '100%' }} />,
                  )}
                  <div className='addonAfter'>元/吨</div>
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '43.4%' }}>
                <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('balance15')(
                    <InputNumber placeholder="请输入金额" min={0} precision={2} style={{ width: '100%' }} />,
                  )}
                  <div className='addonAfter'>元</div>
                </Form.Item>
              </Col>
            </Row>
            <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />
            {visibleSiteInfo ? <Row>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {SiteImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{siteSelectInfoBySalesBilling.site_name}
                        <span className={styles['blue-font']}
                              onClick={() => this.setState({ visibleSiteInfo: false })}>更改</span>
                        <span className={styles['delete-font']}
                              onClick={() => this.setState({
                                visibleSiteInfo: false,
                                siteSelectionStatus: false,
                              })}>删除</span>
                      </div>
                      <div>{siteSelectInfoBySalesBilling.contact} {siteSelectInfoBySalesBilling.contact_phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{siteSelectInfoBySalesBilling.site_type}</div>
                    <div>{siteSelectInfoBySalesBilling.province} {siteSelectInfoBySalesBilling.city} {siteSelectInfoBySalesBilling.area} {siteSelectInfoBySalesBilling.address}</div>
                  </div>
                </div>
              </Col>
            </Row> : <Form.Item label={SiteImg} {...siteInfoLayout}>
              {getFieldDecorator('ba1l4ance', {
                rules: [{ required: true }],
              })(!siteSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                onClick={this.changeSiteSelectionStatus}>请选择站点</Button> :
                <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true}
                        onBlur={this.changeSiteSelectionStatus}
                        onSelect={this.inquireSiteInfo}>
                  <Option value={1}>123</Option>
                </Select>)}
            </Form.Item>}
            <Row>
              <Col span={9}>
                <Form.Item label='计划数量' {...itemLayout}>
                  {getFieldDecorator('ba123lance3', {
                    initialValue: 1,
                  })(
                    <InputNumber placeholder="请输入计划数量" min={0} precision={3} style={{ width: '100%' }} />,
                  )}
                  <div className='addonAfter'>吨</div>
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='交货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('bal51ance1', {
                    rules: [{ required: true }],
                  })(
                    <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>销售总量 <span className={styles['red-font']}>20.000 吨</span></div>
                <div style={{ marginLeft: 30 }}>销售总额 <span className={styles['red-font']}>90,000.00 元</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>确认开单</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default SalesBilling
