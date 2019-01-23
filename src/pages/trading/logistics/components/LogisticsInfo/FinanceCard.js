import React, { Component } from 'react'
import { Card, Row, Col, Button, Icon, Form, Input } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import styles from '../../../index.less'

@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
@Form.create()
@withRouter
class FinanceCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idReceipt: false,
      modifying1: false,
      modifying2: false,
      modifying3: false,
    }
  }

  handleSubmit = (type, item, e) => {
    // () => this.setState({modifying1: false, idReceipt: true})
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'logistics/updateLogisticsInfo',
          payload: {
            form: {
              id: this.props.match.params.LogisticsDetail,
              [type]: values[type],
            },
          },
        }).then(() => {
          this.setState({
            [item]: false,
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

  render() {
    const { idReceipt, modifying1, modifying2, modifying3 } = this.state
    const { form, logistics, loading } = this.props
    const { currentLogisticsInfo } = logistics
    const { getFieldDecorator } = form
    return (
      <Card title={<>
        <Icon type="pay-circle" className='font-primary-color'
              style={{ marginRight: 20, marginTop: 2, fontSize: 24 }} />
        <span style={{ verticalAlign: 'top' }}>基本信息</span>
      </>} bordered={false}>
        <Form>
          <Row className={styles['info-list']}>
            <Col span={5}><i>预付款额</i></Col>
            <Col span={5} xxl={7}>
              {modifying1 ? <Form.Item wrapperCol={{ span: 22 }}>
                {getFieldDecorator('balance', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.balance,
                })(
                  <Input placeholder='请输入预收款额' />,
                )}
              </Form.Item> : `${currentLogisticsInfo.balance || 0.00} 元`}
            </Col>
            <Col span={12}>
              {modifying1 ? <>
                  <Button type='primary' onClick={this.handleSubmit.bind(null, 'balance', 'modifying1')}
                          loading={loading}>确定</Button>
                  <Button className='red-btn' style={{ marginLeft: 15 }}
                          onClick={() => this.setState({ modifying1: false })}>取消</Button>
                </>
                :
                <div>
                  <Button className={idReceipt ? 'gray-btn' : 'yellow-btn'} style={{ verticalAlign: 'middle' }}
                          onClick={() => this.setState({ modifying1: true })} disabled={idReceipt}>收款</Button>
                </div>}

            </Col>
            <Col span={5}><i>信用总额</i></Col>
            <Col span={5} xxl={7}>
              {modifying2 ? <Form.Item wrapperCol={{ span: 22 }}>
                {getFieldDecorator('credit', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.credit,
                })(
                  <Input placeholder='请输入信用总额' />,
                )}
              </Form.Item> : `${currentLogisticsInfo.credit || 0.00} 元`}
            </Col>
            <Col span={12}>
              {modifying2 ? <>
                  <Button type='primary' onClick={this.handleSubmit.bind(null, 'credit', 'modifying2')}
                          loading={loading}>保存</Button>
                  <Button className='red-btn' style={{ marginLeft: 15 }}
                          onClick={() => this.setState({ modifying2: false })}>取消</Button>
                </>
                :
                <div>
                  <Button type='primary' onClick={() => this.setState({ modifying2: true })}>设置</Button>
                </div>}
            </Col>
            <Col span={5}><i>预警额度</i></Col>
            <Col span={5} xxl={7}>
              {modifying3 ? <Form.Item wrapperCol={{ span: 22 }}>
                {getFieldDecorator('credit_notice', {
                  rules: [{ required: true }],
                  initialValue: currentLogisticsInfo.credit_notice,
                })(
                  <Input placeholder='请输入预警额度' />,
                )}
              </Form.Item> : `${currentLogisticsInfo.credit_notice || 0.00} 元`}
            </Col>
            <Col span={12}>
              {modifying3 ? <>
                  <Button type='primary' onClick={this.handleSubmit.bind(null, 'credit_notice', 'modifying3')}
                          loading={loading}>保存</Button>
                  <Button className='red-btn' style={{ marginLeft: 15 }}
                          onClick={() => this.setState({ modifying3: false })}>取消</Button>
                </>
                :
                <div>
                  <Button type='primary' onClick={() => this.setState({ modifying3: true })}>设置</Button>
                </div>}
            </Col>
            <Col span={5}><i>剩余额度</i></Col>
            <Col span={19}>9,334,234.52 元</Col>
            <Col span={5}><i>已用额度</i></Col>
            <Col span={19}>9,334,234.52 元</Col>
          </Row>
        </Form>

      </Card>
    )
  }
}

export default FinanceCard
