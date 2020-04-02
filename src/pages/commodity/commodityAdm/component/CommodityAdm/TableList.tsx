import { Table, Divider, Tag, Switch, Modal } from 'antd';
import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './TableList.less';
import { connect } from 'dva';
import { filterStatus } from '@/utils/filterProperty';

const pagination = { position: 'bottom', pageSize: 10 };

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
        title: '类别',
        key: 'productType',
        render: record =>
          record.productType.map(item => {
            return <div>{filterStatus(item, this.props.commodity.allProductType)}</div>;
          }),
      },
      {
        title: '包装规格',
        key: 'productSpecif',
        dataIndex: 'productSpecif',
      },
      {
        title: '报价数',
        key: 'offer',
        dataIndex: 'offer',
        render: text => <a>{text}</a>,
      },
      {
        title: '均价',
        key: 'average',
        dataIndex: 'average',
      },
      {
        title: '售卖状态',
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

  render() {
    const { state } = this;
    return (
      <div>
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
