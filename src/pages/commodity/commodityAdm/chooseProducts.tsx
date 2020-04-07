import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Row, Col, Input, Button, Table, Tag } from 'antd';
import { connect } from 'dva';
import styles from './chooseProducts.less';

// 请求
@connect(({ commodity }) => ({ commodity }))
class CommodityAdm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // const searchParams = filterProperty(this.props.commodity.searchInfo);
    // dispatch({
    //   type: 'commodity/getProductType',
    // });
    // dispatch({
    //   type: 'commodity/getList',
    //   payload: {
    //     pageNumber: 0,
    //     pageSize: 10,
    //   },
    // });
  }

  // componentWillReceiveProps() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'commodity/getProductType',
  //     payload: { code: 'productType' },
  //   });
  // }
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
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
          return `${index + 1}`;
          // <div>
          //   <img src={item} alt="暂无图片" style={{ height: '100%', width: '100%' }} />
          // </div>
        },
      },
      {
        title: '商品名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '批准文号',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '包装规格',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '价格',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '状态',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '操作',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
    ],
    dataSource: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
  };

  // 查询
  handleSearch = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [
          rangeValue ? Date.parse(rangeValue[0].format('YYYY-MM-DD HH:mm')) : undefined,
          rangeValue ? Date.parse(rangeValue[1].format('YYYY-MM-DD HH:mm')) : undefined,
        ],
      };
      const searchParams = {
        startTime: values['range-picker'][0],
        endTime: values['range-picker'][1],
        isShelf: values.sellStatus == 3 ? undefined : values.sellStatus,
        productType: values.status,
        productCommonName: values.keyword,
        approvalNumber: values.approvalNumber,
      };
      const searchInfo = filterProperty(searchParams);
      dispatch({
        type: 'commodity/getList',
        payload: Object.assign(
          {
            pageNumber: 0,
            pageSize: 10,
          },
          searchInfo,
        ),
      });
      this.props.saveSearchInfo(searchInfo);
    });
  };

  render() {
    const { state } = this;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24} justify="space-around">
            <Col span={10} offset={4} className={styles.searchInput}>
              <Input placeholder="请输入商品名、通用名、批准文号" />
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
