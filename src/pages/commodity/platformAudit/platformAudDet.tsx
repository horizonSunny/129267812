import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './platformAudDet.less';
import TableList from './component/platformAudDet/Table';
import RecordList from './component/platformAudDet/Record';
import ProductConfig from './component/platformAudDet/ProductConfig';

const { Title } = Typography;

@connect(({ platformAudit }) => ({ platformAudit }))
export default class PlatformAudDet extends React.Component {
  handleEdit = params => {
    // router.push({
    //   pathname: '/platformAuditAdm/management/edit',
    //   query: { id: params.productId },
    // });
  };

  handleBack() {
    router.goBack();
  }

  render() {
    const { productWithId } = this.props.platformAudit;
    // const platformAudit = this.props.platformAudit.product.productSku;
    return (
      <PageHeaderWrapper className={styles.main}>
        <div className={styles.contentWrap}>
          <Title level={4} style={{ border: '0px' }}>
            商品名称(SKU编号:{productWithId.productSku})
          </Title>
          {/* <ProductConfig /> */}
          <TableList />
          <ProductConfig />
          <RecordList />
          {/* <div className={`${styles.operationIn}`} />
        <div className={`${styles.operation}`}>
          <Button type="primary" onClick={this.handleEdit.bind(this, this.props.platformAudit.product)}>
            编辑
          </Button>
          <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
            返回
          </Button>
        </div> */}
        </div>
      </PageHeaderWrapper>
    );
  }
}
