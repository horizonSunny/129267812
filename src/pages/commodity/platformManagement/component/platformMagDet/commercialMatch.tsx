// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import styles from './commercialMatch.less';
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
        one: '商品名',
        two: '999感冒灵',
        three: '[999] 感冒灵',
      },
      {
        one: '批准文号',
        two: '医药s21231312',
        three: '国药准字s21231312',
      },
      {
        one: '包装规格',
        two: '10g*9袋／盒',
        three: '10粒*3／盒',
      },
      {
        one: '优惠价格/原价',
        two: '11.500',
        three: '123.00',
      },
      {
        one: '优惠件数/库存',
        two: '0',
        three: '3',
      },
    ],
    columns: [
      {
        title: '数据名称',
        dataIndex: 'one',
      },
      {
        title: '平台数据',
        dataIndex: 'two',
      },
      {
        title: '商城数据',
        dataIndex: 'three',
      },
    ],
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
        pagination={false}
        bordered
      />
    );
  }
}
