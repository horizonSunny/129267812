import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './particulars.less';
// import { ReceivingInfo, Prescription CommodityInfo,OrderTime,Refund} from './particularsComponents/index';
import {
  Title,
  Delivery,
  Prescription,
  PurchaseInfo,
  Rest,
  Footer,
  DeliverModal,
  RefundInfo,
} from './particularsComponents/index';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Particulars extends Component {
  handleEdit = () => {
    router.push('/businessAdm/enter/edit');
  };

  handleBack = () => {
    router.push('/businessAdm/enter');
  };

  render() {
    const { currentRecord } = this.props.businessAdm;
    
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Title />
            <Delivery />
            {currentRecord.prescribInfo && <Prescription />}
            <PurchaseInfo />
            <Rest />
            {[-1, -2].indexOf(currentRecord.orderStatus) > -1 && <RefundInfo />}
            <Footer />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
