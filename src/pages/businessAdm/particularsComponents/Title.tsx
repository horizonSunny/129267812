import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { orderStatus } from '@/utils/configInfo';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Title extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.title}`}>
        <div className={`${styles.infopart}`}>
          <span>{orderStatus(currentRecord.orderStatus)}</span>
          <span className={`${styles.timeRemaining}`}>剩余23小时56分59秒自动关闭</span>
        </div>
        <div>1</div>
      </div>
    );
  }
}

export default Title;
