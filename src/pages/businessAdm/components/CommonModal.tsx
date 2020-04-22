import React, { Component } from 'react';
import { Modal, Select, Input, Button, Divider } from 'antd';

import { connect } from 'dva';
import styles from './CommonModal.less';

const { Option } = Select;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class CommonModal extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = { visible: false, reason: '', inputValue: '' };

  openModal = e => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const { modalInfo } = this.props;
    switch (modalInfo) {
      case '取消订单':
        this.cancelOrder();
        break;
      case '同意退款':
        this.refundOrder(1);
        break;
      case '拒绝退款':
        this.refundOrder(2);
        break;
      case '取货码核销':
        this.pickupCode();
        break;
      default:
        break;
    }
  };

  // 取消订单
  cancelOrder = () => {
    const { dispatch } = this.props;
    const { currentRecord } = this.props.businessAdm;
    const { reason } = this.state;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/cancelOrder',
        payload: {
          cancelReason: reason,
          orderNo: currentRecord.orderNo,
        },
      }).then(() => {
        this.setState({
          visible: false,
        });
      });
    }
  };

  // 退款
  refundOrder = status => {
    const { dispatch } = this.props;
    const { currentRecord } = this.props.businessAdm;
    const { reason } = this.state;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/refundOrder',
        payload: {
          refundReason: reason,
          orderNo: currentRecord.orderNo,
          refundStatus: status,
        },
      }).then(() => {
        this.setState({
          visible: false,
        });
      });
    }
  };

  // 取货码核销
  pickupCode = () => {
    const { dispatch } = this.props;
    const { currentRecord } = this.props.businessAdm;
    const { inputValue } = this.state;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/pickupCode',
        payload: {
          orderNo: currentRecord.orderNo,
          pickupCode: inputValue,
        },
      }).then(() => {
        this.setState({
          visible: false,
        });
      });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'businessAdm/resetDeliverModal',
    //     payload: false,
    //   });
    // }
  };

  refuseReason = reason => {
    this.setState({
      reason,
    });
  };

  inputChange = e => {
    const { value } = e.target;
    this.setState({
      inputValue: value,
    });
  };

  render() {
    // const { deliverModalStatus, currentRecord } = this.props.businessAdm;
    const { visible } = this.state;
    const { modalInfo } = this.props;
    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title={modalInfo}
        className={`${styles.modal}`}
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        {modalInfo === '取消订单' && (
          <Select
            placeholder="请选择取消订单理由"
            style={{ width: 120 }}
            onChange={this.refuseReason}
            style={{
              width: '50%',
            }}
          >
            <Option value="无法联系买家">无法联系买家</Option>
            <Option value="买家误拍或重拍了">买家误拍或重拍了</Option>
            <Option value="买家无诚意完成交易">买家无诚意完成交易</Option>
            <Option value="已经缺货无法交易">已经缺货无法交易</Option>
          </Select>
        )}
        {modalInfo === '审核通过' && <div>是否确认审核通过?</div>}
        {modalInfo === '取货码核销' && (
          <Input
            placeholder="请输入取货码"
            style={{
              width: '50%',
            }}
            onChange={this.inputChange}
          />
        )}

        {modalInfo === '拒绝退款' && (
          <Select
            style={{ width: 120 }}
            placeholder="请选择拒绝退款原因"
            onChange={this.refuseReason}
            style={{
              width: '50%',
            }}
          >
            <Option value="商品不符合退款条件">商品不符合退款条件</Option>
            <Option value="未收到退货商品">未收到退货商品</Option>
            <Option value="已发货">已发货</Option>
          </Select>
        )}
        {modalInfo === '同意退款' && <div>是是否确认已收到退货，同意退款?</div>}
      </Modal>
      // </div>
    );
  }
}

export default CommonModal;
