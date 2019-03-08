import { Button, Popconfirm } from 'antd'
import router from 'umi/router'
import { statusVar, statusVar2, statusVar3 } from '@/common/constants'

const ButtonGroup = Button.Group

export const salesHistoryColumns = [{
  align: 'center',
  title: '装车时间',
  dataIndex: 'real_load_time',
  key: 'real_load_time',
}, {
  align: 'center',
  title: '车牌',
  dataIndex: 'car_head_code',
  key: 'car_head_code',
}, {
  align: 'center',
  title: '客户',
  dataIndex: 'cust_name',
  key: 'cust_name',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'goods_name',
  key: 'goods_name',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'site_name',
  key: 'site_name',
}, {
  align: 'center',
  title: '装货量（吨）',
  dataIndex: 'load_quantity',
  key: 'load_quantity',
}, {
  align: 'center',
  title: '卸货量（吨）',
  dataIndex: 'unload_quantity',
  key: 'unload_quantity',
}, {
  align: 'center',
  title: '结算量（吨）',
  dataIndex: 'charge_quantity',
  key: 'charge_quantity',
}, {
  align: 'center',
  title: '销售价（元/吨）',
  dataIndex: 'price',
  key: 'price',
}, {
  align: 'center',
  title: '销售额（元）',
  dataIndex: 'fee_sum',
  key: 'fee_sum',
}, {
  align: 'center',
  title: '额外费用（元）',
  dataIndex: 'extra_fee',
  key: 'extra_fee',
}, {
  align: 'center',
  title: '合计金额（元）',
  dataIndex: 'total_sum',
  key: 'total_sum',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <div>{statusVar[text]}</div>
  ),
}]

export const clientReconciliationHistoryColumns = [{
  align: 'center',
  title: '操作时间',
  dataIndex: 'check_time',
  key: 'check_time',
}, {
  align: 'center',
  title: '客户',
  dataIndex: 'customer_name',
  key: 'customer_name',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'goods',
  key: 'goods',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'sites',
  key: 'sites',
}, {
  align: 'center',
  title: '对账周期',
  key: 'dzzq',
  render: (text, record) => {
    return <div>{record.account_cycle_start} - {record.account_cycle_end}</div>
  },
}, {
  align: 'center',
  title: '对账量',
  dataIndex: 'purchase_count',
  key: 'purchase_count',
}, {
  align: 'center',
  title: '对账额（元）',
  dataIndex: 'total_account',
  key: 'total_account',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <div>{statusVar2[text]}</div>
  ),
}, {
  align: 'center',
  title: '操作',
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
      <Button className='line-primary'>确认结款</Button>
      <Button className='line-primary'>确认开票</Button>
      <Popconfirm title="确定删除此条记录？" placement="left" onConfirm={() => {
        console.log(window.g_app)
        // window.g_app._store.dispatch({
        //   type: 'client/deleteReconciliationHistory',
        //   payload: {
        //     id: record.id,
        //   },
        // })
      }}>
        <Button className='line-red'>删除</Button>
      </Popconfirm>
    </ButtonGroup>
  ),
}]


export const logisticsHistoryColumns = [{
  align: 'center',
  title: '装车时间',
  dataIndex: 'real_load_time',
  key: 'real_load_time',
}, {
  align: 'center',
  title: '车牌',
  dataIndex: 'car_head_code',
  key: 'car_head_code',
}, {
  align: 'center',
  title: '物流',
  dataIndex: 'logistics_name',
  key: 'logistics_name',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'goods_name',
  key: 'goods_name',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'site_name',
  key: 'site_name',
}, {
  align: 'center',
  title: '装货量（吨）',
  dataIndex: 'load_quantity',
  key: 'load_quantity',
}, {
  align: 'center',
  title: '卸货量（吨）',
  dataIndex: 'unload_quantity',
  key: 'unload_quantity',
}, {
  align: 'center',
  title: '结算量（吨）',
  dataIndex: 'charge_quantity',
  key: 'charge_quantity',
}, {
  align: 'center',
  title: '运输价（元/吨）',
  dataIndex: 'price',
  key: 'price',
}, {
  align: 'center',
  title: '运输距离(公里)',
  dataIndex: 'distance',
  key: 'distance',
}, {
  align: 'center',
  title: '运输费（元）',
  dataIndex: 'freight',
  key: 'freight',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'deliver_status',
  key: 'deliver_status',
  render: (text) => (
    <div>{statusVar3[text]}</div>
  ),
}]


export const logisticsReconciliationHistoryColumns = [{
  align: 'center',
  title: '操作时间',
  dataIndex: 'check_time',
  key: 'check_time',
}, {
  align: 'center',
  title: '物流',
  dataIndex: 'kh',
  key: 'kh',
}, {
  align: 'center',
  title: '气源',
  dataIndex: 'goods',
  key: 'goods',
}, {
  align: 'center',
  title: '站点',
  dataIndex: 'sites',
  key: 'sites',
}, {
  align: 'center',
  title: '对账周期',
  key: 'dzzq',
  render: (text, record) => {
    return <div>{record.account_cycle_start} - {record.account_cycle_end}</div>
  },
}, {
  align: 'center',
  title: '对账量',
  dataIndex: 'order_delivery_count',
  key: 'order_delivery_count',
}, {
  align: 'center',
  title: '对账额（元）',
  dataIndex: 'total_account',
  key: 'total_account',
}, {
  align: 'center',
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <div>{statusVar2[text]}</div>
  ),
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
      <Button className='line-primary'>确认结款</Button>
      <Button className='line-primary'>确认开票</Button>
      <Button className='line-red'>删除</Button>
    </ButtonGroup>
  ),
}]
