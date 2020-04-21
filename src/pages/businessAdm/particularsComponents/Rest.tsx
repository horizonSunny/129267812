import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Rest extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.table}`}>
        <div className={`${styles.tableContent}`}>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>订单编号</div>
            <div className={`${styles.message}`}>{currentRecord.orderNo}</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>下单时间</div>
            <div className={`${styles.message}`}>{currentRecord.createTime}</div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>付款时间</div>
            <div className={`${styles.message}`}>{currentRecord.payTime}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rest;
