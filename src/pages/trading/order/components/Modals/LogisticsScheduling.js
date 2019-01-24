import React, { Component } from 'react'
import { Col, Modal, Row, Select, Form, Input } from 'antd'
import { connect } from 'dva'
import { SiteImg } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class LogisticsScheduling extends Component {
  state = {
    visible: false,
    selectionStatus: false,
    visibleLogisticsInfo: false,
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.props.dispatch({
      type: 'order/inquireSiteInfoByLogisticsScheduling',
      payload: {},
    })
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible } = this.state
    const { children, order: { siteInfoByLogisticsScheduling }, form: { getFieldDecorator } } = this.props
    const siteInfoLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const itemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    }
    return (
      <div onClick={this.showModal}>
        {children}
        <Modal
          title="物流调度"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          bodyStyle={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 10px' }}>
            <Row>
              <Col span={3}>
                <div style={{ paddingLeft: 31 }}>
                  {SiteImg}
                </div>
              </Col>
              <Col span={15} style={{ marginLeft: 9 }}>
                <div className={styles['site-select-info']}>
                  <div>
                    <div>
                      <div className={styles['site-name']}>{siteInfoByLogisticsScheduling.site_name}</div>
                      <div>{siteInfoByLogisticsScheduling.contact} {siteInfoByLogisticsScheduling.contact_phone}</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles['blue-background']}>{siteInfoByLogisticsScheduling.site_type}</div>
                    <div>{siteInfoByLogisticsScheduling.province} {siteInfoByLogisticsScheduling.city} {siteInfoByLogisticsScheduling.area} {siteInfoByLogisticsScheduling.address}</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={9} style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={8}>
                  计划数量
                </Col>
                <Col span={15}>
                  <Input value={siteInfoByLogisticsScheduling.plan_num} />
                </Col>
              </Col>
              <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={8}>
                  交货时间
                </Col>
                <Col span={15}>
                  <Input value={siteInfoByLogisticsScheduling.plan_time} />
                </Col>
              </Col>
            </Row>
            <div className='modal-line' style={{ width: 828, marginLeft: '-12px', marginBottom: 24, marginTop: 24 }} />
            <Form>

            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LogisticsScheduling
