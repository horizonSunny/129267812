import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  TreeSelect,
  InputNumber,
  Switch,
  Cascader,
} from 'antd';
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
import { filterLabel } from '@/utils/filterProperty';

const { Option } = Select;
const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};

@connect(({ commodity }) => ({ commodity }))
class EditForm extends React.Component {
  state = {
    formInit: this.props.commodity.productWithId,
    editorState: null,
    productType: this.props.commodity.allProductType,
    // 判断点击编辑还是添加
    // editIfadd：this.props.handleNew,
  };

  onRef = ref => {
    this.child = ref;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    let validateValue = false;
    // 通过子组件getImgList方法获取list,处理list,这边msg后面要修改
    const imgList = this.child.getImgList();
    const list = imgList.map(item => {
      if (item.hasOwnProperty('url')) {
        return item.url;
      }
      return item.response.data;
    });
    this.props.form.setFieldsValue({
      productImage: list,
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('values[productImage]_', values.productImage);
      if (!err) {
        validateValue = true;
      }
    });
    if (validateValue) {
      // console.log('location_', routerParams(location.search));
      const params = routerParams(location.search);
      const typeInfo = params.id ? 'commodity/editProduct' : 'commodity/newProduct';
      // 判断是不是编辑
      const value = this.props.form.getFieldsValue();
      value.productSpec = value.productSpec.toHTML();
      if (params.id) {
        value.productId = this.props.commodity.productWithId.productId;
      }
      value.productType = [value.productType];
      dispatch({
        type: 'commodity/saveProduct',
        payload: value,
      });
      // .then(() => {
      //   // 调用父组件上的modifyFormPage方法;
      this.props.modifyFormPage(false);
      // });
    }
  };

  // 判断
  validatorImg = (rule, value, callback) => {
    console.log('validatorImg_', value);
    callback();
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    console.log('lalalalala2');

    const str = window.location.search;
    const type = str.split('?')[1].split('=')[1];
    const { getFieldDecorator } = this.props.form;
    const { formInit, isFirstpage } = this.state;
    const { editorState } = this.state;
    // 不在控制栏显示的控件
    const excludeControls = ['media', 'emoji'];
    const { productType } = this.state;

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
    const labelCast = filterLabel(this.props.commodity.allProductType);
    return (
      <Form className={styles.main} {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="商品图">
          {getFieldDecorator('productImage', {
            rules: [
              {
                required: true,
                message: '请填写你的商品图片',
              },
            ],
            initialValue: formInit.productImage,
          })(
            <div>
              <CommodityImg onRef={this.onRef} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#E7A310',
                  lineHeight: '10px',
                }}
              >
                支持PNG、JPG、JPEG，大小控制在300KB内，最多添加16张
              </div>
            </div>,
          )}
        </Form.Item>
        <Form.Item label="商品品牌">
          {getFieldDecorator('productBrand', {
            rules: [
              {
                required: true,
                message: '请填写你的商品品牌',
              },
            ],
            initialValue: formInit.productBrand,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="通用名">
          {getFieldDecorator('productCommonName', {
            rules: [
              {
                required: true,
                message: '请填写你的商品名称',
              },
            ],
            initialValue: formInit.productCommonName,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="是否处方药">
          {getFieldDecorator('isMp', {
            rules: [
              {
                required: true,
                message: '请确认药品类别',
              },
            ],
            initialValue: formInit.isMp,
          })(
            <Radio.Group>
              <Radio value={0} disabled={type === '1'}>
                <LabelInfo
                  text="otc"
                  classInfo={Object.assign(
                    {
                      border: '1px solid green',
                      color: 'green',
                    },
                    isMapClass,
                  )}
                />
              </Radio>
              <Radio value={1} disabled={type === '1'}>
                <LabelInfo
                  text="otc"
                  classInfo={Object.assign(
                    {
                      border: '1px solid red',
                      color: 'red',
                    },
                    isMapClass,
                  )}
                />
              </Radio>
              <Radio value={2} disabled={type === '1'}>
                <LabelInfo
                  text="Rx"
                  classInfo={Object.assign(
                    {
                      border: '1px solid red',
                      color: 'red',
                    },
                    isMapClass,
                  )}
                />
              </Radio>
              <Radio value={3} disabled={type === '1'}>
                <LabelInfo
                  text="其他"
                  classInfo={Object.assign(
                    {
                      border: '1px solid rgb(136,136,136)',
                      color: 'rgb(136,136,136)',
                    },
                    isMapClass,
                  )}
                />
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="批准文号">
          {getFieldDecorator('approvalNumber', {
            rules: [
              {
                required: true,
                message: '请填写你的批准文号',
              },
            ],
            initialValue: formInit.approvalNumber,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="包装规格">
          {getFieldDecorator('productSpecif', {
            rules: [
              {
                required: true,
                message: '请填写你的产品规格',
              },
            ],
            initialValue: formInit.productSpecif,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="有效期">
          {getFieldDecorator('productExpire', {
            rules: [
              {
                required: true,
                message: '请填写你的产品有效期',
              },
            ],
            initialValue: formInit.productExpire,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="商品类别">
          {getFieldDecorator('productType', {
            rules: [
              {
                required: true,
                message: '请选择商品类别',
              },
            ],

            initialValue: formInit.productType,
          })(
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={productType}
              placeholder="请选择商品类别"
              // 支持多选
              multiple
            />,
            // <Cascader
            //   style={{ width: '100%' }}
            //   options={labelCast}
            //   placeholder="请选择商品类别"
            //   disabled={type === '1'}
            // />,
          )}
        </Form.Item>
        <Form.Item label="商品简介">
          {getFieldDecorator('productDesc', {
            rules: [
              {
                required: true,
                message: '请填写你的商品简介',
              },
            ],
            initialValue: formInit.productDesc,
          })(<Input.TextArea disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="生产企业">
          {getFieldDecorator('manufacturer', {
            rules: [
              {
                required: true,
                message: '请填写你的生产企业',
              },
            ],
            initialValue: formInit.manufacturer,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="剂型/型号">
          {getFieldDecorator('productModel', {
            rules: [
              {
                required: true,
                message: '请填写你的剂型/型号',
              },
            ],
            initialValue: formInit.productModel,
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="英文名">
          {getFieldDecorator('englishName', {
            rules: [],
            initialValue: formInit.englishName ? formInit.englishName : '',
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="汉语拼音">
          {getFieldDecorator('pinyin', {
            rules: [],
            initialValue: formInit.pinyin ? formInit.pinyin : '',
          })(<Input disabled={type === '1'} />)}
        </Form.Item>
        <Form.Item label="说明书">
          {getFieldDecorator('productSpec', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容');
                  } else {
                    callback();
                  }
                },
              },
            ],
            initialValue: BraftEditor.createEditorState(formInit.productSpec),
          })(
            <BraftEditor
              style={{ border: '1px solid #d1d1d1', borderRadius: 5 }}
              placeholder="请输入正文内容"
              value={editorState}
              onChange={this.handleEditorChange}
              excludeControls={excludeControls}
              disabled={type === '1'}
            />,
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit' })(EditForm);

export default WrappedEditForm;
