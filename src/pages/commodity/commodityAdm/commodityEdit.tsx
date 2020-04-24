import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './CommodityDet.less';
import Form from './component/CommodityEdit/Form';
import NextForm from './component/CommodityEdit/NextForm';

@connect(({ commodity }) => ({ commodity }))
export default class CommodityEdit extends React.Component {
  state = {
    isFirstForm: true,
  };

  modifyFormPage = status => {
    this.setState({
      isFirstForm: status,
    });
  };

  render() {
    const { isFirstForm } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        {/* <Title level={4}>商品编辑</Title> */}
        {isFirstForm && <Form modifyFormPage={this.modifyFormPage} />}
        {!isFirstForm && <NextForm modifyFormPage={this.modifyFormPage} />}
      </PageHeaderWrapper>
    );
  }
}
