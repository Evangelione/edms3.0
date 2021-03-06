import React, { Component } from 'react'
import {
  Modal,
  Input,
  Select,
  Cascader,
  AutoComplete,
  Button,
  Form,
} from 'antd'
import { connect } from 'dva'

const AutoCompleteOption = AutoComplete.Option
const Option = Select.Option

@connect(({global, loading}) => ({
  global,
  loading: loading.models.client,
}))
@Form.create()
class HandleClientModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      autoCompleteResult: [],
    }
  }

  openInsertModal = () => {
    if (this.state.modalVisible) {
      return false
    }
    this.setState({
      modalVisible: true,
    })
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'cust',
      },
    })
  }

  closeInsertModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
    this.props.form.resetFields()
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'cust',
        district_name: targetOption.value,
        targetOption,
      },
    }).then(() => {
      // targetOption.loading = false
    })
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {
          province: values.area_arr[0],
          city: values.area_arr[1],
          area: values.area_arr[2] || '',
        }
        delete values.area_arr
        Object.assign(values, obj)
        this.props.dispatch({
          type: 'client/insertClient',
          payload: {
            form: values,
          },
        }).then(() => {
          this.closeInsertModal()
          this.props.dispatch({
            type: 'client/fetchClientList',
            payload: {},
          })
        })
      }
    })
  }

  render() {
    const {modalVisible, autoCompleteResult} = this.state
    const {children, form, global, loading} = this.props
    const {getFieldDecorator} = form
    const {cascadeOptions} = global
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))
    return (
      <div style={{display: 'inline-block'}} onClick={this.openInsertModal}>
        {children}
        <Modal visible={modalVisible} title='新增客户' width={600} bodyStyle={{padding: '24px 60px'}}
               footer={null} onCancel={this.closeInsertModal}
               maskClosable={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="纳税人识别号"
            >
              {getFieldDecorator('tax_number', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入纳税人识别号' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="公司全称"
            >
              {getFieldDecorator('company_full_name', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入公司全称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="公司简称"
            >
              {getFieldDecorator('company_name', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入公司简称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="公司类型"
            >
              {getFieldDecorator('company_flow', {
                initialValue: '1',
              })(
                <Select style={{width: '100%'}} onChange={this.handleChange}>
                    <Option value="1">贸易商</Option>
                    <Option value="2">运贸商</Option>
                    <Option value="9">零售商</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="省市区县"
            >
              {getFieldDecorator('area_arr', {
                initialValue: [],
                rules: [{type: 'array', message: '省市区县'}],
              })(
                <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('company_address')(
                <Input placeholder='请输入详细地址' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="开户银行"
            >
              {getFieldDecorator('bank')(
                <AutoComplete
                  dataSource={websiteOptions}
                  placeholder="请选择开户银行"
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="银行账号"
            >
              {getFieldDecorator('bank_account')(
                <Input placeholder='请输入银行账号' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('contact', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入联系人' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人电话"
            >
              {getFieldDecorator('contact_phone', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入联系人电话' />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
              <Button className='red-btn' style={{marginLeft: 20, marginTop: 20}}
                      onClick={this.closeInsertModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default HandleClientModal
