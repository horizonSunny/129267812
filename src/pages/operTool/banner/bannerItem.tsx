import React from 'react';
import { Tag, Form, Input, Upload, Icon, message, Button, TreeSelect } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './bannerItem.less';
import { connect } from 'dva';
import router from 'umi/router';
import { serverUrl } from '@/utils/request';
import { filterTreeStatus, comparisonObject } from '@/utils/filterProperty';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
@connect(({ banner }) => ({
  banner,
}))
class BannerItem extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.banner.categoryItem.image,
    value: '',
  };

  componentDidMount() {}

  // 上传图片变化
  handleChange = ({ fileList, file, event }) => {
    console.log('file_', file);
    console.log('fileList_', fileList);
    this.setState({
      imageUrl: file.response ? file.response.data : '',
    });
    // this.props.onChange(fileList);
  };

  getPdfURL = () => {
    const props = {
      name: 'file',
      action: `${serverUrl}/admin/v1/uploadFile`,
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    };
    return props;
  };

  // 提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.setFieldsValue({
      img: this.state.imageUrl ? this.state.imageUrl : '',
      cateClassify: this.state.tags ? this.state.tags : '',
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'banner/newCategoryItem',
            payload: {
              categoryIds: ids,
              image: this.state.imageUrl,
              quickCategoryId: this.props.banner.categoryItem.quickCategoryId
                ? this.props.banner.categoryItem.quickCategoryId
                : undefined,
              bannerName: values.cateName,
            },
          }).then(res => {
            router.push('/banner/findCommodity');
          });
        }
      }
    });
  };

  render() {
    // 上传图片
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    // form表单
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { tags } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('cateName', {
              initialValue: this.props.banner.categoryItem.bannerName,
              rules: [
                {
                  required: true,
                  message: '请填写banner名称!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="跳转链接">
            {getFieldDecorator('redirectUrl', {
              initialValue: this.props.banner.categoryItem.redirectUrl,
              rules: [
                {
                  message: '请输入跳转链接!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="分类Icon">
            {getFieldDecorator('img', {
              rules: [
                {
                  required: true,
                  message: '请选择分类图片!',
                },
              ],
            })(
              <Upload
                {...this.getPdfURL()}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>,
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
      </PageHeaderWrapper>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'bannerItem' })(BannerItem);

export default WrappedEditForm;
