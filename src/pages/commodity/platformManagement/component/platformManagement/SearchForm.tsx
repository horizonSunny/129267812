import { Form, Row, Col, Input, Button, DatePicker, Select, TreeSelect } from 'antd';
import React from 'react';
import styles from './SearchForm.less';
import router from 'umi/router';
import moment from 'moment';
import { connect } from 'dva';
import filterProperty from '@/utils/filterProperty';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ platformManagement }) => ({ platformManagement }))
class AdvancedSearchForm extends React.Component {
  state = {
    // expand: false,
    // sellingStatus: null,
    // productType: this.props.platformManagement.allProductType,
    // selectedRowKeys: [],
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
          rangeValue && rangeValue.length !== 0
            ? Date.parse(rangeValue[0].format('YYYY-MM-DD HH:mm'))
            : undefined,
          rangeValue && rangeValue.length !== 0
            ? Date.parse(rangeValue[1].format('YYYY-MM-DD HH:mm'))
            : undefined,
        ],
      };
      const searchParams = {
        startTime: values['range-picker'][0],
        endTime: values['range-picker'][1],
        putawayStatus: values.putawayStatus,
        sellStatus: values.sellStatus,
        productCommonName: values.keyword,
        approvalNumber: values.approvalNumber,
      };
      const searchInfo = filterProperty(searchParams);
      console.log('searchInfo_', searchInfo);

      async function search() {
        await dispatch({
          type: 'platformManagement/saveSearchForm',
          payload: searchInfo,
        });
        await dispatch({
          type: 'platformManagement/getList',
        });
      }
      search();
      // this.props.saveSearchInfo(searchInfo);
    });
  };

  handleReset = () => {
    console.log('reset');
    this.props.form.resetFields();
    // 保留tab
    const { dispatch } = this.props;
    dispatch({
      type: 'platformManagement/resetForm',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
    const { searchForm } = this.props.platformManagement;
    return (
      <Form className={styles['ant-advanced-search-form']} onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col
            span={11}
            style={{
              maxWidth: '500px',
            }}
          >
            <Form.Item label="创建时间">
              {getFieldDecorator('range-picker', {
                initialValue:
                  searchForm.startTime && searchForm.endTime
                    ? [moment(searchForm.startTime), moment(searchForm.endTime)]
                    : '',
              })(<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />)}
            </Form.Item>
          </Col>
          <Col span={7} style={{}}>
            <Form.Item label="商品名">
              {getFieldDecorator('keyword', {
                initialValue: searchForm.productCommonName,
                rules: [],
              })(<Input placeholder="输入商品名" />)}
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="批准文号">
              {getFieldDecorator('approvalNumber', {
                rules: [],
                initialValue: searchForm.approvalNumber,
              })(<Input placeholder="输入批准文号" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="售卖状态">
              {getFieldDecorator('sellStatus', {
                rules: [],
                initialValue: searchForm.sellStatus,
              })(
                <Select style={{ width: 120 }}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>优惠中</Option>
                  <Option value={2}>售空下架</Option>
                  <Option value={3}>禁售</Option>
                  <Option value={4}>商户下架</Option>
                  <Option value={5}>商户删除</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="上架状态">
              {getFieldDecorator('putawayStatus', {
                rules: [],
                initialValue: searchForm.putawayStatus,
              })(
                <Select style={{ width: 120 }}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>已上架</Option>
                  <Option value={2}>未上架</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col
            span={8}
            style={{
              textAlign: 'right',
              position: 'relative',
              top: '5px',
              marginBottom: '5px',
              left: '-20px',
              float: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
