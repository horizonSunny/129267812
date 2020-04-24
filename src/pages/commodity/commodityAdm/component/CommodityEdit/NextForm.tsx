import { Form, Select, Radio, Button, InputNumber, Switch, Checkbox } from 'antd';
import React from 'react';
import router from 'umi/router';
// 引入富文本编辑器
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { connect } from 'dva';
import { callbackify } from 'util';
import routerParams from '@/utils/routerParams';
import Item from 'antd/lib/list/Item';
import CommodityImg from './CommodityImg';
import LabelInfo from '../../../../../components/Label/label';
import styles from './Form.less';

const { Option } = Select;

@connect(({ commodity, tradeSetting }) => ({ commodity, tradeSetting }))
class NextForm extends React.Component {
  state = {
    formInit: this.props.commodity.productWithId,
  };

  componentDidMount() {
    // 获取产品中保存的运费模版
  }

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
    const { dispatch } = this.props;
    const { getFieldValue } = this.props.form;
    const params = {
      recommandStatus: getFieldValue('recommandStatus'),
      price: getFieldValue('price'),
      stock: getFieldValue('stock'),
    };
    dispatch({
      type: 'commodity/saveProduct',
      payload: params,
    });
    // console.log('params_', params);
    this.props.modifyFormPage(true);
  };

  checkboxChange = value => {
    console.log('value_', value);
    const { dispatch } = this.props;
    const { productDeliveryTemplate } = this.props.commodity;
    productDeliveryTemplate.hasSelectTemplate = value;
    dispatch({
      type: 'commodity/setProductDeliveryTemplate',
      payload: productDeliveryTemplate,
    });
  };

  handleChange = (name, value) => {
    const { freightList } = this.props.tradeSetting;
    const templateInfo = freightList.pageList.find(item => {
      return item.freightTemplateId === value;
    });
    const { productDeliveryTemplate } = this.props.commodity;
    productDeliveryTemplate[name] = templateInfo;
    console.log('name_', name, '_value_', value);
    console.log('productDeliveryTemplate_', productDeliveryTemplate);
    const { dispatch } = this.props;
    dispatch({
      type: 'commodity/setProductDeliveryTemplate',
      payload: productDeliveryTemplate,
    });
  };

  commitSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formInit } = this.state;
    const { productDeliveryTemplate } = this.props.commodity;
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
      marginLeft: '0px',
    };
    // 获取到模版,然后进行模版划分,设置options值
    const { freightList } = this.props.tradeSetting;
    const ordinary = [];
    const urgent = [];
    freightList.pageList.map(item => {
      if (item.templateType === 2) {
        urgent.push(item);
      } else {
        ordinary.push(item);
      }
    });
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
          <Form.Item label="快递方式">
            {getFieldDecorator('delivery', {
              rules: [
                {
                  required: true,
                  message: '选择你的快递模版',
                },
              ],
              // initialValue: formInit.stock ? formInit.stock : '',
              initialValue: productDeliveryTemplate.hasSelectTemplate,
            })(
              <Checkbox.Group onChange={this.checkboxChange}>
                <Checkbox style={radioStyle} value={1}>
                  普通快递:&nbsp;&nbsp;
                  <Select
                    defaultValue={
                      productDeliveryTemplate.ordinaryTemplate
                        ? productDeliveryTemplate.ordinaryTemplate.freightTemplateId
                        : ''
                    }
                    style={{ width: 250 }}
                    onChange={value => this.handleChange('ordinaryTemplate', value)}
                  >
                    {ordinary.map(item => {
                      return <Option value={item.freightTemplateId}>{item.templateName}</Option>;
                    })}
                  </Select>
                </Checkbox>
                <Checkbox style={radioStyle} value={2}>
                  加急快递:&nbsp;&nbsp;
                  <Select
                    defaultValue={
                      productDeliveryTemplate.urgentTemplate
                        ? productDeliveryTemplate.urgentTemplate.freightTemplateId
                        : ''
                    }
                    style={{ width: 250 }}
                    onChange={value => this.handleChange('urgentTemplate', value)}
                  >
                    {/* urgent.map() <Option value="jack">Jack</Option> */}
                    {urgent.map(item => {
                      return <Option value={item.freightTemplateId}>{item.templateName}</Option>;
                    })}
                  </Select>
                </Checkbox>
              </Checkbox.Group>,
            )}
          </Form.Item>
          <Form.Item label="是否推荐产品">
            {getFieldDecorator('recommandStatus', {
              initialValue: formInit.recommandStatus ? formInit.recommandStatus : '',
            })(
              <Switch
                style={{ marginLeft: '20px' }}
                defaultChecked={formInit.recommandStatus || formInit.recommandStatus === 1}
              />,
            )}
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
