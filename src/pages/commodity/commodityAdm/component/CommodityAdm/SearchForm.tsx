import { Form, Row, Col, Input, Button, DatePicker, Select, TreeSelect } from 'antd';
import React from 'react';
import styles from './SearchForm.less';
import router from 'umi/router';
import { connect } from 'dva';
import filterProperty from '@/utils/filterProperty';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 测试数据

@connect(({ commodity }) => ({ commodity }))
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    sellingStatus: null,
    productType: this.props.commodity.allProductType,
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

  handleReset = () => {
    console.log('reset');
    this.props.saveSearchInfo({});
    this.props.form.resetFields();
  };

  // 新增产品
  handleNew = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodity/resetProduct',
      payload: {
        approvalNumber: '',
        englishName: '',
        isMp: '',
        manufacturer: '',
        pinyin: '',
        productBrand: '',
        productDesc: '',
        productExpire: '',
        productImage: [],
        productModel: '',
        productCommonName: '',
        productSpec: '',
        productSpecif: '',
        productType: '',
      },
    });
    router.push('/commodityAdm/management/edit');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
    const { productType } = this.state;
    return (
      <Form className={styles['ant-advanced-search-form']} onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={10} style={{}}>
            <Form.Item label="创建时间">
              {getFieldDecorator(
                'range-picker',
                rangeConfig,
              )(<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />)}
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="售卖状态">
              {getFieldDecorator('sellStatus', {
                rules: [],
                initialValue: 3,
              })(
                <Select style={{ width: 120 }}>
                  <Option value={3}>全部</Option>
                  <Option value={1}>上架</Option>
                  <Option value={0}>下架</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="类别">
              {getFieldDecorator('status', {
                rules: [],
                initialValue: '',
              })(
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={productType}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={this.onChange}
                />,
                // <Select style={{ width: 120 }} onChange={this.handleSelectChange}>
                //   <Option value="1">全部</Option>
                //   <Option value="2">中西药品</Option>
                //   <Option value="3">养生保健</Option>
                //   <Option value="4">医疗器械</Option>
                //   <Option value="5">计生用品</Option>
                //   <Option value="6">中药饮品</Option>
                //   <Option value="7">美容护肤</Option>
                // </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8} style={{}}>
            <Form.Item label="关键字">
              {getFieldDecorator('keyword', {
                rules: [],
              })(<Input placeholder="关键字输入" />)}
            </Form.Item>
          </Col>
          <Col span={8} style={{}}>
            <Form.Item label="批准文号">
              {getFieldDecorator('approvalNumber', {
                rules: [],
              })(<Input placeholder="批准文号输入" />)}
            </Form.Item>
          </Col>
          <Col
            span={8}
            style={{ textAlign: 'right', position: 'relative', top: '15px', left: '-20px' }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleNew}>
              新增
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
