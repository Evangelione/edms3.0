import React, { Component } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { connect } from 'dva'
import { ClientImg, IconFont, site_type, SiteImg } from '@/common/constants'
import styles from '../index.less'
import { toFixed } from '@/utils/Math'

const Option = Select.Option

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class CreatePlanField extends Component {
  state = {
    visible: false,
    clientSelectionStatus: false,
    visibleClientInfo: false,
    siteSelectionStatus: false,
    visibleSiteInfo: false,
    siteSelectionStatus2: false,
    visibleSiteInfo2: false,
    flag: true,
    currentClientInfo: {},
    currentSiteInfo: {},
    currentSiteInfo2: {},
    currentSiteNum: 1,
  }

  changeType = (value) => {
    if (value === '2') {
      this.setState({
        flag: false,
      })
    } else {
      this.setState({
        flag: true,
      })
    }
  }

  getItemsValue = () => {
    let result = false
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.customer_id = this.state.currentClientInfo.id
      values.site1_id = this.state.currentSiteInfo.id
      this.state.currentSiteInfo2.id && (values.site2_id = this.state.currentSiteInfo2.id)
      //console.log(values)
      if (!err) {
        values.site1_time = values.site1_time.format('YYYY-MM-DD')
        this.state.currentSiteInfo2.id && (values.site2_time = values.site2_time.format('YYYY-MM-DD'))
        result = values
      } else {
        result = false
      }
    })
    return result
  }

  getFormArr = ()=>{return this.props.form.getFieldsValue()}

  deleteClientSelect = () => {
    this.setState({
      visible: false,
      clientSelectionStatus: false,
      visibleClientInfo: false,
      siteSelectionStatus: false,
      visibleSiteInfo: false,
      siteSelectionStatus2: false,
      visibleSiteInfo2: false,
      flag: true,
      currentClientInfo: {},
      currentSiteInfo: {},
      currentSiteInfo2: {},
      currentSiteNum: 1,
    })
    this.props.dispatch({
      type: 'order/save',
      payload: {
        siteSelectByCreatePlan: [],
      },
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

  changeSiteSelectionStatus2 = () => {
    this.setState({
      siteSelectionStatus2: !this.state.siteSelectionStatus2,
    })
  }

  setClientInfo = (value, option) => {
    this.setState({
      currentClientInfo: { ...option.props },
    })
    this.props.dispatch({
      type: 'order/inquireSiteSelectInfoByCreatePlan',
      payload: {
        id: value,
      },
    }).then(() => {
      this.setState({
        visibleClientInfo: true,
      })
    })
  }

  setSiteInfo = (value, option) => {
    this.setState({
      currentSiteInfo: { ...option.props },
    })
    this.setState({
      visibleSiteInfo: true,
    })
  }

  setSiteInfo2 = (value, option) => {
    this.setState({
      currentSiteInfo2: { ...option.props },
    })
    this.setState({
      visibleSiteInfo2: true,
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

  _addSiteField = () => {
    if (this.props.extraSite > 3) {
      return false
    }
    this.setState({
      currentSiteNum: this.state.currentSiteNum + 1,
    })
    this.props.addSiteField()
  }

  _removeSiteField = () => {
    if (this.state.extraSite < 0) {
      return false
    }
    this.setState({
      currentSiteNum: this.state.currentSiteNum - 1,
    })
    this.props.removeSiteField()
  }

  render() {
    const { clientSelectionStatus, visibleClientInfo, siteSelectionStatus, visibleSiteInfo, siteSelectionStatus2, visibleSiteInfo2, flag, currentClientInfo, currentSiteInfo, currentSiteInfo2, currentSiteNum } = this.state
    const { form: { getFieldDecorator }, order: { clientSelectByCreatePlan, siteSelectByCreatePlan }, extraSite, removeClientField } = this.props
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
      <>
        <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />
        <Row style={{ position: 'relative' }}>
          <IconFont type='icon-icon-test109' className='delete-icon' onClick={removeClientField} />
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
                    <div className={styles['site-name']}>{currentClientInfo.company_name}
                      <span className={styles['blue-font']}
                            onClick={() => this.setState({ visibleClientInfo: false })}>更改</span>
                      <span className={styles['delete-font']} onClick={this.deleteClientSelect}>删除</span>
                    </div>
                    <div>{currentClientInfo.contact} {currentClientInfo.contact_phone}</div>
                  </div>
                  <div>
                    <div>预付款额 <span className={styles['red-font']}>{currentClientInfo.balance}元</span></div>
                    <div>信用额度 <span className={styles['red-font']}>{currentClientInfo.credit}元</span></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row> : <Form.Item label={ClientImg} {...siteInfoLayout}>
            {getFieldDecorator(`customer_id`, {
              rules: [{ required: true }],
            })(!clientSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                onClick={this.changeClientSelectionStatus}>请选择客户</Button> :
              <Select placeholder='请选择客户' autoFocus={true} defaultOpen={true}
                      onBlur={this.changeClientSelectionStatus}
                      onSelect={this.setClientInfo}>
                {clientSelectByCreatePlan.map(item => {
                  return <Option value={item.id} key={item.id} {...item}>{item.company_name}</Option>
                })}
              </Select>)}
          </Form.Item>}
        </Row>
        <Row>
          <Col span={9}>
            <Form.Item label='收款方式' {...itemLayout}>
              {getFieldDecorator(`payment_type`, {
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
              {getFieldDecorator(`delivery_type`, {
                rules: [{ required: true }],
                initialValue: '1',
              })(
                <Select placeholder='请选择配送方式' onChange={this.changeType}>
                  <Option value='1'>卖方配送</Option>
                  <Option value='2'>买方自提</Option>
                  <Option value='3'>我方配送</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <Form.Item label='销售价格' {...itemLayout}>
              {getFieldDecorator(`price`, {
                rules: [{ required: true }],
              })(
                <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, `price`, 2)}
                       addonAfter='元/吨' />,
              )}
            </Form.Item>
          </Col>
          <Col span={10} style={{ width: '46.2%' }}>
            <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
              {getFieldDecorator(`extra_fee`, {
                rules: [{ required: true }],
                initialValue:'0.00'
              })(
                <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, `extra_fee`, 2)}
                       addonAfter='元' />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />
        <>
          <Row style={{ position: 'relative' }}>
            {extraSite < 3 ?
              <IconFont type='icon-icon-test110' className='add-icon' onClick={this._addSiteField} /> : null}
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
                      <div className={styles['site-name']}>{currentSiteInfo.site_name}
                        <span className={styles['blue-font']}
                              onClick={() => this.setState({ visibleSiteInfo: false })}>更改</span>
                        <span className={styles['delete-font']}
                              onClick={() => this.setState({
                                visibleSiteInfo: false,
                                siteSelectionStatus: false,
                                currentSiteInfo: {},
                              })}>删除</span>
                      </div>
                      <div>{currentSiteInfo.contact} {currentSiteInfo.contact_phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{site_type[currentSiteInfo.site_type - 1]}</div>
                    <div>{currentSiteInfo.province} {currentSiteInfo.city} {currentSiteInfo.area} {currentSiteInfo.site_address}</div>
                  </div>
                </div>
              </Col>
            </Row> : <Form.Item label={SiteImg} {...siteInfoLayout}>
              {getFieldDecorator(`site1_id`, {
                rules: [{ required: flag }],
              })(!siteSelectionStatus ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                onClick={this.changeSiteSelectionStatus}>请选择站点</Button> :
                <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true}
                        onBlur={this.changeSiteSelectionStatus}
                        onSelect={this.setSiteInfo}>
                  {siteSelectByCreatePlan.map(item => {
                    return <Option value={item.id} key={item.id} {...item}>{item.site_name}</Option>
                  })}
                </Select>)}
            </Form.Item>}
          </Row>
          <Row>
            <Col span={9}>
              <Form.Item label='计划数量' {...itemLayout}>
                {getFieldDecorator(`site1_quantity`, {
                  rules: [{ required: flag }],
                })(
                  <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, `site1_quantity`, 3)}
                         addonAfter='吨' />,
                )}
              </Form.Item>
            </Col>
            <Col span={10} style={{ width: '46.2%' }}>
              <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                {getFieldDecorator(`site1_time`)(
                  <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                              style={{ width: '100%' }} />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </>
        {currentSiteNum > 1 ?
          <>
            <Row style={{ position: 'relative' }}>
              {extraSite < 3 ?
                <IconFont type='icon-icon-test110' className='add-icon' onClick={this._addSiteField} /> : null}
              <IconFont type='icon-icon-test109' className='delete-icon' onClick={this._removeSiteField}
              />
              {visibleSiteInfo2 ? <Row>
                <Col span={3}>
                  <div style={{ paddingLeft: 31 }}>
                    {SiteImg}
                  </div>
                </Col>
                <Col span={15} style={{ marginLeft: 9 }}>
                  <div className={styles['site-select-info']}>
                    <div>
                      <div>
                        <div className={styles['site-name']}>{currentSiteInfo2.site_name}
                          <span className={styles['blue-font']}
                                onClick={() => this.setState({ visibleSiteInfo2: false })}>更改</span>
                          <span className={styles['delete-font']}
                                onClick={() => this.setState({
                                  visibleSiteInfo2: false,
                                  siteSelectionStatus2: false,
                                  currentSiteInfo2: {},
                                })}>删除</span>
                        </div>
                        <div>{currentSiteInfo2.contact} {currentSiteInfo2.contact_phone}</div>
                      </div>
                    </div>
                    <div>
                      <div className={styles['blue-background']}>{site_type[currentSiteInfo2.site_type - 1]}</div>
                      <div>{currentSiteInfo2.province} {currentSiteInfo2.city} {currentSiteInfo2.area} {currentSiteInfo2.site_address}</div>
                    </div>
                  </div>
                </Col>
              </Row> : <Form.Item label={SiteImg} {...siteInfoLayout}>
                {getFieldDecorator(`site2_id`, {
                  rules: [{ required: flag }],
                })(!siteSelectionStatus2 ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                   onClick={this.changeSiteSelectionStatus2}>请选择站点</Button> :
                  <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true}
                          onBlur={this.changeSiteSelectionStatus2}
                          onSelect={this.setSiteInfo2}>
                    {siteSelectByCreatePlan.map(item => {
                      return <Option value={item.id} key={item.id} {...item}>{item.site_name}</Option>
                    })}
                  </Select>)}
              </Form.Item>}
            </Row>
            <Row>
              <Col span={9}>
                <Form.Item label='计划数量' {...itemLayout}>
                  {getFieldDecorator(`site2_quantity`, {
                    rules: [{ required: flag }],
                  })(
                    <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, `site2_quantity`, 3)}
                           addonAfter='吨' />,
                  )}
                </Form.Item>
              </Col>
              <Col span={10} style={{ width: '46.2%' }}>
                <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                  {getFieldDecorator(`site2_time`)(
                    <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </> : null}
      </>
    )
  }
}

export default CreatePlanField
