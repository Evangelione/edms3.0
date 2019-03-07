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
// 新增物流组件
import HandleLogisticsModal from './components/Modals/HandleLogisticsModal'
import router from 'umi/router'
import { IP, PAGE_LIMIT } from '@/common/constants'
import { downLoad } from '@/utils/downLoadStencil'

const Search = Input.Search


// 链接model
@connect(({ logistics, loading }) => ({
  logistics,
  loading: loading.models.logistics,
}))
class Index extends Component {
  componentWillMount() {
    this.fetchLogisticsList()
  }


  // 获取物流列表
  fetchLogisticsList = () => {
    this.props.dispatch({
      type: 'logistics/fetchLogisticsList',
      payload: {},
    })
  }

  // 物流列表条件查询
  searchLogisticsList = (value) => {
    this.props.dispatch({
      type: 'logistics/fetchLogisticsList',
      payload: {
        logistics_name: value,
      },
    })
  }

  // 查询条件变化实时查询
  changeLogisticsName = (e) => {
    this.props.dispatch({
      type: 'logistics/save',
      payload: {
        logistics_name: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchLogisticsList('')
    }
  }

  // 列表分页
  pageChange = (page) => {
    this.props.dispatch({
      type: 'logistics/fetchLogisticsList',
      payload: {
        page,
        logistics_name: this.props.logistics.logistics_name,
      },
    })
  }

  // 渲染列表方法
  mapItem = () => {
    const { logisticsList } = this.props.logistics
    return logisticsList.length ? logisticsList.map((value, index) => (
      <div className='list-item' key={value.id}
           onClick={this.goLogisticsDetail.bind(null, value.id, value.company_name)}>
        <div className='serial-num'>{index + 1}</div>
        <div className='company-box'>
          <div>
            <img src={require('@/assets/image/Bitmap.png')} alt="" />
          </div>
          <div className='company-name'>{value.company_name}</div>
        </div>
        <div className='contact-box'>
          <div className='contact-name'>{value.contact}</div>
          <div className='contact-phone'>{value.contact_phone}</div>
        </div>
        <div className='sales-box' style={{ visibility: 'hidden' }}>
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

  // 进入列表详情页面
  goLogisticsDetail = (id, company) => {
    router.push(this.props.location.pathname + `/${id}?company=${company}`)
  }

  // 上传execl
  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'logistics/upLoadExcel',
      payload: {
        file,
      },
    }).then(() => {
      this.fetchLogisticsList()
    })
  }

  render() {
    const { loading } = this.props
    const { logisticsPage, logisticsTotal, logistics_name } = this.props.logistics
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
        <Button className='light-btn' onClick={downLoad.bind(null, 'logistics')}>下载物流模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/logistics/import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{ marginLeft: 20 }} loading={loading}>导入物流</Button>
        </Upload>
        <Button className='light-btn' onClick={downLoad.bind(null, 'driver_car')}
                style={{ marginLeft: 20 }}>下载车队模版</Button>
        <Upload
          accept='.xls,.xlsx'
          name='excel'
          action={`${IP}/index/driver/car-import`}
          customRequest={this.upLoadExcel}
          showUploadList={false}
        >
          <Button className='light-btn' style={{ marginLeft: 20 }} loading={loading}>导入车队</Button>
        </Upload>
      </div>
    </>
    return (
      <>
        <div className='toolbar'>
          {/*新增物流组件，modal*/}
          <HandleLogisticsModal>
            <Button type='primary'>新增物流</Button>
          </HandleLogisticsModal>
          {/*antd组件->气泡组件*/}
          <Popover placement="bottomLeft" title={popTitle} content={popContent}
                   trigger="click">
            <Button type='primary' style={{ marginLeft: 10 }}>导入信息</Button>
          </Popover>
          {/*antd组件->查询input*/}
          <Search
            placeholder="请输入物流公司名称进行查找"
            enterButton="查找"
            value={logistics_name}
            onChange={this.changeLogisticsName}
            onSearch={this.searchLogisticsList}
            style={{ width: '25rem', height: '2.5rem', float: 'right', marginTop: 19 }}
          />
        </div>
        <div style={{ padding: 24 }}>
          {/*渲染map*/}
          {this.mapItem()}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          {/*antd组件->分页器*/}
          <Pagination current={logisticsPage} total={logisticsTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default Index
