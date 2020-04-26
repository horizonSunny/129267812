import React from 'react';
import { Button, Modal, Input, notification } from 'antd';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class AddClassifyModal extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = { visible: false, title: '' };

  showModal = classifyName => {
    console.log('classifyName_', this.props.commodityClassify);
    const props = this.props.commodityClassify;
    let classify;
    let classifyItem;
    let classifyInfo;
    debugger;
    switch (classifyName) {
      case '一级':
        (classify = 1),
          (classifyItem = {
            cateName: '',
          });
        classifyInfo = '添加一级分类';
        break;
      case '二级':
        (classify = 2),
          (classifyItem = props.casInfoOne.find(item => {
            return item.id === props.casOneId;
          }));
        classifyInfo = '添加二级分类';
        break;
      case '三级':
        (classify = 3),
          (classifyItem = props.casInfoTwo.find(item => {
            return item.id === props.casTwoId;
          }));
        classifyInfo = '添加三级分类';
        break;

      default:
        break;
    }
    if (classifyItem) {
      this.setState({
        title: classifyItem.cateName + classifyInfo,
        visible: true,
        classify,
      });
    } else {
      notification.error({
        message: '请先选择要添加分类目标',
      });
    }
  };

  handleOk = e => {
    const { dispatch } = this.props;
    if (this.state.newCateName) {
      if (dispatch) {
        dispatch({
          type: 'commodityClassify/categoryInsert',
          payload: {
            classify: this.state.classify,
            cateName: this.state.newCateName,
          },
        });
      }
      this.setState({
        visible: false,
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // input输入改变
  onChange(e) {
    const { value } = e.target;
    console.log('value_', value);
    this.setState({
      newCateName: value,
    });
  }

  render() {
    const { visible, title } = this.state;
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              添加
            </Button>,
          ]}
        >
          <Input placeholder="请填写分类名称" onChange={this.onChange.bind(this)} />
        </Modal>
      </div>
    );
  }
}
