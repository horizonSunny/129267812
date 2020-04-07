import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Row, Col, Input, Button, Table, Tag } from 'antd';
import { connect } from 'dva';
import styles from './chooseProducts.less';

// 请求
@connect(({ commodity }) => ({ commodity }))
class CommodityAdm extends React.Component {
  componentDidMount() {}

  state = {
    searchInfo: {},
    columns: [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '商品图',
        dataIndex: 'productImage',
        key: 'productImage',
        render: (text, record, index) => {
          return (
            <div>
              <img
                src={record.productImage[0]}
                alt="暂无图片"
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          );
        },
      },
      {
        title: '商品名',
        dataIndex: 'productCommonName',
        key: 'productCommonName',
        render: text => text,
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNumber',
        key: 'approvalNumber',
        render: text => text,
      },
      {
        title: '包装规格',
        dataIndex: 'productSpecif',
        key: 'productSpecif',
        render: text => text,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: text => text,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => (status === 1 ? '未添加' : '添加'),
      },
      {
        title: '操作',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
    ],
    dataSource: [],
  };

  // 查询
  handleSearch = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    // dispatch({
    //   type: 'commodity/productTemplateList',
    //   payload: { code: 'productType' },
    // });
  };

  inputValue = value => {
    console.log('inputValue_', value);
    this.setState({
      searchInfo: value,
    });
  };

  render() {
    const { state } = this;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24} justify="space-around">
            <Col span={10} offset={4} className={styles.searchInput}>
              <Input placeholder="请输入商品名、通用名、批准文号" onChange={this.inputValue} />
              &nbsp;&nbsp;&nbsp;
              <span className={styles.searchInfo}>若未搜索到商品，则该商品不支持搜索添加</span>
            </Col>
            <Col span={8} style={{}}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8, background: '#F5AB1C' }} onClick={this.handleNew}>
                手动添加
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          columns={state.columns}
          className={styles.table}
          pagination={{ position: 'bottom' }}
          dataSource={state.dataSource}
        />
      </PageHeaderWrapper>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(CommodityAdm);
export default WrappedAdvancedSearchForm;
