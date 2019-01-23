import { Button } from 'antd'
import router from 'umi/router'

const ButtonGroup = Button.Group

export const salesHistoryColumns = [{
  align: 'center',
  title: '装车时间',
  dataIndex: 'zcsj',
  key: 'zcsj',
}, {
  align: 'center',
  title: '车牌',
  dataIndex: 'cp',
  key: 'cp',
}, {
  align: 'center',
  title: '客户',
  dataIndex: 'kh',
  key: 'kh',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'qy',
  key: 'qy',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'zd',
  key: 'zd',
}, {
  align: 'center',
  title: '装气量（吨）',
  dataIndex: 'zql',
  key: 'zql',
}, {
  align: 'center',
  title: '结算量（吨）',
  dataIndex: 'jsl',
  key: 'jsl',
}, {
  align: 'center',
  title: '销售价（元/吨）',
  dataIndex: 'xsj',
  key: 'xsj',
}, {
  align: 'center',
  title: '销售额（元）',
  dataIndex: 'xse',
  key: 'xse',
}, {
  align: 'center',
  title: '额外费用（元）',
  dataIndex: 'ewfy',
  key: 'ewfy',
}, {
  align: 'center',
  title: '合计金额（元）',
  dataIndex: 'hjje',
  key: 'hjje',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'zt',
  key: 'zt',
}]

export const clientReconciliationHistoryColumns = [{
  align: 'center',
  title: '操作时间',
  dataIndex: 'czsj',
  key: 'czsj',
}, {
  align: 'center',
  title: '操作人',
  dataIndex: 'czr',
  key: 'czr',
}, {
  align: 'center',
  title: '客户',
  dataIndex: 'kh',
  key: 'kh',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'qy',
  key: 'qy',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'zd',
  key: 'zd',
}, {
  align: 'center',
  title: '对账周期',
  dataIndex: 'dzzq',
  key: 'dzzq',
}, {
  align: 'center',
  title: '对账量',
  dataIndex: 'dzl',
  key: 'dzl',
}, {
  align: 'center',
  title: '对账额（元）',
  dataIndex: 'dze',
  key: 'dze',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'zt',
  key: 'zt',
}, {
  align: 'center',
  title: '操作',
  dataIndex: 'cz',
  key: 'cz',
  render: (text, record, index) => (
    <ButtonGroup className='button-group'>
      <Button className='line-primary' onClick={() => {
        let url = new URL(window.location.href)
        let arr = url.pathname.split('/')
        router.push(`/${arr[1]}/${arr[2]}/ReconciliationDetails?id=${record.id}&${url.search.substr(1)}`)
      }}>明细</Button>
      <Button className='line-primary'>导出</Button>
      <Button className='line-primary'>确认对账</Button>
      <Button className='line-primary'>确认开票</Button>
      <Button className='line-red'>删除</Button>
    </ButtonGroup>
  ),
}]


export const logisticsHistoryColumns = [{
  align: 'center',
  title: '装车时间',
  dataIndex: 'zcsj',
  key: 'zcsj',
}, {
  align: 'center',
  title: '车牌',
  dataIndex: 'cp',
  key: 'cp',
}, {
  align: 'center',
  title: '物流',
  dataIndex: 'kh',
  key: 'kh',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'qy',
  key: 'qy',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'zd',
  key: 'zd',
}, {
  align: 'center',
  title: '装气量（吨）',
  dataIndex: 'zql',
  key: 'zql',
}, {
  align: 'center',
  title: '结算量（吨）',
  dataIndex: 'jsl',
  key: 'jsl',
}, {
  align: 'center',
  title: '运输价（元/吨）',
  dataIndex: 'xsj',
  key: 'xsj',
}, {
  align: 'center',
  title: '运输距离（公里）',
  dataIndex: 'xse',
  key: 'xse',
}, {
  align: 'center',
  title: '运输费（元）',
  dataIndex: 'ewfy',
  key: 'ewfy',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'zt',
  key: 'zt',
}]


export const logisticsReconciliationHistoryColumns = [{
  align: 'center',
  title: '操作时间',
  dataIndex: 'czsj',
  key: 'czsj',
}, {
  align: 'center',
  title: '物流',
  dataIndex: 'kh',
  key: 'kh',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'qy',
  key: 'qy',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'zd',
  key: 'zd',
}, {
  align: 'center',
  title: '对账周期',
  dataIndex: 'dzzq',
  key: 'dzzq',
}, {
  align: 'center',
  title: '对账量',
  dataIndex: 'dzl',
  key: 'dzl',
}, {
  align: 'center',
  title: '对账额（元）',
  dataIndex: 'dze',
  key: 'dze',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'zt',
  key: 'zt',
}, {
  align: 'center',
  title: '操作',
  dataIndex: 'cz',
  key: 'cz',
  render: (text, record, index) => (
    <ButtonGroup className='button-group'>
      <Button className='line-primary' onClick={() => {
        let url = new URL(window.location.href)
        let arr = url.pathname.split('/')
        router.push(`/${arr[1]}/${arr[2]}/ReconciliationDetails?id=${record.id}&${url.search.substr(1)}`)
      }}>明细</Button>
      <Button className='line-primary'>导出</Button>
      <Button className='line-primary'>确认对账</Button>
      <Button className='line-primary'>确认开票</Button>
      <Button className='line-red'>删除</Button>
    </ButtonGroup>
  ),
}]
