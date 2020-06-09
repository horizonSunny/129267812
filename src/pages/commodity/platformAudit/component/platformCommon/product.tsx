import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button } from 'antd';
import { connect } from 'dva';
import styles from './product.less';

const { Title } = Typography;

@connect(({ platformAudit }) => ({ platformAudit }))
export default class Product extends React.Component {
  render() {
    const { productWithId } = this.props.platformAudit;
    console.log('productWithId_', productWithId);

    // const platformAudit = this.props.platformAudit.product.productSku;
    return (
      <div className={styles.contentWrap}>
        <div className={styles.title}>
          <span>商城数据</span>
          <span>刷新</span>
        </div>
        <div className={styles.content}>
          <div className={styles.img}>
            <img
              src={productWithId.productImage ? productWithId.productImage[0] : ''}
              alt=""
              width="150"
              height="100"
            />
          </div>
          <div className={styles.main}>
            <div>
              <span>rx</span>
              {productWithId.productCommonName}
            </div>
            <div className={styles.remind}>{productWithId.approvalNumber}</div>
            <div className={styles.remind}>{productWithId.productSpecif}</div>
            <div>¥{productWithId.price}</div>
            <div>库存:{productWithId.stock}</div>
          </div>
        </div>
      </div>
    );
  }
}
