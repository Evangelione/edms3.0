import React, { Component } from 'react'
import { Row, Col, Button, Popconfirm, Modal, Form, Input, Pagination, Icon, Upload, message, Empty } from 'antd'
import { connect } from 'dva'
import { IconFont, IP } from '@/common/constants'
import withRouter from 'umi/withRouter'
import styles from '../../index.less'
import { toFixed } from '@/utils/Math'


// 车队列表页面
// 链接model
@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
// props注入form对象
@Form.create()
// props注入路由等参数以便后续使用
@withRouter
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managementStatus: false,
      modalVisible: false,
      modalVisible2: false,

      modalTitle: '',
      modalLabel1: '',
      modalFiled1: 'name',
      modalLabel2: '',
      modalFiled2: 'mobile',

      labelList: [{
        modalTitle: '司机',
        modalLabel1: '司机名字',
        modalFiled1: 'name',
        modalLabel2: '联系方式',
        modalFiled2: 'mobile',
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

      insertStatus: false,
      insertFleet: {
        name: '',
        mobile: '',
        car_head_code: '',
        imei: '',
        car_body_code: '',
        car_load: '',
      },
      modifyId: null,
    }
  }

  componentWillMount() {
    this.fetchFleetList()
  }

  fetchFleetList = (page = 1) => {
    this.props.dispatch({
      type: 'logistics/fetchFleetList',
      payload: {
        page,
        id: this.props.match.params.LogisticsDetail,
      },
    })
  }

  openModal = (arr, obj) => {
    this.setState({
      modalVisible: true,
      modalTitle: arr.type + arr.modalTitle,
      modalLabel1: arr.modalLabel1,
      modalFiled1: arr.modalFiled1,
      modalLabel2: arr.modalLabel2,
      modalFiled2: arr.modalFiled2,
    }, () => {
      if (obj) {
        this.props.form.setFieldsValue({
          [arr.modalFiled1]: obj[arr.modalFiled1],
          [arr.modalFiled2]: obj[arr.modalFiled2],
        })
        this.setState({
          modifyId: obj.id,
        })
      } else {
        this.props.form.setFieldsValue({
          [arr.modalFiled1]: this.state.insertFleet[arr.modalFiled1],
          [arr.modalFiled2]: this.state.insertFleet[arr.modalFiled2],
        })
      }
    })
  }

  closeModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
  }

  // 新增车队
  insertFleet = () => {
    let form = this.state.insertFleet
    if (form.name === '') {
      message.error('司机不能为空')
      return false
    } else if (form.car_head_code === '') {
      message.error('车头不能为空')
      return false
    }
    form.id = this.props.match.params.LogisticsDetail
    this.props.dispatch({
      type: 'logistics/insertFleet',
      payload: {
        form: form,
      },
    }).then(() => {
      this.setState({
        insertStatus: false,
        insertFleet: {
          name: '',
          mobile: '',
          car_head_code: '',
          imei: '',
          car_body_code: '',
          car_load: '',
        },
      })
      this.fetchFleetList()
    })
  }

  // 删除车队
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

  // 保存当前操作的  司机/车头/车挂信息到组件state， 方便后续统一提交
  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { insertFleet, modalFiled1, modalFiled2, insertStatus } = this.state
        // values.id = this.props.match.params.LogisticsDetail
        // this.props.dispatch({
        //   type: 'logistics/insertFleet',
        //   payload: {
        //     form: values,
        //   },
        // })
        if (insertStatus) {
          this.setState({
            insertFleet: {
              ...insertFleet,
              [modalFiled1]: values[modalFiled1],
              [modalFiled2]: values[modalFiled2],
            },
          })
          this.closeModal()
        } else {
          values.id = this.state.modifyId
          console.log(values)
          this.props.dispatch({
            type: 'logistics/updateFleet',
            payload: {
              form: values,
            },
          }).then(() => {
            this.closeModal()
            this.fetchFleetList(this.props.fleetPage)
          })
        }
      }
    })
  }

  parseNumber = (filed, precision, e) => {
    if (filed !== 'car_load') {
      return false
    }
    let val = e.target.value
    if (val === '') {
      return false
    }
    isNaN(val) && (val = 0)
    let num = toFixed(val, precision)
    this.props.form.setFieldsValue({
      [filed]: num,
    })
  }

  // 取消新增操作，重置参数
  cancelInsert = () => {
    this.setState({
      insertStatus: false,
      insertFleet: {
        name: '',
        mobile: '',
        car_head_code: '',
        imei: '',
        car_body_code: '',
        car_load: '',
      },
    })
  }

  deleteInsertCarBody = () => {
    this.setState({
      insertFleet: {
        ...this.state.insertFleet,
        car_body_code: '',
        car_load: '',
      },
    })
  }

  deleteFleetCarBody = (id, car_body_id) => {
    this.props.dispatch({
      type: 'logistics/deleteFleetCarBody',
      payload: {
        id,
        car_body_id,
      },
    }).then(() => {
      this.fetchFleetList(this.props.fleetPage)
    })
  }

  // 渲染新增车队item方法
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
              {insertFleet.name === '' ?
                <div style={{ cursor: 'pointer' }}
                     onClick={this.openModal.bind(null, { type: '新增', ...labelList[0] }, false)}>
                  <IconFont type='icon-icon-test' />
                  <span style={{ marginLeft: 20 }} className='font-gray-color'>新增司机</span>
                </div>
                :
                <>
                  <div>{insertFleet.name}</div>
                  <div>{insertFleet.mobile}</div>
                </>}
            </div>
            {insertFleet.name === '' ?
              null
              :
              <div className={styles['hover-box']}>
                <Button type='primary'
                        onClick={this.openModal.bind(null, { type: '编辑', ...labelList[0] }, false)}>编辑</Button>
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
                <div style={{ cursor: 'pointer' }}
                     onClick={this.openModal.bind(null, { type: '新增', ...labelList[1] }, false)}>
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
                <Button type='primary'
                        onClick={this.openModal.bind(null, { type: '编辑', ...labelList[1] }, false)}>编辑</Button>
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
                <div style={{ cursor: 'pointer' }}
                     onClick={this.openModal.bind(null, { type: '新增', ...labelList[2] }, false)}>
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
                <Button type='primary'
                        onClick={this.openModal.bind(null, { type: '编辑', ...labelList[2] }, false)}>编辑</Button>
                <Popconfirm title='是否确认删除车挂？' okType='danger' onConfirm={this.deleteInsertCarBody}
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

  // 渲染车队列表方法
  mapItem = () => {
    const { managementStatus, labelList } = this.state
    return this.props.logistics.fleetList.length ? this.props.logistics.fleetList.map((value, index) => (
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
              {value.name ? <>
                <div className={styles['box-right']}>
                  <div>{value.name}</div>
                  <div>{value.mobile}</div>
                </div>
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[0] }, { ...value })}>编辑</Button>
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
                    <span>{value.imei}</span>
                  </div>
                </div>
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[1] }, { ...value })}>编辑</Button>
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
                          onClick={this.openModal.bind(null, { type: '编辑', ...labelList[2] }, { ...value })}>编辑</Button>
                  <Popconfirm title='是否确认删除车挂？' okType='danger'
                              onConfirm={this.deleteFleetCarBody.bind(null, value.id, value.car_body_id)}
                              icon={<Icon style={{ color: 'red' }} type="exclamation-circle" />}>
                    <Button className='red-btn'>删除</Button>
                  </Popconfirm>
                </div>
              </> : <div style={{ width: '100%', textAlign: 'center' }}>
                暂无
                <div className={styles['hover-box']}>
                  <Button type='primary'
                          onClick={() => this.child.openModal(value.id)}>添加</Button>
                </div>
              </div>}
            </div>
          </Col>
        </Col>
      </Col>
    )) : <Empty />
  }

  // 上传excel
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
    const { form, loading, logistics: { fleetPage, fleetTotal } } = this.props
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
                action={`${IP}/index/driver/car-import`}
                customRequest={this.upLoadExcel}
                showUploadList={false}
              >
                <Button disabled={true} loading={loading}>导入车队</Button>
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
                  action={`${IP}/index/driver/car-import`}
                  customRequest={this.upLoadExcel}
                  showUploadList={false}
                >
                  <Button disabled={true} loading={loading}>导入车队</Button>
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
                  action={`${IP}/index/driver/car-import`}
                  customRequest={this.upLoadExcel}
                  showUploadList={false}
                >
                  <Button type='primary' loading={loading}>导入车队</Button>
                </Upload>
              </>
          }

        </div>
        <Row>
          {insertStatus ? this.renderInsertItem() : null}
          {this.mapItem()}
        </Row>
        {fleetTotal - 0 > 0 && <div style={{ textAlign: 'center', marginTop: 15 }}>
          <Pagination current={fleetPage} total={fleetTotal} onChange={this.fetchFleetList} />
        </div>}

        <Modal
          title={modalTitle}
          visible={this.state.modalVisible}
          footer={null}
          width={600}
          destroyOnClose={true}
          onCancel={this.closeModal}
          maskClosable={false}
        >
          <Form>
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
                rules: [{ required: !(modalFiled2=='imei') }],
              })(
                <Input placeholder={`请输入${modalLabel2}`} onBlur={this.parseNumber.bind(null, `${modalFiled2}`, 3)}
                       addonAfter={modalLabel2 === '载重数量' ? '吨' : null} />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" loading={loading} onClick={this.handleSubmit}>确定</Button>
              <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                      onClick={this.closeModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        <InsertCarBodyModal wrappedComponentRef={_ => this.child = _} fetchFleetList={this.fetchFleetList}
                            fleetPage={fleetPage} />
      </div>
    )
  }
}

@connect()
@Form.create()
class InsertCarBodyModal extends Component {
  state = {
    modalVisible: false,
    id: null,
  }

  openModal = (id) => {
    this.setState({
      modalVisible: true,
      id,
    })
  }

  closeModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
      id: null,
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'logistics/updateFleet',
          payload: {
            form: {
              car_body_code: values.car_body_code,
              car_load: values.car_load,
              id: this.state.id,
            },
          },
        }).then(() => {
          this.closeModal()
          this.props.fetchFleetList(this.props.fleetPage)
        })
      }
    })
  }

  parseNumber = (filed, precision, e) => {
    let val = e.target.value
    if (val === '') {
      return false
    }
    isNaN(val) && (val = 0)
    let num = toFixed(val, precision)
    this.props.form.setFieldsValue({
      [filed]: num,
    })
  }

  render() {
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
      <Modal
        title='添加车挂'
        visible={this.state.modalVisible}
        footer={null}
        width={600}
        destroyOnClose={true}
        onCancel={this.closeModal}
        maskClosable={false}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label='车牌号码'
          >
            {getFieldDecorator('car_body_code', {
              rules: [{ required: true }],
            })(
              <Input placeholder={`请输入车牌号码`} />,
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label='载重数量'
          >
            {getFieldDecorator('car_load', {
              rules: [{ required: true }],
            })(
              <Input placeholder={`请输入载重数量`} onBlur={this.parseNumber.bind(null, 'car_load', 3)} addonAfter='吨' />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
            <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                    onClick={this.closeModal}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Index
