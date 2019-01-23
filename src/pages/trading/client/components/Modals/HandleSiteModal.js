import React, { Component } from 'react'
import {
  Modal,
  Input,
  Select,
  Cascader,
  Button,
  Form,
} from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'

const Option = Select.Option

@connect(({ global, client, loading }) => ({
  global,
  client,
  loading: loading.models.client,
}))
@Form.create()
class HandleSiteModal extends Component {
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
    }, () => {
      this.props.modify && this.inquire()
    })
  }

  closeInsertModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
    this.props.form.resetFields()
  }

  inquire = () => {
    this.props.dispatch({
      type: 'client/inquireSiteInfoById',
      payload: {
        id: this.props.modify,
      },
    }).then(() => {
      const { currentSiteInfo } = this.props.client
      this.props.dispatch({
        type: 'global/inquireCascadeOptionsAll',
        payload: {
          module: 'cust',
          province: currentSiteInfo.province,
          city: currentSiteInfo.city,
        },
      })
    })
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
        values.customer_id = this.props.match.params.ClientDetail
        Object.assign(values, obj)
        let { modify } = this.props
        let effect = modify ? 'updateSiteInfo' : 'insertSite'
        modify && (values.id = modify)
        this.props.dispatch({
          type: `client/${effect}`,
          payload: {
            form: values,
          },
        }).then(() => {
          this.closeInsertModal()
          this.props.dispatch({
            type: 'client/fetchSiteList',
            payload: {
              customer_id: this.props.match.params.ClientDetail,
            },
          })
        })
      }
    })
  }

  render() {
    const { modalVisible } = this.state
    const { children, modify, global, client, form } = this.props
    const { currentSiteInfo } = client
    const { cascadeOptions } = global
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
    return (
      <div style={{ display: 'inline-block' }} onClick={this.openInsertModal}>
        {children}
        <Modal visible={modalVisible} title={modify ? '编辑站点' : '新增站点'} width={600} bodyStyle={{ padding: '24px 60px' }}
               footer={null} onCancel={this.closeInsertModal}
               maskClosable={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="站点全称"
            >
              {modify ? <span
                style={{ marginLeft: 10 }}>{currentSiteInfo.site_full_name}</span> : getFieldDecorator('site_full_name', {
                rules: [{ required: true }],
              })(
                <Input placeholder='请输入站点全称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="站点简称"
            >
              {getFieldDecorator('site_name', {
                rules: [{ required: true }],
                initialValue: modify ? currentSiteInfo.site_name : '',
              })(
                <Input placeholder='请输入站点简称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="站点类型"
            >
              {getFieldDecorator('site_type', {
                rules: [{ required: true }],
                initialValue: modify ? currentSiteInfo.site_type : '1',
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="1">贸易商</Option>
                  <Option value="2">零售商</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="省市区县"
            >
              {getFieldDecorator('area_arr', {
                rules: [{ required: true, type: 'array', message: '省市区县' }],
                initialValue: modify ? [currentSiteInfo.province, currentSiteInfo.city, currentSiteInfo.area] : '',
              })(
                <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('site_address', {
                rules: [{ required: true }],
                initialValue: modify ? currentSiteInfo.site_address : '',
              })(
                <Input placeholder='请输入详细地址' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('contact', {
                rules: [{ required: true }],
                initialValue: modify ? currentSiteInfo.contact : '',
              })(
                <Input placeholder='请输入联系人' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人电话"
            >
              {getFieldDecorator('contact_phone', {
                rules: [{ required: true }],
                initialValue: modify ? currentSiteInfo.contact_phone : '',
              })(
                <Input placeholder='请输入联系人电话' />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                      onClick={this.closeInsertModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default withRouter(HandleSiteModal)
