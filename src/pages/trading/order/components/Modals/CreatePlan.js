import React, { Component } from 'react'
import { Modal, Form, Select, Button, Row, Col, DatePicker, Input } from 'antd'
import { connect } from 'dva'
import styles from '../../index.less'
import { IconFont, SiteImg, ClientImg, site_type } from '@/common/constants'
import { toFixed } from '@/utils/Math'
import CreatePlanField from '../CreatePlanField'

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
    siteSelectionStatus2: false,
    visibleSiteInfo2: false,
    siteSelectionStatus3: false,
    visibleSiteInfo3: false,
    flag: true,
    currentClientInfo: {},
    currentSiteInfo: {},
    currentSiteInfo2: {},
    currentSiteInfo3: {},
    extraClient: 1,
    extraSite: 1,
    currentSiteNum: 1,
    maxQuantity: 25,
    site1_quantity: 0,
    site2_quantity: 0,
    site3_quantity: 0,
    footFormAll:{allquantity:0,allmoney:0},
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
    this.props.dispatch({
      type: 'order/fetchClientSelect',
      payload: {},
    })
    const userData = JSON.parse(localStorage.getItem('userData'))
    // if (userData.trade_type === 1) {
    //
    // }
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      clientSelectionStatus: false,
      visibleClientInfo: false,
      siteSelectionStatus: false,
      visibleSiteInfo: false,
      siteSelectionStatus2: false,
      visibleSiteInfo2: false,
      siteSelectionStatus3: false,
      visibleSiteInfo3: false,
      flag: true,
      currentClientInfo: {},
      currentSiteInfo: {},
      currentSiteInfo2: {},
      currentSiteInfo3: {},
      extraClient: 1,
      extraSite: 1,
      currentSiteNum: 1,
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
  changeSiteSelectionStatus3 = () => {
    this.setState({
      siteSelectionStatus3: !this.state.siteSelectionStatus3,
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
  setSiteInfo3 = (value, option) => {
    this.setState({
      currentSiteInfo3: { ...option.props },
    })
    this.setState({
      visibleSiteInfo3: true,
    })
  }

  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.customer_id = this.state.currentClientInfo.id
      values.site1_id = this.state.currentSiteInfo.id
      this.state.currentSiteInfo2.id && (values.site2_id = this.state.currentSiteInfo2.id)
      this.state.currentSiteInfo3.id && (values.site3_id = this.state.currentSiteInfo3.id)

      let form2 = true
      let form3 = true
      this.state.extraClient > 1 && (form2 = this.formRef2.getItemsValue())
      this.state.extraClient > 2 && (form3 = this.formRef3.getItemsValue())

      if (!err && form2 && form3) {
        values.site1_time = values.site1_time && values.site1_time.format('YYYY-MM-DD')
        this.state.currentSiteInfo2.id && (values.site2_time = values.site2_time.format('YYYY-MM-DD'))
        this.state.currentSiteInfo3.id && (values.site3_time = values.site3_time.format('YYYY-MM-DD'))
        let list = [values]
        form2 !== true && list.push(form2)
        form3 !== true && list.push(form3)
        console.log(list)
        this.props.dispatch({
          type: 'order/submitCreatePlan',
          payload: {
            form: list,
          },
        }).then(() => {
          this.hideModal()
          this.props.dispatch({
            type: 'order/fetchOrderList',
            payload: {},
          })
        })
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

  parseNumberQuantity = (filed, precision, e) => {
    // maxQuantity
    let { maxQuantity, site1_quantity, site2_quantity, site3_quantity } = this.state
    let val = e.target.value
    if (val === '') {
      return false
    }
    isNaN(val) && (val = 0)
    let num
    val = val - 0
    if (filed === 'site1_quantity') {
      if ((val + parseFloat(site2_quantity) + parseFloat(site3_quantity)) <= maxQuantity) {
        num = toFixed(val, precision)
      } else {
        num = toFixed(maxQuantity - site2_quantity - site3_quantity, precision)
      }
    } else if (filed === 'site2_quantity') {
      if ((parseFloat(site1_quantity) + val + parseFloat(site3_quantity)) <= maxQuantity) {
        num = toFixed(val, precision)
      } else {
        num = toFixed(maxQuantity - site1_quantity - site3_quantity, precision)
      }
    } else {
      if ((parseFloat(site1_quantity) + parseFloat(site2_quantity) + val) <= maxQuantity) {
        num = toFixed(val, precision)
      } else {
        num = toFixed(maxQuantity - site1_quantity - site2_quantity, precision)
      }
    }
    this.setState({
      [filed]: num,
    })
    this.props.form.setFieldsValue({
      [filed]: num,
    })
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

  deleteClientSelect = () => {
    this.setState({
      visibleClientInfo: false,
      clientSelectionStatus: false,
      visibleSiteInfo: false,
      siteSelectionStatus: false,
      visibleSiteInfo2: false,
      siteSelectionStatus2: false,
      visibleSiteInfo3: false,
      siteSelectionStatus3: false,
      currentClientInfo: {},
      currentSiteInfo: {},
      currentSiteInfo2: {},
      currentSiteInfo3: {},
    })
    this.props.dispatch({
      type: 'order/save',
      payload: {
        siteSelectByCreatePlan: [],
      },
    })
  }

  addClientField = () => {
    if (this.state.extraSite > 3) {
      return false
    }
    this.setState({
      extraClient: this.state.extraClient + 1,
      extraSite: this.state.extraSite + 1,
    })
  }

  removeClientField = () => {
    if (this.state.extraSite < 0) {
      return false
    }
    this.setState({
      extraClient: this.state.extraClient - 1,
      extraSite: this.state.extraSite - 1,
    })
  }

  addSiteField = () => {
    if (this.state.extraSite > 3) {
      return false
    }
    this.setState({
      extraSite: this.state.extraSite + 1,
    })
  }

  _addSiteField = () => {
    if (this.state.extraSite > 3) {
      return false
    }
    this.setState({
      currentSiteNum: this.state.currentSiteNum + 1,
    })
    this.addSiteField()
  }

  removeSiteField = () => {
    if (this.state.extraSite < 0) {
      return false
    }
    this.setState({
      extraSite: this.state.extraSite - 1,
    })
  }

  _removeSiteField = () => {
    if (this.state.extraSite < 0) {
      return false
    }
    this.setState({
      currentSiteNum: this.state.currentSiteNum - 1,
    })
    this.removeSiteField()
  }

  setIntervaler = null;

  componentDidMount(){
      this.setIntervaler = setInterval(()=>{
          if(!this.state.visible){return}
          let price_1 = 0,quantity_1 = 0,price_2 = 0,quantity_2 = 0,price_3 = 0,quantity_3 = 0;
          let form1 =  this.props.form.getFieldsValue();
          let zsquan_1 = 0;
          price_1 = form1.price ? Number(form1.price) : 0;
          for(let x in form1){
              if(x.search('quantity')!=-1){
                  zsquan_1 = form1[x] ? Number(form1[x]) : 0;
                  quantity_1 = quantity_1 + zsquan_1;
              }
          }
          if(this.formRef2){
              let form2 = this.formRef2.getFormArr()
              let zsquan_2 = 0;
              price_2 = form2.price ? Number(form2.price) : 0;
              for(let x in form2){
                  if(x.search('quantity')!=-1){
                      zsquan_2 = form2[x] ? Number(form2[x]) : 0;
                      quantity_2 = quantity_2 + zsquan_2;
                  }
              }
          }
          if(this.formRef3){
              let form3 = this.formRef3.getFormArr()
              price_3 = form3.price ? Number(form3.price) : 0;
              quantity_3 = form3.site1_quantity ? Number(form3.site1_quantity) : 0;
          }
          if( (quantity_1+quantity_2+quantity_3)==this.state.footFormAll.allquantity && (quantity_1*price_1+quantity_2*price_2+quantity_3*price_3)==this.state.footFormAll.allmoney ){
              return
          }
          this.setState({
              footFormAll:{
                  allquantity:quantity_1+quantity_2+quantity_3,
                  allmoney:quantity_1*price_1+quantity_2*price_2+quantity_3*price_3,
              }
          })

      },500)
  }

  componentWillUnmount(){
      clearInterval(this.setIntervaler)
  }

  render() {
    const { clientSelectionStatus, visibleClientInfo, siteSelectionStatus, siteSelectionStatus2, siteSelectionStatus3, visibleSiteInfo, visibleSiteInfo2, visibleSiteInfo3, flag, currentClientInfo, currentSiteInfo, currentSiteInfo2, currentSiteInfo3, extraClient, extraSite, currentSiteNum } = this.state
    const { form: { getFieldDecorator, getFieldValue }, order: { clientSelectByCreatePlan, siteSelectByCreatePlan }, children, loading } = this.props
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
            <>
              <Row style={{ position: 'relative' }}>
                {extraSite < 3 ?
                  <IconFont type='icon-icon-test110' className='add-icon' onClick={this.addClientField} />
                  :
                  null}
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
                  {getFieldDecorator('customer_id', {
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
                    {getFieldDecorator('payment_type', {
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
                    {getFieldDecorator('delivery_type', {
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
                    {getFieldDecorator('price', {
                      rules: [{ required: true }],
                    })(
                      <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, 'price', 2)}
                             addonAfter='元/吨' />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={10} style={{ width: '46.2%' }}>
                  <Form.Item label='额外费用' {...itemLayout} style={{ marginLeft: 10 }}>
                    {getFieldDecorator('extra_fee', {
                      rules: [{ required: true }],
                    })(
                      <Input placeholder="请输入金额" onBlur={this.parseNumber.bind(null, 'extra_fee', 2)}
                             addonAfter='元' />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24 }} />
              <>
                <Row style={{ position: 'relative' }}>
                  {extraSite < 3 ?
                    <IconFont type='icon-icon-test110' className='add-icon' onClick={this._addSiteField} />
                    :
                    null}
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
                    {getFieldDecorator('site1_id', {
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
                      {getFieldDecorator('site1_quantity', {
                        rules: [{ required: true }],
                      })(
                        <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, 'site1_quantity', 3)}
                               addonAfter='吨' />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ width: '46.2%' }}>
                    <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                      {getFieldDecorator('site1_time')(
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
                    <IconFont type='icon-icon-test109' className='delete-icon' onClick={this._removeSiteField} />
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
                      {getFieldDecorator('site2_id', {
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
                        {getFieldDecorator('site2_quantity', {
                          rules: [{ required: true }],
                        })(
                          <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, 'site2_quantity', 3)}
                                 addonAfter='吨' />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={10} style={{ width: '46.2%' }}>
                      <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                        {getFieldDecorator('site2_time')(
                          <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                      style={{ width: '100%' }} />,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </> : null}
              {currentSiteNum > 2 ?
                <>
                  <Row style={{ position: 'relative' }}>
                    <IconFont type='icon-icon-test109' className='delete-icon' onClick={this._removeSiteField} />
                    {visibleSiteInfo3 ? <Row>
                      <Col span={3}>
                        <div style={{ paddingLeft: 31 }}>
                          {SiteImg}
                        </div>
                      </Col>
                      <Col span={15} style={{ marginLeft: 9 }}>
                        <div className={styles['site-select-info']}>
                          <div>
                            <div>
                              <div className={styles['site-name']}>{currentSiteInfo3.site_name}
                                <span className={styles['blue-font']}
                                      onClick={() => this.setState({ visibleSiteInfo3: false })}>更改</span>
                                <span className={styles['delete-font']}
                                      onClick={() => this.setState({
                                        visibleSiteInfo3: false,
                                        siteSelectionStatus3: false,
                                        currentSiteInfo3: {},
                                      })}>删除</span>
                              </div>
                              <div>{currentSiteInfo3.contact} {currentSiteInfo3.contact_phone}</div>
                            </div>
                          </div>
                          <div>
                            <div className={styles['blue-background']}>{site_type[currentSiteInfo3.site_type - 1]}</div>
                            <div>{currentSiteInfo3.province} {currentSiteInfo3.city} {currentSiteInfo3.area} {currentSiteInfo3.site_address}</div>
                          </div>
                        </div>
                      </Col>
                    </Row> : <Form.Item label={SiteImg} {...siteInfoLayout}>
                      {getFieldDecorator('site3_id', {
                        rules: [{ required: flag }],
                      })(!siteSelectionStatus3 ? <Button className='btn-select' style={{ width: '100%', height: 41 }}
                                                         onClick={this.changeSiteSelectionStatus3}>请选择站点</Button> :
                        <Select placeholder='请选择站点' autoFocus={true} defaultOpen={true}
                                onBlur={this.changeSiteSelectionStatus3}
                                onSelect={this.setSiteInfo3}>
                          {siteSelectByCreatePlan.map(item => {
                            return <Option value={item.id} key={item.id} {...item}>{item.site_name}</Option>
                          })}
                        </Select>)}
                    </Form.Item>}
                  </Row>
                  <Row>
                    <Col span={9}>
                      <Form.Item label='计划数量' {...itemLayout}>
                        {getFieldDecorator('site3_quantity', {
                          rules: [{ required: true }],
                        })(
                          <Input placeholder="请输入数量" onBlur={this.parseNumber.bind(null, 'site3_quantity', 3)}
                                 addonAfter='吨' />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={10} style={{ width: '46.2%' }}>
                      <Form.Item label='卸货时间' {...itemLayout} style={{ marginLeft: 10 }}>
                        {getFieldDecorator('site3_time')(
                          <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                      style={{ width: '100%' }} />,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </> : null}
            </>
            {(extraClient > 1 && extraSite < 4) ? <CreatePlanField extraSite={extraSite}
                                                                   removeClientField={this.removeClientField}
                                                                   addSiteField={this.addSiteField}
                                                                   removeSiteField={this.removeSiteField}
                                                                   wrappedComponentRef={(form) => this.formRef2 = form} /> : null}
            {(extraClient > 2 && extraSite < 4) ? <CreatePlanField extraSite={extraSite}
                                                                   removeClientField={this.removeClientField}
                                                                   addSiteField={this.addSiteField}
                                                                   removeSiteField={this.removeSiteField}
                                                                   wrappedComponentRef={(form) => this.formRef3 = form} /> : null}
          </Form>
          <div className={styles['create-plan-modal-footer']}>
            <div>
              <div>
                <div style={{ marginLeft: 30 }}>销售总量 <span
                  className={styles['red-font']}>{this.state.footFormAll.allquantity.toFixed(3)} 吨</span></div>
                <div style={{ marginLeft: 30 }}>销售总额 <span className={styles['red-font']}>{this.state.footFormAll.allmoney.toFixed(2)} 元</span>
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
