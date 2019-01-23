import React, { Component } from 'react'
import { Card, Row, Col, Button, Icon, Form, Input, Cascader, Select } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import styles from '../../../index.less'
import { company_type } from '@/common/constants'

const Option = Select.Option

@connect(({global, supplier, loading}) => ({
  global,
  supplier,
  loading: loading.models.supplier,
}))
@Form.create()
class InfoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modifying: false,
    }
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {
          id: this.props.match.params.SupplierDetail,
          province: values.area_arr[0],
          city: values.area_arr[1],
          area: values.area_arr[2] || '',
        }
        delete values.area_arr
        Object.assign(values, obj)
        this.props.dispatch({
          type: 'supplier/updateSupplierInfo',
          payload: {
            form: values,
          },
        }).then(() => {
          this.setState({
            modifying: false,
          })
          this.props.dispatch({
            type: 'supplier/getSupplierInfoById',
            payload: {
              id: this.props.match.params.SupplierDetail,
            },
          })
        })
      }
    })
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'supp',
        district_name: targetOption.value,
        targetOption,
      },
    }).then(() => {
      // targetOption.loading = false
    })
  }

  modify = () => {
    this.setState({
      modifying: true,
    })
    const {currentSupplierInfo} = this.props.supplier
    this.props.dispatch({
      type: 'global/inquireCascadeOptionsAll',
      payload: {
        module: 'supp',
        province: currentSupplierInfo.province,
        city: currentSupplierInfo.city,
      },
    })
  }

  render() {
    const {modifying} = this.state
    const {form, supplier, global, loading} = this.props
    const {currentSupplierInfo} = supplier
    const {cascadeOptions} = global
    const {getFieldDecorator} = form
    const area = (currentSupplierInfo.province + currentSupplierInfo.city + currentSupplierInfo.area) || ''
    return (
      <Card title={<>
        <Icon type="idcard" className='font-primary-color'
              style={{marginRight: 20, marginTop: 2, fontSize: 24}} />
        <span style={{verticalAlign: 'top'}}>基本信息</span>
      </>} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Row className={styles['info-list']}>
            <Col span={8} xxl={7}><i>纳税人识别号</i></Col>
            <Col span={16} xxl={17}>
              {currentSupplierInfo.tax_number}
            </Col>
            <Col span={8} xxl={7}><i>公司全称</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('company_full_name', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.company_full_name,
                })(
                  <Input placeholder='请输入公司全称' />,
                )}
              </Form.Item> : currentSupplierInfo.company_full_name}
            </Col>
            <Col span={8} xxl={7}><i>公司简称</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('company_name', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.company_name,
                })(
                  <Input placeholder='请输入公司简称' />,
                )}
              </Form.Item> : currentSupplierInfo.company_name}
            </Col>
            <Col span={8} xxl={7}><i>公司类型</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('company_flow', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.company_flow + '',
                })(
                  <Select style={{width: '100%'}}>
                    <Option value="1">贸易商</Option>
                    <Option value="2">零售商</Option>
                  </Select>,
                )}
              </Form.Item> : company_type[currentSupplierInfo.company_flow - 1]}
            </Col>
            <Col span={8} xxl={7}><i>省市区县</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('area_arr', {
                  rules: [{required: true}],
                  initialValue: [currentSupplierInfo.province, currentSupplierInfo.city, currentSupplierInfo.area],
                })(
                  <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
                )}
              </Form.Item> : area}
            </Col>
            <Col span={8} xxl={7}><i>详细地址</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('company_address', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.company_address,
                })(
                  <Input placeholder='请输入详细地址' />,
                )}
              </Form.Item> : currentSupplierInfo.company_address}
            </Col>
            <Col span={8} xxl={7}><i>开户银行</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('bank', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.bank,
                })(
                  <Input placeholder='请选择开户银行' />,
                )}
              </Form.Item> : currentSupplierInfo.bank}
            </Col>
            <Col span={8} xxl={7}><i>银行账号</i></Col>
            <Col span={16} xxl={17}>
              {modifying ? <Form.Item wrapperCol={{span: 16}}>
                {getFieldDecorator('bank_account', {
                  rules: [{required: true}],
                  initialValue: currentSupplierInfo.bank_account,
                })(
                  <Input placeholder='请输入银行账号' />,
                )}
              </Form.Item> : currentSupplierInfo.bank_account}
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

    )
  }
}

export default withRouter(InfoCard)
