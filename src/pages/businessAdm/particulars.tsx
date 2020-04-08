import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './particulars.less';
import {
  Title,
  BaseInfo,
  Qualification,
  Shopscene,
  Operationrecord,
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
            <BaseInfo />
            <Qualification />
            <Shopscene />
            <Operationrecord />
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary" onClick={this.handleEdit}>
              编辑
            </Button>
            <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
