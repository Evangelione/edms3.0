import React, { Component } from 'react'
import { Input, Select, Button, Pagination, Upload, Empty } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import HandleGasSourceModal from '../Modals/HandleGasSourceModal'
import PromptModal from '@/components/PromptModal'
import { IP, PAGE_LIMIT } from '@/common/constants'

const Search = Input.Search
const Option = Select.Option

@connect(({supplier, loading}) => ({
  supplier,
  loading: loading.models.supplier,
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managementStatus: false,
    }
  }

  componentWillMount() {
    this.fetchGasList()
  }

  fetchGasList = () => {
    this.props.dispatch({
      type: 'supplier/fetchGasSourceList',
      payload: {
        supp_id: this.props.match.params.SupplierDetail,
      },
    })
  }

  upLoadExcel = (file) => {
    this.props.dispatch({
      type: 'supplier/upLoadExcel',
      payload: {
        file,
      },
    }).then(() => {
      this.fetchGasList()
    })
  }

  mapItem = () => {
    const {managementStatus} = this.state
    const {gasSourceList} = this.props.supplier
    return gasSourceList.length ? gasSourceList.map((value, index) => (
      <div className='list-item' key={value.id}>
        <div className='serial-num'>{index + 1}</div>
        <div className='company-box'>
          <div>
            <img src={require('@/assets/image/Bitmap.png')} alt="" />
          </div>
          <div className='company-name'>{value.goods_name}</div>
        </div>
        <div className='contact-box'>
          <div className='contact-name'>{value.contact}</div>
          <div className='contact-phone'>{value.contact_phone}</div>
        </div>
        <div className='detail-box'>
          <div>
            <div>气源产地</div>
            <div className='plan-num'>{value.goods_place}</div>
          </div>
          <div className='address'>{value.province + value.city + value.area}</div>
          <div className='operating'>
            {managementStatus ?
              <PromptModal state='deleteGasSource' okClass='red-btn'>
                <Button className='red-btn'>移除气源</Button>
              </PromptModal>
              :
              <HandleGasSourceModal modify={value.id}>
                <Button type='primary'>编辑</Button>
              </HandleGasSourceModal>
            }
          </div>
        </div>
      </div>
    )) : <Empty style={{marginTop: 20}} />
  }

  changeGasSourceName = (e) => {
    this.props.dispatch({
      type: 'supplier/save',
      payload: {
        goods_name: e.target.value,
      },
    })
    if (e.target.value === '') {
      this.searchGasSourceList('')
    }
  }

  searchGasSourceList = (value) => {
    this.props.dispatch({
      type: 'supplier/fetchGasSourceList',
      payload: {
        supp_id: this.props.match.params.SupplierDetail,
        goods_name: value,
      },
    })
  }
  pageChange = (page) => {
    this.props.dispatch({
      type: 'supplier/fetchGasSourceList',
      payload: {
        page,
        supp_id: this.props.supplier.supp_id,
        goods_name: this.props.supplier.goods_name,
      },
    })
  }

  render() {
    const {supplier} = this.props
    const {gasSourcePage, gasSourceTotal, goods_name} = supplier
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
            placeholder="请输入气源名进行查找"
            enterButton="查找"
            value={goods_name}
            onChange={this.changeGasSourceName}
            onSearch={this.searchGasSourceList}
            style={{width: '25rem', height: '2.5rem', marginRight: 15}}
          />
          <HandleGasSourceModal>
            <Button type='primary' style={{marginRight: 10}}>新增气源</Button>
          </HandleGasSourceModal>
          <Upload
            accept='.xls,.xlsx'
            name='excel'
            action={`${IP}/index/goods/goods-import`}
            customRequest={this.upLoadExcel}
            showUploadList={false}
          >
            <Button type='primary'>导入气源</Button>
          </Upload>
        </div>
        {this.mapItem()}
        <div style={{textAlign: 'center', marginTop: 40}}>
          <Pagination current={gasSourcePage} total={gasSourceTotal} pageSize={PAGE_LIMIT} onChange={this.pageChange} />
        </div>
      </>
    )
  }
}

export default withRouter(Index)
