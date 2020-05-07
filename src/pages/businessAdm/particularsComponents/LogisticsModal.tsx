import React, { Component } from 'react';
import { Modal, Select, Timeline, Icon } from 'antd';
import { connect } from 'dva';
import CommodityItem from '../components/CommodityItem';
import styles from './index.less';
import forSel from '@/assets/logistics/for-sel.svg';

const { Option } = Select;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class LogisticsModal extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = {
    visible: false,
  };

  openModal = e => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    const { dispatch } = this.props;
    this.setState({
      visible: false,
    });
  };

  render() {
    const { currentRecord, shipperInfo, tracesInfo } = this.props.businessAdm;
    const { visible } = this.state;
    const logistic = shipperInfo.find(item => {
      return item.shipperCode === currentRecord.shipperCode;
    });
    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title="物流信息"
        className={`${styles.modal}`}
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>
          <div className={`${styles.labelInfo} `} style={{ marginBottom: '12px' }}>
            配送信息
          </div>
          <div>
            <div className={`${styles.contentInfo} `}>承运公司：{logistic.shipperName}</div>
            <div className={`${styles.contentInfo} `}>运单编号：{currentRecord.logisticCode}</div>
            <div className={`${styles.contentInfo} `}>发货时间：{currentRecord.deliveryTime}</div>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '16px',
            maxHeight: '300px',
            overflowY: 'scroll',
          }}
        >
          {tracesInfo && tracesInfo.traces.length === 0 && '暂无物流轨迹'}
          {tracesInfo && tracesInfo.traces.length !== 0 && (
            <Timeline>
              {tracesInfo.traces.map(item => {
                return (
                  <Timeline.Item>
                    <div>{item.acceptStation}</div>
                    <div> {item.acceptTime}</div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          )}
        </div>
      </Modal>
    );
  }
}

export default LogisticsModal;
