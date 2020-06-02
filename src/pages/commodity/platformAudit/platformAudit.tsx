import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import { connect } from 'dva';
import styles from './platformAudit.less';

// 传入组件
import SearchForm from './component/platformAudit/SearchForm';
import TableList from './component/platformAudit/TableList';

// 请求
@connect(({ commodity }) => ({ commodity }))
export default class PlatformAudit extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // const searchParams = filterProperty(this.props.commodity.searchInfo);
    dispatch({
      type: 'commodity/getProductType',
    });
    dispatch({
      type: 'commodity/getList',
    });
  }

  // componentWillReceiveProps() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'commodity/getProductType',
  //     payload: { code: 'productType' },
  //   });
  // }
  state = {
    searchInfo: {},
  };

  render() {
    return (
      <PageHeaderWrapper>
        <SearchForm />
        <TableList />
      </PageHeaderWrapper>
    );
  }
}
