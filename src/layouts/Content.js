import React from 'react'
import { Layout } from 'antd'

const {Content} = Layout

class MyContent extends React.Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    //当路由切换时
    if (this.props.location !== nextProps.location) {
      document.getElementById('scrollTop').scrollIntoView(true)//为ture返回顶部，false为底部
    }
  }

  render() {
    const {children} = this.props
    return (
      <Content style={{height: '100%'}}>
        {children}
      </Content>
      // <BackTop visibilityHeight={100} target={() => document.querySelector('#layout')}/>
    )
  }
}

export default MyContent
