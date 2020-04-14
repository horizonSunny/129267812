import React from 'react';
import { Form, Button, Input, Cascader, TimePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import moment from 'moment';
import styles from './newSelfDelivery.less';
import { newArea } from '@/utils/area.js';
import { CompareDate } from '@/utils/utils.ts';
// const { Search } = Input;
const options = newArea();
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
class FormSelfDelivery extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'commodityClassify/classification',
    //   }).then(() => {
    //     // 查询单个分类的商品
    //     dispatch({
    //       type: 'commodityClassify/selectCas',
    //       payload: this.props.commodityClassify.casInfoOne[0],
    //     });
    //   });
    // }
  }

  state = {
    // formInit: this.props.commodity.productWithId,
    // editorState: null,
    // productType: this.props.commodity.allProductType,
    startTime: '00:00:00',
    endTime: '00:00:00',
    hebdomad: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
  };

  handleSubmit = () => {
    console.log('sss');
  };

  startTimeChange = (time, timeString) => {
    this.setState({
      startTime: timeString,
    });
  };

  endTimeChange = (time, timeString) => {
    console.log('onChange_', timeString);
    this.setState({
      endTime: timeString,
    });
  };

  onOpenChange = info => {
    // console.log('onOpenChange_', info);
    if (!info) {
      const { startTime, endTime } = this.state;
      const test = CompareDate(startTime, endTime);
      console.log('info_', test);
      const oldEndTime = endTime;
      const oldStartTime = startTime;
      const _this = this;
      if (test) {
        console.log('oldEndTime_', oldEndTime);
        console.log('oldStartTime_', oldStartTime);
        this.setState({
          endTime: oldStartTime,
          startTime: oldEndTime,
        });
        // this.setState({
        //   startTime: oldEndTime,
        // });
        // setTimeout(() => {
        //   _this.setState({
        //     endTime: oldStartTime,
        //   });
        //   _this.setState({
        //     startTime: oldEndTime,
        //   });
        // }, 1000);
      }
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
              initialValue: '231',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所在区域">
            {getFieldDecorator('areaData', {
              // initialValue: [
              //   currentRecord.provinceCode,
              //   currentRecord.cityCode,
              //   currentRecord.areaCode,
              // ],
              rules: [{ required: true, message: '请选择店铺所在地!' }],
            })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: '231',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: '231',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="营业日期">
            {/* {getFieldDecorator('tenantName', {
              rules: [
                {
                  required: true,
                  message: '店铺名称',
                },
              ],
              initialValue: '231',
            })( */}
            {hebdomad.map(item => {
              return <Button className={`${styles.hebdomad}`}>{item}</Button>;
            })}
            {/* )} */}
          </Form.Item>
          <Form.Item label="营业时间">
            {getFieldDecorator('tenantStartTime', {
              rules: [
                {
                  required: true,
                  message: '',
                },
              ],
              initialValue: moment(startTime, 'HH:mm:ss'),
            })(<TimePicker onChange={this.startTimeChange} onOpenChange={this.onOpenChange} />)}
            &nbsp; — &nbsp;
            {getFieldDecorator('tenantEndTime', {
              rules: [
                {
                  required: true,
                  message: '',
                },
              ],
              initialValue: moment(endTime, 'HH:mm:ss'),
            })(<TimePicker onChange={this.endTimeChange} onOpenChange={this.onOpenChange} />)}
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
