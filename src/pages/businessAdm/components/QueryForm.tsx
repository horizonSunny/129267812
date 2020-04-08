import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './QueryForm.less';
import { newArea } from '../../../utils/area.js';

const { RangePicker } = DatePicker;
const { Option } = Select;
const options = newArea();

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 0,
        pageSize: 10,
      },
    };
  }

  componentDidMount() {
    // this.initChannel()
  }

  initChannel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/initChannel',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      let startTime = '';
      let endTime = '';
      console.log('values.time:', values.time);
      if (values.time && values.time.length > 0) {
        startTime = new Date(values.time[0]).getTime();
        endTime = new Date(values.time[1]).getTime();
      }
      const params = {
        orderNo: values.orderNo,
        logisticCode: values.logisticCode,
        endTime,
        startTime,
        status: values.status,
        channel: values.channel,
        productCommonName: values.productCommonName,
        province: values.province || [],
      };
      console.log('查询参数: ', params);
      // 查询列表
      dispatch({
        type: 'businessAdm/queryFormChange',
        payload: { ...params },
      }).then(() => {
        this.handleQuery();
      });
    });
  };

  handleReset = () => {
    const { dispatch } = this.props;
    this.props.form.resetFields();
    const params = {
      orderNo: '',
      endTime: '',
      startTime: '',
      status: '',
      channel: '',
      productCommonName: '',
    };
    dispatch({
      type: 'businessAdm/queryFormChange',
      payload: { ...params },
    }).then(() => {
      this.handleQuery();
    });
  };

  handleQuery = () => {
    const { dispatch } = this.props;
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
  };

  handleInsert = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/currentRecord',
      payload: {},
    }).then(() => {
      router.push('/businessAdm/enter/edit');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryForm, channel } = this.props.businessAdm;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };

    return (
      <Form className={styles.searchform} onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item {...formItemLayout} label="创建时间">
              {getFieldDecorator('time', {
                // initialValue: [queryForm.startTime,queryForm.endTime]
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item {...formItemLayout} label="订单状态">
              {getFieldDecorator('status', {
                initialValue: '1',
              })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">付款</Option>
                  <Option value="3">审核</Option>
                  <Option value="4">代发货</Option>
                  <Option value="5">代收货</Option>
                  <Option value="6">退款中</Option>
                  <Option value="7">交易成功</Option>
                  <Option value="8">交易失败</Option>
                  <Option value="9">交易取消</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item {...formItemLayout} label="配送方式">
              {getFieldDecorator('distribution', {
                initialValue: '0',
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">普通配送</Option>
                  <Option value="2">加急配送</Option>
                  <Option value="3">到店自提</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item {...formItemLayout} label="来源">
              {getFieldDecorator('channel', {
                // initialValue: queryForm.channel,
                initialValue: '0',
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">全部</Option>
                  <Option value="2">即医</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="商品名称">
              {getFieldDecorator('productCommonName', {
                initialValue: queryForm.productCommonName,
              })(<Input placeholder="商品名称查询" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="订单号">
              {getFieldDecorator('orderNo', {
                initialValue: queryForm.orderNo,
              })(<Input placeholder="订单号码查询" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="退货物流">
              {getFieldDecorator('logisticCode', {
                initialValue: queryForm.logisticCode,
              })(<Input placeholder="物流单号查询" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={16} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button
              type="danger"
              icon="plus"
              style={{ marginLeft: 16 }}
              onClick={this.handleInsert}
            >
              添加
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(QueryForm);
