import React from 'react';
import { Row, Col, Button, Tree } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import mapImg from '@/assets/tradeSetting/map-da.svg';
import { newAreaTree } from '@/utils/area.js';
// 外部引入
import AreaSelect from '../components/areaSelect';
import styles from './noDistribute.less';

const options = newAreaTree();
const { TreeNode } = Tree;
// const { Search } = Input;
// @connect(({ commodityClassify }) => ({
//   commodityClassify,
// }))
export default class NoDistribute extends React.Component {
  componentDidMount() {
    console.log('areaInfo_', options);
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

  // 调用子组件方法
  onRefInfo = ref => {
    this.child = ref;
  };

  // 弹窗配置不可配送区域
  showArea = () => {
    console.log('this.child_', this.child);

    this.child.openModal();
  };

  render() {
    return (
      <PageHeaderWrapper>
        <div className={`${styles.main}`}>
          <img src={mapImg} alt="" />
          <span>你还未配置不可配送区域</span>
          <Button type="primary" className={`${styles.button}`} onClick={this.showArea}>
            去配置 &gt;
          </Button>
        </div>
        <AreaSelect onRef={this.onRefInfo} />
      </PageHeaderWrapper>
    );
  }
}
