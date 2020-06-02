// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './Record.less';
import filterData from './filter';

const columns = [
  {
    dataIndex: 'operation',
  },
  {
    dataIndex: 'operateInfo',
  },
];
const templateInfo = {
  price: '价格',
  stock: '库存',
  freightTemplates: '配送方式',
  ordinaryTemplate: '普通快递模版',
  urgentTemplate: '加急快递模版',
  recommandStatus: '是否推荐商品',
};
@connect(({ platformManagement, selfDelivery }) => ({ platformManagement, selfDelivery }))
export default class TableList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'selfDelivery/getPickUp',
      }).then(res => {
        console.log('getPickUp_', res);
        this.setState({
          getPickUp: res,
        });
      });
    }
  }

  state = {
    // data: this.props.platformManagement.productWithId,
    getPickUp: null,
  };

  render() {
    const { getPickUp } = this.state;
    const data = this.props.platformManagement.productWithId;
    // 配送方式
    const freightTemplates = [];
    let ordinaryTemplate = null;
    let urgentTemplate = null;
    if (getPickUp) {
      freightTemplates.push('自提');
    }
    if (data && data.freightTemplates) {
      data.freightTemplates.forEach(item => {
        if (item.templateType === 2) {
          urgentTemplate = item.templateName;
          freightTemplates.push('加急快递');
        } else {
          ordinaryTemplate = item.templateName;
          freightTemplates.push('普通快递');
        }
      });
    }
    const dataInfo = [
      { operation: '价格', operateInfo: `${data.price} 元` },
      { operation: '库存', operateInfo: `${data.stock} 件` },
      { operation: '配送方式', operateInfo: freightTemplates.toString() },
      { operation: '普通快递模版', operateInfo: ordinaryTemplate || '' },
      { operation: '加急快递模版', operateInfo: urgentTemplate || '' },
      { operation: '是否推荐商品', operateInfo: data.recommandStatus === 1 ? '推荐' : '不推荐' },
    ];
    return (
      <div className={styles.main}>
        <a href="javascript:void(0);" className={styles.aInfo}>
          {' '}
          商品配置
        </a>
        <Table columns={columns} dataSource={dataInfo} bordered pagination={false} />
      </div>
    );
  }
}
