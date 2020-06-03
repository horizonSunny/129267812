// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import styles from './operateRecord.less';
// import filterData from './filter';
import { connect } from 'dva';
import LabelInfo from '../../../../../components/Label/label';
import { filterStatus } from '@/utils/filterProperty';

const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};
// const renderContent = (value, row, index) => {
//   const obj = {
//     children: value,
//     props: {},
//   };
//   if (index === 4) {
//     obj.props.colSpan = 0;
//   }
//   return obj;
// };
@connect(({ platformManagement }) => ({ platformManagement }))
export default class CommercialMatch extends React.Component {
  state = {
    visible: false,
    imgSrc: '',
    tabelArr: [
      {
        one: '商品上架',
        two: '2019-02-12 12:12:06',
        three: '商户上架',
        four: 'hahaha',
      },
      {
        one: '商品下架',
        two: '2019-02-12 12:12:06',
        three: '商户下架／系统下架',
        four: 'hahaha',
      },
      {
        one: '商品上架',
        two: '2019-02-12 12:12:06',
        three: '商户上架',
        four: 'hahaha',
      },
      {
        one: '商品下架',
        two: '2019-02-12 12:12:06',
        three: '商户下架／系统下架',
        four: 'hahaha',
      },
    ],
    columns: [
      {
        title: '操作记录',
        dataIndex: 'one',
      },
      {
        title: '操作时间',
        dataIndex: 'two',
      },
      {
        title: '操作人',
        dataIndex: 'three',
      },
      {
        title: '备注',
        dataIndex: 'four',
      },
    ],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 100,
    },
  };

  // 点击查看商品图放大
  showModal = e => {
    if (e.target.nodeName === 'IMG') {
      // 判断img 节点
      this.setState({
        visible: true,
        imgSrc: e.target.src,
      });
    }
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // 获取处理后的数据
  dataReverse(data) {
    const arr = [];
    let i = 0;
    for (const item in filterData) {
      const obj = new Object();
      obj.key = i++;
      obj.name = filterData[item];
      obj.value = data[item];
      arr.push(obj);
    }
    console.log('tabelArr_', arr);
    // return arr;
    this.setState({
      tabelArr: arr,
    });
  }

  // 生命周期
  componentDidMount() {
    // this.dataReverse(this.props.platformManagement.productWithId);
  }

  componentWillReceiveProps() {
    // this.dataReverse(this.props.platformManagement.productWithId);
  }

  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={state.tabelArr}
        pagination={state.pagination}
        bordered
      />
    );
  }
}
