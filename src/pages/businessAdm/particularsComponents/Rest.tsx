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
          {currentRecord.orderStatus !== 0 && (
            <div className={`${'flex-between'} ${styles.lineInfo}`}>
              <div className={`${styles.label}`}>付款时间</div>
              <div className={`${styles.message}`}>{currentRecord.payTime}</div>
            </div>
          )}
          {[3, 4, 6].indexOf(currentRecord.orderStatus) > -1 && (
            <div className={`${'flex-between'} ${styles.lineInfo}`}>
              <div className={`${styles.label}`}>发货时间</div>
              <div className={`${styles.message}`}>{currentRecord.deliveryTime}</div>
            </div>
          )}
          {[4, 6].indexOf(currentRecord.orderStatus) > -1 && (
            <div className={`${'flex-between'} ${styles.lineInfo}`}>
              <div className={`${styles.label}`}>交易成功</div>
              <div className={`${styles.message}`}>{currentRecord.updateTime}</div>
            </div>
          )}
          {currentRecord.orderStatus === 5 && (
            <div className={`${'flex-between'} ${styles.lineInfo}`}>
              <div className={`${styles.label}`}>交易取消</div>
              <div className={`${styles.message}`}>
                {currentRecord.updateTime}
                <div>{currentRecord.cancelReason}</div>
              </div>
            </div>
          )}
          {[-1, -2].indexOf(currentRecord.orderStatus) > -1 && (
            <div className={`${'flex-between'} ${styles.lineInfo}`}>
              <div className={`${styles.label}`}>申请退款</div>
              <div className={`${styles.message}`}>
                {currentRecord.applyRefundTime}
                <div>{currentRecord.refundReasonWapExplain}</div>
              </div>
            </div>
          )}
          {[-2].indexOf(currentRecord.orderStatus) > -1 && (
            <div>
              <div className={`${'flex-between'} ${styles.lineInfo}`}>
                <div className={`${styles.label}`}>商家退款</div>
                <div className={`${styles.message}`}>{currentRecord.refundReasonTime}</div>
              </div>
              <div className={`${'flex-between'} ${styles.lineInfo}`}>
                <div className={`${styles.label}`}>交易关闭</div>
                <div className={`${styles.message}`}>{currentRecord.updateTime}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Rest;
