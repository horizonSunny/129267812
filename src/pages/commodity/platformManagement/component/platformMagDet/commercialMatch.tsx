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
@connect(({ platformManagement }) => ({ platformManagement }))
export default class CommercialMatch extends React.Component {
  state = {
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

  render() {
    const { state } = this;
    const product = this.props.platformManagement.productWithId;
    const tabelArr = [
      {
        one: '商品名',
        two: product.commercialMatch ? product.commercialMatch.productNameShop : '',
        three: product.commercialMatch ? product.commercialMatch.productNamePlat : '',
      },
      {
        one: '批准文号',
        two: product.commercialMatch ? product.commercialMatch.approvalNumShop : '',
        three: product.commercialMatch ? product.commercialMatch.approvalNumPlat : '',
      },
      {
        one: '包装规格',
        two: product.commercialMatch ? product.commercialMatch.productSpecifShop : '',
        three: product.commercialMatch ? product.commercialMatch.productSpecifPlat : '',
      },
      {
        one: '优惠价格/原价',
        two: product.commercialMatch ? product.commercialMatch.priceShop : '',
        three: product.commercialMatch ? product.commercialMatch.pricePlat : '',
      },
      {
        one: '优惠件数/库存',
        two: product.commercialMatch ? product.commercialMatch.numberShop : '',
        three: product.commercialMatch ? product.commercialMatch.numberPlat : '',
      },
    ];
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={tabelArr}
        pagination={false}
        bordered
      />
    );
  }
}
