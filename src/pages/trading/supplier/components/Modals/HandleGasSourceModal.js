import React, { Component } from 'react'
import {
  Modal,
  Input,
  Cascader,
  Button,
  Form,
  message,
  Upload,
} from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { IP } from '@/common/constants'

@connect(({ global, supplier, loading }) => ({
  global,
  supplier,
  loading: loading.models.supplier,
}))
@Form.create()
@withRouter
class HandleGasSourceModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      fileList: [],
      file: null,
    }
  }

  openInsertModal = () => {
    if (this.state.modalVisible) {
      return false
    }
    this.setState({
      modalVisible: true,
    }, () => {
      if (this.props.modify) {
        this.inquire()
      } else {
        this.props.dispatch({
          type: 'global/inquireCascadeOptions',
          payload: {
            module: 'goods',
          },
        })
      }
    })
  }

  closeInsertModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      modalVisible: false,
    })
    this.props.form.resetFields()
  }

  inquire = () => {
    this.props.dispatch({
      type: 'supplier/inquireGasSourceInfoById',
      payload: {
        id: this.props.modify,
      },
    }).then(() => {
      const { currentGasSourceInfo } = this.props.supplier
      this.props.dispatch({
        type: 'global/inquireCascadeOptionsAll',
        payload: {
          module: 'supp',
          province: currentGasSourceInfo.province,
          city: currentGasSourceInfo.city,
        },
      })
      this.setState({
        fileList: [{
          uid: '1',
          name: currentGasSourceInfo.filename,
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: currentGasSourceInfo.goods_report_url,
        }],
      })
    })
  }

  customRequest = (file) => {
    const { currentGasSourceInfo } = this.props.supplier
    console.log(currentGasSourceInfo)
    this.props.dispatch({
      type: 'supplier/postReport',
      payload: {
        file,
        id: currentGasSourceInfo.id,
      },
    }).then(() => {
      this.setState({
        fileList: [{
          ...this.state.fileList,
          uid: '1',
          name: this.props.supplier.file_name,
          url: this.props.supplier.report_url,
        }],
      })
    })
  }

  beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf' || 'image/jpeg' || 'image/png'
    if (!isPDF) {
      message.error('只支持pdf,jpg,png文件上传')
      return false
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('文件只能小于5M')
      return false
    }
    this.setState({
      file,
    })
    return false
  }

  onFileChange = ({ file, fileList }) => {
    // if (file.status !== 'uploading') {
    //   console.log(file, fileList)
    // } else {
    //
    // }
    fileList = fileList.slice(-1)
    this.setState({
      fileList,
    })
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'global/inquireCascadeOptions',
      payload: {
        module: 'supp',
        district_name: targetOption.value,
        targetOption,
      },
    }).then(() => {
      // targetOption.loading = false
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {
          province: values.area_arr[0],
          city: values.area_arr[1],
          area: values.area_arr[2] || '',
        }
        delete values.area_arr
        values.supp_id = this.props.match.params.SupplierDetail
        Object.assign(values, obj)
        let { modify } = this.props
        let effect = modify ? 'updateGasSourceInfo' : 'insertGasSource'
        modify && (values.id = modify)
        values.file = this.state.file
        console.log(values)
        debugger
        this.props.dispatch({
          type: `supplier/${effect}`,
          payload: {
            form: values,
          },
        }).then(() => {
          this.closeInsertModal()
          this.props.dispatch({
            type: 'supplier/fetchGasSourceList',
            payload: {
              supp_id: this.props.match.params.SupplierDetail,
            },
          })
          this.setState({
            fileList: [],
            file: null,
          })
        })
      }
    })
  }

  render() {
    const { modalVisible, fileList } = this.state
    const { children, modify, global, supplier, form } = this.props
    const { currentGasSourceInfo } = supplier
    const { cascadeOptions } = global
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
      <div style={{ display: 'inline-block' }} onClick={this.openInsertModal}>
        {children}
        <Modal visible={modalVisible} title={modify ? '编辑气源' : '新增气源'} width={600} bodyStyle={{ padding: '24px 60px' }}
               footer={null} onCancel={this.closeInsertModal}
               maskClosable={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="气源全称"
            >
              {modify ? <span
                style={{ marginLeft: 10 }}>{currentGasSourceInfo.goods_full_name}</span> : getFieldDecorator('goods_full_name', {
                rules: [{ required: true }],
              })(
                <Input placeholder='请输入气源全称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="气源简称"
            >
              {getFieldDecorator('goods_name', {
                rules: [{ required: true }],
                initialValue: modify ? currentGasSourceInfo.goods_name : '',
              })(
                <Input placeholder='请输入气源简称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="气源产地"
            >
              {getFieldDecorator('goods_place', {
                rules: [{ required: true }],
                initialValue: modify ? currentGasSourceInfo.goods_place : '',
              })(
                <Input placeholder='请输入气源简称' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="气质报告"
            >
              {getFieldDecorator('file', {
                rules: [{ required: false }],
              })(
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Upload
                    accept='.jpg,.png,.pdf'
                    name='file'
                    action={`${IP}/index/goods/report`}
                    fileList={fileList}
                    // customRequest={this.customRequest}
                    beforeUpload={this.beforeUpload}
                    onChange={this.onFileChange}>
                    <Button type='primary'>选择文件</Button>
                  </Upload>
                </div>,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="省市区县"
            >
              {getFieldDecorator('area_arr', {
                rules: [{ required: true }],
                initialValue: modify ? [currentGasSourceInfo.province, currentGasSourceInfo.city, currentGasSourceInfo.area] : '',
              })(
                <Cascader options={cascadeOptions} loadData={this.loadData} placeholder='请选择省市区县' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('goods_address', {
                rules: [{ required: true }],
                initialValue: modify ? currentGasSourceInfo.goods_address : '',
              })(
                <Input placeholder='请输入详细地址' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('contact', {
                rules: [{ required: true }],
                initialValue: modify ? currentGasSourceInfo.contact : '',
              })(
                <Input placeholder='请输入联系人' />,
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系人电话"
            >
              {getFieldDecorator('contact_phone', {
                rules: [{ required: true }],
                initialValue: modify ? currentGasSourceInfo.contact_phone : '',
              })(
                <Input placeholder='请输入联系人电话' />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button className='red-btn' style={{ marginLeft: 20, marginTop: 20 }}
                      onClick={this.closeInsertModal}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default HandleGasSourceModal
