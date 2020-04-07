import { Table, Divider, Tabs, Switch, Modal } from 'antd';
import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './TableList.less';
// import { filterStatus } from '@/utils/filterProperty';

// const pagination = { position: 'bottom', pageSize: 10 };
const { TabPane } = Tabs;
@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  state = {
    data: this.props.commodity.productList.pageList,
    searchInfo: this.props.searchInfo,
    columns: [
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
        render: text => <a>{text}</a>,
      },
      {
        title: '销量',
        key: 'sales',
        dataIndex: 'sales',
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
            <a onClick={this.goToNextPage.bind(this, record, 'detail')}>生成二维码</a>
            <Divider type="vertical" />
            <a onClick={this.goToNextPage.bind(this, record, 'editor')}>删除</a>
          </span>
        ),
      },
    ],
    visible: false,
    switchRecord: {},
  };

  onChange = e => {
    console.log('触发', this.props.searchInfo);
    const { dispatch } = this.props;
    const currentPage = e.current - 1;
    console.log('触发currentPage_', currentPage);
    dispatch({
      type: 'commodity/getList',
      payload: Object.assign(
        {
          pageNumber: currentPage,
          pageSize: 10,
        },
        this.props.searchInfo,
      ),
    });
    return false;
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
    console.log('operate_', operate);
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
            productId: this.state.switchRecord.productId,
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

  // 切换位置
  callback = e => {
    console.log(e);
    const { dispatch } = this.props;
    let stauts;
    switch (e) {
      case 1:
        stauts = 0;
        break;
      case 2:
        stauts = 1;
        break;
      case 3:
        stauts = 2;
        break;
      default:
        break;
    }
    dispatch({
      type: 'commodity/getList',
      payload: Object.assign(
        {
          pageNumber: 0,
          pageSize: 10,
          stauts,
        },
        this.props.searchInfo,
      ),
    });
  };

  render() {
    const { state } = this;
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.main}>
        <TabPane tab="出售中" key="1">
          <Table
            {...this.state}
            columns={state.columns}
            dataSource={this.props.commodity.productList.pageList}
            onChange={this.onChange}
            pagination={{
              current: this.props.commodity.productList.pageNumber + 1,
              position: 'bottom',
              pageSize: 10,
              total: this.props.commodity.productList.totalElements,
            }}
            // rowSelection={rowSelection}
            scroll={{ x: 1200 }}
          />
        </TabPane>
        <TabPane tab="已售罄" key="2">
          <Table
            {...this.state}
            className={styles.main}
            columns={state.columns}
            dataSource={this.props.commodity.productList.pageList}
            onChange={this.onChange}
            pagination={{
              current: this.props.commodity.productList.pageNumber + 1,
              position: 'bottom',
              pageSize: 10,
              total: this.props.commodity.productList.totalElements,
            }}
            scroll={{ x: 1200 }}
          />
        </TabPane>
        <TabPane tab="已下架" key="3">
          <Table
            {...this.state}
            className={styles.main}
            columns={state.columns}
            dataSource={this.props.commodity.productList.pageList}
            onChange={this.onChange}
            pagination={{
              current: this.props.commodity.productList.pageNumber + 1,
              position: 'bottom',
              pageSize: 10,
              total: this.props.commodity.productList.totalElements,
            }}
            scroll={{ x: 1200 }}
          />
        </TabPane>
        <Modal
          title="产品上下架"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>确定{this.state.switchRecord.isShelf === 0 ? '上架' : '下架'}该产品</h3>
        </Modal>
      </Tabs>
    );
  }
}
