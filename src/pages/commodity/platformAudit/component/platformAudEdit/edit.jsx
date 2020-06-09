import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button, InputNumber, Form } from 'antd';
import { connect } from 'dva';
import styles from './edit.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Title } = Typography;

@connect(({ platformAudit }) => ({ platformAudit }))
class EditForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    console.log('哈哈哈哈啊哈');
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('123');
    });
  };

  render() {
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const { productWithId } = this.props.platformAudit;
    console.log('productWithId_', productWithId);
    const { getFieldDecorator } = this.props.form;

    // const platformAudit = this.props.platformAudit.product.productSku;
    return (
      <div className={styles.contentWrap}>
        <div className={styles.title}>
          <span>编辑信息</span>
        </div>
        <div className={styles.content}>
          {/* <div className={styles.inputInfo}>
            <div className={styles.labelInfo}>优惠券额度</div>
            <InputNumber min={1} max={productWithId.price} type="text" style={{ width: '200px' }} />
          </div>
          <div className={styles.inputInfo}>
            <div className={styles.labelInfo}>优惠件数</div>
            <InputNumber min={1} max={productWithId.stock} type="text" style={{ width: '200px' }} />
          </div> */}
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="优惠券额度">
              {getFieldDecorator('preferentialLimit', {
                rules: [
                  {
                    required: true,
                    message: '请填写你的商品品牌',
                  },
                ],
              })(
                <InputNumber
                  min={1}
                  max={productWithId.price}
                  type="text"
                  style={{ width: '200px' }}
                />,
              )}
            </Form.Item>

            <Form.Item label="优惠件数">
              {getFieldDecorator('preferentialQuantity', {
                rules: [
                  {
                    required: true,
                    message: '请输入优惠件数',
                  },
                ],
              })(
                <InputNumber
                  min={1}
                  max={productWithId.stock}
                  type="text"
                  style={{ width: '200px' }}
                />,
              )}
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交审核
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'edit' })(EditForm);

export default WrappedEditForm;
