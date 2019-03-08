import React, { Component } from 'react'
import { Card, Row, Col, Button, Icon, Form, Input, Cascader, Select } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { company_type } from '@/common/constants'
import styles from '../../../index.less'

const Option = Select.Option

@connect(({ global, logistics, loading }) => ({
  global,
  logistics,
  loading: loading.models.logistics,
}))
@Form.create()
@withRouter
class InfoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modifying: false,
    }
  }

  // componentDidMount() {
  //   console.log(1)
  //   this.props.dispatch({
  //     type: 'global/inquireCascadeOptions',
  //     payload: {
  //       module: 'logistics',
  //     },
  //   })
  // }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'logistics',
        district_name: targetOption.value,
        targetOption,
      },
    }).then(() => {
      // targetOption.loading = false
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {
          id: this.props.match.params.LogisticsDetail,
          province: values.area_arr[0],
          city: values.area_arr[1],
          area: values.area_arr[2] || '',
        }
        delete values.area_arr
        Object.assign(values, obj)
        this.props.dispatch({
          type: 'logistics/updateLogisticsInfo',
          payload: {
            form: values,
          },
        }).then(() => {
          this.setState({
            modifying: false,
          })
          this.props.dispatch({
            type: 'logistics/inquireLogisticsInfoById',
            payload: {
              id: this.props.match.params.LogisticsDetail,
            },
          })
        })
      }
    })
  }

  modify = () => {
    this.setState({
      modifying: true,
    })
    const { currentLogisticsInfo } = this.props.logistics
    this.props.dispatch({
      type: 'global/inquireCascadeOptionsAll',
      payload: {
        module: 'logistics',
        province: currentLogisticsInfo.province,
        city: currentLogisticsInfo.city,
      },
    })
  }


  render() {
    const { modifying } = this.state
    const { form, global, logistics, loading } = this.props
    const { cascadeOptions } = global
    const { currentLogisticsInfo } = logistics
    const { getFieldDecorator } = form
    const area = (currentLogisticsInfo.province + currentLogisticsInfo.city + currentLogisticsInfo.area) || ''
    return (
      <Card title={<>
        <Icon type="idcard" className='font-primary-color'
              style={{ marginRight: 20, marginTop: 2, fontSize: 24 }} />
        <span style={{ verticalAlign: 'top' }}>基本信息</span>
      </>} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Row className={styles['info-list']}>
            <Col span={8} xxl={7}><i>纳税人识别号</i></Col>
            <Col span={16} xxl={17}>
              {currentLogisticsInfo.tax_number}
            </Col>
            <Col span={8} xxl={7}><i>公司全称</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('company_full_name', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.company_full_name,
                })(
                  <Input placeholder='请输入公司全称' />,
                )}
              </Form.Item> : currentLogisticsInfo.company_full_name}
            </Col>
            <Col span={8} xxl={7}><i>公司简称</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('company_name', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.company_name,
                })(
                  <Input placeholder='请输入公司简称' />,
                )}
              </Form.Item> : currentLogisticsInfo.company_name}
            </Col>
            <Col span={8} xxl={7}><i>公司类型</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('company_flow', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.company_flow + '',
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="2">运贸商</Option>
                    <Option value="8">承运商</Option>
                  </Select>,
                )}
              </Form.Item> : currentLogisticsInfo.company_flow=='2' ? '运贸商' : '承运商'}
            </Col>
            <Col span={8} xxl={7}><i>省市区县</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('area_arr', {
                  initialValue: [currentLogisticsInfo.province, currentLogisticsInfo.city, currentLogisticsInfo.area],
                })(
                  <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
                )}
              </Form.Item> : area}
            </Col>
            <Col span={8} xxl={7}><i>详细地址</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('company_address', {
                  initialValue: currentLogisticsInfo.company_address,
                })(
                  <Input placeholder='请输入详细地址' />,
                )}
              </Form.Item> : currentLogisticsInfo.company_address}
            </Col>
            <Col span={8} xxl={7}><i>开户银行</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('bank', {
                  initialValue: currentLogisticsInfo.bank,
                })(
                  <Input placeholder='请选择开户银行' />,
                )}
              </Form.Item> : currentLogisticsInfo.bank}
            </Col>
            <Col span={8} xxl={7}><i>银行账号</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('bank_account', {
                  initialValue: currentLogisticsInfo.bank_account,
                })(
                  <Input placeholder='请输入银行账号' />,
                )}
              </Form.Item> : currentLogisticsInfo.bank_account}
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}>
              {modifying ? <>
                  <Button type='primary' htmlType="submit" loading={loading}>确定</Button>
                  <Button className='red-btn' style={{ marginLeft: 20 }}
                          onClick={() => this.setState({ modifying: false })}>取消</Button>
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

    )
  }
}

export default InfoCard
