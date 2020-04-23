import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import CommonModal from '../components/CommonModal';
import { DeliverModal, LogisticsModal } from './index';
// import { orderStatus } from '@/utils/configInfo';
// import tipsIcon from '@/assets/order/Tips-icon.svg';

// 装饰器模式
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Footer extends Component {
  state = {
    modalInfo: '',
  };

  onCommonRef = ref => {
    this.commonModalChild = ref;
  };

  onDeliverRef = ref => {
    this.deliverModalChild = ref;
  };

  onLogisticsRef = ref => {
    this.logisticsModalChild = ref;
  };

  buttonClick = e => {
    // const _this = this;
    console.log('e_', e.target.innerText);
    if (e.target.innerText === '发 货') {
      this.deliverModalChild.openModal();
      return;
    }
    if (e.target.innerText === '查看物流') {
      this.logisticsModalChild.openModal();
      return;
    }
    this.setState(
      {
        modalInfo: e.target.innerText,
      },
      () => {
        this.commonModalChild.openModal();
      },
    );
    // this.commonModalChild
  };

  render() {
    const { currentRecord } = this.props.businessAdm;
    const { modalInfo } = this.state;
    return (
      <div>
        <div className={`${styles.footer}`} onClick={this.buttonClick}>
          {currentRecord.orderStatus === 2 && (
            <div>
              {currentRecord.shipperTypeId !== 3 && (
                <Button onClick={this.openModal} style={{ background: '#F5AB1C' }}>
                  发货
                </Button>
              )}
              {currentRecord.shipperTypeId === 3 && (
                <Button style={{ background: '#4874EF' }}>取货码核销</Button>
              )}
            </div>
          )}
          {currentRecord.orderStatus === 0 && (
            <Button style={{ background: '#4874EF' }}>取消订单</Button>
          )}
          {currentRecord.orderStatus === 1 && (
            <Button style={{ background: '#4874EF' }}>审核通过</Button>
          )}
          {[3, 4, 6, -1].indexOf(currentRecord.orderStatus) > -1 && (
            <Button style={{ background: '#4874EF' }}>查看物流</Button>
          )}
          {[-1].indexOf(currentRecord.orderStatus) > -1 && (
            <span>
              <Button type="danger">拒绝退款</Button>
              <Button style={{ background: '#F5AB1C' }}>同意退款</Button>
            </span>
          )}
        </div>
        <CommonModal modalInfo={modalInfo} onRef={this.onCommonRef} />
        {/* 发货modal */}
        {currentRecord.orderStatus === 2 && currentRecord.shipperTypeId !== 3 && (
          <DeliverModal onRef={this.onDeliverRef} />
        )}
        <LogisticsModal onRef={this.onLogisticsRef} />
      </div>
    );
  }
}

export default Footer;
