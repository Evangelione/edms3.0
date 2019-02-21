import React, { Component } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, Input, message, DatePicker } from 'antd'
import { GasImg, IconFont } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'
import { toFixed } from '@/utils/Math'
import { IP } from '@/common/constants'

const TabPane = Tabs.TabPane
const Dragger = Upload.Dragger

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


  parseNumber = (filed, precision, e) => {
    let val = e.target.value
    if (val === '') {
      return false
    }
    isNaN(val) && (val = 0)
    let num = toFixed(val, precision)
    this.setState({
      [filed]: num,
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    if (!isJPG && !isPNG) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    this.setState({
      file: {
        file,
        filename: 'DeliverForm[bill_img]',
        action: `${IP}/home/logistics/load-bill`,
      },
    })
    return false
  }

  customRequest = (id, type) => {
    if (this.state.file === null) {
      message.error('请上传磅单！')
      return false
    }
    this.setState({
      uploading: true,
    })
    let num = ''
    type === 'load' ? num = this.state.load_num : num = this.state.unload_num
    if (type === 'load') {
      this.props.dispatch({
        type: 'home/uploadPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          load_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
        },
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null,
        })
      })
    } else {
      this.props.dispatch({
        type: 'home/uploadUnPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          unload_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
        },
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null,
        })
      })
    }
  }

  mapTabPane = () => {
    const sites = JSON.parse(this.props.sites)
    let cache = {
      site_name: this.props.supp_goods_name,
    }
    sites.unshift(cache)
    return sites.map((item, index) => {
      let disabled
      if (this.props.loading) {
        disabled = !(this.props.loading && index === 0)
      } else if (this.props.unloading) {
        disabled = !(this.props.current_site === index)
      } else {
        disabled = false
      }
      return <TabPane tab={item.site_name} key={index + 1 + ''} disabled={disabled} style={{ marginTop: 10 }}>
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
              <Input addonAfter='吨' style={{ marginLeft: 8 }} placeholder='请填写数量'
                     onBlur={this.parseNumber.bind(null, 'price', 2)} />
            </Col>
          </Col>
          <Col span={12} style={{ paddingBottom: 2 }}>
            <Col span={24} style={{ paddingLeft: 19 }}>
              <div>
                <span className={styles['item-label']}>司机：</span>
                <span className={styles['item-value']}>张师傅&nbsp;&nbsp;&nbsp;&nbsp;13737373737</span>
              </div>
              <div style={{ margin: '8px 0' }}>
                <span className={styles['item-label']}>车头：</span>
                <span className={styles['item-purple']}>浙A-A1234</span>
                <span className={styles['item-label']} style={{ marginLeft: 35 }}>车挂：</span>
                <span className={styles['item-purple']}>浙A-A1234</span>
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
    })
  }

  render() {
    const { visible, fileList } = this.state
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
              {this.mapTabPane()}
            </Tabs>
            <div className='tabs-bottom-line' />
            <div style={{ padding: 8, marginTop: 15 }}>
              <Dragger
                accept='.jpg,.png'
                name='DeliverForm[bill_img]'
                action={`${IP}/home/logistics/upload-bill`}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                customRequest={this.customRequest}>
                <p className="ant-upload-drag-icon">
                  <IconFont type="icon-icon-test110" />
                </p>
                <div className="hover-primary">点击或拖拽上传磅单</div>
              </Dragger>
            </div>
            <Row type='flex' justify='end'>
              <Col style={{ padding: '12px 8px 15px' }}>
                <Button type='primary' style={{ marginRight: 20 }}>确认</Button>
                <Button className='red-btn' onClick={this.hideModal}>取消</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}

export default UpLoadPoundList
