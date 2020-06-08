// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './operateRecord.less';
import routerParams from '@/utils/routerParams';
// import filterData from './filter';

@connect(({ platformManagement }) => ({ platformManagement }))
export default class CommercialMatch extends React.Component {
  state = {
    columns: [
      {
        title: '操作记录',
        dataIndex: 'operation',
      },
      {
        title: '操作时间',
        dataIndex: 'optTime',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '备注',
        dataIndex: 'reason',
      },
    ],
  };

  componentDidMount() {
    // console.log('this.props.match.params.id_', routerParams(location.search));
    const { id: productId } = routerParams(location.search);
    const { dispatch } = this.props;
    const { recordPagenation } = this.props.platformManagement;
    dispatch({
      type: 'platformManagement/getProductLog',
      payload: {
        pageNumber: recordPagenation.pageNumber,
        pageSize: recordPagenation.pageSize,
        productId,
      },
    });
  }

  onChange = (pagination, filters, sorter) => {
    console.log('pagination_', pagination.current);
    const { id: productId } = routerParams(location.search);
    const { dispatch } = this.props;
    const { recordPagenation } = this.props.platformManagement;
    dispatch({
      type: 'platformManagement/getProductLog',
      payload: {
        pageNumber: pagination.current - 1,
        pageSize: recordPagenation.pageSize,
        productId,
      },
    });
  };

  render() {
    const { state } = this;
    const { productLog, recordPagenation } = this.props.platformManagement;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={productLog}
        pagination={recordPagenation}
        onChange={this.onChange}
        bordered
      />
    );
  }
}
