import React, { Component } from 'react'
import { Modal } from 'antd'

class CreatePlan extends Component {
  state = { visible: false }

  showModal = () => {
    if (this.state.visible) {
      return false
    }
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  render() {
    const { children } = this.props
    return (
      <div onClick={this.showModal} style={{ display: 'inline-block' }}>
        {children}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.hideModal}
          footer={null}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>

    )
  }
}

export default CreatePlan
