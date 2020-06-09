import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button, InputNumber, Form } from 'antd';
import { connect } from 'dva';
import styles from './detail.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Title } = Typography;

@connect(({ platformAudit }) => ({ platformAudit }))
export default class Details extends React.Component {
  handleSubmit = e => {};

  render() {
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const { productWithId } = this.props.platformAudit;
    console.log('productWithId_', productWithId);

    // const platformAudit = this.props.platformAudit.product.productSku;
    return (
      <div className={styles.contentWrap}>
        <div className={styles.title}>
          <span>审核信息</span>
        </div>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <div className={styles.labelInfo}>优惠件数：</div>
            <div className={styles.contentInfo}>{productWithId.preferentialQuantity}件</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <div className={styles.labelInfo}>优惠额度：</div>
            <div className={styles.contentInfo}>{productWithId.preferentialLimit}元</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <div className={styles.labelInfo}>券后价格：</div>
            <div className={styles.contentInfo}>{productWithId.preferentialPrice}元</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <div className={styles.labelInfo}>审核编号：</div>
            <div className={styles.contentInfo}>{productWithId.auditNumber}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <div className={styles.labelInfo}>审核状态：</div>
            <div className={styles.contentInfo}>
              {productWithId.auditNumber === 1 && <span>待审核</span>}
              {productWithId.auditNumber === 2 && <span>审核驳回</span>}
              {productWithId.auditNumber === 3 && <span>审核通过</span>}
            </div>
          </div>
        </div>
        {productWithId.auditFlow &&
          productWithId.auditFlow.map(item => {
            return (
              <div className={styles.content}>
                <div className={styles.contentItem}>
                  <div className={styles.labelInfo}>
                    {item.auditStatus === 1 && <span>提交时间</span>}
                    {item.auditStatus === 2 && <span>驳回时间</span>}
                    {item.auditStatus === 3 && <span>通过时间</span>}：
                  </div>
                  <div className={styles.contentInfo}>
                    优惠件数
                    <div> {item.auditStatus === 2 && <span>{item.reason}</span>}</div>
                  </div>
                </div>
              </div>
            );
          })}
        {productWithId.auditNumber === 1 && <Button type="danger">删除</Button>}
        {productWithId.auditNumber === 2 && <Button type="primary">重新提交</Button>}
        {productWithId.auditNumber === 3 && <Button>删除</Button>}
      </div>
    );
  }
}
