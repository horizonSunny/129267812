import { Form, Row, Col, Input, Button, DatePicker, Select, TreeSelect } from 'antd';
import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './freightSearch.less';
import filterProperty from '@/utils/filterProperty';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ tradeSetting }) => ({ tradeSetting }))
class AdvancedSearchForm extends React.Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/getFreightList',
        payload: {
          pageNumber: 0,
          pageSize: 3,
          templateType: 0,
        },
      });
    }
  }

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
        templateType: values.recommandStatus == 3 ? undefined : values.recommandStatus,
        templateName: values.keyword,
      };
      const searchInfo = filterProperty(searchParams);
      dispatch({
        type: 'tradeSetting/getFreightList',
        payload: Object.assign(
          {
            pageNumber: 0,
            pageSize: 3,
          },
          searchInfo,
        ),
      });
      // this.props.saveSearchInfo(searchInfo);
    });
  };

  handleReset = () => {
    console.log('reset');
    this.props.saveSearchInfo({});
    this.props.form.resetFields();
  };

  // 新增产品
  handleNew = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tradeSetting/newTemplate',
    });
    router.push('/tradeSetting/freight/newFreight');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
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
              {getFieldDecorator(
                'range-picker',
                rangeConfig,
              )(<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />)}
            </Form.Item>
          </Col>
          <Col span={7} style={{}}>
            <Form.Item label="模版名称">
              {getFieldDecorator('keyword', {
                rules: [],
              })(<Input placeholder="输入商品名" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="类型">
              {getFieldDecorator('recommandStatus', {
                rules: [],
                initialValue: 0,
              })(
                <Select style={{ width: 120 }}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>普通</Option>
                  <Option value={2}>加急</Option>
                  <Option value={3}>包邮</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={16}>运费模版说明</Col>
          <Col
            span={8}
            style={{
              textAlign: 'right',
              position: 'relative',
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
            <Button style={{ marginLeft: 8, background: '#F5AB1C' }} onClick={this.handleNew}>
              + 添加
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
