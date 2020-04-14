import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './templateFreight.less';
// const { Search } = Input;
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
export default class TemplateFreight extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('this.props_', this.props);

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
    return (
      <div>
        <div>
          <span>默认运费</span>
          <span>(全国包邮，除指定地区)</span>
        </div>
      </div>
    );
  }
}
