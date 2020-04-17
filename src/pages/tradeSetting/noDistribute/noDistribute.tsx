import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import mapImg from '@/assets/tradeSetting/map-da.svg';
// 外部引入
import AreaSelect from '../components/areaSelect';
import styles from './noDistribute.less';

@connect(({ nonDelivery }) => ({
  nonDelivery,
}))
export default class NoDistribute extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'nonDelivery/getNonDelivery',
      });
    }
  }

  // 调用子组件方法
  onRefInfo = ref => {
    this.child = ref;
  };

  // 弹窗配置不可配送区域
  showArea = () => {
    console.log('this.child_', this.child);

    this.child.openModal();
  };

  render() {
    const { nonDeliveryInfo } = this.props.nonDelivery;
    console.log('nonDeliveryInfo_', nonDeliveryInfo);

    return (
      <PageHeaderWrapper>
        {nonDeliveryInfo && (
          <div className={`${styles.noDistribute}`}>
            <img src={mapImg} alt="" />
            <span>你还未配置不可配送区域</span>
            <Button type="primary" className={`${styles.button}`} onClick={this.showArea}>
              去配置 &gt;
            </Button>
          </div>
        )}
        {!nonDeliveryInfo && (
          <div className={`${styles.main}`}>
            <Row className={styles.selfDelivery}>
              <Col span={20} className={styles.selfDeliveryInfo}>
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
                  </tr>
                </table>
              </Col>
              <Col span={1}>
                <Button className={`${styles.editorButton}`} onClick={this.toSelfDelivery}>
                  编辑
                </Button>
              </Col>
            </Row>
          </div>
        )}
        <AreaSelect onRef={this.onRefInfo} />
      </PageHeaderWrapper>
    );
  }
}
