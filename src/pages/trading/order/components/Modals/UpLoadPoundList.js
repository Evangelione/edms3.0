import React, { Component } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, Input, message, DatePicker } from 'antd'
import { GasImg, IconFont } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'
import { toFixed } from '@/utils/Math'
import { connect } from 'dva'
import moment from 'moment'

const TabPane = Tabs.TabPane
const Dragger = Upload.Dragger

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class UpLoadPoundList extends Component {
  state = {
    visible: false,
    file: null,
    mainName: '',
    mainContact: '',
    mainContactPhone: '',
    driver: '',
    driverPhone: '',
    carHead: '',
    carBody: '',
    time: null,
    num: '',
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
    if (this.props.uploading) {
      this.props.dispatch({
        type: 'order/fetchPoundInfo',
        payload: {
          id: this.props.id,
        },
      }).then(() => {
        const { poundInfoByUpload } = this.props.order
        this.setState({
          mainName: poundInfoByUpload.goods.goods_name,
          mainContact: poundInfoByUpload.goods.contact,
          mainContactPhone: poundInfoByUpload.goods.contact_phone,
          driver: poundInfoByUpload.delivery.driver,
          driverPhone: poundInfoByUpload.delivery.driver_mobile,
          carHead: poundInfoByUpload.delivery.car_head_code,
          carBody: poundInfoByUpload.delivery.car_body_code,
        })
      })
    }
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
      num,
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
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    if (!isJPG && !isPNG) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    this.setState({
      file,
    })
    console.log(file)
    return false
  }

  // customRequest = (id, type) => {
  //   if (this.state.file === null) {
  //     message.error('请上传磅单！')
  //     return false
  //   }
  //   this.setState({
  //     uploading: true,
  //   })
  //   let num = ''
  //   type === 'load' ? num = this.state.load_num : num = this.state.unload_num
  //   if (type === 'load') {
  //     this.props.dispatch({
  //       type: 'home/uploadPound',
  //       payload: {
  //         file: this.state.file,
  //         id,
  //         num: num,
  //         load_type: type,
  //         load_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
  //       },
  //     }).then(() => {
  //       this.setState({
  //         uploading: false,
  //         visible: false,
  //         fileList: [],
  //         file: null,
  //       })
  //     })
  //   } else {
  //     this.props.dispatch({
  //       type: 'home/uploadUnPound',
  //       payload: {
  //         file: this.state.file,
  //         id,
  //         num: num,
  //         load_type: type,
  //         unload_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
  //       },
  //     }).then(() => {
  //       this.setState({
  //         uploading: false,
  //         visible: false,
  //         fileList: [],
  //         file: null,
  //       })
  //     })
  //   }
  // }

  mapTabPane = () => {
    const sites = JSON.parse(this.props.sites)
    let cache = {
      site_name: this.props.supp_goods_name,
    }
    sites.unshift(cache)
    const { mainName, mainContact, mainContactPhone, driver, driverPhone, carHead, carBody } = this.state
    return sites.map((item, index) => {
      let disabled
      if (this.props.uploading) {
        disabled = !(this.props.uploading && index === 0)
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
                    <div className={styles['site-name']}>{mainName}</div>
                    <div className='purple-color'>{mainContact} {mainContactPhone}</div>
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
                     onBlur={this.parseNumber.bind(null, 'num', 2)} value={this.state.num} onChange={this.changeNum} />
            </Col>
          </Col>
          <Col span={12} style={{ paddingBottom: 2 }}>
            <Col span={24} style={{ paddingLeft: 19 }}>
              <div>
                <span className={styles['item-label']}>司机：</span>
                <span className={styles['item-value']}>{driver}&nbsp;&nbsp;&nbsp;&nbsp;{driverPhone}</span>
              </div>
              <div style={{ margin: '8px 0' }}>
                <span className={styles['item-label']}>车头：</span>
                <span className={styles['item-purple']}>{carHead}</span>
                <span className={styles['item-label']} style={{ marginLeft: 35 }}>车挂：</span>
                <span className={styles['item-purple']}>{carBody}</span>
              </div>
            </Col>
            <Col span={5} style={{ textAlign: 'right', marginTop: 20 }}>
              <div style={{ marginTop: 6, marginRight: 3, fontSize: '1rem' }}
                   className='font-purple-color'>装货时间
              </div>
            </Col>
            <Col span={12} style={{ marginTop: 20 }}>
              <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                          style={{ width: '100%', marginLeft: 8 }} placeholder='暂无卸货时间' value={this.state.time}
                          onChange={this.changeTime} allowClear={false} />
            </Col>
          </Col>
        </Row>
      </TabPane>
    })
  }

  changeTime = (e, value) => {
    this.setState({ time: moment(value) })
  }

  changeNum = (e) => {
    console.log(e.target.value)
    this.setState({ num: e.target.value })
  }

  submit = () => {
    if (!this.state.num) {
      message.error('请输入数量')
    } else if (!this.state.time) {
      message.error('请选择时间')
    } else {
      console.log({
        id: this.props.id,
        load_quantity: this.state.num,
        real_load_time: this.state.time.format('YYYY-MM-DD'),
        file: '',
      })
      this.props.dispatch({
        type: 'order/upLoadingPound',
        payload: {
          id: this.props.id,
          load_quantity: this.state.num,
          real_load_time: this.state.time.format('YYYY-MM-DD'),
          file: '',
        },
      })
    }
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
                name='file'
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}>
                <p className="ant-upload-drag-icon">
                  <IconFont type="icon-icon-test110" />
                </p>
                <div className="hover-primary">点击或拖拽上传磅单</div>
              </Dragger>
            </div>
            <Row type='flex' justify='end'>
              <Col style={{ padding: '12px 8px 15px' }}>
                <Button type='primary' style={{ marginRight: 20 }} onClick={this.submit}>确认</Button>
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
