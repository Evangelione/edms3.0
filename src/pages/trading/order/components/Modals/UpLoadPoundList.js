import React, { Component } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, Input, message, DatePicker } from 'antd'
import { GasImg, IconFont } from '@/common/constants'
import styles from '@/pages/trading/order/index.less'
import { toFixed } from '@/utils/Math'
import { connect } from 'dva'
import moment from 'moment'
import ImagePreView from '@/components/ImagePreView'

const TabPane = Tabs.TabPane

@connect(({ order }) => ({
  order,
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
    fileList: [],
    cust_site_id: '',
    imageUrl: '',
  }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
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
      const sites = JSON.parse(this.props.sites)
      sites.unshift({})
      console.log(sites)
      this.setState({
        cust_site_id: sites[this.props.current_site] ? sites[this.props.current_site].cust_site_id : '0',
      })
      if (this.props.current_site === 0) {
        this.setState({
          imageUrl: poundInfoByUpload.goods.load_pic_url,
          num: poundInfoByUpload.goods.load_quantity,
          time: poundInfoByUpload.goods.real_load_time ? moment(poundInfoByUpload.goods.real_load_time) : '',
        })
      }
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
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
      fileList: [],
      imageUrl: '',
      cust_site_id: '',
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

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

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
    return (isJPG || isPNG) && isLt5M
  }

  handleChange = (info) => {
    // 获取image的base64
    this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      fileList: [{
        uid: '-1',
        name: 'file.png',
        status: 'done',
      }],
      imageUrl,
    }))
  }

  customRequest = () => {
    // 覆盖默认上传
    return false
  }

  removeImage = (e) => {
    e && e.stopPropagation()
    this.setState({
      fileList: [],
      imageUrl: '',
      file: null,
    })
  }

  mapTabPane = () => {
    if (!this.props.sites) {
      return
    }
    const sites = JSON.parse(this.props.sites)
    let cache = {
      site_name: this.props.supp_goods_name,
      cust_site_id: '0',
    }
    sites.unshift(cache)
    const { mainName, mainContact, mainContactPhone, driver, driverPhone, carHead, carBody } = this.state
    const { readOnly } = this.props
    return sites.map((item, index) => {
      let disabled
      if (this.props.uploading) {
        disabled = !(this.props.uploading && index === 0)
      } else if (this.props.unloading) {
        disabled = index === 0
      } else {
        disabled = false
      }
      return <TabPane tab={item.site_name} key={item.cust_site_id} disabled={disabled} style={{ marginTop: 10 }}>
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
                   className='font-purple-color'>{this.props.uploading ? '装' : '卸'}货数量
              </div>
            </Col>
            <Col span={12} style={{ marginTop: 20 }}>
              <Input addonAfter='吨' style={{ marginLeft: 8 }} placeholder='请填写数量' disabled={readOnly}
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
                   className='font-purple-color'>{this.props.uploading ? '装' : '卸'}货时间
              </div>
            </Col>
            <Col span={12} style={{ marginTop: 20 }}>
              <DatePicker suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                          style={{ width: '100%', marginLeft: 8 }}
                          placeholder={`暂无${this.props.uploading ? '装' : '卸'}货时间`} value={this.state.time}
                          onChange={this.changeTime} allowClear={false} disabled={readOnly} />
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
    } else if (this.state.file === null) {
      message.error('请上传磅单')
    } else {
      if (this.props.uploading) {
        this.props.dispatch({
          type: 'order/upLoadingPound',
          payload: {
            id: this.props.id,
            load_quantity: this.state.num,
            real_load_time: this.state.time.format('YYYY-MM-DD'),
            file: this.state.file,
          },
        }).then(() => {
          this.hideModal()
          this.props.dispatch({
            type: 'order/fetchOrderList',
            payload: {},
          })
        })
      } else if (this.props.unloading) {
        this.props.dispatch({
          type: 'order/unLoadingPound',
          payload: {
            id: this.props.id,
            cust_site_id: this.state.cust_site_id,
            unload_quantity: this.state.num,
            unload_time: this.state.time.format('YYYY-MM-DD'),
            file: this.state.file,
          },
        }).then(() => {
          this.hideModal()
          this.props.dispatch({
            type: 'order/fetchOrderList',
            payload: {},
          })
        })
      }
    }
  }

  changePane = (key) => {
    const sites = JSON.parse(this.props.sites)
    let site = sites.find((item) => {
      if (item.cust_site_id === key) {
        return true
      }
      return false
    })
    if (key === '0') {
      // 判断是不是装车磅单
      const { poundInfoByUpload } = this.props.order
      this.setState({
        cust_site_id: key,
        num: poundInfoByUpload.goods.load_quantity,
        time: poundInfoByUpload.goods.real_load_time ? moment(poundInfoByUpload.goods.real_load_time) : '',
        file: null,
        mainName: poundInfoByUpload.goods.goods_name,
        mainContact: poundInfoByUpload.goods.contact,
        mainContactPhone: poundInfoByUpload.goods.contact_phone,
        imageUrl: poundInfoByUpload.goods.load_pic_url,
      })
    } else {
      // 卸车磅单
      this.setState({
        cust_site_id: key,
        num: site.unload_quantity,
        time: site.unload_time ? moment(site.unload_time) : null,
        file: site.unload_pic_url ? '' : null,
        mainName: site.site_name,
        mainContact: site.contact,
        mainContactPhone: site.contact_phone,
        imageUrl: site.unload_pic_url,
      })
    }

  }

  render() {
    const { visible, imageUrl, fileList } = this.state
    const { children, readOnly } = this.props
    const uploadButton = (<div>
      <IconFont type="icon-icon-test110" className='upload-icon' />
      <div className="ant-upload-text"
           style={{ marginTop: 10, fontSize: '1.125rem' }}>点击上传{this.props.uploading ? '装' : '卸'}车磅单
      </div>
    </div>)
    const sites = JSON.parse(this.props.sites)
    sites.unshift({})
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title={`上传${this.props.uploading ? '装' : '卸'}车磅单`}
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
          width={840}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{ padding: 0 }}>
          <div style={{ padding: '0 12px', position: 'relative' }}>
            <Tabs defaultActiveKey={sites[this.props.current_site] ? sites[this.props.current_site].cust_site_id : '0'}
                  onChange={this.changePane}>
              {this.mapTabPane()}
            </Tabs>
            <div className='tabs-bottom-line' />
            <div style={{ padding: 8, marginTop: 15 }}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                disabled={readOnly}
                fileList={fileList}
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                customRequest={this.customRequest}
              >
                {imageUrl ? <div className={styles['modify-image-content']}>
                  <div className={styles['modify-image']} style={{ marginLeft: readOnly ? 0 : '-34px' }}>
                    <ImagePreView imgUrl={imageUrl}>
                      <IconFont type='icon-icon-test12' />
                    </ImagePreView>
                    {readOnly ? null :
                      <IconFont type='icon-icon-test11' style={{ marginLeft: 20 }} onClick={this.removeImage} />}
                  </div>
                  <img src={imageUrl} alt="avatar" width='780' height='280' style={{ opacity: 0.5 }} />
                </div> : uploadButton}
              </Upload>
            </div>
            <Row type='flex' justify='end'>
              <Col style={{ padding: '12px 8px 15px' }}>
                {readOnly ? <>
                    <Button type='primary' style={{ marginRight: 20 }} onClick={this.hideModal}>关闭</Button></> :
                  <>
                    <Button type='primary' style={{ marginRight: 20 }} onClick={this.submit}>确认</Button>
                    <Button className='red-btn' onClick={this.hideModal}>取消</Button>
                  </>}
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}

export default UpLoadPoundList
