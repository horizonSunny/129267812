import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './platformAudDet.less';
import Product from './component/platformCommon/product';
import Edit from './component/platformAudEdit/edit';

const { Title } = Typography;

@connect(({ platformAudit }) => ({ platformAudit }))
export default class PlatformAudDet extends React.Component {
  handleBack() {
    router.goBack();
  }

  render() {
    const { productWithId } = this.props.platformAudit;
    // const platformAudit = this.props.platformAudit.product.productSku;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Product />
        <Edit />
      </PageHeaderWrapper>
    );
  }
}
