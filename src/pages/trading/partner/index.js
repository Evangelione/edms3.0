import React, { Component } from 'react'
import {
  Button,
  Input,
  Pagination,
  Empty,
} from 'antd'
import { connect } from 'dva'
import HandlePartnerModal from './components/Modals/HandlePartnerModal'
import { PAGE_LIMIT } from '@/common/constants'
import PromptModal from '@/components/PromptModal'

const Search = Input.Search

@connect(({ partner, loading }) => ({
  partner,
  loading: loading.models.partner,
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managementStatus: false,
    }
  }

  componentWillMount() {
    this.fetchPartnerList()
    this.fetchMenuList()
  }

  fetchPartnerList = () => {
    this.props.dispatch({
      type: 'partner/fetchPartnerList',
      payload: {},
    })
  }

  fetchMenuList = () => {
    this.props.dispatch({
      type: 'partner/fetchMenuList',
      payload: {},
    })
  }

  searchPartnerList = (value) => {
    this.props.dispatch({
      type: 'partner/fetchPartnerList',
      payload: {
        find_str: value,
      },
    })
  }

  changePartnerName = (e) => {
    this.props.dispatch({
      type: 'partner/save',
      payload: {
        find_str: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchPartnerList('')
    }
  }

  pageChange = (page) => {
    this.props.dispatch({
      type: 'partner/fetchPartnerList',
      payload: {
        page,
        find_str: this.props.partner.find_str,
      },
    })
  }

  mapItem = () => {
    const { managementStatus } = this.state
    const { partnerList, partnerPage } = this.props.partner
    return partnerList.length ? partnerList.map((value, index) => (
      <div className='list-item' key={value.id}>
        <div className='serial-num'>{index + 1}</div>
        <div className='company-box'>
          <div>
            <img src={require('@/assets/image/Bitmap.png')} alt="" />
          </div>
          <div className='company-name'>{value.role_name}</div>
        </div>
        <div className='contact-box'>
          <div className='contact-name'>{value.name}</div>
          <div className='contact-phone'>{value.mobile ? value.mobile : '--'}</div>
        </div>
        <div className='sales-box'>
          <div style={{ visibility: 'hidden' }}>
            <div>销售额</div>
            <div className='sales-price'>{value.xiaoshoue} 元</div>
          </div>
          <div style={{ visibility: 'hidden' }}>
            <div>销售量</div>
            <div className='sales-num'>{value.xiaoshouliang} 吨</div>
          </div>
          {managementStatus ?
            !(value.enable - 0) ?
              <PromptModal state='enablePartner' id={value.id} page={partnerPage}>
                <Button className='green-btn'>启用</Button>
              </PromptModal>
              :
              <PromptModal state='disablePartner' id={value.id} page={partnerPage}>
                <Button className='red-btn'>禁用</Button>
              </PromptModal>
            :
            <HandlePartnerModal modify={value.id}>
              <Button type='primary'>编辑</Button>
            </HandlePartnerModal>
          }
        </div>
      </div>
    )) : <Empty />
  }

  // upLoadExcel = (file) => {
  //   this.props.dispatch({
  //     type: 'partner/upLoadExcel',
  //     payload: {
  //       file,
  //     },
  //   }).then(() => {
  //     this.fetchPartnerList()
  //   })
  // }


  render() {
    const { managementStatus } = this.state
    const { partnerPage, partnerTotal, find_str } = this.props.partner
    // const popTitle = <div>
    //   导入信息
    // </div>
    // const popContent = <>
    //   <div>
    //     <p>1. 上传信息文件时，请使用excel文件，支持文件格式为.xls或者.xlsx；</p>
    //     <p>2. 信息文件内容，请严格按照模板样式填写，红色的字段必须填写， <br />其余字段若没有则可以不填；</p>
    //     <p>3. 导入信息时，如果和已有的信息相同，则导入后自动更新其信息；</p>
    //   </div>
    //   <div style={{textAlign: 'center'}}>
    //     <Button className='light-btn'>下载信息模版</Button>
    //     <Button className='light-btn' style={{marginLeft: 20}}>上传信息文件</Button>
    //   </div>
    // </>
    return (
      <>
        <div className='toolbar'>
          <HandlePartnerModal>
            <Button type='primary'>新增伙伴</Button>
          </HandlePartnerModal>
          {/*<Popover placement="bottomLeft" title={popTitle} content={popContent}*/}
          {/*trigger="click">*/}
          {/*<Upload*/}
          {/*accept='.xls,.xlsx'*/}
          {/*name='excel'*/}
          {/*action={`${IP}/index/driver/driver-car-import`}*/}
          {/*customRequest={this.upLoadExcel}*/}
          {/*showUploadList={false}*/}
          {/*>*/}
          {/*<Button type='primary' style={{marginLeft: 10}}>批量导入伙伴</Button>*/}
          {/*</Upload>*/}
          {/*</Popover>*/}
          {managementStatus ?
            <Button className='yellow-btn' style={{ marginLeft: 10 }}
                    onClick={() => this.setState({ managementStatus: !managementStatus })}>完成</Button>
            :
            <Button type='primary' style={{ marginLeft: 10 }}
                    onClick={() => this.setState({ managementStatus: !managementStatus })}>伙伴管理</Button>}
          <Search
            placeholder="请输入伙伴名进行查找"
            enterButton="查找"
            value={find_str}
            onChange={this.changePartnerName}
            onSearch={this.searchPartnerList}
            style={{ width: '25rem', height: '2.5rem', float: 'right', marginTop: 19 }}
          />
        </div>
        <div style={{ padding: 24 }}>
          {this.mapItem()}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Pagination current={partnerPage} total={partnerTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default Index
