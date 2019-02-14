import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAccountMsg: false,
      showPassWordMsg: false,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'global/checkLogin',
      payload: {},
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        values.platform_id = 'sh'
        this.props.dispatch({
          type: 'global/login',
          payload: {
            form: values,
          },
        })
      } else {
        console.log(err)
        err.hasOwnProperty('account') && this.setState({ showAccountMsg: true })
        err.hasOwnProperty('password') && this.setState({ showPassWordMsg: true })
      }
    })
  }

  render() {
    const { showAccountMsg, showPassWordMsg } = this.state
    const { account_err_msg, password_err_msg, loading } = this.props.login
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['login-container']}>
        <div className={styles['login-box']}>
          <img src={require('@/assets/image/lch_logo.png')} className={styles['company-logo']} alt="" />
          <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [{ required: true }],
              })(
                <Input prefix={<Icon type="user" style={{ color: '#898F97', fontSize: 23, marginLeft: 6 }} />}
                       className={styles['form-input']}
                       placeholder="请输入用户名" />,
              )}
              <div className={styles['custom-msg']}
                   style={showAccountMsg ? { display: 'block' } : { display: 'none' }}>{account_err_msg}</div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('pwd', {
                rules: [{ required: true }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: '#898F97', fontSize: 23, marginLeft: 6 }} />}
                       className={styles['form-input']}
                       type="password"
                       placeholder="请输入密码" />,
              )}
              <div className={styles['custom-msg']}
                   style={showPassWordMsg ? { display: 'block' } : { display: 'none' }}>{password_err_msg}</div>
            </Form.Item>
            <Form.Item style={{ marginBottom: 22 }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox style={{ color: '#fff', fontSize: 16 }}>记住密码</Checkbox>,
              )}
            </Form.Item>
            <Button type='primary' htmlType="submit" className={styles['form-button']}
                    loading={loading}>
              登录
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Index
