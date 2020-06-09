import { Table, Divider, Switch, Modal, Button } from 'antd';
import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './TableList.less';
import { tableFilterInfo } from '../../../models/platformAudit';
import deepCopy from '@/utils/deepCopy';

@connect(({ platformAudit }) => ({ platformAudit }))
export default class TableList extends React.Component {
  state = {
    visible: false,
    switchRecord: {},
  };

  onChange = (pagination, filters, sorter) => {
    console.log('pagination_', pagination);

    const initialValue = deepCopy(tableFilterInfo);
    switch (sorter.columnKey) {
      case 'updateTime':
        initialValue.updateTimeOrder = sorter.order;
        break;
      default:
        break;
    }
    initialValue.currentPage = pagination.current;
    initialValue.pageSize = pagination.pageSize;
    const { dispatch } = this.props;
    async function tableChange() {
      await dispatch({
        type: 'platformAudit/resetTable',
        payload: initialValue,
      });
      await dispatch({
        type: 'platformAudit/getList',
      });
    }
    tableChange();
  };

  // 请求数据跳转详情页面
  goToNextPage = (params, operate) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'platformAudit/getProduct',
      payload: {
        id: params.productId,
      },
    }).then(result => {
      router.push({
        pathname: '/commodityAdm/platformAudit/particulars',
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
        type: 'platformAudit/deletProduct',
        payload: {
          productIds: [record.productId],
        },
      });
      await dispatch({
        type: 'platformAudit/getList',
      });
    }
    deleteProductInfo();
  };

  render() {
    const { state } = this;
    const { productList, tableFilterInfo } = this.props.platformAudit;
    const columns = [
      {
        title: '审核编号',
        dataIndex: 'auditNumber',
        key: 'auditNumber',
        render: text => <a>{text}</a>,
      },
      {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        sorter: true,
        sortOrder: tableFilterInfo.updateTimeOrder,
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
        title: '原价',
        key: 'price',
        dataIndex: 'price',
      },
      {
        title: '优惠额度',
        key: 'preferentialLimit',
        dataIndex: 'preferentialLimit',
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
        render: text => <a>{text}</a>,
      },
      {
        title: '审核状态',
        key: 'auditStatus',
        dataIndex: 'auditStatus',
        render: (text, record) => (
          <div>
            {text === 1 && <span>审核通过</span>}
            {text === 2 && <span>待审核</span>}
            {text === 3 && <span>审核驳回</span>}
          </div>
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
            {record.auditStatus === 2 && (
              <a onClick={this.goToNextPage.bind(this, record, 'editor')}>撤销审核</a>
            )}
            {record.auditStatus === 3 && (
              <a onClick={this.deleteProduct.bind(this, record)}>重新提交</a>
            )}
            {record.auditStatus === 3 && <Divider type="vertical" />}
            {(record.auditStatus === 1 || record.auditStatus === 3) && (
              <a onClick={this.deleteProduct.bind(this, record)}>删除</a>
            )}
          </span>
        ),
      },
    ];
    return (
      <div className={styles.main}>
        <Table
          {...this.state}
          columns={columns}
          dataSource={productList.pageList}
          onChange={this.onChange}
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
