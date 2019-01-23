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
import HandleClientModal from './components/Modals/HandleClientModal'
import router from 'umi/router'
import { IP, PAGE_LIMIT } from '@/common/constants'

const Search = Input.Search

@connect(({client, loading}) => ({
  client,
  loading: loading.models.client,
}))
class Index extends Component {
  componentWillMount() {
    this.fetchClientList()
  }

  fetchClientList = () => {
    this.props.dispatch({
      type: 'client/fetchClientList',
      payload: {},
    })
  }

  searchClientList = (value) => {
    this.props.dispatch({
      type: 'client/fetchClientList',
      payload: {
        customer_name: value,
      },
    })
  }

  changeCustomerName = (e) => {
    this.props.dispatch({
      type: 'client/save',
      payload: {
        customer_name: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchClientList('')
    }
  }

  pageChange = (page) => {
    this.props.dispatch({
      type: 'client/fetchClientList',
      payload: {
        page,
        customer_name: this.props.client.customer_name,
      },
    })
  }

  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'client/upLoadExcel',
      payload: {
        file,
      },
    }).then(() => {
      this.fetchClientList()
    })
  }

  mapItem = () => {
    const {clientList} = this.props.client
    return clientList.length ? clientList.map((value, index) => (
      <div className='list-item' key={value.id}
           onClick={this.goClientDetail.bind(null, value.id, value.company_name)}>
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

  goClientDetail = (id, company) => {
    router.push(this.props.location.pathname + `/${id}?company=${company}`)
  }

  render() {
    const {loading} = this.props
    const {clientPage, clientTotal, customer_name} = this.props.client
    const popTitle = <div>
      导入信息
    </div>
    const popContent = <>
      <div>
        <p>1. 上传信息文件时，请使用excel文件，支持文件格式为.xls或者.xlsx；</p>
        <p>2. 信息文件内容，请严格按照模板样式填写，红色的字段必须填写，其余字段若没有则可以不填；</p>
        <p>3. 导入信息时，如果和已有的信息相同，则导入后自动更新其信息；</p>
      </div>
      <div style={{textAlign: 'center'}}>
        <Button className='light-btn'>下载客户模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/cust/customer-import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{marginLeft: 20}} loading={loading}>导入客户</Button>
        </Upload>
        <Button className='light-btn' style={{marginLeft: 20}}>下载站点模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/site/site-import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{marginLeft: 20}} loading={loading}>导入站点</Button>
        </Upload>
      </div>
    </>
    return (
      <>
        <div className='toolbar'>
          <HandleClientModal>
            <Button type='primary'>新增客户</Button>
          </HandleClientModal>
          <Popover placement="bottomLeft" title={popTitle} content={popContent}
                   trigger="click">
            <Button type='primary' style={{marginLeft: 10}}>导入信息</Button>
          </Popover>
          <Search
            placeholder="请输入客户名进行查找"
            enterButton="查找"
            value={customer_name}
            onChange={this.changeCustomerName}
            onSearch={this.searchClientList}
            style={{width: '25rem', height: '2.5rem', float: 'right', marginTop: 19}}
          />
        </div>
        <div style={{padding: 24}}>
          {this.mapItem()}
        </div>
        <div style={{textAlign: 'center', marginBottom: 50}}>
          <Pagination current={clientPage} total={clientTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default Index
