import { Table, Switch, Button, Icon } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';

const dataSource = [
  {
    id: 1,
    code: '000101',
    time: '2019-12-04 16:24:00',
    name: '上海燧人科技有限公司',
    admin: 'admin',
    phone: '132xxxxxxxx',
    area: '上海市浦东新区',
    channel: '官网',
    status: 1,
  },
];

const columns = [
  {
    title: '企业编码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '入驻时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '企业名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '管理员',
    dataIndex: 'admin',
    key: 'admin',
  },
  {
    title: '管理员手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '地区',
    dataIndex: 'area',
    key: 'area',
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
        {text} <Switch />
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div>
        <Button type="primary">查看</Button>
        <Button style={{ marginLeft: '8px' }} type="primary">
          编辑
        </Button>
      </div>
    ),
  },
];
class EnterTable extends Component {
  render() {
    return <Table rowKey="id" dataSource={dataSource} columns={columns} />;
  }
}

export default EnterTable;
