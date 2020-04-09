import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './CommodityItem.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class CommodityItem extends Component {
  render() {
    // const { currentRecord } = this.props.businessAdm;
    const { message } = this.props;
    console.log('message_', message);

    return (
      <div className={`${styles.main} ${'flex-between'}`}>
        <div className={`${styles.leftInfo}`}>
          <img src={message.productImage[0]} alt="加载图片失败" />
          <div className={`${styles.leftMessage}`}>
            <div className={`${styles.productName}`}>{message.productName}</div>
            <div className={`${styles.productSpecif}`}>已选择：{message.productSpecif}</div>
          </div>
        </div>
        <div className={`${styles.rightInfo}`}>
          <div className={`${styles.price}`}>¥{message.price}</div>
          <div className={`${styles.cartNum}`}>x{message.cartNum}</div>
        </div>
      </div>
    );
  }
}

export default CommodityItem;
