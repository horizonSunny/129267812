import React from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './templateFreight.less';
// const { Search } = Input;
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
export default class TemplateFreight extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('this.props_', this.props);

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

  render() {
    return (
      <div className={`${styles.main}`}>
        <div className={`${styles.defaultFreight}`}>
          <span>默认运费</span>
          {/* <span>(全国包邮，除指定地区)</span> */}
          <span>
            &nbsp;
            <InputNumber />
            &nbsp; 件内 &nbsp;
            <InputNumber />
            &nbsp; 元，续件费 &nbsp;
            <InputNumber />
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
            <tr className={`${styles.templateContent}`}>
              <td className={`${styles.templateArea}`}>
                <span className={`${styles.templateAreaItem}`}>
                  河北省，南京市,河北省，南京市,河北省，南京市,河北省，南京市,河北省，南京市,
                </span>
                <Button className={`${styles.templateAreaEditor}`}>编辑</Button>
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
          </table>
        </div>
      </div>
    );
  }
}
