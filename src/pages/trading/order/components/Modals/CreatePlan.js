import React, { Component } from 'react'
import { Modal, Form, Select, Button, Row, Col, DatePicker, Input } from 'antd'
import { connect } from 'dva'
import styles from '../../index.less'
import { IconFont, SiteImg, ClientImg } from '@/common/constants'
import { toFixed } from '@/utils/Math'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class CreatePlan extends Component {
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

  changeSiteSelectionStatus = () => {
    this.setState({
      siteSelectionStatus: !this.state.siteSelectionStatus,
    })
  }

  inquireClientInfo = (value) => {
    console.log(value)
    this.props.dispatch({
      type: 'order/inquireSiteSelectInfoByCreatePlan',
      payload: {},
    }).then(() => {
      this.setState({
        visibleClientInfo: true,
      })
      console.log(this.props.order.siteSelectInfoByCreatePlan)
    })
  }

  inquireSiteInfo = (value) => {
    console.log(value)
    this.props.dispatch({
      type: 'order/inquireSiteSelectInfoByCreatePlan',
      payload: {},
    }).then(() => {
      this.setState({
        visibleSiteInfo: true,
      })
      console.log(this.props.order.siteSelectInfoByCreatePlan)
    })
  }

  submit = () => {
    this.hideModal()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        console.log(values)
      }
    })
  }

  parseNumber = (filed, precision, e) => {
    let val = e.target.value
    if (val === '') {
      return false
    }
    isNaN(val) && (val = 0)
    let num = toFixed(val, precision)
    this.props.form.setFieldsValue({
      [filed]: num,
    })
  }

  render() {
    const { clientSelectionStatus, visibleClientInfo, siteSelectionStatus, visibleSiteInfo } = this.state
    const { form: { getFieldDecorator, getFieldValue }, order: { siteSelectInfoByCreatePlan }, children, loading } = this.props
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
    console.log()
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="创建订单"
          visible={this.state.visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}
        >
          <Form style={{ padding: '24px 24px 10px' }}>


            {visibleClientInfo ? <Row style={{ marginBottom: 25 }}>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {ClientImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{siteSelectInfoByCreatePlan.site_name}
                        <span className={styles['blue-font']}
                              onClick={() => this.setState({ visibleClientInfo: false })}>更改</span>
                        <span className={styles['delete-font']}
                              onClick={() => this.setState({
                                visibleClientInfo: false,
                                clientSelectionStatus: false,
                              })}>删除</span>
                      </div>
                      <div>{siteSelectInfoByCreatePlan.contact} {siteSelectInfoByCreatePlan.contact_phone}</div>
                    </div>
                    <div>
                      <div>预付款额 <span className={styles['red-font']}>{siteSelectInfoByCreatePlan.balance}元</span></div>
                      <div>信用额度 <span className={styles['red-font']}>{siteSelectInfoByCreatePlan.credit}元</span></div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row> : <Form.Item label={ClientImg} {...siteInfoLayout}>
              {getFieldDecorator('ba2lance', {
                rules: [{ required: true }],
              })(!clientSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                  onClick={this.changeClientSelectionStatus}>请选择客户</Button> :
                <Select placeholder='请选择客户' autoFocus={true} defaultOpen={true}
                        onBlur={this.changeClientSelectionStatus}
                        onSelect={this.inquireClientInfo}>
                  <Option value={1}>123</Option>
                </Select>)}
            </Form.Item>}
            <Row>
              <Col span={9}>
                <Form.Item label='收款方式' {...itemLayout}>
                  {getFieldDecorator('ba1lance3', {
                    initialValue: '1',
                  })(
                    <Select>
                      <Option value='1'>预付款</Option>
                      <Option value='2'>信用额</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='配送方式' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('ba3lan22ce1', {
                    rules: [{ required: true }],
                    initialValue: '1',
                  })(
                    <Select placeholder='请选择配送方式'>
                      <Option value='1'>卖方配送</Option>
                      <Option value='2'>买方自提</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Form.Item label='销售价格' {...itemLayout}>
                  {getFieldDecorator('bal5ance22', {
                    rules: [{ required: true }],
                  })(
                    <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, 'bal5ance22', 2)}
                           addonAfter='元/吨' />,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('balan45111ce1', {
                    rules: [{ required: true }],
                  })(
                    <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, 'balan45111ce1', 2)}
                           addonAfter='元' />,
                  )}
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
                      <div className={styles['site-name']}>{siteSelectInfoByCreatePlan.site_name}
                        <span className={styles['blue-font']}
                              onClick={() => this.setState({ visibleSiteInfo: false })}>更改</span>
                        <span className={styles['delete-font']}
                              onClick={() => this.setState({
                                visibleSiteInfo: false,
                                siteSelectionStatus: false,
                              })}>删除</span>
                      </div>
                      <div>{siteSelectInfoByCreatePlan.contact} {siteSelectInfoByCreatePlan.contact_phone}</div>
                    </div>
                    <div>
                      <div>预付款额 <span className={styles['red-font']}>{siteSelectInfoByCreatePlan.balance}元</span></div>
                      <div>信用额度 <span className={styles['red-font']}>{siteSelectInfoByCreatePlan.credit}元</span></div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{siteSelectInfoByCreatePlan.site_type}</div>
                    <div>{siteSelectInfoByCreatePlan.province} {siteSelectInfoByCreatePlan.city} {siteSelectInfoByCreatePlan.area} {siteSelectInfoByCreatePlan.address}</div>
                  </div>
                </div>
              </Col>
            </Row> : <Form.Item label={SiteImg} {...siteInfoLayout}>
              {getFieldDecorator('balance', {
                rules: [{ required: true }],
              })(!siteSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                onClick={this.changeSiteSelectionStatus}>请选择站点</Button> :
                <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true} onBlur={this.changeSiteSelectionStatus}
                        onSelect={this.inquireSiteInfo}>
                  <Option value={1}>123</Option>
                </Select>)}
            </Form.Item>}
            <Row>
              <Col span={9}>
                <Form.Item label='计划数量' {...itemLayout}>
                  {getFieldDecorator('balance3', {
                    rules: [{ required: true }],
                  })(
                    <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, 'balance3', 3)} addonAfter='吨' />,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('balance1')(
                    <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>销售总量 <span
                  className={styles['red-font']}>{(getFieldValue('balance3') || '0.000')} 吨</span></div>
                <div style={{ marginLeft: 30 }}>销售总额 <span className={styles['red-font']}>
                  {toFixed(parseFloat(getFieldValue('bal5ance22') || 0) * parseFloat(getFieldValue('balance3') || 0) + parseFloat(getFieldValue('balan45111ce1') || 0), 2)} 元</span>
                </div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading} onClick={this.submit}>确认创建</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CreatePlan
