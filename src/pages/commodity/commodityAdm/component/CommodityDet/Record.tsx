// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './Record.less';
import filterData from './filter';

const columns = [
  {
    dataIndex: 'operation',
  },
  {
    dataIndex: 'operateInfo',
  },
];
@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  componentDidMount() {}

  state = {
    data: this.props.commodity.productLog,
  };

  render() {
    const { state } = this;
    const dataInfo = state.data.map(item => {
      return {
        operation: item.operation,
        operateInfo: `${item.optTime}  ${item.operator}`,
      };
    });
    return (
      <div className={styles.main}>
        <a href="javascript:void(0);" className={styles.aInfo}>
          {' '}
          操作记录
        </a>
        <Table columns={columns} dataSource={dataInfo} bordered pagination={false} />
      </div>
    );
  }
}
