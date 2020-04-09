import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { orderStatus } from '@/utils/configInfo';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Footer extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.footer}`}>
        <Button style={{ background: '#F5AB1C' }}>发货</Button>
        <Button style={{ background: '#4874EF' }}>取货码核销</Button>
      </div>
    );
  }
}

export default Footer;
