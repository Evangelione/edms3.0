import React, { Component } from 'react'
import { Layout, Icon, Popover ,Button,Modal} from 'antd'
import { menuData } from '@/common/constants'
import { connect } from 'dva'
import router from 'umi/router'
import styles from './index.less'

const { Header } = Layout

@connect(({ global, loading }) => ({
  global,
  loading: loading.models.global,
}))
class MyHeader extends Component {

  changeMenu = (menuPath) => {
    let linkPath = menuPath === '/' ? '' : menuData.find(value => {
      return value.path === menuPath
    }).children[0].path
    this.props.dispatch({
      type: 'global/save',
      payload: {
        menuPath,
        linkPath,
      },
    })
    router.push(menuPath + linkPath)
  }

  changeLink = (linkPath) => {
    let menuPath = this.props.global.menuPath
    this.props.dispatch({
      type: 'global/save',
      payload: {
        linkPath,
      },
    })
    router.push(menuPath + linkPath)
  }

  fetchLogout = (_this)=>{
      Modal.confirm({
          title: '您是否要退出登录?',
    onOk() {
      _this.props.dispatch({type:'global/fetchLogout',payload:{}});
    },
    onCancel() {},
  });

  }

  render() {
    const { global: { menuPath, linkPath } } = this.props
    const menu = menuData.find(value => {
      return value.path === menuPath
    })
    const content = <div className={styles['menu-box']}>
      {menuData.map(value => {
        let type = value.path === menuPath ? 'show' : 'hide'
        return <div onClick={this.changeMenu.bind(null, value.path)} className={styles['box-item']}
                    key={value.path}>
          <div className={styles.diamond}>
            <img src={require(`@/assets/image/${value.iconFont}_${type}.png`)} width={50} height={50} alt="" />
          </div>
          <div>{value.name}</div>
        </div>
      })}
      <div style={{width:'100%',textAlign:'center',marginTop:30,marginLeft:-10}} >
        <Button className='yellow-btn' style={{ marginLeft: 10 }} onClick={this.fetchLogout.bind(this,this)}>退出登录</Button>
      </div>
    </div>
    return (
      <Header className='top-menu'>
        <div className={styles.logo}>
          <img src={require('@/assets/image/lch_logo.png')} alt="" style={{ marginLeft: 30, width: 154, height: 29 }} />
          <Popover placement="bottomRight" content={content} trigger="click">
            <Icon className={styles['menu-icon']} type="align-right" />
          </Popover>
        </div>
        <div className={styles['menu-link']}>
          {menu && (menu === '/' ? null : menu.children.map(value => (
            <div onClick={this.changeLink.bind(null, value.path)}
                 className={linkPath === value.path ? styles['listItem-focus'] : styles['link-item']}
                 key={value.path}>{value.name}</div>
          )))}
        </div>
      </Header>
    )
  }
}


export default MyHeader
