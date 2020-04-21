import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.less';
// import CommodityItem from '../components/CommodityItem';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class RefundInfo extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.table}`}>
        <div className={`${styles.titleInfo}`}>退款信息</div>
        <div className={`${styles.tableContent}`}>
          {currentRecord.logisticCode && (
            <div
              className={`${'flex-between'} ${styles.lineInfo}`}
              style={{
                alignItems: 'center',
              }}
            >
              <div className={`${styles.label} `}>
                退货物流 中通快递 {currentRecord.logisticCode}
              </div>
              <div className={`${styles.message}`}>
                <Button>查看物流</Button>
              </div>
            </div>
          )}
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>退款人姓名</div>
            <div className={`${styles.message}`}>小张</div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>退款账号 支付宝 177172722</div>
            <div className={`${styles.message}`}>177172722</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RefundInfo;
