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
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
export default class SelfDelivery extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // console.log('this.props_', this.props.tradeSetting);

    if (dispatch) {
      dispatch({
        type: 'tradeSetting/selfDeliveryInfo',
      });
      // .then(() => {
      //   // dispatch({
      //   //   type: 'commodityClassify/selectCas',
      //   //   payload: this.props.commodityClassify.casInfoOne[0],
      //   // });
      // });
    }
  }

  onChange = () => {
    console.log('onChange');
  };

  toSelfDelivery = () => {
    router.push('/tradeSetting/selfDelivery/newSelfDelivery');
  };

  render() {
    const { hasSelfDelivery, selfDeliveryInfo } = this.props.tradeSetting;
    return (
      <PageHeaderWrapper>
        {/* <div>自提列表</div> */}
        <div className={`${styles.main}`}>
          <div className={`${styles.title}`}>
            到店自提说明
            {/* 没有自提信息的时候 */}
            {hasSelfDelivery && (
              <div className={`${styles.noSelfDelivery}`}>
                <img src={noSelfDelivery} alt="" />
                <span>开通到店自提，方便买家自提点取货</span>
                <Button type="primary" className={`${styles.button}`} onClick={this.toSelfDelivery}>
                  去开通 &gt;
                </Button>
              </div>
            )}
            {/* 有自提信息的时候 */}
            {!hasSelfDelivery && (
              <Row className={styles.selfDelivery}>
                <Col span={20} className={styles.selfDeliveryInfo}>
                  <img src={selfDelivery} alt="" />
                  <table className={`${styles.tableInfo}`}>
                    <tr>
                      <td>门店自提点</td>
                      <td>安康大药房</td>
                      {/* <td>{selfDeliveryInfo.tenantName}</td> */}
                    </tr>
                    <tr>
                      <td> 地址</td>
                      <td> 上海市 浦东新区海科路100号</td>
                      {/* <td>{selfDeliveryInfo.address}</td> */}
                    </tr>
                    <tr>
                      <td> 联系电话</td>
                      <td> 021-89679867</td>
                      {/* <td>{selfDeliveryInfo.adminTel}</td> */}
                    </tr>
                    <tr>
                      <td> 联系电话</td>
                      <td> 021-89679867</td>
                      {/* <td>{selfDeliveryInfo.adminTel}</td> */}
                    </tr>
                    <tr>
                      <td> 营业时间</td>
                      <td> 周一/周三/周五 08:30-20:30</td>
                      {/* <td>
                      {selfDeliveryInfo.businessDate.map((item, index) => {
                        const length = selfDeliveryInfo.businessDate.length - 1;
                        if (length !== index) {
                          return `${item}/`;
                        }
                        return item;
                      })}
                      &nbsp;&nbsp;
                      {selfDeliveryInfo.businessHours}
                    </td> */}
                    </tr>
                  </table>
                </Col>
                <Col span={1} className={`${styles.switch}`}>
                  <Switch defaultChecked onChange={this.onChange} />
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
