import React, { Component } from 'react'
import {
  Button,
  Input,
  Pagination,
  Popover,
  Upload,
  Empty,
} from 'antd'
import { connect } from 'dva'
import HandleSupplierModal from './components/Modals/HandleSupplierModal'
import router from 'umi/router'
import { IP, PAGE_LIMIT } from '@/common/constants'
import { downLoad } from '@/utils/downLoadStencil'

const Search = Input.Search

@connect(({ supplier, loading }) => ({
  supplier,
  loading: loading.models.supplier,
}))
class Index extends Component {
  componentWillMount() {
    this.fetchSupplierList()
  }

  fetchSupplierList = () => {
    this.props.dispatch({
      type: 'supplier/fetchSupplierList',
      payload: {},
    })
  }

  searchSupplierList = (value) => {
    this.props.dispatch({
      type: 'supplier/fetchSupplierList',
      payload: {
        supp_name: value,
      },
    })
  }

  changeSupplierName = (e) => {
    this.props.dispatch({
      type: 'supplier/save',
      payload: {
        supp_name: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchSupplierList('')
    }
  }

  pageChange = (page) => {
    this.props.dispatch({
      type: 'supplier/fetchSupplierList',
      payload: {
        page,
        supp_name: this.props.supplier.supp_name,
      },
    })
  }

  mapItem = () => {
    const { supplierList } = this.props.supplier
    return supplierList.length ? supplierList.map((value, index) => (
      <div className='list-item' key={value.id}
           onClick={this.goSupplierDetail.bind(null, value.id, value.company_name)}>
        <div className='serial-num'>{index + 1}</div>
        <div className='company-box'>
          <div>
            <img src={require('@/assets/image/Bitmap.png')} alt="" />
          </div>
          <div className='company-name'>{value.company_name}</div>
        </div>
        <div className='contact-box'>
          <div className='contact-name'>{value.user}</div>
          <div className='contact-phone'>{value.phone}</div>
        </div>
        <div className='sales-box'>
          <div>
            <div>销售额</div>
            <div className='sales-price'>{value.xiaoshoue} 元</div>
          </div>
          <div>
            <div>销售量</div>
            <div className='sales-num'>{value.xiaoshouliang} 吨</div>
          </div>
        </div>
      </div>
    )) : <Empty />
  }

  goSupplierDetail = (id, company) => {
    router.push(this.props.location.pathname + `/${id}?company=${company}`)
  }

  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'supplier/upLoadExcel',
      payload: {
        file,
      },
    }).then(() => {
      this.fetchSupplierList()
    })
  }

  render() {
    const { loading } = this.props
    const { supplierPage, supplierTotal, supp_name } = this.props.supplier
    const popTitle = <div>
      导入信息
    </div>
    const popContent = <>
      <div>
        <p>1. 上传信息文件时，请使用excel文件，支持文件格式为.xls或者.xlsx；</p>
        <p>2. 信息文件内容，请严格按照模板样式填写，红色的字段必须填写， <br />其余字段若没有则可以不填；</p>
        <p>3. 导入信息时，如果和已有的信息相同，则导入后自动更新其信息；</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button className='light-btn' onClick={downLoad.bind(null, 'supplier')}>下载供应商模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/supp/import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{ marginLeft: 20 }} loading={loading}>导入供应商</Button>
        </Upload>
        <Button className='light-btn' onClick={downLoad.bind(null, 'gas')}
                style={{ marginLeft: 20 }}>下载气源模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/goods/goods-import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{ marginLeft: 20 }} loading={loading}>导入气源</Button>
        </Upload>
      </div>
    </>
    return (
      <>
        <div className='toolbar'>
          <HandleSupplierModal>
            <Button type='primary'>新增供应商</Button>
          </HandleSupplierModal>
          <Popover placement="bottomLeft" title={popTitle} content={popContent}
                   trigger="click">
            <Button type='primary' style={{ marginLeft: 10 }}>导入信息</Button>
          </Popover>
          <Search
            placeholder="请输入供应商名进行查找"
            enterButton="查找"
            value={supp_name}
            onChange={this.changeSupplierName}
            onSearch={this.searchSupplierList}
            style={{ width: '25rem', height: '2.5rem', float: 'right', marginTop: 19 }}
          />
        </div>
        <div style={{ padding: 24 }}>
          {this.mapItem()}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Pagination current={supplierPage} total={supplierTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default Index
