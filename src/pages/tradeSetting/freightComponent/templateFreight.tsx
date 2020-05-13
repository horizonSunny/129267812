import React from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './templateFreight.less';
import add from '@/assets/Add to-icon.svg';
import AreaSelect from '../components/areaSelect';
import { filterAreaName } from '@/utils/filterProperty';

@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
export default class TemplateFreight extends React.Component {
  componentDidMount() {}

  state = {
    // 当前操作的是第几个指定区域数据
    modalAreaIndex: '',
  };

  onRefInfo = ref => {
    this.child = ref;
  };

  // 弹窗配置不可配送区域
  showArea = (area, index) => {
    console.log('this.child_', area);
    this.setState({
      modalAreaIndex: index,
    });
    this.child.openModal(area);
  };

  // 弹窗配置区域确定
  modalAreaConfirm = areaIds => {
    const params = {
      areaIds,
      index: this.state.modalAreaIndex,
    };
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/setFreightTemplateArea',
        payload: params,
      });
    }
  };

  changeTemplateDefault = (value, key) => {
    console.log('vaule_', value, '_key_', key);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/changeTemplateDefault',
        payload: { key, value },
      });
    }
  };

  addTemplateArea = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/addTemplateArea',
      });
    }
  };

  deleteTemplateArea = index => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/deleteTemplateArea',
        payload: index,
      });
    }
  };

  changeTemplateArea = (value, index, key) => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'tradeSetting/changeTemplateArea',
        payload: { key, value, index },
      });
    }
  };

  render() {
    const value = this.props.tradeSetting.freightTemplateInfo;
    return (
      <div className={`${styles.main}`}>
        <div className={`${styles.defaultFreight}`}>
          <span>默认运费</span>
          {/* <span>(全国包邮，除指定地区)</span> */}
          <span>
            &nbsp;
            <InputNumber
              min={1}
              value={value.firstNum}
              onChange={event => this.changeTemplateDefault(event, 'firstNum')}
            />
            &nbsp; 件内 &nbsp;
            <InputNumber
              min={1}
              value={value.firstPrice}
              onChange={event => this.changeTemplateDefault(event, 'firstPrice')}
            />
            &nbsp; 元，续件费 &nbsp;
            <InputNumber
              min={1}
              value={value.continuePrice}
              onChange={event => this.changeTemplateDefault(event, 'continuePrice')}
            />
            &nbsp; 元/件
          </span>
        </div>
        <div className={`${styles.reminder}`}>除指定地区外，其余地区的运费采用“默认运费用“</div>
        <div className={`${styles.table}`}>
          <table border="1">
            <tr className={`${styles.templateTitle}`}>
              <th>指定区域</th>
              <th>首件数内(件)</th>
              <th>首费</th>
              <th>续件费(元/件)</th>
              <th>操作</th>
            </tr>
            <tbody>
              {this.props.tradeSetting.freightTemplateInfo.areaFreights.map((item, index) => {
                // console.log('item_', item);
                return (
                  <tr key={index} className={`${styles.templateContent}`}>
                    <td className={`${styles.templateArea}`}>
                      <span className={`${styles.templateAreaItem}`}>
                        {item.areas.length !== 0 && filterAreaName(item.areas)}
                        {item.areas.length === 0 && '未添加地区'}
                      </span>
                      <span className={`${styles.templateAreaEditor}`}>
                        <Button onClick={this.showArea.bind(this, item.areas, index)}>编辑</Button>
                      </span>
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        value={item.firstNum}
                        onChange={event => this.changeTemplateArea(event, index, 'firstNum')}
                      />
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        value={item.firstPrice}
                        onChange={event => this.changeTemplateArea(event, index, 'firstPrice')}
                      />
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        value={item.continuePrice}
                        onChange={event => this.changeTemplateArea(event, index, 'continuePrice')}
                      />
                    </td>
                    <td>
                      <Button type="danger" onClick={this.deleteTemplateArea.bind(this, index)}>
                        删除
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <tr className={`${styles.templateAdd}`}>
                <td colSpan="5">
                  <span onClick={this.addTemplateArea}>
                    <img src={add} alt="" />
                    添加指定地区
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <AreaSelect onRef={this.onRefInfo} confirmArea={this.modalAreaConfirm} />
      </div>
    );
  }
}
