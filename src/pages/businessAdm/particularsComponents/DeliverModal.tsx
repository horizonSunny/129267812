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
  componentDidMount() {
    this.props.onRef(this);
  }

  state = { visible: false, logisticCode: '', shipperCode: '' };

  openModal = e => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    const { dispatch } = this.props;
    this.setState({
      visible: false,
    });
  };

  shipperChange = value => {
    console.log(`selected ${value}`);
    this.setState({
      shipperCode: value,
    });
  };

  logisticChange = e => {
    const { value } = e.target;
    console.log(`logisticChange ${value}`);
    this.setState({
      logisticCode: value,
    });
  };

  deliverGoods = e => {
    const { dispatch } = this.props;
    const { currentRecord } = this.props.businessAdm;
    const { logisticCode, shipperCode } = this.state;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/deliverGoods',
        payload: {
          logisticCode,
          shipperCode,
          orderNo: currentRecord.orderNo,
        },
      }).then(() => {
        this.setState({
          visible: false,
        });
      });
    }
  };

  render() {
    const { currentRecord, shipperInfo } = this.props.businessAdm;
    const { visible } = this.state;
    console.log('currentRecord_', currentRecord);

    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title="订单发货"
        className={`${styles.modal}`}
        visible={visible}
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
            <div className={`${styles.contentInfo} `}>
              配送方式: {currentRecord.shipperTypeId === 1 && '普通配送'}
              {currentRecord.shipperTypeId === 2 && '加急配送'}
              {currentRecord.shipperTypeId === 3 && '到店自提'}
            </div>
            <div className={`${styles.contentInfo} `}>
              收货人: {currentRecord.deliveryAddress.fullName}
            </div>
            <div className={`${styles.contentInfo} `}>
              收货地址: {currentRecord.deliveryAddress.address}
            </div>
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
              <Select
                style={{ width: 200 }}
                placeholder="请选择物流公司"
                onChange={this.shipperChange}
              >
                {shipperInfo.map(item => {
                  return <Option value={item.shipperCode}>{item.shipperName}</Option>;
                })}
              </Select>
            </div>
            <div className={`${styles.contentInfo} `}>
              <span>快递单号</span>
              <Input
                placeholder="请输入快递单号"
                style={{ width: 200 }}
                onChange={this.logisticChange}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.deliver}`}>
          <Button onClick={this.deliverGoods}>发货</Button>
        </div>
      </Modal>
      // </div>
    );
  }
}

export default DeliverModal;
