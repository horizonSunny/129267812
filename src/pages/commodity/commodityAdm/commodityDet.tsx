import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityDet.less';
import TableList from './component/CommodityDet/Table';
import RecordList from './component/CommodityDet/Record';
import { connect } from 'dva';

const { Title } = Typography;
@connect(({ commodity }) => ({ commodity }))
export default class CommodityDet extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'commodity/getProduct',
      payload: {
        id: location.query.id,
      },
    });
    // 获取路由传参
    console.log('this.props.match_productWithId_', this.props.commodity.productWithId);
  }
  render() {
    return (
      <PageHeaderWrapper className={styles['main']}>
        <Title level={4}>商品名称(SKU编号)</Title>
        <TableList></TableList>
        <RecordList></RecordList>
      </PageHeaderWrapper>
    );
  }
}
