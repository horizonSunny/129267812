import { Form, Input, Select, Radio, Button, TreeSelect } from 'antd';
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
class EditForm extends React.Component {
  state = {
    formInit: this.props.commodity.productWithId,
    editorState: null,
    productType: this.props.commodity.allProductType,
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
      console.log('location_', routerParams(location.search));
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
        type: typeInfo,
        payload: value,
      }).then(() => {
        router.push('/commodityAdm/management');
      });
    }
  };

  onChange = e => {};

  // 判断
  validatorImg = (rule, value, callback) => {
    console.log('validatorImg_', value);
    callback();
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formInit } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { editorState } = this.state;
    // 不在控制栏显示的控件
    const excludeControls = ['media', 'emoji'];
    const { productType } = this.state;
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
          })(<CommodityImg onRef={this.onRef} />)}
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品类别">
          {getFieldDecorator('productType', {
            rules: [
              {
                required: true,
                message: '请选择商品类别',
              },
            ],
            initialValue: formInit.productType[0],
          })(
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={productType}
              placeholder="Please select"
            />,
          )}
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
              <Radio value={0}>
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
              <Radio value={1}>
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
              <Radio value={2}>
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
              <Radio value={3}>
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
        <Form.Item label="商品品牌">
          {getFieldDecorator('productBrand', {
            rules: [
              {
                required: true,
                message: '请填写你的商品品牌',
              },
            ],
            initialValue: formInit.productBrand,
          })(<Input />)}
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
          })(<Input.TextArea />)}
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="产品规格">
          {getFieldDecorator('productSpecif', {
            rules: [
              {
                required: true,
                message: '请填写你的产品规格',
              },
            ],
            initialValue: formInit.productSpecif,
          })(<Input />)}
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="英文名">
          {getFieldDecorator('englishName', {
            rules: [],
            initialValue: formInit.englishName ? formInit.englishName : '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="汉语拼音">
          {getFieldDecorator('pinyin', {
            rules: [],
            initialValue: formInit.pinyin ? formInit.pinyin : '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="产品有效期">
          {getFieldDecorator('productExpire', {
            rules: [
              {
                required: true,
                message: '请填写你的产品有效期',
              },
            ],
            initialValue: formInit.productExpire,
          })(<Input />)}
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
          })(<Input />)}
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
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit' })(EditForm);

export default WrappedEditForm;
