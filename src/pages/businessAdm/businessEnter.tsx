import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './businessEnter.less';
import QueryForm from './components/QueryForm';
import EnterTable from './components/EnterTable';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class BusinessEnter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { queryForm, pagenation } = this.props.businessAdm;
    const params = {
      ...queryForm,
      ...pagenation,
    };
    // 查询列表
    dispatch({
      type: 'businessAdm/queryList',
      payload: { ...params },
    });
    dispatch({
      type: 'businessAdm/getShipperInfo',
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={styles.containerForm}>
            <QueryForm />
          </div>
          <div className={styles.containerTable}>
            <EnterTable />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BusinessEnter;
