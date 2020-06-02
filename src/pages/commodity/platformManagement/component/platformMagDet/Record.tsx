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

  render() {
    const data = this.props.commodity.productLog;
    let dataInfo;
    if (Array.isArray(data)) {
      dataInfo = data.map(item => {
        return {
          operation: item.operation,
          operateInfo: `${item.optTime}  ${item.operator}`,
        };
      });
    }

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
