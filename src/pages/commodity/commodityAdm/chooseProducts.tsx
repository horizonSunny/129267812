import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Row, Col, Input, Button } from 'antd';
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
    return (
      <PageHeaderWrapper>
        <Form onSubmit={this.handleSearch} className={styles.main}>
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
      </PageHeaderWrapper>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(CommodityAdm);
export default WrappedAdvancedSearchForm;
