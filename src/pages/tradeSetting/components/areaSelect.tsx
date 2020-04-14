import React from 'react';
import { Row, Col, Button, Tree, Modal } from 'antd';
import { connect } from 'dva';
import { newAreaTree } from '@/utils/area.js';
// 外部引入
import styles from './areaSelect.less';

const options = newAreaTree();
const { TreeNode } = Tree;
// const { Search } = Input;
// @connect(({ commodityClassify }) => ({
//   commodityClassify,
// }))
export default class areaSelect extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.onRef(this);
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
    visible: true,
    checkedKeys: [],
    selectedKeys: [],
    expandedKeys: [],
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

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = () => {
    this.setState({ visible: true, expandedKeys: [] });
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

  onExpand = expandedKeys => {
    console.log('expandedKeys_', expandedKeys);
    const item = expandedKeys[expandedKeys.length - 1];
    // 先关闭所有
    this.setState({
      expandedKeys: [],
    });
    // 再打开最后一个
    this.setState({
      expandedKeys: [item],
    });
  };

  render() {
    const { expandedKeys, visible } = this.state;
    return (
      // <div className={`${styles.area}`}>
      <div>
        <Modal
          title="不可配送区域选择"
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
          className="areaTreeModal"
        >
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            expandedKeys={expandedKeys}
            selectedKeys={this.state.selectedKeys}
            onExpand={this.onExpand}
            className="areaTree"
          >
            {this.renderTreeNodes(options)}
          </Tree>
        </Modal>
      </div>
    );
  }
}
