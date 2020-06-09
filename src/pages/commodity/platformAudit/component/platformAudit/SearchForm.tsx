import { Form, Row, Col, Input, Button, DatePicker, Select, TreeSelect } from 'antd';
import React from 'react';
import router from 'umi/router';
import moment from 'moment';
import { connect } from 'dva';
import styles from './SearchForm.less';
import filterProperty from '@/utils/filterProperty';
import { searchFormInfo } from '../../../models/commodity';
import deepCopy from '@/utils/deepCopy';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ platformAudit, commodity }) => ({ platformAudit, commodity }))
class AdvancedSearchForm extends React.Component {
  state = {
    // expand: false,
    // sellingStatus: null,
    // productType: this.props.platformAudit.allProductType,
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
        auditStatus: values.auditStatus,
        merchantName: values.merchantName,
        productCommonName: values.productCommonName,
        approvalNumber: values.approvalNumber,
      };
      const searchInfo = filterProperty(searchParams);
      console.log('searchInfo_', searchInfo);

      async function search() {
        await dispatch({
          type: 'platformAudit/saveSearchForm',
          payload: searchInfo,
        });
        await dispatch({
          type: 'platformAudit/getList',
        });
      }
      search();
      // this.props.saveSearchInfo(searchInfo);
    });
  };

  handleReset = () => {
    console.log('reset');
    // 清楚form表单的值
    this.props.form.resetFields();
    // 只重置form表单
    const { dispatch } = this.props;
    dispatch({
      type: 'platformAudit/resetForm',
    });
  };

  // 发起审核
  review = () => {
    const params = deepCopy(searchFormInfo);
    params.platformStatus = 1;
    const { dispatch } = this.props;
    dispatch({
      type: 'commodity/saveSearchForm',
      payload: params,
    });
    router.push('/commodityAdm/management');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const rangeConfig = {
    //   rules: [{ type: 'array', message: 'Please select time!' }],
    // };
    const { searchForm } = this.props.platformAudit;
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
          <Col span={6}>
            <Form.Item label="审核状态">
              {getFieldDecorator('auditStatus', {
                rules: [],
                initialValue: searchForm.auditStatus,
              })(
                <Select style={{ width: 120 }}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>审核通过</Option>
                  <Option value={2}>待审核</Option>
                  <Option value={3}>审核驳回</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={7} style={{}}>
            <Form.Item label="批准文号">
              {getFieldDecorator('approvalNumber', {
                rules: [],
                initialValue: searchForm.approvalNumber,
              })(<Input placeholder="输入批准文号" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={7} style={{}}>
            <Form.Item label="商品名">
              {getFieldDecorator('productCommonName', {
                initialValue: searchForm.productCommonName,
                rules: [],
              })(<Input placeholder="输入商品名" />)}
            </Form.Item>
          </Col>
          <Col span={7} style={{}}>
            <Form.Item label="商户名称">
              {getFieldDecorator('merchantName', {
                initialValue: searchForm.merchantName,
                rules: [],
              })(<Input placeholder="输入商户名称" />)}
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
            <Button type="primary" onClick={this.review}>
              发起审核
            </Button>
            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
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
