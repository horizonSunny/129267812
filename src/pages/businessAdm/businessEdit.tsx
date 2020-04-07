import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, Select, Input, Cascader, Radio, Button, Upload, Icon, Modal, message } from 'antd';
import { thisExpression } from '@babel/types';
import styles from './businessEdit.less';
import { newArea } from '../../utils/area.js';
import { serverUrl } from '@/utils/request';

const { Option } = Select;
const options = newArea();

const { Search } = Input;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class BusinessEdit extends Component {
  constructor(props) {
    super(props);
    let tempStoreLive = [];
    let tempLogoUrl = '';
    let tempAdminUrl = '';
    let tempQualification = [];
    if (this.props.businessAdm && this.props.businessAdm.currentRecord) {
      if (this.props.businessAdm.currentRecord.enterpriseQualification) {
        tempQualification = this.props.businessAdm.currentRecord.enterpriseQualification.map(
          (item, index) => {
            return {
              uid: index,
              name: item.name,
              url: item.url,
              status: 'done',
              thumbUrl: item.url,
            };
          },
        );
      }
      if (this.props.businessAdm.currentRecord.storeLive) {
        tempStoreLive = this.props.businessAdm.currentRecord.storeLive.map((item, index) => {
          return {
            uid: index,
            url: item,
            status: 'done',
            thumbUrl: item,
          };
        });
      }
      tempLogoUrl = this.props.businessAdm.currentRecord.tenantLogo;
      tempAdminUrl = this.props.businessAdm.currentRecord.adminCard;
    }
    this.state = {
      uploadUrl: `${serverUrl}/admin/v1/uploadFile`,
      previewVisible: false,
      previewImage: '',
      storeLiveFileList: tempStoreLive || [],
      qualificationFileList: tempQualification || [],
      logoUrl: tempLogoUrl,
      adminUrl: tempAdminUrl,
    };
  }

  phoneValidator = (rule, value, callback) => {
    const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    if (value && value.length > 10 && !reg.test(value)) {
      callback('手机号格式错误!');
    }
    callback();
  };

  handleSave = () => {
    const {
      dispatch,
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (this.state.qualificationFileList.length > 0) {
        this.props.form.setFieldsValue({
          enterpriseQualification: this.state.qualificationFileList,
        });
      }
      if (!err) {
        const params = {
          ...values,
          tenantLogo: this.state.logoUrl,
          adminCard: this.state.adminUrl,
          enterpriseQualification: this.state.qualificationFileList,
          storeLive: this.state.storeLiveFileList,
        };
        dispatch({
          type: 'businessAdm/saveBusiness',
          payload: params,
        }).then(
          data => {
            if (data.code === 1) {
              message.success('保存成功!');
            } else {
              message.info(data.msg);
            }
          },
          () => {
            message.error('网络连接失败,请稍后再试!');
          },
        );
      }
    });
  };

  handleBack = () => {
    router.push('/businessAdm/enter');
  };

  editQualificationName = (type, value, editValue) => {
    const { qualificationFileList } = this.state;
    if (type === 'save') {
      qualificationFileList.map(item => {
        if (item.uid === value.uid) {
          item.name = editValue;
          value.edit = false;
        }
        return item;
      });
    } else {
      qualificationFileList.map(item => {
        if (item.uid === value.uid) {
          value.edit = true;
        }
        return item;
      });
    }
    this.setState({
      qualificationFileList,
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleQualificationChange = ({ fileList }) => this.setState({ qualificationFileList: fileList });

  handleStoreLiveChange = ({ fileList }) => this.setState({ storeLiveFileList: fileList });

  handlePreview = async file => {
    this.setState({
      previewImage: file.thumbUrl || file.url,
      previewVisible: true,
    });
  };

  handleLogoChange = info => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 1) {
        this.setState({
          logoUrl: info.file.response.data,
        });
        this.props.form.setFieldsValue({
          tenantLogo: info.file.response.data,
        });
      }
    }
  };

  handleAdminChange = info => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 1) {
        this.setState({
          adminUrl: info.file.response.data,
        });
        this.props.form.setFieldsValue({
          adminCard: info.file.response.data,
        });
      }
    }
  };

  logoBeforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传指定格式的图片');
    }
    const isLt2M = file.size / 1024 < 300;
    if (!isLt2M) {
      message.error('请注意上传文件大小');
    }
    return isJpgOrPng && isLt2M;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, storeLiveFileList, qualificationFileList } = this.state;
    const { logoUrl, adminUrl } = this.state;
    const { businessAdm } = this.props;
    const headers = {
      Authorization: sessionStorage.getItem('token'),
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const { currentRecord } = businessAdm;
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Form {...formItemLayout}>
              <Form.Item label="企业logo" extra="支持PNG,JPG,JPEG,大小控制在100kb内">
                {getFieldDecorator('tenantLogo', {
                  valuePropName: 'tenantLogo',
                  initialValue: currentRecord.tenantLogo,
                })(
                  <Upload
                    name="file"
                    action={this.state.uploadUrl}
                    accept=".png,.jpg,.jpeg"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.logoBeforeUpload}
                    onChange={this.handleLogoChange}
                    headers={headers}
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item label="企业名称">
                {getFieldDecorator('tenantName', {
                  initialValue: currentRecord.tenantName,
                  rules: [{ required: true, message: '请输入企业名称!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入企业名称" />)}
              </Form.Item>
              <Form.Item label="企业类型">
                {getFieldDecorator('tenantType', {
                  initialValue: currentRecord.tenantType,
                  rules: [{ required: true, message: '请选择企业类型!' }],
                })(
                  <Radio.Group size="large">
                    <Radio.Button value={0}>单体药店</Radio.Button>
                    <Radio.Button value={1}>连锁药店</Radio.Button>
                    <Radio.Button value={2}>批发企业</Radio.Button>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="统一社会信用代码">
                {getFieldDecorator('socialCreditCode', {
                  initialValue: currentRecord.socialCreditCode,
                  rules: [{ required: true, message: '请输入统一社会信用代码!', type: 'string' }],
                })(<Input maxLength={18} placeholder="请输入统一社会信用代码" />)}
              </Form.Item>
              <Form.Item label="店铺所在地">
                {getFieldDecorator('areaData', {
                  initialValue: [
                    currentRecord.provinceCode,
                    currentRecord.cityCode,
                    currentRecord.areaCode,
                  ],
                  rules: [{ required: true, message: '请选择店铺所在地!' }],
                })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
              </Form.Item>
              <Form.Item label="店铺详细地址">
                {getFieldDecorator('address', {
                  initialValue: currentRecord.address,
                  rules: [{ required: true, message: '请输入店铺详细地址!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入店铺详细地址" />)}
              </Form.Item>
              <Form.Item label="法定代表人(负责人)姓名">
                {getFieldDecorator('contactFullName', {
                  initialValue: currentRecord.contactFullName,
                  rules: [{ required: true, message: '请输入法人姓名!', type: 'string' }],
                })(<Input maxLength={5} placeholder="请输入法人姓名" />)}
              </Form.Item>
              <Form.Item label="管理员姓名">
                {getFieldDecorator('adminName', {
                  initialValue: currentRecord.adminName,
                  rules: [{ required: true, message: '请输入管理员姓名!', type: 'string' }],
                })(<Input maxLength={5} placeholder="请输入管理员姓名" />)}
              </Form.Item>
              <Form.Item label="管理员手机号">
                {getFieldDecorator('adminTel', {
                  initialValue: currentRecord.adminTel,
                  rules: [
                    { required: true, message: '请输入管理员手机号!' },
                    { validator: this.phoneValidator },
                  ],
                })(
                  <Input
                    maxLength={11}
                    onkeyup="value=value.replace(/\D/g,'')"
                    placeholder="请输入管理员手机号"
                  />,
                )}
              </Form.Item>
              <Form.Item label="管理员手持身份证照片" extra="支持PNG,JPG,JPEG,大小控制在300kb内">
                {getFieldDecorator('adminCard', {
                  valuePropName: 'adminCard',
                  initialValue: currentRecord.adminCard,
                })(
                  <Upload
                    name="file"
                    accept=".png,.jpg,.jpeg"
                    action={this.state.uploadUrl}
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.logoBeforeUpload}
                    onChange={this.handleAdminChange}
                    headers={headers}
                  >
                    {adminUrl ? (
                      <img src={adminUrl} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item label="用户名">
                {getFieldDecorator('userName', {
                  initialValue: currentRecord.userName,
                  rules: [{ required: true, message: '请输入用户名!', type: 'string' }],
                })(<Input maxLength={18} placeholder="请输入用户名" />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  initialValue: currentRecord.password,
                  rules: [{ required: true, message: '请输入密码!', type: 'string' }],
                })(<Input maxLength={18} placeholder="请输入密码" />)}
              </Form.Item>
              <Form.Item label="企业资质" extra="支持PNG,JPG,JPEG,大小控制在300kb内,最多上传10张">
                {getFieldDecorator('enterpriseQualification', {
                  valuePropName: 'fileList',
                  initialValue: qualificationFileList,
                  rules: [{ required: true, message: '请上传资质照片!' }],
                })(
                  <Fragment>
                    <Upload
                      className={`${styles.qualificationUpload}`}
                      action={this.state.uploadUrl}
                      listType="picture-card"
                      fileList={qualificationFileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleQualificationChange}
                      accept=".png,.jpg,.jpeg"
                      headers={headers}
                    >
                      {qualificationFileList.length >= 10 ? null : uploadButton}
                    </Upload>
                    <span className={`${styles.editContent}`}>
                      {qualificationFileList.map(item => {
                        return (
                          <Fragment>
                            <div className={`${styles.editName}`}>
                              {!item.edit ? (
                                <span
                                  key={item.uid}
                                  onClick={e => this.editQualificationName('edit', item, '')}
                                >
                                  {item.name}
                                  <Icon type="edit" />
                                </span>
                              ) : (
                                <Search
                                  key={item.uid}
                                  enterButton="保存"
                                  defaultValue={item.name}
                                  size="small"
                                  onSearch={value =>
                                    this.editQualificationName('save', item, value)
                                  }
                                />
                              )
                              // <Input key={item.uid} maxLength={20} addonAfter={<Button size="small" type="primary" onClick={(e) => this.editQualificationName(e,defaultName)} icon="save" />} defaultValue={defaultName} />}
                              }
                            </div>
                          </Fragment>
                        );
                      })}
                    </span>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </Fragment>,
                )}
              </Form.Item>
              <Form.Item label="店铺实景" extra="支持PNG,JPG,JPEG,大小控制在300kb内,最多上传10张">
                {getFieldDecorator('storeLive', {
                  valuePropName: 'fileList',
                  initialValue: storeLiveFileList,
                })(
                  <Fragment>
                    <Upload
                      action={this.state.uploadUrl}
                      listType="picture-card"
                      fileList={storeLiveFileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleStoreLiveChange}
                      accept=".png,.jpg,.jpeg"
                      headers={headers}
                    >
                      {storeLiveFileList.length >= 10 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </Fragment>,
                )}
              </Form.Item>
            </Form>
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary" onClick={this.handleSave}>
              保存
            </Button>
            <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(BusinessEdit);
