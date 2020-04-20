import React from 'react';
import { Form, Button, Input, Cascader, TimePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import moment from 'moment';
import styles from './newSelfDelivery.less';
import { newArea } from '@/utils/area.js';
import { filterAreaNameInfo } from '@/utils/filterProperty';
import { formatDate } from '@/utils/utils';
// const { Search } = Input;
const options = newArea();
@connect(({ selfDelivery }) => ({
  selfDelivery,
}))
class FormSelfDelivery extends React.Component {
  componentDidMount() {}

  state = {
    hebdomad: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
  };

  // phoneValidator = (rule, value, callback) => {
  //   const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  //   if (value && value.length > 10 && !reg.test(value)) {
  //     callback('手机号格式错误!');
  //   }
  //   callback();
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const areaName = filterAreaNameInfo(values.areaData, 'findName');
      const params = {
        tenantName: values.tenantName,
        address: values.address,
        adminTel: values.adminTel,
        province: areaName[0],
        city: areaName[1],
        area: areaName[2],
        isPick: this.props.selfDelivery.pickUpForm.isPick,
        businessDate: values.hebdomad,
        businessHours: `${formatDate(values.startTime)}-${formatDate(values.endTime)}`,
      };
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'selfDelivery/openPickUp',
          payload: params,
        });
      }
    });
  };

  timeChange = (time, isStart) => {
    console.log('this.props.form.getFieldsValue()_', this.props.form.getFieldsValue());
    if (isStart) {
      this.props.form.setFieldsValue({
        startTime: time,
      });
    } else {
      this.props.form.setFieldsValue({
        endTime: time,
      });
    }
  };

  onOpenChange = info => {
    console.log('this.props.form.getFieldsValue()_', this.props.form.getFieldsValue());
    const { startTime, endTime } = this.props.form.getFieldsValue();
    const sTime = Date.parse(startTime._d);
    const eTime = Date.parse(endTime._d);
    console.log('isStart', sTime > eTime);
    if (sTime > eTime) {
      this.props.form.setFieldsValue({
        startTime: endTime,
        endTime: startTime,
      });
    }
    // this.props.form.setFieldsValue({
    //   startTime: moment('12:00:00', 'HH:mm:ss'),
    //   endTime: moment('12:00:00', 'HH:mm:ss'),
    // });
  };

  // 改变周期
  hebdomadChange = item => {
    console.log('item_', item);
    // console.log('this.props.form_', this.props.form.getFieldValue('hebdomad'));
    const hasSelectHed = this.props.form.getFieldValue('hebdomad');
    const index = hasSelectHed.indexOf(item);
    if (index > -1) {
      hasSelectHed.splice(index, 1);
    } else {
      hasSelectHed.push(item);
    }
    this.props.form.setFieldsValue({
      hebdomad: hasSelectHed,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pickUpForm } = this.props.selfDelivery;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { startTime, endTime, hebdomad } = this.state;
    return (
      <PageHeaderWrapper>
        <Form className={styles.main} {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="自提点">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: pickUpForm.tenantName,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所在区域">
            {getFieldDecorator('areaData', {
              initialValue:
                pickUpForm.province !== ''
                  ? [pickUpForm.province, pickUpForm.city, pickUpForm.area]
                  : [],
              rules: [{ required: true, message: '请选择店铺所在地!' }],
            })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请填写详细地址信息',
                },
              ],
              initialValue: pickUpForm.address,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('adminTel', {
              rules: [
                {
                  required: true,
                  message: '请填写联系电话',
                },
                // { validator: this.phoneValidator },
              ],
              initialValue: pickUpForm.adminTel,
            })(<Input maxLength={11} />)}
          </Form.Item>
          <Form.Item label="营业日期">
            {getFieldDecorator('hebdomad', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: pickUpForm.businessDate,
            })(
              <div>
                {hebdomad.map(item => {
                  return (
                    <Button
                      className={`${styles.hebdomad} ${
                        pickUpForm.businessDate.indexOf(item) > -1 ? styles.hebdomadChecked : ''
                      }`}
                      onClick={this.hebdomadChange.bind(this, item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>,
            )}
          </Form.Item>
          <Form.Item label="营业时间">
            {getFieldDecorator('startTime', {
              rules: [
                {
                  required: true,
                  message: '',
                },
              ],
              initialValue: moment(pickUpForm.startTime, 'HH:mm:ss'),
            })(
              <TimePicker
                onChange={(time, timeString) => {
                  this.timeChange.bind(this, time, true);
                }}
                onOpenChange={this.onOpenChange}
              />,
            )}
            &nbsp; — &nbsp;
            {getFieldDecorator('endTime', {
              rules: [
                {
                  required: true,
                  message: '',
                },
              ],
              initialValue: moment(pickUpForm.endTime, 'HH:mm:ss'),
            })(
              <TimePicker
                onChange={(time, timeString) => {
                  this.timeChange.bind(this, time, false);
                }}
                onOpenChange={this.onOpenChange}
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
              开通
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    );
  }
}
const NewSelfDelivery = Form.create({ name: 'edit' })(FormSelfDelivery);

export default NewSelfDelivery;
