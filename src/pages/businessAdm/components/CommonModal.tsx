import React, { Component } from 'react';
import { Modal, Select, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './CommonModal.less';

const { Option } = Select;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class CommonModal extends Component {
  state = { visible: true };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'businessAdm/resetDeliverModal',
    //     payload: false,
    //   });
    // }
  };

  render() {
    // const { deliverModalStatus, currentRecord } = this.props.businessAdm;
    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title="订单发货"
        className={`${styles.modal}`}
        visible={deliverModalStatus}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>123</div>
      </Modal>
      // </div>
    );
  }
}

export default CommonModal;
