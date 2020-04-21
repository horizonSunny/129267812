import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
// import { orderStatus } from '@/utils/configInfo';
// import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Footer extends Component {
  openModal = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/resetDeliverModal',
        payload: true,
      });
    }
  };

  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.footer}`}>
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
    );
  }
}

export default Footer;
