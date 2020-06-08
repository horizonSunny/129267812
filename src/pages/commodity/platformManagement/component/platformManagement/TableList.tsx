import { Table, Divider, Switch, Modal, Button } from 'antd';
import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './TableList.less';
import { tableFilterInfo } from '../../../models/platformManagement';
import deepCopy from '@/utils/deepCopy';

@connect(({ platformManagement }) => ({ platformManagement }))
export default class TableList extends React.Component {
  state = {
    visible: false,
    switchRecord: {},
    selectedRowKeys: [],
  };

  onChange = (pagination, filters, sorter) => {
    console.log('pagination_', pagination);

    const initialValue = deepCopy(tableFilterInfo);
    switch (sorter.columnKey) {
      case 'createTime':
        initialValue.createTimeOrder = sorter.order;
        break;
      case 'preferentialLimit':
        initialValue.preferentialLimit = sorter.order;
        break;
      case 'preferentialQuantity':
        initialValue.preferentialQuantity = sorter.order;
        break;
      case 'salesQuantity':
        initialValue.salesQuantity = sorter.order;
        break;
      default:
        break;
    }
    initialValue.currentPage = pagination.current;
    initialValue.pageSize = pagination.pageSize;
    const { dispatch } = this.props;
    async function tableChange() {
      await dispatch({
        type: 'platformManagement/resetTable',
        payload: initialValue,
      });
      await dispatch({
        type: 'platformManagement/getList',
      });
    }
    tableChange();
  };

  // 切换按钮
  onSwitchChange = record => {
    this.setState(
      {
        switchRecord: record,
      },
      () => {
        this.showModal();
      },
    );
  };

  // 请求数据跳转详情页面
  goToNextPage = (params, operate) => {
    const { dispatch } = this.props;
    console.log(dispatch, '111111');
    console.log('operate_111111', operate);
    dispatch({
      type: 'platformManagement/getProduct',
      payload: {
        id: params.productId,
      },
    }).then(result => {
      router.push({
        pathname: operate === 'detail' ? '/commodityAdm/platformManagement/particulars' : '',
        query: { id: params.productId },
      });
    });
  };

  // 删除商品
  deleteProduct = record => {
    // deletProduct
    const { dispatch } = this.props;
    async function deleteProductInfo() {
      await dispatch({
        type: 'platformManagement/deletProduct',
        payload: {
          productIds: [record.productId],
        },
      });
      await dispatch({
        type: 'platformManagement/getList',
      });
    }
    deleteProductInfo();
  };

  // 弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 产品上下架
  handleOk = e => {
    const { dispatch } = this.props;
    const dataInfo = this.props.platformManagement.productList.pageList;
    for (let item = 0; item < dataInfo.length; item++) {
      if (dataInfo[item].productId === this.state.switchRecord.productId) {
        // dataInfo[item]['isShelf'] = this.state.switchRecord['isShelf'] === 0 ? 1 : 0;
        const info = this.state.switchRecord.isShelf === 0 ? 1 : 0;
        dispatch({
          type: 'platformManagement/shelveProduct',
          payload: {
            productIds: [this.state.switchRecord.productId],
            status: info,
          },
        }).then(res => {
          console.log('res_', res);
          if (res) {
            dataInfo[item].isShelf = this.state.switchRecord.isShelf === 0 ? 1 : 0;
            dispatch({
              type: 'platformManagement/resetList',
              payload: dataInfo,
            });
          } else {
          }
        });
      }
    }
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

  // 全选选中
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 批量操作
  batchOperation = e => {
    console.log('e_', e.target.innerText);
    const { dispatch } = this.props;
    if (e.target.innerText === '批量上架' || e.target.innerText === '批量下架') {
      let status;
      e.target.innerText === '批量上架' ? (status = 1) : (status = 0);
      dispatch({
        type: 'platformManagement/shelveProduct',
        payload: {
          productIds: this.state.selectedRowKeys,
          status,
        },
      }).then(res => {
        if (res) {
          dispatch({
            type: 'platformManagement/resetTable',
            payload: {
              currentPage: 1,
              pageSize: 10,
            },
          });
          dispatch({
            type: 'platformManagement/getList',
          });
        }
      });
    } else if (e.target.innerText === '批量删除') {
      async function batchDelete() {
        await dispatch({
          type: 'platformManagement/deletProduct',
          payload: {
            productIds: this.state.selectedRowKeys,
          },
        });
        await dispatch({
          type: 'platformManagement/getList',
        });
      }
      batchDelete();
    }
    // debugger;
  };

  render() {
    const { state } = this;
    const { productList, tableFilterInfo } = this.props.platformManagement;
    const columns = [
      {
        title: 'Sku',
        dataIndex: 'productSku',
        key: 'productSku',
        render: text => <a>{text}</a>,
      },
      {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: tableFilterInfo.createTimeOrder,
        render: text => <a>{text}</a>,
      },
      {
        title: '商品名',
        dataIndex: 'productCommonName',
        key: 'productCommonName',
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNumber',
        key: 'approvalNumber',
      },
      {
        title: '包装规格',
        key: 'productSpecif',
        dataIndex: 'productSpecif',
      },
      {
        title: '商户名称',
        key: 'merchantName',
        dataIndex: 'merchantName',
      },
      {
        title: '原价',
        key: 'originalPrice',
        dataIndex: 'originalPrice',
        render: text => <a>{text}</a>,
      },
      {
        title: '优惠额度',
        key: 'preferentialLimit',
        dataIndex: 'preferentialLimit',
        sorter: true,
        sortOrder: tableFilterInfo.preferentialLimit,
        render: text => <a>{text}</a>,
      },
      {
        title: '优惠价',
        key: 'preferentialPrice',
        dataIndex: 'preferentialPrice',
        render: text => <a>{text}</a>,
      },
      {
        title: '优惠件数',
        key: 'preferentialQuantity',
        dataIndex: 'preferentialQuantity',
        sorter: true,
        sortOrder: tableFilterInfo.preferentialQuantity,
        render: text => <a>{text}</a>,
      },
      {
        title: '销售数量',
        key: 'salesQuantity',
        dataIndex: 'salesQuantity',
        sorter: true,
        sortOrder: tableFilterInfo.salesQuantity,
        render: text => <a>{text}</a>,
      },
      {
        title: '上下架',
        key: 'isShelf',
        render: record => (
          <Switch
            checked={record.isShelf !== 0}
            onChange={this.onSwitchChange.bind(this, record)}
          />
        ),
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 300,
        render: (text, record) => (
          <span>
            <a onClick={this.goToNextPage.bind(this, record, 'detail')}>查看</a>
            <Divider type="vertical" />
            <a onClick={this.goToNextPage.bind(this, record, 'editor')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={this.deleteProduct.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.main}>
        <div className={`${styles.bulk_operation} ${styles.account}`} onClick={this.batchOperation}>
          <Button type="primary">批量上架</Button>
          <Button type="primary">批量下架</Button>
          <Button type="danger">批量删除</Button>
        </div>
        <Table
          {...this.state}
          columns={columns}
          dataSource={productList.pageList}
          onChange={this.onChange}
          rowSelection={rowSelection}
          pagination={{
            current: tableFilterInfo.currentPage,
            position: 'bottom',
            pageSize: tableFilterInfo.pageSize,
            total: productList.totalElements,
          }}
          scroll={{ x: 1200 }}
        />
        <Modal
          title="产品上下架"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>确定{this.state.switchRecord.isShelf === 0 ? '上架' : '下架'}该产品</h3>
        </Modal>
      </div>
    );
  }
}
