import { Icon } from 'antd'
import React from 'react'

// 全局接口
export const IP = '/zaq'

// 全局表格
export const PAGE_LIMIT = 10

// 全局正则验证表达式
export const REGS = {
  name: '^[\\u4e00-\\u9fa5A-Za-z\(\)]+$',
  number: '^[0-9.]*$',
  account: '^[A-Za-z0-9]{1,30}$',
  password: '^(\\w){6,16}$',
  phone: '^[1][3-9][0-9]{9}$',
}

// 根据域名前几位判断该用什么logo和名称
export const LOGO = {
  lch: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
  xny: {
    name: '鑫能源',
    logo: require('../assets/image/logo_xny.png'),
  },
  sh: {
    name: '实华',
    logo: require('../assets/image/Group.png'),
  },
  chenchen: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
  localhost: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
}

// 阿里图库
export const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1010333_ox343z8os9.js',
})

export const SiteImg = <img src={require('@/assets/image/site_order_48_37.png')}
                            style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                            alt="" />
export const ClientImg = <img src={require('@/assets/image/client__order_48_37.png')}
                              style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                              alt="" />
export const GasImg = <img src={require('@/assets/image/gas_order_48_37.png')}
                           style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                           alt="" />
export const LogisticsImg = <img src={require('@/assets/image/Logistics_order_48_37.png')}
                                 style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                                 alt="" />
export const SuppImg = <img src={require('@/assets/image/supplier_order_48_37.png')}
                            style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                            alt="" />
export const TransportImg = <img src={require('@/assets/image/transport_order_48_37.png')}
                                 style={{ width: 48, height: 37, marginLeft: 10, marginTop: 4 }}
                                 alt="" />
// export const getIcon = icon => {
//   if (typeof icon === 'string' && icon.indexOf('http') === 0) {
//     return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`}/>
//   }
//   if (typeof icon === 'string') {
//     return <IconFont type={icon}/>
//   }
//   return icon
// }

export const order_type = [{
  value: '',
  label: '全部',
}, {
  value: '1',
  label: '待我方确认',
}, {
  value: '4',
  label: '待供应商接单',
}, {
  value: '2',
  label: '待调度',
}, {
  value: '3',
  label: '待采购',
}, {
  value: '5',
  label: '待装货',
}, {
  value: '6',
  label: '待卸货',
}, {
  value: '7',
  label: '待对账',
}, {
  value: '72',
  label: '待结款',
}, {
  value: '9',
  label: '待开票',
}, {
  value: '8',
  label: '已完成',
}, {
  value: '10',
  label: '已取消',
}]
export const company_type = ['贸易商', '零售商']
export const site_type = ['加气站', '气化站']

// 地址及联数据
export const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}]

// 菜单list
export const menuData = [{
  name: '首页',
  iconFont: 'sy',
  path: '/',
  children: [{
    name: '首页',
    path: 'shouye',
  }],
}, {
  name: '贸易',
  iconFont: 'my',
  path: '/trading',
  children: [{
    name: '我的订单',
    path: '/order',
  }, {
    name: '我的客户',
    path: '/client',
  }, {
    name: '我的供应商',
    path: '/supplier',
  }, {
    name: '我的物流',
    path: '/logistics',
  }, {
    name: '我的伙伴',
    path: '/partner',
  }, {
    name: '我的公司',
    path: '/company',
  }],
}, {
  name: '信用',
  iconFont: 'xy',
  path: '/logistics',
  children: [{
    name: '1',
    path: '/logistics',
  }],
}, {
  name: '零售',
  iconFont: 'ls',
  path: '/account',
  children: [{
    name: '2',
    path: '/account',
  }],
}, {
  name: '物流',
  iconFont: 'wl',
  path: '/customer',
  children: [{
    name: '3',
    path: '/customer',
  }],
}]

// 客户销售历史状态列表
export const salesReconciliationBox = [{
  title: '待确认',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '待接单',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '待装货',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '待卸货',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '待对账',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '对账中',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '已对账',
  level1: '数量（单）',
  level2: '金额（元）',
}, {
  title: '已开票',
  level1: '数量（单）',
  level2: '金额（元）',
}]

// 客户对账明细状态列表
export const reconciliationDetailsBox = [{
  title: '期初数量',
  level1: '余额',
  level2: '信用额',
}, {
  title: '期间使用',
  level1: '余额',
  level2: '信用额',
}, {
  title: '期间收取',
  level1: '余额',
  level2: '信用额',
}, {
  title: '期末结余',
  level1: '余额',
  level2: '信用额',
}, {
  title: '待收取',
  level1: '余额',
  level2: '信用额',
}]

// 销售采购历史状态变量
export const statusVar = {
  21: '待我方确认',
  22: '待采购',
  23: '待供应商接单',
  24: '待调度',
  25: '待出发',
  26: '待装货',
  27: '待卸货',
  28: '待对账',
  29: '对账中',
  30: '已对账',
  31: '待结款',
  32: '已开票',
  33: '已完成',
  34: '已取消',
}

// 对账历史状态变量
export const statusVar2 = {
  61: '对账中',
  62: '已对账',
  63: '待结款',
  64: '待开票',
  65: '已完成',
}

export const statusVar3 = {
  41: '待接单',
  42: '待调度',
  43: '待出发',
  44: '待装货',
  45: '待卸货',
  46: '待对账',
  47: '对账中',
  48: '已对账',
  49: '待结款',
  50: '待开票',
  51: '已结款',
  52: '已开票',
  53: '已完成',
}
