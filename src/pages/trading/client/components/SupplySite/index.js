import React, { Component } from 'react'
import { Input, Select, Button, Pagination, Upload, Empty } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import HandleSiteModal from '../Modals/HandleSiteModal'
import PromptModal from '@/components/PromptModal'
import { IP, PAGE_LIMIT, site_type } from '@/common/constants'

const Search = Input.Search
const Option = Select.Option

@connect(({client, loading}) => ({
  client,
  loading: loading.models.client,
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managementStatus: false,
    }
  }

  componentWillMount() {
    this.fetchSiteList()
  }

  fetchSiteList = () => {
    this.props.dispatch({
      type: 'client/fetchSiteList',
      payload: {
        customer_id: this.props.match.params.ClientDetail,
      },
    })
  }

  mapItem = () => {
    const {managementStatus} = this.state
    const {siteList} = this.props.client
    return siteList.length ? siteList.map((value, index) => (
      <div className='list-item' key={value.id}>
        <div className='serial-num'>{index + 1}</div>
        <div className='company-box'>
          <div>
            <img src={require('@/assets/image/Bitmap.png')} alt="" />
          </div>
          <div className='company-name'>{value.site_name}</div>
        </div>
        <div className='detail-box'>
          <div className='site-type'>
            <div>站点类型</div>
            <div className='site-color'>{site_type[value.site_type - 1]}</div>
          </div>
          <div className='address'>{value.province + value.city + value.area}</div>
          <div className='operating'>
            {managementStatus ?
              <PromptModal state='deleteSite' okClass='red-btn'>
                <Button className='red-btn'>移除站点</Button>
              </PromptModal>
              :
              <HandleSiteModal modify={value.id}>
                <Button type='primary'>编辑</Button>
              </HandleSiteModal>
            }
          </div>
        </div>
      </div>
    )) : <Empty style={{marginTop: 20}} />
  }

  changeSiteName = (e) => {
    this.props.dispatch({
      type: 'client/save',
      payload: {
        site_name: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchSiteList('')
    }
  }

  searchSiteList = (value) => {
    this.props.dispatch({
      type: 'client/fetchSiteList',
      payload: {
        customer_id: this.props.match.params.ClientDetail,
        site_name: value,
      },
    })
  }
  pageChange = (page) => {
    this.props.dispatch({
      type: 'client/fetchSiteList',
      payload: {
        page,
        customer_id: this.props.client.customer_id,
        site_name: this.props.client.site_name,
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
      this.fetchSiteList()
    })
  }

  render() {
    const {managementStatus} = this.state
    const {client, loading} = this.props
    const {sitePage, siteTotal, site_name} = client
    return (
      <>
        <div className='tabs-toolbar'>
          <div style={{display: 'inline-block', marginRight: 10}}>
            <div style={{display: 'inline-block', marginRight: 12}}>排序方式</div>
            <Select defaultValue="jack" style={{width: '8.75rem'}} onChange={this.handleChange}>
              <Option value="jack">结算量</Option>
              <Option value="lucy">利润贡献</Option>
              <Option value="Yiminghe">贡献占比</Option>
            </Select>
          </div>
          <Search
            placeholder="请输入站点名进行查找"
            enterButton="查找"
            value={site_name}
            onChange={this.changeSiteName}
            onSearch={this.searchSiteList}
            style={{width: '25rem', height: '2.5rem', marginRight: 15}}
          />
          {managementStatus ?
            <Button className='yellow-btn' style={{marginRight: 10}}
                    onClick={() => this.setState({managementStatus: !managementStatus})}>完成</Button>
            :
            <Button type='primary' style={{marginRight: 10}}
                    onClick={() => this.setState({managementStatus: !managementStatus})}>管理站点</Button>}
          <HandleSiteModal>
            <Button type='primary' style={{marginRight: 10}}>新增站点</Button>
          </HandleSiteModal>
          <Upload
            accept='.xls,.xlsx'
            name='excel'
            action={`${IP}/index/site/site-import`}
            customRequest={this.upLoadExcel}
            showUploadList={false}
          >
            <Button type='primary' loading={loading}>导入站点</Button>
          </Upload>
        </div>
        {this.mapItem()}
        <div style={{textAlign: 'center', marginTop: 40}}>
          <Pagination current={sitePage} total={siteTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default withRouter(Index)
