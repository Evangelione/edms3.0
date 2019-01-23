import React, { Component } from 'react'
import {
  Modal,
  Input,
  Checkbox,
  Button,
  Form,
  Row,
  Col,
} from 'antd'
import { connect } from 'dva'
import styles from '../../index.less'


@connect(({loading}) => ({
  loading: loading.models.partner,
}))
@Form.create()
class HandlePartnerModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  openInsertModal = () => {
    if (this.state.modalVisible) {
      return false
    }
    this.setState({
      modalVisible: true,
    })
  }

  closeInsertModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
    this.props.form.resetFields()
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
          type: 'partner/insertPartner',
          payload: {
            form: values,
          },
        }).then(() => {
          this.closeInsertModal()
          this.props.dispatch({
            type: 'partner/fetchPartnerList',
            payload: {},
          })
        })
      }
    })
  }

  render() {
    const {modalVisible} = this.state
    const {children, form, loading} = this.props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 5},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 17},
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
      <div style={{display: 'inline-block'}} onClick={this.openInsertModal}>
        {children}
        <Modal visible={modalVisible} title='新增客户' width={600} bodyStyle={{padding: '24px 60px'}}
               footer={null} onCancel={this.closeInsertModal}
               maskClosable={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="伙伴名称"
            >
              {getFieldDecorator('company_name1', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入伙伴名称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系方式"
            >
              {getFieldDecorator('company_nam2e', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入联系方式' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="登录账号"
            >
              {getFieldDecorator('company3_name', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入登录账号' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="登录密码"
            >
              {getFieldDecorator('compan3y_name', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入登录密码' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="角色名称"
            >
              {getFieldDecorator('c2ompany_name', {
                rules: [{required: true}],
              })(
                <Input placeholder='请输入角色名称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="角色权限"
            >
              {getFieldDecorator('c23ompany_name', {})(
                <Checkbox.Group style={{width: '100%'}}>
                  <Row className={styles.checkBox}>
                    <Col span={8}><Checkbox value="A">我的订单</Checkbox></Col>
                    <Col span={8}><Checkbox value="B">我的客户</Checkbox></Col>
                    <Col span={8}><Checkbox value="C">我的供应商</Checkbox></Col>
                    <Col span={8}><Checkbox value="D">我的物流</Checkbox></Col>
                    <Col span={8}><Checkbox value="E">我的伙伴</Checkbox></Col>
                    <Col span={8}><Checkbox value="F">我的公司</Checkbox></Col>
                    <Col span={8}><Checkbox value="G">App数据</Checkbox></Col>
                  </Row>
                </Checkbox.Group>,
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

export default HandlePartnerModal
