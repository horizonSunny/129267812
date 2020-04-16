import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import moment from 'moment';
import styles from './newFreight.less';
import { newAreaTree } from '@/utils/area.js';
import TemplateFreight from '../freightComponent/templateFreight';
// const { Search } = Input;
const options = newAreaTree();
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
class FormSelfDelivery extends React.Component {
  componentDidMount() {}

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('value', values);
      if (!err) {
        validateValue = true;
      }
    });
  };

  onChange = e => {
    // console.log('radio checked', e.target.value);
    // this.setState({
    //   value: e.target.value,
    // });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { freightTemplateInfo } = this.props.tradeSetting;
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 },
        xxl: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
        xxl: { span: 15 },
      },
    };
    return (
      <PageHeaderWrapper>
        <Form className={styles.main} {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="模版名称">
            {getFieldDecorator('templateName', {
              rules: [
                {
                  required: true,
                  message: '请输入模版名称',
                },
              ],
              initialValue: freightTemplateInfo.templateName,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('templateType', {
              rules: [
                {
                  required: true,
                  message: '请选择模版类型',
                },
              ],
              initialValue: freightTemplateInfo.templateType,
            })(
              <Radio.Group onChange={this.onChange}>
                <Radio value={1}>普通</Radio>
                <Radio value={2}>加急</Radio>
                <Radio value={3}>包邮</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="运费">
            {getFieldDecorator('templateFreight', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: freightTemplateInfo,
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
