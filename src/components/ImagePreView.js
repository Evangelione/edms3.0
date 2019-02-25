import { Component } from 'react'
import { Modal } from 'antd'
import React from 'react'


class ImagePreView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      rotate: 0,
    }
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation()
    if (this.state.visible === true) {
      return false
    }
    this.setState({
      visible: true,
      rotate: 0,
    })
  }

  hideModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  rotateImage = () => {
    let rotate = this.state.rotate + 90
    this.setState({
      rotate: rotate,
    })
  }

  render() {
    const { children, imgUrl, title } = this.props
    return (
      <div style={{ cursor: 'pointer', color: '#3477ED', display: 'inline-block' }} onClick={this.showModelHandler}>
        {children}
        <Modal
          title={title}
          visible={this.state.visible}
          footer={null}
          style={{ top: 80 }}
          width={800}
          className='transparent'
          onCancel={this.hideModelHandler}
          bodyStyle={{
            padding: 0,
            transform: `rotate(${this.state.rotate}deg)`,
            transition: 'all 0.5s',
            cursor: 'pointer',
          }}
        >
          <img src={imgUrl} alt="" width='100%' height='100%' onClick={this.rotateImage} />
        </Modal>
      </div>
    )
  }
}

export default ImagePreView
