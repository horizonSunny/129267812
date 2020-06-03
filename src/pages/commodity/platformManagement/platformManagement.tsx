import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import { connect } from 'dva';
import styles from './platformManagement.less';

// 传入组件
import SearchForm from './component/platformManagement/SearchForm';
import TableList from './component/platformManagement/TableList';

// 请求
@connect(({ platformManagement }) => ({ platformManagement }))
export default class PlatformManagement extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'platformManagement/getProductType',
    });
    dispatch({
      type: 'platformManagement/getList',
    });
  }

  // componentWillReceiveProps() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'platformManagement/getProductType',
  //     payload: { code: 'productType' },
  //   });
  // }
  state = {
    // searchInfo: {},
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
