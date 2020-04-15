import React from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './templateFreight.less';
import add from '@/assets/Add to-icon.svg';
import AreaSelect from '../components/areaSelect';
import { findItem } from '@/utils/filterProperty';
import { newAreaTree } from '@/utils/area.js';

const options = newAreaTree();
function filterAreaName(areaInfo) {
  const result = [];
  findItem(
    options,
    itemArea => {
      console.log('itemArea.key_', itemArea.key);
      return areaInfo.indexOf(itemArea.key) > -1;
    },
    result,
  );
  const areaNams = result.map(item => {
    return item.title;
  });
  console.log('areaNams_', areaNams.toString());
  return areaNams.toString();
}
// const { Search } = Input;
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
export default class TemplateFreight extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('this.props.value_', this.props.value);

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

  onRefInfo = ref => {
    this.child = ref;
    console.log('onRefInfo_', ref);
  };

  // 弹窗配置不可配送区域
  showArea = () => {
    console.log('this.child_', this.child);

    this.child.openModal();
  };

  render() {
    const { value } = this.props;
    return (
      <div className={`${styles.main}`}>
        <div className={`${styles.defaultFreight}`}>
          <span>默认运费</span>
          {/* <span>(全国包邮，除指定地区)</span> */}
          <span>
            &nbsp;
            <InputNumber min={1} defaultValue={value.firstNum} />
            &nbsp; 件内 &nbsp;
            <InputNumber min={1} defaultValue={value.firstPrice} />
            &nbsp; 元，续件费 &nbsp;
            <InputNumber min={1} defaultValue={value.continuePrice} />
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
              {value.areaFreights.map((item, index) => {
                return (
                  <tr key={index} className={`${styles.templateContent}`}>
                    <td className={`${styles.templateArea}`}>
                      <span className={`${styles.templateAreaItem}`}>
                        {filterAreaName(item.areas)}
                        {/* {item.areas.map((itemInfo, indexInfo) => {
                          // return <span key={indexInfo}>{itemInfo}</span>;
                          const result = [];
                          console.log('options_', options);
                          console.log('itemInfo_', itemInfo);
                          findItem(
                            options,
                            itemArea => {
                              console.log('itemArea.key_', itemArea.key);
                              return itemArea.key === itemInfo;
                            },
                            result,
                          );
                          console.log('result_', result);

                          return result[0].title;
                        })} */}
                      </span>
                      <span className={`${styles.templateAreaEditor}`}>
                        <Button onClick={this.showArea}>编辑</Button>
                      </span>
                    </td>
                    <td>
                      <InputNumber />
                    </td>
                    <td>
                      <InputNumber />
                    </td>
                    <td>
                      <InputNumber />
                    </td>
                    <td>
                      <Button type="danger">删除</Button>
                    </td>
                  </tr>
                );
              })}
              <tr className={`${styles.templateAdd}`}>
                <td colSpan="5">
                  <img src={add} alt="" />
                  添加指定地区
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <AreaSelect onRef={this.onRefInfo} />
      </div>
    );
  }
}
