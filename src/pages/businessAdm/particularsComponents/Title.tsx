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
    return <div className={`${styles.infopart}`}>{orderStatus(currentRecord.orderStatus)}</div>;
  }
}

export default Title;
