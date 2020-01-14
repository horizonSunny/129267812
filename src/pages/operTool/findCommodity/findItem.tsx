import React from 'react';
import { Tag, Form, Input, Upload, Icon, message, Button, TreeSelect } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './findItem.less';
import { connect } from 'dva';
import { serverUrl } from '@/utils/request';
import { filterTreeStatus, comparisonObject } from '@/utils/filterProperty';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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
// tags
function Tags(props) {
  return props.tags.map(item => {
    return (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          props.handleClose(item);
        }}
      >
        {item.map((info, index) => {
          return index + 1 !== item.length ? info['cateName'] + '/' : info['cateName'];
        })}
      </Tag>
    );
  });
}

@connect(({ operTool }) => ({
  operTool,
}))
class FindItem extends React.Component {
  state = {
    loading: false,
    tags: this.props.operTool.categoryItem['categorys'],
    imageUrl: this.props.operTool.categoryItem['image'],
    value: '',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'operTool/categoryTree',
      });
    }
  }
  // 上传图片变化
  handleChange = ({ fileList, file, event }) => {
    console.log('file_', file);
    console.log('fileList_', fileList);
    this.setState({
      imageUrl: file['response'] ? file['response']['data'] : '',
    });
    // this.props.onChange(fileList);
  };
  getPdfURL = () => {
    const _this = this;
    const props = {
      name: 'file',
      action: serverUrl + '/admin/v1/uploadFile',
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
        console.log('Received values of form: ', values);
      }
    });
    console.log('this.state.imageUrl_', this.state.imageUrl);
  };
  //  关闭标签
  handleClose(tag) {
    console.log('tag_', this.state.tags);
    const newTags = this.state.tags.filter(item => {
      const compare = comparisonObject(item, tag);
      if (!compare) {
        return item;
      }
    });
    this.setState({
      tags: newTags,
    });
  }
  // 树状选择
  treeSelectChange(value) {
    // console.log('value_', value);
    this.setState({ value });
    const newArr = value.split('_');
    const filterArr = filterTreeStatus(this.props.operTool.categoryTree, newArr, 0);
    this.state.tags.push(filterArr);
  }
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
      <PageHeaderWrapper className={styles['main']}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
          <Form.Item label="分类名称">
            {getFieldDecorator('cateName', {
              initialValue: this.props.operTool.categoryItem['quickCategoryName'],
              rules: [
                {
                  required: true,
                  message: '请填写分类名称!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="关联商品分类">
            {getFieldDecorator('cateClassify', {
              initialValue: this.props.operTool.categoryItem['quickCategoryName'],
              rules: [
                {
                  required: true,
                  message: '请选择关联商品分类!',
                },
              ],
            })(
              <div>
                <Tags tags={tags} handleClose={this.handleClose.bind(this)}></Tags>
                <TreeSelect
                  style={{ width: '70%' }}
                  label="请选择分类"
                  value={this.state.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={this.props.operTool.categoryTree}
                  placeholder="Please select"
                  onChange={this.treeSelectChange.bind(this)}
                  suffixIcon={
                    <Icon
                      type="plus-circle"
                      style={{
                        fontSize: '14px',
                      }}
                    />
                  }
                />

                {/* <Button
                  style={{ marginLeft: '10px' }}
                  type="primary"
                  icon="plus-circle"
                  size="small"
                /> */}
              </div>,
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
const WrappedEditForm = Form.create({ name: 'findItem' })(FindItem);

export default WrappedEditForm;
