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


@connect(({ partner, loading }) => ({
  partner,
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
      type: 'partner/inquirePartnerInfoById',
      payload: {
        id: this.props.modify,
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { modify } = this.props
        let effect = modify ? 'updatePartnerInfoById' : 'insertPartner'
        modify && (values.id = modify)
        this.props.dispatch({
          type: `partner/${effect}`,
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
    const { modalVisible } = this.state
    const { children, form, loading, partner: { menu_list, currentPartnerInfo }, modify } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
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
    const checkBox = menu_list.map((value, index) => {
      return <Col span={8} key={index}><Checkbox value={value.id}>{value.name}</Checkbox></Col>

    })
    return (
      <div style={{ display: 'inline-block' }} onClick={this.openInsertModal}>
        {children}
        <Modal visible={modalVisible} title={modify ? '编辑伙伴' : '新增伙伴'} width={600} bodyStyle={{ padding: '24px 60px' }}
               footer={null} onCancel={this.closeInsertModal}
               maskClosable={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="伙伴名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true }],
                initialValue: modify ? currentPartnerInfo.name : '',
              })(
                <Input placeholder='请输入伙伴名称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系方式"
            >
              {getFieldDecorator('mobile', {
                rules: [{ required: true }],
                initialValue: modify ? currentPartnerInfo.mobile : '',
              })(
                <Input placeholder='请输入联系方式' />,
              )}
            </Form.Item>
            {!modify ? <Form.Item
              {...formItemLayout}
              label="登录密码"
            >
              {getFieldDecorator('pwd', {
                rules: [{ required: true }],
                initialValue: modify ? currentPartnerInfo.pwd : '',
              })(
                <Input placeholder='请输入登录密码' />,
              )}
            </Form.Item> : null}
            <Form.Item
              {...formItemLayout}
              label="角色名称"
            >
              {getFieldDecorator('role_name', {
                rules: [{ required: true }],
                initialValue: modify ? currentPartnerInfo.role_name : '',
              })(
                <Input placeholder='请输入角色名称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="角色权限"
            >
              {getFieldDecorator('role_menu', {
                initialValue: modify ? currentPartnerInfo.role_menu : [],
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row className={styles.checkBox}>
                    {checkBox}
                  </Row>
                </Checkbox.Group>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
              <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                      onClick={this.closeInsertModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default HandlePartnerModal
