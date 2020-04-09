import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import CommodityItem from '../components/CommodityItem';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class PurchaseInfo extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.table}`}>
        <div className={`${styles.titleInfo}`}>商品购买信息</div>
        <div className={`${styles.tableContent}`}>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            {currentRecord.orderItems &&
              currentRecord.orderItems.map((item, index) => {
                return <CommodityItem message={item} key={index} />;
              })}
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>发票信息</div>
            <div className={`${styles.message}`}>王慧 98765655445</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>商品总价</div>
            <div className={`${styles.message}`}>￥464.00</div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>配送方式 普通快递</div>
            <div className={`${styles.message}`}>￥0.00</div>
          </div>
        </div>
        <div className={`${styles.footers} ${'flex-between'}`}>
          <div />
          <div>
            订单总价 <span className={`${styles.price}`}> ¥464.00</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseInfo;
