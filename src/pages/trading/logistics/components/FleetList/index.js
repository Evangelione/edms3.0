import React, { Component } from 'react'
import { Row, Col, Button, Popconfirm, Modal, Form, Input, Pagination, Icon, Upload } from 'antd'
import { connect } from 'dva'
import { IconFont, IP } from '@/common/constants'
import withRouter from 'umi/withRouter'
import styles from '../../index.less'

@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
@Form.create()
@withRouter
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managementStatus: false,
      modalVisible: false,
      labelList: [{
        modalTitle: '司机',
        modalLabel1: '司机名字',
        modalFiled1: 'driver_name',
        modalLabel2: '联系方式',
        modalFiled2: 'driver_mobile',
      }, {
        modalTitle: '车头',
        modalLabel1: '车牌号码',
        modalFiled1: 'car_head_code',
        modalLabel2: 'GPS串号',
        modalFiled2: 'imei',
      }, {
        modalTitle: '车挂',
        modalLabel1: '车牌号码',
        modalFiled1: 'car_body_code',
        modalLabel2: '载重数量',
        modalFiled2: 'car_load',
      }],
      modalTitle: '',
      modalLabel1: '',
      modalFiled1: 'driver_name',
      modalLabel2: '',
      modalFiled2: 'driver_mobile',
      insertStatus: false,
      insertFleet: {
        driver_name: '',
        driver_mobile: '',
        car_head_code: '',
        imei: '',
        car_body_code: '',
        car_load: '',
      },
    }
  }

  componentWillMount() {
    this.fetchFleetList()
  }

  fetchFleetList = () => {
    this.props.dispatch({
      type: 'logistics/fetchFleetList',
      payload: {
        id: this.props.match.params.LogisticsDetail,
      },
    })
  }

  openModal = (arr) => {
    this.setState({
      modalVisible: true,
      modalTitle: arr.type + arr.modalTitle,
      modalLabel1: arr.modalLabel1,
      modalFiled1: arr.modalFiled1,
      modalLabel2: arr.modalLabel2,
      modalFiled2: arr.modalFiled2,
    })
  }

  closeModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
  }

  insertFleet = () => {
    let form = this.state.insertFleet
    form.id = this.props.match.params.LogisticsDetail
    this.props.dispatch({
      type: 'logistics/insertFleet',
      payload: {
        form: form,
      },
    }).then(() => {
      this.setState({
        insertStatus: false,
      })
      this.fetchFleetList()
    })
  }

  deleteFleet = (id) => {
    this.props.dispatch({
      type: 'logistics/deleteFleet',
      payload: {
        id,
      },
    }).then(() => {
      this.forceUpdate()
      this.props.dispatch({
        type: 'logistics/fetchFleetList',
        payload: {
          id: this.props.match.params.LogisticsDetail,
        },
      })
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { insertFleet, modalFiled1, modalFiled2 } = this.state
        // values.id = this.props.match.params.LogisticsDetail
        // this.props.dispatch({
        //   type: 'logistics/insertFleet',
        //   payload: {
        //     form: values,
        //   },
        // })
        this.setState({
          insertFleet: {
            ...insertFleet,
            [modalFiled1]: values[modalFiled1],
            [modalFiled2]: values[modalFiled2],
          },
        })
        this.closeModal()
      }
    })
  }

  cancelInsert = () => {
    this.setState({
      insertStatus: false,
      insertFleet: {
        driver_name: '',
        driver_mobile: '',
        car_head_code: '',
        imei: '',
        car_body_code: '',
        car_load: '',
      },
    })
  }

  renderInsertItem = () => {
    const { labelList, insertFleet } = this.state
    return <Col span={24} xxl={12} style={{ position: 'relative' }}>
      <Col span={22} className={styles['fleet-item']}>
        <Col span={7}>
          <div className={styles['item-box']}>
            <div className={styles['box-left']}>
              <img src={require('@/assets/image/sj_70_55.png')} alt="" />
            </div>
            <div className={styles['box-right']}>
              {insertFleet.driver_name === '' ?
                <div style={{ cursor: 'pointer' }} onClick={this.openModal.bind(null, { type: '新增', ...labelList[0] })}>
                  <IconFont type='icon-icon-test' />
                  <span style={{ marginLeft: 20 }} className='font-gray-color'>新增司机</span>
                </div>
                :
                <>
                  <div>{insertFleet.driver_name}</div>
                  <div>{insertFleet.driver_mobile}</div>
                </>}
            </div>
            {insertFleet.driver_name === '' ?
              null
              :
              <div className={styles['hover-box']}>
                <Button type='primary' onClick={this.openModal.bind(null, { type: '编辑', ...labelList[0] })}>编辑</Button>
                <Popconfirm title='是否确认删除司机？' okType='danger'
                            icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                  <Button className='red-btn'>删除</Button>
                </Popconfirm>
              </div>}
          </div>
        </Col>
        <Col span={1}>
          <div style={{ display: 'flex', alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <IconFont type='icon-guanlian' className={styles['iconFont']} />
          </div>
        </Col>
        <Col span={8}>
          <div className={styles['item-box']}>
            <div className={styles['box-left']}>
              <img src={require('@/assets/image/ct_70_55.png')} alt="" />
            </div>
            <div className={styles['box-right']}>
              {insertFleet.car_head_code === '' ?
                <div style={{ cursor: 'pointer' }} onClick={this.openModal.bind(null, { type: '新增', ...labelList[1] })}>
                  <IconFont type='icon-icon-test' />
                  <span style={{ marginLeft: 20 }} className='font-gray-color'>新增车头</span>
                </div>
                :
                <>
                  <div>{insertFleet.car_head_code}</div>
                  <div>
                    <span className={styles['box-right-title']}>串号</span>
                    <span>{insertFleet.imei}</span>
                  </div>
                </>}
            </div>
            {insertFleet.car_head_code === '' ?
              null
              :
              <div className={styles['hover-box']}>
                <Button type='primary' onClick={this.openModal.bind(null, { type: '编辑', ...labelList[1] })}>编辑</Button>
                <Popconfirm title='是否确认删除车头？' okType='danger'
                            icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                  <Button className='red-btn'>删除</Button>
                </Popconfirm>
              </div>}
          </div>
        </Col>
        <Col span={1}>
          <div style={{ display: 'flex', alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <IconFont type='icon-guanlian' className={styles['iconFont']} />
          </div>
        </Col>
        <Col span={7}>
          <div className={styles['item-box']}>
            <div className={styles['box-left']}>
              <img src={require('@/assets/image/cg_70_55.png')} alt="" />
            </div>
            <div className={styles['box-right']}>
              {insertFleet.car_body_code === '' ?
                <div style={{ cursor: 'pointer' }} onClick={this.openModal.bind(null, { type: '新增', ...labelList[2] })}>
                  <IconFont type='icon-icon-test' />
                  <span style={{ marginLeft: 20 }} className='font-gray-color'>新增车挂</span>
                </div>
                :
                <>
                  <div>{insertFleet.car_body_code}</div>
                  <div>
                    <span className={styles['box-right-title']}>载重</span>
                    <span>{insertFleet.car_load}</span>
                  </div>
                </>}
            </div>
            {insertFleet.car_body_code === '' ?
              null
              :
              <div className={styles['hover-box']}>
                <Button type='primary' onClick={this.openModal.bind(null, { type: '编辑', ...labelList[2] })}>编辑</Button>
                <Popconfirm title='是否确认删除车挂？' okType='danger'
                            icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                  <Button className='red-btn'>删除</Button>
                </Popconfirm>
              </div>}
          </div>
        </Col>
      </Col>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 38,
        right: 38,
      }}>
        <IconFont type='icon-icon--1' className={styles.confirmBtn} onClick={this.insertFleet} />
        <Popconfirm title='是否取消新增操作？' okType='danger' onConfirm={this.cancelInsert}>
          <IconFont type='icon-icon--' className={styles.cancelBtn} />
        </Popconfirm>
      </div>
    </Col>
  }

  mapItem = () => {
    const { managementStatus, labelList } = this.state
    return this.props.logistics.fleetList.map((value, index) => (
      <Col span={24} xxl={12} key={index}>
        <Col span={22} className={styles['fleet-item']}>
          <Col span={24} style={managementStatus ? { display: 'flex' } : { display: 'none' }}
               className={styles['fleet-item-modify']}>
            <Popconfirm title='是否确认删除此条记录？' okType='danger' onConfirm={this.deleteFleet.bind(null, value.id)}
                        icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
              <Button className='red-btn'>删除</Button>
            </Popconfirm>
          </Col>
          <Col span={7}>
            <div className={styles['item-box']}>
              <div className={styles['box-left']}>
                <img src={require('@/assets/image/sj_70_55.png')} alt="" />
              </div>
              {value.remark ? <>
                <div className={styles['box-right']}>
                  <div>{value.remark}</div>
                  <div>{value.mobile}</div>
                </div>
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[0] })}>编辑</Button>
                  <Popconfirm title='是否确认删除司机？' okType='danger'
                              icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                    <Button className='red-btn'>删除</Button>
                  </Popconfirm>
                </div>
              </> : <div style={{ width: '100%', textAlign: 'center' }}>暂无</div>}
            </div>
          </Col>
          <Col span={1}>
            <div style={{ display: 'flex', alignItems: 'center', height: 100, justifyContent: 'center' }}>
              <IconFont type='icon-guanlian' className={styles['iconFont']} />
            </div>
          </Col>
          <Col span={8}>
            <div className={styles['item-box']}>
              <div className={styles['box-left']}>
                <img src={require('@/assets/image/ct_70_55.png')} alt="" />
              </div>
              {value.car_head_code ? <>
                <div className={styles['box-right']}>
                  <div>{value.car_head_code}</div>
                  <div>
                    <span className={styles['box-right-title']}>串号</span>
                    <span>{value.car_head_id}</span>
                  </div>
                </div>
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[1] })}>编辑</Button>
                  <Popconfirm title='是否确认删除车头？' okType='danger'
                              icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                    <Button className='red-btn'>删除</Button>
                  </Popconfirm>
                </div>
              </> : <div style={{ width: '100%', textAlign: 'center' }}>暂无</div>}
            </div>
          </Col>
          <Col span={1}>
            <div style={{ display: 'flex', alignItems: 'center', height: 100, justifyContent: 'center' }}>
              <IconFont type='icon-guanlian' className={styles['iconFont']} />
            </div>
          </Col>
          <Col span={7}>
            <div className={styles['item-box']}>
              <div className={styles['box-left']}>
                <img src={require('@/assets/image/cg_70_55.png')} alt="" />
              </div>
              {value.car_body_code ? <>
                <div className={styles['box-right']}>
                  <div>{value.car_body_code}</div>
                  <div>
                    <span className={styles['box-right-title']}>载重</span>
                    <span>{value.car_load}</span>
                  </div>
                </div>
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[2] })}>编辑</Button>
                  <Popconfirm title='是否确认删除车挂？' okType='danger'
                              icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                    <Button className='red-btn'>删除</Button>
                  </Popconfirm>
                </div>
              </> : <div style={{ width: '100%', textAlign: 'center' }}>暂无</div>}
            </div>
          </Col>
        </Col>
      </Col>
    ))
  }

  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'logistics/upLoadExcel',
      payload: {
        file,
      },
    }).then(() => {
      this.fetchFleetList()
    })
  }

  render() {
    const { managementStatus, modalTitle, modalLabel1, modalFiled1, modalLabel2, modalFiled2, insertStatus } = this.state
    const { form, loading } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
      <div style={{ padding: '0 30px', marginTop: '-15px' }}>
        <div className='tabs-toolbar'>
          {managementStatus ?
            <>
              <Button className='yellow-btn' style={{ marginRight: 10 }}
                      onClick={() => this.setState({ managementStatus: !managementStatus })}>完成</Button>
              <Button disabled={true} style={{ marginRight: 10 }}>新增车队</Button>
              <Upload
                accept='.xls,.xlsx'
                name='excel'
                action={`${IP}/index/driver/driver-car-import`}
                customRequest={this.upLoadExcel}
                showUploadList={false}
              >
                <Button disabled={true}>导入车队</Button>
              </Upload>
            </>
            :
            insertStatus ?
              <>
                <Button disabled={true} style={{ marginRight: 10 }}>管理车队</Button>
                <Button disabled={true} style={{ marginRight: 10 }}>新增车队</Button>
                <Upload
                  accept='.xls,.xlsx'
                  name='excel'
                  action={`${IP}/index/driver/driver-car-import`}
                  customRequest={this.upLoadExcel}
                  showUploadList={false}
                >
                  <Button disabled={true}>导入车队</Button>
                </Upload>
              </>
              :
              <>
                <Button type='primary' style={{ marginRight: 10 }}
                        onClick={() => this.setState({ managementStatus: !managementStatus })}>管理车队</Button>
                <Button type='primary' style={{ marginRight: 10 }}
                        onClick={() => this.setState({ insertStatus: true })}>新增车队</Button>
                <Upload
                  accept='.xls,.xlsx'
                  name='excel'
                  action={`${IP}/index/driver/driver-car-import`}
                  customRequest={this.upLoadExcel}
                  showUploadList={false}
                >
                  <Button type='primary'>导入车队</Button>
                </Upload>
              </>
          }

        </div>
        <Row>
          {insertStatus ? this.renderInsertItem() : null}
          {this.mapItem()}
        </Row>
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          <Pagination />
        </div>
        <Modal
          title={modalTitle}
          visible={this.state.modalVisible}
          footer={null}
          width={600}
          destroyOnClose={true}
          onCancel={this.closeModal}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label={modalLabel1}
            >
              {getFieldDecorator(`${modalFiled1}`, {
                rules: [{ required: true }],
              })(
                <Input placeholder={`请输入${modalLabel1}`} />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={modalLabel2}
            >
              {getFieldDecorator(`${modalFiled2}`, {
                rules: [{ required: true }],
              })(
                <Input placeholder={`请输入${modalLabel2}`} />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
              <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                      onClick={this.closeModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Index
