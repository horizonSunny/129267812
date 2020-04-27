import { Table, Switch, Button, Modal, message } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './EnterTable.less';

const { confirm } = Modal;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class EnterTable extends Component {
  columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo ',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '买家ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '收货人姓名',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <span>{record.deliveryAddress ? record.deliveryAddress.fullName : '自提'}</span>
      ),
    },
    {
      title: '收货人手机号',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <span>{record.deliveryAddress ? record.deliveryAddress.phone : '自提'}</span>
      ),
    },
    // {
    //   title: '地区',
    //   dataIndex: 'address',
    //   key: 'address',
    //   render: (text, record) => (
    //     <span>
    //       {record.province}
    //       {record.city}
    //     </span>
    //   ),
    // },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: text => {
        switch (text) {
          case -1:
            return <span>申请退款</span>;
          case -2:
            return <span>已退款</span>;
          case 0:
            return <span>待付款</span>;
          case 1:
            return <span>待审核</span>;
          case 2:
            return <span>待发货</span>;
          case 3:
            return <span>已发货</span>;
          case 4:
            return <span>待评价</span>;
          case 5:
            return <span>已取消</span>;
          case 6:
            return <span>已评价</span>;
          default:
            break;
        }
      },
    },
    {
      title: '来源',
      dataIndex: 'orderSource',
      key: 'orderSource',
      render: text => {
        switch (text) {
          case 0:
            return <span>商城</span>;
          case 1:
            return <span>即医</span>;
          default:
            return <span>全部</span>;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.handleView(text, record)}>
            查看
          </Button>
        </div>
      ),
    },
  ];

  handleSwitchChange = (text, record) => {
    console.log('switch切换:', text, record);
    const { dispatch } = this.props;
    confirm({
      content: `是否${text ? '启售' : '禁售'}当前商户?`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        const tempParam = {
          tenantId: record.tenantId,
          status: text ? 0 : 1,
        };
        dispatch({
          type: 'businessAdm/switchStatus',
          payload: tempParam,
        }).then(data => {
          if (data.code === 1) {
            message.success('修改成功!');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handleView = (text, record) => {
    console.log('当前行的数据为:', text, record);
    const { dispatch } = this.props;
    // const { recordPagenation } = this.props.businessAdm;
    dispatch({
      type: 'businessAdm/currentRecord',
      payload: { ...record },
    }).then(() => {
      router.push('/businessAdm/enter/particulars');
    });
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'businessAdm/modifyCommodity',
        payload: selectedRowKeys,
      });
    }
  };

  handleUpdate = (text, record) => {
    console.log('当前行的数据为:', text, record);
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/currentRecord',
      payload: { ...record },
    });
    router.push('/businessAdm/enter/edit');
  };

  onChange = (pagination, filters, sorter) => {
    debugger;
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/queryPagenationChange',
      payload: { ...pagination },
    }).then(() => {
      const { queryForm, pagenation } = this.props.businessAdm;
      const params = {
        ...queryForm,
        ...pagenation,
        pageNumber: pagenation.current - 1,
      };
      // 查询列表
      dispatch({
        type: 'businessAdm/queryList',
        payload: { ...params },
      });
    });
  };

  render() {
    const { businessAdm } = this.props;
    // 这里必须用状态管理中的数据,要是this.state会留存上一次的数据
    const { selectedRowKeys } = businessAdm;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Table
        className={styles.main}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        dataSource={businessAdm.businessData}
        columns={this.columns}
        rowKey={record => record.orderId}
        rowSelection={rowSelection}
        pagination={businessAdm.pagenation}
        onChange={this.onChange}
        scroll={{ x: 1200 }}
      />
    );
  }
}

export default EnterTable;
