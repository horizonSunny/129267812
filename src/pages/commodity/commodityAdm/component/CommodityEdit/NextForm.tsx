import { Form, Input, Select, Radio, Button, TreeSelect, InputNumber, Switch } from 'antd';
import React from 'react';
import styles from './Form.less';
import LabelInfo from '../../../../../components/Label/label';
import CommodityImg from './CommodityImg';
import router from 'umi/router';
// 引入富文本编辑器
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { connect } from 'dva';
import { callbackify } from 'util';
import routerParams from '@/utils/routerParams';

const { Option } = Select;
const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};
@connect(({ commodity }) => ({ commodity }))
class NextForm extends React.Component {
  state = {
    formInit: this.props.commodity.productWithId,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    let validateValue = false;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('values[productImage]_', values.productImage);
      if (!err) {
        validateValue = true;
        this.setState({
          isFirstpage: false,
        });
      }
    });
    // if (validateValue) {
    //   console.log('location_', routerParams(location.search));
    //   const params = routerParams(location.search);
    //   const typeInfo = params.id ? 'commodity/editProduct' : 'commodity/newProduct';
    //   // 判断是不是编辑
    //   const value = this.props.form.getFieldsValue();
    //   value.productSpec = value.productSpec.toHTML();
    //   if (params.id) {
    //     value.productId = this.props.commodity.productWithId.productId;
    //   }
    //   value.productType = [value.productType];
    //   // dispatch({
    //   //   type: typeInfo,
    //   //   payload: value,
    //   // }).then(() => {
    //   //   // router.push('/commodityAdm/management');
    //   // });
    // }
  };

  goForward = e => {
    // 调用父组件上的modifyFormPage方法
    this.props.modifyFormPage(true);
  };

  radioChange = () => {};

  handleChange = () => {};

  commitSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formInit, isFirstpage } = this.state;
    const { editorState } = this.state;
    // 不在控制栏显示的控件
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
    const radioStyle = {
      display: 'block',
      height: '50px',
      lineHeight: '30px',
    };
    return (
      <div>
        <Form className={styles.main} {...formItemLayout} onSubmit={this.commitSubmit}>
          <Form.Item label="价格">
            {getFieldDecorator('price', {
              rules: [
                {
                  required: true,
                  message: '请填写你的商品价格',
                },
              ],
              initialValue: formInit.price ? formInit.price : '',
            })(<InputNumber min={0} style={{ width: '90%' }} />)}
            <span>&nbsp;&nbsp;元</span>
          </Form.Item>
          <Form.Item label="库存">
            {getFieldDecorator('stock', {
              rules: [
                {
                  required: true,
                  message: '请填写你的商品库存',
                },
              ],
              initialValue: formInit.stock ? formInit.stock : '',
            })(<InputNumber min={0} style={{ width: '90%' }} />)}
            <span>&nbsp;&nbsp;件</span>
          </Form.Item>
          <Form.Item label="快捷方式">
            {getFieldDecorator('stock', {
              rules: [
                {
                  required: true,
                  message: '请填写你的商品库存',
                },
              ],
              initialValue: formInit.stock ? formInit.stock : '',
            })(
              <Radio.Group onChange={this.radioChange} value={1}>
                <Radio style={radioStyle} value={1}>
                  普通快递:&nbsp;&nbsp;
                  <Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Radio>
                <Radio style={radioStyle} value={2}>
                  加急快递:&nbsp;&nbsp;
                  <Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="是否推荐产品">
            {getFieldDecorator('recommandStatus', {
              initialValue: formInit.recommandStatus ? formInit.recommandStatus : '',
            })(<Switch style={{ marginLeft: '20px' }} />)}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button onClick={this.goForward}>上一步</Button>
            <Button style={{ margin: '0px 20px' }}>保存到已下架</Button>
            <Button type="primary">上架出售</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNextForm = Form.create({ name: 'edit' })(NextForm);

export default WrappedNextForm;
