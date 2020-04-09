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
            <div className={`${styles.message}`}>092373273278783</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>下单时间</div>
            <div className={`${styles.message}`}>2020-01-08 12:09:35</div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>付款时间</div>
            <div className={`${styles.message}`}>2020-01-08 12:09:35</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rest;
