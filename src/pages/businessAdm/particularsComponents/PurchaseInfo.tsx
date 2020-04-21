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
          <div className={`${styles.lineInfo}`}>
            {currentRecord.orderItems &&
              currentRecord.orderItems.map((item, index) => {
                return <CommodityItem message={item} key={index} />;
              })}
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>发票信息</div>
            <div className={`${styles.message}`}>
              {' '}
              {currentRecord.invoice &&
                `${currentRecord.invoice.invoiceName} ${currentRecord.invoice.invoiceIdCard}`}
              {!currentRecord.invoice && `无需发票`}
            </div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>商品总价</div>
            <div className={`${styles.message}`}>
              ￥{currentRecord.totalPrice - currentRecord.totalPostage}
            </div>
          </div>
          <div className={`${'flex-between'} `}>
            <div className={`${styles.label}`}>
              配送方式 {currentRecord.shipperTypeId === 1 && '普通配送'}
              {currentRecord.shipperTypeId === 2 && '加急配送'}
              {currentRecord.shipperTypeId === 3 && '到店自提'}
            </div>
            <div className={`${styles.message}`}>￥{currentRecord.totalPostage}</div>
          </div>
        </div>
        <div className={`${styles.footers} ${'flex-between'}`}>
          <div />
          <div>
            订单总价 <span className={`${styles.price}`}> ¥{currentRecord.totalPrice}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseInfo;
