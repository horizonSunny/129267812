import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import moment from 'moment';
import styles from './newFreight.less';
import { newAreaTree } from '@/utils/area.js';
import { CompareDate } from '@/utils/utils.ts';
import TemplateFreight from '../freightComponent/templateFreight';
// const { Search } = Input;
const options = newAreaTree();
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
class FormSelfDelivery extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'commodityClassify/classification',
    //   }).then(() => {
    //     // 查询单个分类的商品
    //     dispatch({
    //       type: 'commodityClassify/selectCas',
    //       payload: this.props.commodityClassify.casInfoOne[0],
    //     });
    //   });
    // }
  }

  state = {
    // formInit: this.props.commodity.productWithId,
    value: 2,
  };

  handleSubmit = () => {
    console.log('sss');
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 2 },
        xxl: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
        xxl: { span: 15 },
      },
    };
    const { value } = this.state;
    return (
      <PageHeaderWrapper>
        <Form className={styles.main} {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="模版名称">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: '231',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: value,
            })(
              <Radio.Group onChange={this.onChange}>
                <Radio value={1}>普通</Radio>
                <Radio value={2}>加急</Radio>
                <Radio value={3}>包邮</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="运费">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: {
                a: '12',
                b: '122',
              },
            })(<TemplateFreight />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              sm: { span: 2, offset: 11 },
            }}
          >
            <Button type="primary" htmlType="submit">
              保存模版
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    );
  }
}
const NewSelfDelivery = Form.create({ name: 'edit' })(FormSelfDelivery);

export default NewSelfDelivery;
