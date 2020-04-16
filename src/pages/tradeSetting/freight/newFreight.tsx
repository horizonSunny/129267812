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

  handleSubmit = e => {
    e.preventDefault();
    const { freightTemplateInfo } = this.props.tradeSetting;
    this.props.form.setFieldsValue({
      templateFreight: freightTemplateInfo,
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        if (dispatch) {
          const _this = this;
          async function step() {
            await dispatch({
              type: 'tradeSetting/changeTemplateName',
              payload: {
                templateName: values.templateName,
                templateType: values.templateType,
              },
            });
            await dispatch({
              type: 'tradeSetting/newFreight',
              payload: _this.props.tradeSetting.freightTemplateInfo,
            });
          }
          step();
          // dispatch({
          //   type: 'tradeSetting/newFreight',
          //   payload: this.props.tradeSetting.freightTemplateInfo,
          // });
        }
        // const _this = this;
        // setTimeout(() => {
        //   console.log('templateFreight_submit', _this.props.tradeSetting.freightTemplateInfo);
        // }, 100);
      }
    });
  };

  // 数据变了但表单数据没有变化导致的

  onChange = e => {
    // console.log('radio checked', e.target.value);
    // this.setState({
    //   value: e.target.value,
    // });
  };

  checkFreightArea = (rule, value, callback) => {
    const { firstNum, firstPrice, continuePrice } = this.props.tradeSetting.freightTemplateInfo;
    if (
      typeof firstNum !== 'number' ||
      typeof firstPrice !== 'number' ||
      typeof continuePrice !== 'number'
    ) {
      callback('请填写默认模版信息');
    } else {
      const { areaFreights } = this.props.tradeSetting.freightTemplateInfo;
      // for(let item=0;item<areaFreight.length;item++)
      for (let index = 0; index < areaFreights.length; index++) {
        const element = areaFreights[index];
        const {
          firstNum: areaFirstNum,
          firstPrice: areaFirstPrice,
          continuePrice: areaContinuePrice,
        } = element;
        console.log('element_', element);
        if (element.areas.length === 0) {
          callback('请填写指定区域');
          return;
        }
        if (
          typeof areaFirstNum !== 'number' ||
          typeof areaFirstPrice !== 'number' ||
          typeof areaContinuePrice !== 'number'
        ) {
          callback('请填写指定区域运费详情');
          return;
        }
      }
      callback();
    }
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
                  message: '请填写运费详情',
                },
                {
                  validator: this.checkFreightArea.bind(this),
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
            {/* <Button type="primary" htmlType="submit"> */}
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
