import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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

  componentDidMount() {}

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
        orderStatus: values.status,
        orderSource: values.channel,
        productCommonName: values.productCommonName,
        shipperTypeId: values.shipperTypeId,
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
    dispatch({
      type: 'businessAdm/restFormChange',
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

  handleExport = () => {
    const { dispatch } = this.props;
    const fileName = 'orderList.xls';
    dispatch({
      type: 'businessAdm/exportOrderList',
      callback: blob => {
        console.log('in_blob_', blob);

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement('a');
          const evt = document.createEvent('MouseEvents');
          link.style.display = 'none';
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link); // 此写法兼容可火狐浏览器
          evt.initEvent('click', false, false);
          link.dispatchEvent(evt);
          document.body.removeChild(link);
        }
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryForm, channel } = this.props.businessAdm;
    // console.log('queryForm_', queryForm);
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
                initialValue:
                  queryForm && queryForm.startTime && queryForm.endTime
                    ? [moment(queryForm.startTime), moment(queryForm.endTime)]
                    : '',
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
                initialValue: queryForm.orderStatus,
              })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">待付款</Option>
                  <Option value="3">待审核</Option>
                  <Option value="4">待发货</Option>
                  <Option value="5">待收货</Option>
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
              {getFieldDecorator('shipperTypeId', {
                initialValue: queryForm.shipperTypeId,
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
                initialValue: queryForm.orderSource,
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">商城</Option>
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
              style={{
                marginLeft: 16,
                borderRadius: '4px',
                border: '1px solid rgba(72,116,239,1)',
                color: 'rgba(72,116,239,1)',
              }}
              onClick={this.handleExport}
            >
              导出
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(QueryForm);
