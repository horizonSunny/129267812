import React from 'react';
import { Row, Col, Button, Switch } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 外部引入
import { router } from 'umi';
import styles from './selfDelivery.less';
import noSelfDelivery from '@/assets/tradeSetting/noSelfDelivery.svg';
import selfDelivery from '@/assets/tradeSetting/selfDelivery.svg';
// const { Search } = Input;
@connect(({ selfDelivery }) => ({
  selfDelivery,
}))
export default class SelfDelivery extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'selfDelivery/getPickUp',
      }).then(() => {
        console.log('lalalalala_4');
      });
    }
  }

  onChange = info => {
    console.log('onChange_Info', info);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'selfDelivery/changePickUpStatus',
        payload: {
          status: info ? 1 : 2,
        },
      });
    }
  };

  toSelfDelivery = () => {
    router.push('/tradeSetting/selfDelivery/newSelfDelivery');
  };
  // toSelfDelivery = (params,opening) => {
  //   const { dispatch } = this.props;
  //   console.log(opening,'opening');
  //   dispatch({
  //     type: 'selfDelivery/merchantInformation',
  //   }).then(result=>{
  // router.push('/tradeSetting/selfDelivery/newSelfDelivery');
  //   })
  // };

  render() {
    // const { hasSelfDelivery, pickUp } = this.props.tradeSetting;
    const { pickUp } = this.props.selfDelivery;
    console.log('this.props.selfDelivery_', pickUp);

    return (
      <PageHeaderWrapper>
        {/* <div>自提列表</div> */}
        <div className={`${styles.main}`}>
          <div className={`${styles.title}`}>
            到店自提说明
            {/* 没有自提信息的时候 */}
            {!pickUp && (
              <div className={`${styles.noSelfDelivery}`}>
                <img src={noSelfDelivery} alt="" />
                <span>开通到店自提，方便买家自提点取货</span>
                <Button type="primary" className={`${styles.button}`} onClick={this.toSelfDelivery}>
                  去开通 &gt;
                </Button>
              </div>
            )}
            {/* 有自提信息的时候 */}
            {pickUp && (
              <Row className={styles.selfDelivery}>
                <Col span={20} className={styles.selfDeliveryInfo}>
                  <img src={selfDelivery} alt="" />
                  <table className={`${styles.tableInfo}`}>
                    <tbody>
                      <tr>
                        <td>门店自提点</td>
                        <td>{pickUp.tenantName}</td>
                      </tr>
                      <tr>
                        <td> 地址</td>
                        <td>{pickUp.address}</td>
                      </tr>
                      <tr>
                        <td> 联系电话</td>
                        <td>{pickUp.adminTel}</td>
                      </tr>
                      <tr>
                        <td> 营业时间</td>
                        <td>
                          {pickUp.businessDate
                            ? pickUp.businessDate.map((item, index) => {
                                const length = pickUp.businessDate.length - 1;
                                if (length !== index) {
                                  return `${item}/`;
                                }
                                return item;
                              })
                            : '无营业日期'}
                          &nbsp;&nbsp;
                          {pickUp.businessHours ? pickUp.businessHours : '无营业时间'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col span={1} className={`${styles.switch}`}>
                  {/* <Switch checked={pickUp.isPick === 1} onChange={this.onChange} /> */}
                  <Switch checked={pickUp.isPick === 1} onChange={this.onChange} />
                </Col>
                <Col span={1}>
                  <Button className={`${styles.editorButton}`} onClick={this.toSelfDelivery}>
                    编辑
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}
