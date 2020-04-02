import { Table, Switch, Button, Modal, message } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

const { confirm } = Modal;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class EnterTable extends Component {
  columns = [
    {
      title: '企业编码',
      dataIndex: 'tenantCode',
      key: 'tenantCode',
    },
    {
      title: '入驻时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '企业名称',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: '管理员',
      dataIndex: 'adminName',
      key: 'adminName',
    },
    {
      title: '管理员手机号',
      dataIndex: 'adminTel',
      key: 'adminTel',
    },
    {
      title: '地区',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <span>
          {record.province}
          {record.city}
        </span>
      ),
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {text ? '启售' : '禁售'}{' '}
          <Switch
            checked={!!text}
            defaultChecked={!!text}
            onChange={() => this.handleSwitchChange(text, record)}
          />
        </span>
      ),
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
          <Button
            style={{ marginLeft: '8px' }}
            type="primary"
            onClick={() => this.handleUpdate(text, record)}
          >
            编辑
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
    const { recordPagenation } = this.props.businessAdm;
    dispatch({
      type: 'businessAdm/currentRecord',
      payload: { ...record },
    });
    // 获取操作日志
    dispatch({
      type: 'businessAdm/getOperationRecord',
      payload: {
        ...recordPagenation,
        tenantId: record.tenantId,
        pageNumber: 0,
        totalElements: 0,
      },
    });
    router.push('/businessAdm/enter/particulars');
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
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/queryPagenationChange',
      payload: { ...pagination },
    }).then(() => {
      const { queryForm, pagenation } = this.props.businessAdm;
      const params = {
        ...queryForm,
        ...pagenation,
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
    return (
      <Table
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        rowKey="tenantId"
        dataSource={businessAdm.businessData}
        columns={this.columns}
        pagination={businessAdm.pagenation}
        onChange={this.onChange}
        scroll={{ x: 1200 }}
      />
    );
  }
}

export default EnterTable;
