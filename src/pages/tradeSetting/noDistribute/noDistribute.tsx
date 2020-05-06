import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import mapImg from '@/assets/tradeSetting/map-da.svg';
// 外部引入
import AreaSelect from '../components/areaSelect';
import styles from './noDistribute.less';
import { filterAreaName } from '@/utils/filterProperty';

function processingArea(area) {
  // 首先过滤先把所有的省拿到，这些省都是全选的
  const result = {};
  const city = [];
  // const selectPartProvince = [];
  area.map(item => {
    if (item.length === 2) {
      // selectAllProvince.push(item);
      result[item] = 'all';
    } else {
      city.push(item);
    }
  });
  // city
  city.map(item => {
    // 省份id是唯一的，可以用作key值
    const provinceId = item.slice(0, 2);
    if (result.hasOwnProperty(provinceId)) {
      result[provinceId].push(item);
    } else {
      result[provinceId] = [];
      result[provinceId].push(item);
    }
  });
  return result;
}
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
  showArea = (area = []) => {
    console.log('this.child_', this.child);

    this.child.openModal(area);
  };

  // 弹窗配置区域确定
  modalAreaConfirm = areaIds => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'nonDelivery/setNonDelivery',
        payload: areaIds,
      });
    }
  };

  render() {
    const { nonDeliveryInfo } = this.props.nonDelivery;
    // const {keys,values}
    const area = processingArea(nonDeliveryInfo.deliveryArea);
    // const area = processingArea(['11', '32', '6531', '6532', '1301', '1302']);
    console.log('area_', area);
    return (
      <PageHeaderWrapper>
        {nonDeliveryInfo.deliveryArea.length === 0 && (
          <div className={`${styles.noDistribute}`}>
            <img src={mapImg} alt="" />
            <span>你还未配置不可配送区域</span>
            <Button type="primary" className={`${styles.button}`} onClick={this.showArea}>
              去配置 &gt;
            </Button>
          </div>
        )}
        {nonDeliveryInfo.deliveryArea.length !== 0 && (
          <div className={`${styles.main}`}>
            <Row className={styles.selfDelivery}>
              <Col span={20} className={styles.selfDeliveryInfo}>
                <table className={`${styles.tableInfo}`}>
                  {/* <tr>
                    <td>省</td>
                    <td>市</td>
                  </tr> */}
                  {Object.keys(area).map(item => {
                    // const province = filterAreaName(item)
                    return (
                      <tr>
                        <td>{filterAreaName(item)}</td>
                        <td>
                          {area[item] !== 'all' && filterAreaName(area[item])}
                          {area[item] === 'all' && '全部'}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </Col>
              <Col span={1}>
                <Button
                  className={`${styles.editorButton}`}
                  onClick={this.showArea.bind(this, nonDeliveryInfo.deliveryArea)}
                >
                  配置
                </Button>
              </Col>
            </Row>
          </div>
        )}
        <AreaSelect onRef={this.onRefInfo} confirmArea={this.modalAreaConfirm} />
      </PageHeaderWrapper>
    );
  }
}
