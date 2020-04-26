import React from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { connect } from 'dva';
import { DragableBodyRow } from './casTr';
import AddClassifyModal from '../../modelComponent/addClassify';
import styles from './casTable.less';
import { editImg, deleteImg, seeNl, seeSel } from '@/assets/casTable';
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class CasTable extends React.Component {
  state = {
    modalVisabled: false,
  };

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

  openModal = (operate, record) => {
    // this.operate(operate, record);
    this.setState({
      operate,
      record,
      modalVisabled: true,
    });
  };

  isShow = record => {
    const _this = this;
    const { dispatch } = this.props;
    async function afterRefesh() {
      await dispatch({
        type: 'commodityClassify/classification',
      });
      await dispatch({
        type: 'commodityClassify/selectCas',
        payload: _this.props.commodityClassify.casInfoOne[0],
      });
    }
    async function showInfo() {
      await dispatch({
        type: 'commodityClassify/categoryShow',
        payload: {
          categoryId: record.id,
          isShow: record.isShow == 1 ? 2 : 1,
        },
      });
      afterRefesh();
    }
    showInfo();
  };

  handleCancel = () => {
    this.setState({
      modalVisabled: false,
    });
  };

  handleOk = () => {
    const { dispatch } = this.props;
    const { operate, record, editorName } = this.state;
    console.log('operate_', operate);
    console.log('record_', record);
    console.log('editorName_', editorName);
    const _this = this;
    async function afterRefesh() {
      await dispatch({
        type: 'commodityClassify/classification',
      });
      await dispatch({
        type: 'commodityClassify/selectCas',
        payload: _this.props.commodityClassify.casInfoOne[0],
      });
    }
    if (operate === 'delete') {
      async function deleteInfo() {
        await dispatch({
          type: 'commodityClassify/deleteClassify',
          payload: record.id,
        });
        afterRefesh();
      }
      deleteInfo();
    } else if (operate === 'editor') {
      async function editorInfo() {
        await dispatch({
          type: 'commodityClassify/editorClassify',
          payload: {
            cateName: editorName,
            categoryId: record.id,
          },
        });
        afterRefesh();
      }
      editorInfo();
    }
    this.setState({
      modalVisabled: false,
    });
  };

  editorChange = e => {
    console.log('e_', e.target.value);
    this.setState({
      editorName: e.target.value,
    });
  };

  render() {
    const columns = [
      {
        dataIndex: 'cateName',
        key: 'id',
        render: (text, record) => (
          <div className={`${styles.main}`}>
            <div className={`${styles.half}`}>{text}</div>
            <div className={`${styles.operate}`}>
              <img src={editImg} alt="" onClick={this.openModal.bind(this, 'editor', record)} />
              <img
                src={record.isShow === 1 ? seeSel : seeNl}
                alt=""
                onClick={this.isShow.bind(this, record)}
              />
              <img src={deleteImg} alt="" onClick={this.openModal.bind(this, 'delete', record)} />
            </div>
          </div>
        ),
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
        <Modal
          visible={this.state.modalVisabled}
          title={this.state.operate === 'editor' ? '编辑该分类信息' : '删除该分类信息'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.operate === 'editor' && (
            <Input onChange={value => this.editorChange(value)} />
          )}
          {this.state.operate !== 'editor' && <span>确认删除该分类信息</span>}
        </Modal>
      </div>
    );
  }
}
