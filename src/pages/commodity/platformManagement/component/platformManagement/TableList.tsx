import { Table, Divider, Switch, Modal } from 'antd';
import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './TableList.less';

@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  // cons
  state = {
    data: this.props.commodity.productList.pageList,
    searchInfo: this.props.searchInfo,
    visible: false,
    switchRecord: {},
    qrVisible: false,
    qrImg: '',
  };

  onChange = (pagination, filters, sorter) => {
    const { tabelConditions, productListStatus } = this.props.commodity;
    tabelConditions[productListStatus].currentPage = pagination.current;
    if (sorter.field === 'sales') {
      tabelConditions[productListStatus].saleOrder = sorter.order;
      tabelConditions[productListStatus].stockOrder = undefined;
    } else if (sorter.field === 'stock') {
      tabelConditions[productListStatus].saleOrder = undefined;
      tabelConditions[productListStatus].stockOrder = sorter.order;
    }
    const { dispatch } = this.props;
    async function tableChange() {
      await dispatch({
        type: 'commodity/setTabelConditions',
        payload: tabelConditions,
      });
      await dispatch({
        type: 'commodity/getList',
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
      type: 'commodity/getProduct',
      payload: {
        id: params.productId,
      },
    }).then(result => {
      router.push({
        pathname:
          operate === 'detail'
            ? '/commodityAdm/management/particulars'
            : '/commodityAdm/management/edit',
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
        type: 'commodity/deletProduct',
        payload: {
          productIds: [record.productId],
        },
      });
      await dispatch({
        type: 'commodity/getList',
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

  handleOk = e => {
    const { dispatch } = this.props;
    const dataInfo = this.props.commodity.productList.pageList;
    for (let item = 0; item < dataInfo.length; item++) {
      if (dataInfo[item].productId === this.state.switchRecord.productId) {
        // dataInfo[item]['isShelf'] = this.state.switchRecord['isShelf'] === 0 ? 1 : 0;
        const info = this.state.switchRecord.isShelf === 0 ? 1 : 0;
        dispatch({
          type: 'commodity/shelveProduct',
          payload: {
            productIds: [this.state.switchRecord.productId],
            status: info,
          },
        }).then(res => {
          console.log('res_', res);
          if (res) {
            // 这边好像dispatch什么都可以;
            dataInfo[item].isShelf = this.state.switchRecord.isShelf === 0 ? 1 : 0;
            dispatch({
              type: 'commodity/resetList',
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

  // // 切换位置
  // setTabChange = currentTab => {
  //   console.log('currentTab_', currentTab);
  //   const { dispatch } = this.props;
  //   async function tabChange() {
  //     await dispatch({
  //       type: 'commodity/resetStatus',
  //       payload: {
  //         productListStatus: currentTab,
  //       },
  //     });
  //     await dispatch({
  //       type: 'commodity/getList',
  //     });
  //   }
  //   tabChange();
  // };

  qrhandleCancel = e => {
    console.log(e);
    this.setState({
      qrVisible: false,
    });
  };

  // 全选选中
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
    const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'businessAdm/modifyCommodity',
    //     payload: selectedRowKeys,
    //   });
    // }
  };

  render() {
    const { state } = this;
    const { productList, productListStatus, tabelConditions } = this.props.commodity;
    console.log('tabelConditions_', tabelConditions);
    console.log('productList_', productList);
    const columns = [
      {
        title: 'Sku',
        dataIndex: 'productSku',
        key: 'productSku',
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
        title: '价格',
        key: 'price',
        dataIndex: 'price',
        render: text => <a>{text}</a>,
      },
      {
        title: '库存',
        key: 'stock',
        dataIndex: 'stock',
        sorter: true,
        sortOrder: this.props.commodity.tabelConditions[this.props.commodity.productListStatus]
          .stockOrder,
        render: text => <a>{text}</a>,
      },
      {
        title: '销量',
        key: 'sales',
        dataIndex: 'sales',
        sorter: true,
        sortOrder: this.props.commodity.tabelConditions[this.props.commodity.productListStatus]
          .saleOrder,
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
            <a onClick={this.goToNextPage.bind(this, record, 'audit')}>上架平台</a>
            {/* <a onClick={this.generateQR.bind(this, record)}>生成二维码</a> */}
            <Divider type="vertical" />
            <a onClick={this.deleteProduct.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ];
    // const { businessAdm } = this.props;
    // // 这里必须用状态管理中的数据,要是this.state会留存上一次的数据
    // const { selectedRowKeys } = businessAdm;
    const rowSelection = {
      // selectedRowKeys,
      selectedRowKeys: [],
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.main}>
        <Table
          {...this.state}
          columns={columns}
          dataSource={productList.pageList}
          onChange={this.onChange}
          rowSelection={rowSelection}
          pagination={{
            current: tabelConditions[productListStatus].currentPage,
            position: 'bottom',
            pageSize: tabelConditions[productListStatus].pageSize,
            total: productList.totalElements,
          }}
          // rowSelection={rowSelection}
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
