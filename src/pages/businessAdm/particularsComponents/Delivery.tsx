import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Delivery extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.table}`}>
        <div className={`${styles.tableContent}`}>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>收货人</div>
            <div className={`${styles.message}`}>
              {currentRecord.deliveryAddress &&
                `${currentRecord.deliveryAddress.fullName}  ${currentRecord.deliveryAddress.phone}`}
              {!currentRecord.deliveryAddress && '自提,暂无收货人信息'}
            </div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>收货地址</div>
            <div className={`${styles.message}`}>
              {currentRecord.deliveryAddress && `${currentRecord.deliveryAddress.address} `}
              {!currentRecord.deliveryAddress && '自提,暂无收货人地址'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delivery;
