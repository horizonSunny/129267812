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
import platformAuditImg from './platformAuditImg';
import LabelInfo from '../../../../../components/Label/label';
import styles from './Form.less';
import Login from '@/pages/user/login/components/Login';

const { Option } = Select;

@connect(({ platformAudit, tradeSetting }) => ({ platformAudit, tradeSetting }))
class NextForm extends React.Component {
  state = {
    formInit: this.props.platformAudit.productWithId,
  };

  componentDidMount() {}

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
    //   const typeInfo = params.id ? 'platformAudit/editProduct' : 'platformAudit/newProduct';
    //   // 判断是不是编辑
    //   const value = this.props.form.getFieldsValue();
    //   value.productSpec = value.productSpec.toHTML();
    //   if (params.id) {
    //     value.productId = this.props.platformAudit.productWithId.productId;
    //   }
    //   value.productType = [value.productType];
    //   // dispatch({
    //   //   type: typeInfo,
    //   //   payload: value,
    //   // }).then(() => {
    //   //   // router.push('/platformAuditAdm/management');
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
      type: 'platformAudit/saveProduct',
      payload: params,
    });
    // console.log('params_', params);
    this.props.modifyFormPage(true);
  };

  checkboxChange = value => {
    console.log('value_', value);
    const { dispatch } = this.props;
    const { productDeliveryTemplate } = this.props.platformAudit;
    productDeliveryTemplate.hasSelectTemplate = value;
    dispatch({
      type: 'platformAudit/setProductDeliveryTemplate',
      payload: productDeliveryTemplate,
    });
  };

  handleChange = (name, value) => {
    const { freightList } = this.props.tradeSetting;
    const templateInfo = freightList.pageList.find(item => {
      return item.freightTemplateId === value;
    });
    const { productDeliveryTemplate } = this.props.platformAudit;
    productDeliveryTemplate[name] = templateInfo;
    console.log('name_', name, '_value_', value);
    console.log('productDeliveryTemplate_', productDeliveryTemplate);
    const { dispatch } = this.props;
    dispatch({
      type: 'platformAudit/setProductDeliveryTemplate',
      payload: productDeliveryTemplate,
    });
  };

  // 保存是否上下架
  saveForm = isShelf => {
    const { dispatch } = this.props;
    const { productWithId } = this.props.platformAudit;
    const {
      ordinaryTemplate,
      urgentTemplate,
      hasSelectTemplate,
    } = this.props.platformAudit.productDeliveryTemplate;
    // 对全部模版进行一个校验
    const freightTemplateIds = [];
    if (ordinaryTemplate && hasSelectTemplate.indexOf(1) > -1) {
      freightTemplateIds.push(ordinaryTemplate.freightTemplateId);
    }
    if (urgentTemplate && hasSelectTemplate.indexOf(2) > -1) {
      freightTemplateIds.push(urgentTemplate.freightTemplateId);
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // if()
        const { getFieldValue } = this.props.form;
        const params = {
          freightTemplateIds,
          recommandStatus: getFieldValue('recommandStatus') ? 1 : 0,
          price: getFieldValue('price'),
          stock: getFieldValue('stock'),
          isShelf,
        };
        // 依据路由来判断是不是编辑
        const paramsInfo = routerParams(location.search);
        const typeInfo = paramsInfo.id ? 'platformAudit/editProduct' : 'platformAudit/newProduct';
        const _this = this;
        async function saveProduct() {
          await dispatch({
            type: 'platformAudit/saveProduct',
            payload: params,
          });
          const productInfo = _this.props.platformAudit.productWithId;
          console.log('params_', params);
          console.log('productInfo_', productInfo);
          await dispatch({
            type: typeInfo,
            payload: productInfo,
          });
          router.push('/platformAuditAdm/management');
        }
        saveProduct();
      }
    });
  };

  // 检查
  deliveryCheck = (rule, value, callback) => {
    const {
      ordinaryTemplate,
      urgentTemplate,
      hasSelectTemplate,
    } = this.props.platformAudit.productDeliveryTemplate;
    if (hasSelectTemplate.length === 0) {
      callback('请选择运费模版');
    }
    if (hasSelectTemplate.length !== 0) {
      const ordinaryChecked = hasSelectTemplate.indexOf(1) > -1 && ordinaryTemplate;
      const urgentChecked = hasSelectTemplate.indexOf(2) > -1 && urgentTemplate;
      if (!(ordinaryChecked || urgentChecked)) {
        callback('请选择快递方式');
      }
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formInit } = this.state;
    const { productDeliveryTemplate } = this.props.platformAudit;

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
    // 设置小数点为2位
    const limitDecimals = (value: string | number): string => {
      const reg = /^(\-)*(\d+)\.(\d\d).*$/;
      console.log(value);
      if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : '';
      }
      if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : '';
      }
      return '';
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
            })(
              <InputNumber
                min={0}
                style={{ width: '90%' }}
                step={0.0}
                formatter={limitDecimals}
                parser={limitDecimals}
              />,
            )}
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
            })(<InputNumber min={0} step={1} style={{ width: '90%' }} precision={0} />)}
            <span>&nbsp;&nbsp;件</span>
          </Form.Item>
          <Form.Item label="快递方式">
            {getFieldDecorator('delivery', {
              rules: [
                {
                  required: true,
                  message: '选择你的快递模版',
                },
                {
                  validator: this.deliveryCheck.bind(this),
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
            <Button onClick={this.saveForm.bind(this, 0)} style={{ margin: '0px 20px' }}>
              保存到已下架
            </Button>
            <Button onClick={this.saveForm.bind(this, 1)} type="primary">
              上架出售
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNextForm = Form.create({ name: 'edit' })(NextForm);

export default WrappedNextForm;
