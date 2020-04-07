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
// const data = [
//   {
//     operation: '下架时间',
//     optTime: '2012-03-03',
//     operator: '张三1',
//   },
//   {
//     operation: '上架时间',
//     optTime: '2012-03-04',
//     operator: '张三2',
//   },
//   {
//     operation: '创建时间',
//     optTime: '2012-03-05',
//     operator: '张三3',
//   },
// ];
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
