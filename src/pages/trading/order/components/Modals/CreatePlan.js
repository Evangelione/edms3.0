import React, { Component } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, DatePicker } from 'antd'
import { connect } from 'dva'
import styles from '../../index.less'
import { IconFont, SiteImg } from '@/common/constants'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class CreatePlan extends Component {
  state = {
    visible: false,
    selectionStatus: false,
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
    })
  }

  changeSelectionStatus = () => {
    this.setState({
      selectionStatus: !this.state.selectionStatus,
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

  render() {
    const { selectionStatus, visibleSiteInfo } = this.state
    const { form: { getFieldDecorator }, order: { siteSelectInfoByCreatePlan }, children, loading } = this.props
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
      <div onClick={this.showModal} style={{display: 'inline-block'}}>
        {children}
        <Modal
          title="创建订单"
          visible={this.state.visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          bodyStyle={{ padding: 0 }}
        >
          <Form style={{ padding: '24px 24px 10px' }}>
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
              })(!selectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                            onClick={this.changeSelectionStatus}>请选择站点</Button> :
                <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true} onBlur={this.changeSelectionStatus}
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
                    <Input addonAfter='吨' placeholder='请输入计划数量' />,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='交货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator('balance1', {
                    rules: [{ required: true }],
                  })(
                    <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />} />,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col span={9}>
                <Form.Item label='配送方式' {...itemLayout}>
                  {getFieldDecorator('balance2', {
                    rules: [{ required: true }],
                    initialValue: '1',
                  })(
                    <Select>
                      <Option value='1'>我方自提</Option>
                      <Option value='2'>卖方配送</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div style={{ marginLeft: 30 }}>采购总量 <span className={styles['red-font']}>20.000 吨</span></div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}>确认创建</Button>
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
