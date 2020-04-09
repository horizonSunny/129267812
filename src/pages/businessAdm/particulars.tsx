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
} from './particularsComponents/index';

class Particulars extends Component {
  handleEdit = () => {
    router.push('/businessAdm/enter/edit');
  };

  handleBack = () => {
    router.push('/businessAdm/enter');
  };

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Title />
            <Delivery />
            <Prescription />
            <PurchaseInfo />
            <Rest />
            <Footer />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
