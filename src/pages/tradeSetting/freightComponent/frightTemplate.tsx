import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import styles from './frightTemplate.less';
// const { Search } = Input;
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
// 运费list，运费模版展示
export default class Freight extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'commodityClassify/classification',
    //   }).then(() => {
    //     // 查询单个分类的商品
    //     dispatch({
    //       type: 'commodityClassify/selectCas',
    //       payload: this.props.commodityClassify.casInfoOne[0],
    //     });
    //   });
    // }
  }

  render() {
    return <div />;
  }
}
