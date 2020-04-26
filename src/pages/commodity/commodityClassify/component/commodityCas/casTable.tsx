import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { DragableBodyRow } from './casTr';
import AddClassifyModal from '../../modelComponent/addClassify';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class CasTable extends React.Component {
  state = {};

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (record, dragIndex, hoverIndex) => {
    // 这边对拖拽进行一个判断，判断拖拽对物体是不是本classify内的，不是对话直接return
    if (record.classify !== this.props.commodityClassify.dragStart) {
      console.log('不在同一行');
    } else {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'commodityClassify/reverseCasInfo',
          payload: {
            classify: record.classify,
            dragIndex,
            hoverIndex,
          },
        });
      }
    }
  };

  // 子类弹出框
  onRef = ref => {
    this.child = ref;
  };

  clickModal(classifyName) {
    this.child.showModal(classifyName);
  }

  render() {
    const columns = [
      {
        dataIndex: 'cateName',
        key: 'id',
      },
    ];
    const dataSourceInfo = this.props.commodityClassify[`casInfo${this.props.levelInfo}`];
    let classifyName;
    switch (this.props.levelInfo) {
      case 'One':
        classifyName = '一级';
        break;
      case 'Two':
        classifyName = '二级';
        break;
      case 'Three':
        classifyName = '三级';
        break;
      default:
        break;
    }
    return (
      <div>
        <Button
          icon="plus-circle"
          style={{
            width: '99%',
            position: 'relative',
            left: '1px',
          }}
          onClick={this.clickModal.bind(this, classifyName)}
        >
          新建{classifyName}分类
        </Button>
        <Table
          className="noHead"
          columns={columns}
          pagination={false}
          dataSource={dataSourceInfo}
          childrenColumnName=""
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow.bind(this, record),
          })}
        />
        <AddClassifyModal onRef={this.onRef} />
      </div>
    );
  }
}
