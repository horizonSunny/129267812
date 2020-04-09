import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class DeliverModal extends Component {
  state = { visible: true };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { deliverModalStatus } = this.props.businessAdm;
    return (
      <Modal
        title="Basic Modal"
        visible={deliverModalStatus}
        // onOk={this.handleOk}
        // onCancel={this.handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}

export default DeliverModal;
