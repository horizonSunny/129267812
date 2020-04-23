import React, { Component } from 'react';
import { Modal, Select, Timeline, Icon } from 'antd';
import { connect } from 'dva';
import CommodityItem from '../components/CommodityItem';
import styles from './index.less';
import forSel from '@/assets/logistics/for-sel.svg';

const { Option } = Select;
@connect(({ businessAdm }) => ({
  businessAdm,
}))
class LogisticsModal extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = {
    visible: false,
    traces: [
      {
        acceptStation: '【漯河】（0395-3620876） 的 郾城铁东一中专（15939590996） 已揽收',
        acceptTime: '2020-04-03 17:23:27',
        remark: null,
      },
      {
        acceptStation: '快件离开 【漯河】 已发往 【上海】',
        acceptTime: '2020-04-03 19:58:18',
        remark: null,
      },
      {
        acceptStation: '快件已经到达 【漯河中转】',
        acceptTime: '2020-04-03 22:44:02',
        remark: null,
      },
      {
        acceptStation: '快件离开 【漯河中转】 已发往 【上海】',
        acceptTime: '2020-04-03 22:47:35',
        remark: null,
      },
      {
        acceptStation: '快件已经到达 【上海】',
        acceptTime: '2020-04-04 11:32:22',
        remark: null,
      },
      {
        acceptStation: '快件离开 【上海】 已发往 【宝山杨行】',
        acceptTime: '2020-04-04 11:38:38',
        remark: null,
      },
      {
        acceptStation: '快件已经到达 【宝山杨行】',
        acceptTime: '2020-04-04 14:12:58',
        remark: null,
      },
      {
        acceptStation:
          '【宝山杨行】 的黄浩（13818889413） 正在第1次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）。小哥今日体温正常，将佩戴口罩为您投递，也可以联系小哥将您的快递，放到您指定的代收点，祝您身体健康！',
        acceptTime: '2020-04-04 15:33:26',
        remark: null,
      },
      {
        acceptStation:
          '快件已在 【宝山杨行】 签收, 签收人: 前台, 如有疑问请电联:13818889413 / 021-31080015, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】',
        acceptTime: '2020-04-04 16:31:53',
        remark: null,
      },
    ],
  };

  openModal = e => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    const { dispatch } = this.props;
    this.setState({
      visible: false,
    });
  };

  render() {
    const { currentRecord, shipperInfo } = this.props.businessAdm;
    const { visible } = this.state;
    const logistic = shipperInfo.find(item => {
      return item.shipperCode === currentRecord.shipperCode;
    });
    return (
      // <div className={`${styles.modalInfo}`}>
      <Modal
        title="物流信息"
        className={`${styles.modal}`}
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>
          <div className={`${styles.labelInfo} `} style={{ marginBottom: '12px' }}>
            配送信息
          </div>
          <div>
            <div className={`${styles.contentInfo} `}>承运公司：{logistic.shipperName}</div>
            <div className={`${styles.contentInfo} `}>运单编号：{currentRecord.logisticCode}</div>
            <div className={`${styles.contentInfo} `}>发货时间：{currentRecord.deliveryTime}</div>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '16px',
          }}
        >
          <Timeline>
            <Timeline.Item dot={<img src={forSel} alt="" width="20" height="20" />}>
              <div
                style={{
                  marginLeft: '5px',
                }}
              >
                <div>已签收</div>
                <div>订单交易成功，货物已由家人代收</div>
                <div>2020-02-03 13:36:29</div>
              </div>
            </Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
        </div>
      </Modal>
      // </div>
    );
  }
}

export default LogisticsModal;
