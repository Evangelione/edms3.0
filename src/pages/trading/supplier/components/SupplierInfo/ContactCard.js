import React, { Component } from 'react'
import { Card, Row, Col, Button, Icon, Form, Input } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import styles from '../../../index.less'

@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))
@Form.create()
@withRouter
class ContactCard extends Component {
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
        values.id = this.props.match.params.SupplierDetail
        this.props.dispatch({
          type: 'supplier/updateSupplierContact',
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

  render() {
    const { modifying } = this.state
    const { form, supplier, loading } = this.props
    const { currentSupplierInfo } = supplier
    const { getFieldDecorator } = form
    return (
      <Card title={<>
        <Icon type="phone" className='font-primary-color'
              style={{ marginRight: 20, marginTop: 2, fontSize: 24 }} />
        <span style={{ verticalAlign: 'top' }}>基本信息</span>
      </>} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Row className={styles['info-list']}>
            <Col span={6}><i>联系人</i></Col>
            <Col span={18}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('contact', {
                  rules: [{ required: true }],
                  initialValue: currentSupplierInfo.contact,
                })(
                  <Input placeholder='请输入联系人' />,
                )}
              </Form.Item> : currentSupplierInfo.contact}
            </Col>
            <Col span={6}><i>联系人手机</i></Col>
            <Col span={18}>
              {modifying ? <Form.Item wrapperCol={{ span: 16 }}>
                {getFieldDecorator('contact_phone', {
                  rules: [{ required: true }],
                  initialValue: currentSupplierInfo.contact_phone,
                })(
                  <Input placeholder='请输入联系人手机' />,
                )}
              </Form.Item> : currentSupplierInfo.contact_phone}
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}>
              {modifying ? <>
                  <Button type='primary' htmlType='submit' loading={loading}>确定</Button>
                  <Button className='red-btn' style={{ marginLeft: 20 }}
                          onClick={() => this.setState({ modifying: false })}>取消</Button>
                </>
                :
                <div>
                  <Button type='primary' onClick={() => this.setState({ modifying: true })}>编辑</Button>
                </div>}
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default ContactCard
