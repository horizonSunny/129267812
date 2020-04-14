import React from 'react';
import { Row, Col, Button, Tree } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import mapImg from '@/assets/tradeSetting/map-da.svg';
import { newAreaTree } from '@/utils/area.js';
// 外部引入
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

  state = {
    checkedKeys: [],
    selectedKeys: [],
  };

  // 弹窗配置不可配送区域
  noDistribute = () => {};

  // 选中
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    return (
      <PageHeaderWrapper>
        <div className={`${styles.main}`}>
          <img src={mapImg} alt="" />
          <span>你还未配置不可配送区域</span>
          <Button type="primary" className={`${styles.button}`} onClick={this.noDistribute}>
            去配置 &gt;
          </Button>
        </div>
        <div className={`${styles.area}`}>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(options)}
          </Tree>
        </div>
      </PageHeaderWrapper>
    );
  }
}
