import React, { Component } from 'react'
import { Col, Modal, Row, Select, Form, Input, Button, DatePicker, AutoComplete, InputNumber } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { IconFont, SiteImg, LogisticsImg, site_type } from '@/common/constants'
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
    logisticsSelectionStatus: false,
    visibleLogisticsInfo: false,
    sites: [],
    currentLogistics: {},
    driverOptions: [],
    carHeadOptions: [],
    carBodyOptions: [],
    driver_id: null,
    convoy: null,
    car_head_id: null,
    car_body_id: null,
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireLogisticsSelectByLogisticsScheduling',
      payload: {},
    })
    this.setState({
      visible: true,
      sites: JSON.parse(this.props.sites),
    })
    console.log(this.props.id)
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      logisticsSelectionStatus: false,
      visibleLogisticsInfo: false,
      sites: [],
    })
  }

  changeSelectionStatus = () => {
    this.setState({
      logisticsSelectionStatus: !this.state.logisticsSelectionStatus,
    })
  }

  inquireLogisticsInfo = (value, option) => {
    this.props.dispatch({
      type: 'order/inquireLogisticsInfoByLogisticsScheduling',
      payload: {
        id: value,
      },
    }).then(() => {
      this.setState({
        visibleLogisticsInfo: true,
        currentLogistics: {
          id: value,
          company_name: option.props.company_name,
          contact: option.props.contact,
          contact_phone: option.props.contact_phone,
          credit: option.props.credit,
          balance: option.props.balance,
        },
        driverOptions: this.props.order.logisticsDriverList.map((option, index) => {
          return <Option key={index} value={option.driver_id} select='true'>{option.remark}</Option>
        }),
      })
    })
  }

  scheduling = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.load_time = values.load_time.format('YYYY-MM-DD')
        values.ids = `[${this.props.id}]`
        values.logistics_id = this.state.currentLogistics.id
        console.log(values)
        this.props.dispatch({
          type: 'order/schedulingLogistics',
          payload: {
            form: values,
          },
        }).then(() => {
          this.props.dispatch({
            type: 'order/fetchOrderList',
            payload: {},
          })
        })
      }
    })
  }

  blurInput = (field, value, option) => {
    if (this.state[field] === null) {
      this.props.form.setFieldsValue({
        [field]: null,
      })
    }
  }

  changeInput = (field, value, option) => {
    if (option.props.select) {
      this.setState({
        [field]: value,
      })
    } else {
      this.setState({
        [field]: null,
      })
    }
  }

  selectInput = (field, step, value, option) => {
    this.setState({
      [field]: value,
    }, () => {
      if (step === 'driverSelect') {
        this.props.dispatch({
          type: 'order/inquireLogisticsInfoByLogisticsScheduling',
          payload: {
            id: this.state.currentLogistics.id,
            driver_id: this.state.driver_id,
          },
        }).then(() => {
          this.setState({
            carHeadOptions: this.props.order.logisticsCarHeadList.map((option, index) => {
              return <Option key={index} value={option.car_head_id} select='true'>{option.car_head_code}</Option>
            }),
            carBodyOptions: [],
          })
          this.props.form.setFieldsValue({
            car_head_id: null,
            car_body_id: null,
          })
        })
      } else if (step === 'headSelect') {
        this.props.dispatch({
          type: 'order/inquireLogisticsInfoByLogisticsScheduling',
          payload: {
            id: this.state.currentLogistics.id,
            driver_id: this.state.driver_id,
            car_head_id: this.state.car_head_id,
          },
        }).then(() => {
          this.setState({
            carBodyOptions: this.props.order.logisticsCarBodyList.map((option, index) => {
              return <Option key={index} value={option.car_body_id} select='true'>{option.car_body_code}</Option>
            }),
          })
          this.props.form.setFieldsValue({
            car_body_id: null,
          })
        })
      }
    })
  }

  render() {
    const { visible, logisticsSelectionStatus, visibleLogisticsInfo, sites, currentLogistics, driverOptions, carHeadOptions, carBodyOptions } = this.state
    const { children, order: { suppInfoByOrderPurchase }, form: { getFieldDecorator }, loading } = this.props
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
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}>
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
                      <Input value={item.quantity} disabled />
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
              {visibleLogisticsInfo ? <>
                <Row>
                  <Col span={3}>
                    <div style={{ paddingLeft: 31 }}>
                      {LogisticsImg}
                    </div>
                  </Col>
                  <Col span={15} style={{ marginLeft: 9 }}>
                    <div className={styles['site-select-info']}>
                      <div>
                        <div>
                          <div className={styles['site-name']}>{currentLogistics.company_name}
                            <span className={styles['blue-font']}
                                  onClick={() => this.setState({ visibleLogisticsInfo: false })}>更改</span>
                            <span className={styles['delete-font']}
                                  onClick={() => this.setState({
                                    visibleLogisticsInfo: false,
                                    logisticsSelectionStatus: false,
                                  })}>删除</span>
                          </div>
                          <div>{currentLogistics.contact} {currentLogistics.contact_phone}</div>
                        </div>
                        <div>
                          <div>预付款额 <span
                            className={styles['red-font']}>{currentLogistics.balance}元</span>
                          </div>
                          <div>信用额度 <span
                            className={styles['red-font']}>{currentLogistics.credit}元</span></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 25 }}>
                  <Col span={9}>
                    <Form.Item label='计价方式' {...itemLayout}>
                      {getFieldDecorator('charge_type', {
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
                    <Form.Item label='运输距离' {...itemLayout}>
                      {getFieldDecorator('distance', {
                        rules: [{ required: true }],
                      })(
                        <Input addonAfter='公里' placeholder='请输入运输距离' />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='运输价格' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('price', {
                        rules: [{ required: true }],
                      })(
                        <InputNumber placeholder="请输入金额" min={0} precision={2} style={{ width: '100%' }} />,
                      )}
                      <div className='addonAfter'>元/吨</div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item label='额外费用' {...itemLayout}>
                      {getFieldDecorator('extra_fee')(
                        <InputNumber placeholder="请输入金额" min={0} precision={2} style={{ width: '100%' }} />,
                      )}
                      <div className='addonAfter'>元</div>
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='装货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('load_time', {
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
                      {getFieldDecorator('driver_id', {
                        rules: [{ required: true }],
                      })(
                        <AutoComplete placeholder="请选择司机" dataSource={driverOptions}
                                      onBlur={this.blurInput.bind(null, 'driver_id')}
                                      onChange={this.changeInput.bind(null, 'driver_id')}
                                      onSelect={this.selectInput.bind(null, 'driver_id', 'driverSelect')}
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='押运选择' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('convoy')(
                        <AutoComplete placeholder="请选择押运" dataSource={driverOptions}
                                      onBlur={this.blurInput.bind(null, 'convoy')}
                                      onChange={this.changeInput.bind(null, 'convoy')}
                                      onSelect={this.selectInput.bind(null, 'convoy', 'convoySelect')}
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item label='车头选择' {...itemLayout}>
                      {getFieldDecorator('car_head_id', {
                        rules: [{ required: true }],
                      })(
                        <AutoComplete placeholder="请选择车头" dataSource={carHeadOptions}
                                      onBlur={this.blurInput.bind(null, 'car_head_id')}
                                      onChange={this.changeInput.bind(null, 'car_head_id')}
                                      onSelect={this.selectInput.bind(null, 'car_head_id', 'headSelect')}
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='车挂选择' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('car_body_id')(
                        <AutoComplete placeholder="请选择车挂" dataSource={carBodyOptions}
                                      onBlur={this.blurInput.bind(null, 'car_body_id')}
                                      onChange={this.changeInput.bind(null, 'car_body_id')}
                                      onSelect={this.selectInput.bind(null, 'car_body_id', 'bodySelect')}
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </> : <Form.Item label={LogisticsImg} {...siteInfoLayout}>
                {getFieldDecorator('balance', {
                  rules: [{ required: true }],
                })(!logisticsSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                       onClick={this.changeSelectionStatus}>请选择承运物流商</Button> :
                  <Select placeholder='请选择承运物流商' autoFocus={true} defaultOpen={true} onBlur={this.changeSelectionStatus}
                          onSelect={this.inquireLogisticsInfo}>
                    {suppInfoByOrderPurchase.map((item, index) => {
                      return <Option value={item.id} {...item} key={index}>{item.company_name}</Option>
                    })}
                  </Select>)}
              </Form.Item>}
            </Form>
          </div>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>运输总量 <span className={styles['red-font']}>20.000 吨</span></div>
                <div style={{ marginLeft: 30 }}>运输费用 <span className={styles['red-font']}>20.000 元</span></div>
              </div>
              <div style={{ marginRight: 20 }}>
                <Button type='primary' style={{ marginRight: 10 }} loading={loading}
                        onClick={this.scheduling}>确认调度</Button>
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
