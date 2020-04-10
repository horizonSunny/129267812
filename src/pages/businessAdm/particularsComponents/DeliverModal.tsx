import React, { Component } from 'react';
import { Modal, Select, Input, Button } from 'antd';
import { connect } from 'dva';
import CommodityItem from '../components/CommodityItem';
import styles from './index.less';

const { Option } = Select;
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
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/resetDeliverModal',
        payload: false,
      });
    }
  };

  render() {
    const { deliverModalStatus, currentRecord } = this.props.businessAdm;
    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title="订单发货"
        className={`${styles.modal}`}
        visible={deliverModalStatus}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>
          {currentRecord.orderItems &&
            currentRecord.orderItems.map((item, index) => {
              return (
                <CommodityItem
                  message={item}
                  key={index}
                  styleInfo={{
                    borderTop: '1px solid #EBEBEB',
                  }}
                />
              );
            })}
        </div>
        <div
          className={`${'flex-start'} `}
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '16px',
          }}
        >
          <div className={`${styles.labelInfo} `}>配送信息</div>
          <div>
            <div className={`${styles.contentInfo} `}>配送方式:普通快递</div>
            <div className={`${styles.contentInfo} `}>收货人:王慧</div>
            <div className={`${styles.contentInfo} `}>收货地址：上海市 长泰广长泰广场E座10</div>
          </div>
        </div>
        <div
          className={`${'flex-start'} `}
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '16px',
          }}
        >
          <div className={`${styles.labelInfo} `}>发货方式</div>
          <div style={{ position: 'relative', top: '-5px' }}>
            <div className={`${styles.contentInfo} `}>
              <span>物流公司</span>
              <Select defaultValue="lucy" style={{ width: 200 }}>
                <Option value="lucy">Lucy</Option>
              </Select>
            </div>
            <div className={`${styles.contentInfo} `}>
              <span>快递单号</span>
              <Input placeholder="请输入快递单号" style={{ width: 200 }} />
            </div>
          </div>
        </div>
        <div className={`${styles.deliver}`}>
          <Button>发货</Button>
        </div>
      </Modal>
      // </div>
    );
  }
}

export default DeliverModal;
