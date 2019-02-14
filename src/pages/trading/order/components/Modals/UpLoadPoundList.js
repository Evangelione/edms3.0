import React, { Component } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, Input, message, DatePicker } from 'antd'
import { GasImg, TransportImg, IconFont } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'

const TabPane = Tabs.TabPane
const Dragger = Upload.Dragger

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

class UpLoadPoundList extends Component {
  state = {
    visible: false,
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      clientSelectionStatus: false,
      visibleClientInfo: false,
      siteSelectionStatus: false,
      visibleSiteInfo: false,
    })
  }

  render() {
    const { visible } = this.state
    const { children } = this.props
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="上传装车磅单"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}>
          <div style={{ padding: '0 12px', position: 'relative' }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="董家口气" key="1" style={{paddingTop: 10}}>
                <Row>
                  <Col span={12} style={{ paddingBottom: 2 }}>
                    <Col span={5}>
                      <div style={{ paddingLeft: 21 }}>
                        {GasImg}
                      </div>
                    </Col>
                    <Col span={15} style={{ marginLeft: 9 }}>
                      <div className={styles['site-select-info']}>
                        <div>
                          <div>
                            <div className={styles['site-name']}>昆仑燃气有限公司山东分公司</div>
                            <div className='purple-color'>张三丰 18989898989</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={5} style={{ textAlign: 'right', marginTop: 20 }}>
                      <div style={{ marginTop: 6, marginRight: 3, fontSize: '1rem' }}
                           className='font-purple-color'>装货数量
                      </div>
                    </Col>
                    <Col span={12} style={{ marginTop: 20 }}>
                      <Input addonAfter='吨' style={{ marginLeft: 8 }} />
                    </Col>
                  </Col>
                  <Col span={12} style={{ paddingBottom: 2 }}>
                    <Col span={5}>
                      <div style={{ paddingLeft: 21 }}>
                        {TransportImg}
                      </div>
                    </Col>
                    <Col span={15} style={{ marginLeft: 9 }}>
                      <div className={styles['site-select-info']}>
                        <div>
                          <div>
                            <div className={styles['site-name']}>昆仑燃气有限公司山东分公司</div>
                            <div className='purple-color'>张三丰 18989898989</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={5} style={{ textAlign: 'right', marginTop: 20 }}>
                      <div style={{ marginTop: 6, marginRight: 3, fontSize: '1rem' }}
                           className='font-purple-color'>装货数量
                      </div>
                    </Col>
                    <Col span={12} style={{ marginTop: 20 }}>
                      <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                  style={{ width: '100%', marginLeft: 8 }} placeholder='暂无卸货时间' />
                    </Col>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="闸弄口站点" key="2" disabled>Content of Tab Pane 2</TabPane>
              <TabPane tab="转塘第7加气站" key="3" disabled>Content of Tab Pane 3</TabPane>
              <TabPane tab="转塘第8加气站" key="4" disabled>Content of Tab Pane 3</TabPane>
            </Tabs>
            <div className='tabs-bottom-line' />
            <div style={{ padding: 8, marginTop: 15 }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <IconFont type="icon-icon-test110" />
                </p>
                <div className="blue-color">点击或拖拽上传磅单</div>
              </Dragger>
            </div>
            <Row type='flex' justify='end'>
              <Col style={{ padding: '12px 8px 15px' }}>
                <Button type='primary' style={{ marginRight: 20 }}>确认</Button>
                <Button className='red-btn'>取消</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}

export default UpLoadPoundList
