import React, { Component } from 'react'
import { Tabs, Row, Col, Form, Card, Icon, Button, Input, Cascader, Select } from 'antd'
import { connect } from 'dva'
import { company_type } from '@/common/constants'
import styles from '../index.less'

const TabPane = Tabs.TabPane
const Option = Select.Option

@connect(({global, company, loading}) => ({
  global,
  company,
  loading: loading.models.company,
}))
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modifying: false,
    }
  }

  componentWillMount() {
    this.fetchCompanyInfo()
  }

  fetchCompanyInfo = () => {
    this.props.dispatch({
      type: 'company/fetchCompanyInfo',
      payload: {},
    })
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'company',
        district_name: targetOption.value,
        targetOption,
      },
    }).then(() => {
      // targetOption.loading = false
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = {
          province: values.area_arr[0],
          city: values.area_arr[1],
          area: values.area_arr[2] || '',
        }
        delete values.area_arr
        Object.assign(values, obj)
        this.props.dispatch({
          type: 'company/updateCompanyInfo',
          payload: {
            form: values,
          },
        }).then(() => {
          this.setState({
            modifying: false,
          })
          this.fetchCompanyInfo()
        })
      }
    })
  }

  modify = () => {
    this.setState({
      modifying: true,
    })
    const {currentCompanyInfo} = this.props.company
    this.props.dispatch({
      type: 'global/inquireCascadeOptionsAll',
      payload: {
        module: 'company',
        province: currentCompanyInfo.province,
        city: currentCompanyInfo.city,
      },
    })
  }

  render() {
    const {modifying} = this.state
    const {form, company, global, loading} = this.props
    const {currentCompanyInfo} = company
    const {cascadeOptions} = global
    const {getFieldDecorator} = form
    const area = (currentCompanyInfo.province + currentCompanyInfo.city + currentCompanyInfo.area) || ''
    return (
      <>
        <div className='toolbar'>
          <Tabs defaultActiveKey="1" style={{paddingTop: 10, paddingBottom:30}}>
            <TabPane tab="公司信息" key="1">
              <Row style={{paddingTop: 40}}>
                <Col span={8}>
                  <Card title={<>
                    <Icon type="idcard" className='font-primary-color'
                          style={{marginRight: 20, marginTop: 2, fontSize: 24}} />
                    <span style={{verticalAlign: 'top'}}>基本信息</span>
                  </>} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                      <Row className={styles['info-list']}>
                        <Col span={8} xxl={7}><i>纳税人识别号</i></Col>
                        <Col span={16} xxl={17}>
                          {currentCompanyInfo.tax_number}
                        </Col>
                        <Col span={8} xxl={7}><i>公司全称</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('company_full_name', {
                              rules: [{required: true}],
                              initialValue: currentCompanyInfo.company_full_name,
                            })(
                              <Input placeholder='请输入公司全称' />,
                            )}
                          </Form.Item> : currentCompanyInfo.company_full_name}
                        </Col>
                        <Col span={8} xxl={7}><i>公司简称</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('company_name', {
                              rules: [{required: true}],
                              initialValue: currentCompanyInfo.company_name,
                            })(
                              <Input placeholder='请输入公司简称' />,
                            )}
                          </Form.Item> : currentCompanyInfo.company_name}
                        </Col>
                        <Col span={8} xxl={7}><i>公司类型</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('company_flow', {
                              rules: [{required: true}],
                              initialValue: currentCompanyInfo.company_flow + '',
                            })(
                              <Select style={{width: '100%'}}>
                                <Option value="1">贸易商</Option>
                                <Option value="2">零售商</Option>
                              </Select>,
                            )}
                          </Form.Item> : company_type[currentCompanyInfo.company_flow - 1]}
                        </Col>
                        <Col span={8} xxl={7}><i>法人代表</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('legal_person', {
                              rules: [{required: true}],
                              initialValue: currentCompanyInfo.legal_person,
                            })(
                              <Input placeholder='请输入法人代表' />,
                            )}
                          </Form.Item> : currentCompanyInfo.legal_person}
                        </Col>
                        <Col span={8} xxl={7}><i>省市区县</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('area_arr', {
                              initialValue: [currentCompanyInfo.province, currentCompanyInfo.city, currentCompanyInfo.area],
                            })(
                              <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
                            )}
                          </Form.Item> : area}
                        </Col>
                        <Col span={8} xxl={7}><i>详细地址</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('company_address', {
                              initialValue: currentCompanyInfo.company_address,
                            })(
                              <Input placeholder='请输入详细地址' />,
                            )}
                          </Form.Item> : currentCompanyInfo.company_address}
                        </Col>
                        <Col span={8} xxl={7}><i>开户银行</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('bank', {
                              initialValue: currentCompanyInfo.bank,
                            })(
                              <Input placeholder='请选择开户银行' />,
                            )}
                          </Form.Item> : currentCompanyInfo.bank}
                        </Col>
                        <Col span={8} xxl={7}><i>银行账号</i></Col>
                        <Col span={16} xxl={17}>
                          {modifying ? <Form.Item wrapperCol={{span: 16}}>
                            {getFieldDecorator('bank_account', {
                              initialValue: currentCompanyInfo.bank_account,
                            })(
                              <Input placeholder='请输入银行账号' />,
                            )}
                          </Form.Item> : currentCompanyInfo.bank_account}
                        </Col>
                        <Col span={24} style={{textAlign: 'center', marginTop: 20, marginBottom: 40}}>
                          {modifying ? <>
                              <Button type='primary' htmlType="submit" loading={loading}>确定</Button>
                              <Button className='red-btn' style={{marginLeft: 20}}
                                      onClick={() => this.setState({modifying: false})}>取消</Button>
                            </>
                            :
                            <div>
                              <Button type='primary' onClick={this.modify}>编辑</Button>
                            </div>
                          }
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            {/*<TabPane tab="公司账务" key="2">公司账务</TabPane>*/}
            {/*<TabPane tab="操作历史" key="3">操作历史</TabPane>*/}
          </Tabs>
        </div>
      </>
    )
  }
}

export default Index
