// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import styles from './commodityInfo.less';
// import filterData from './filter';
import { connect } from 'dva';
import LabelInfo from '../../../../../components/Label/label';
import { filterStatus } from '@/utils/filterProperty';
import routerParams from '@/utils/routerParams';

const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};
// const renderContent = (value, row, index) => {
//   const obj = {
//     children: value,
//     props: {},
//   };
//   if (index === 4) {
//     obj.props.colSpan = 0;
//   }
//   return obj;
// };
@connect(({ platformManagement }) => ({ platformManagement }))
export default class CommodityInfo extends React.Component {
  state = {
    visible: false,
    imgSrc: '',
    columns: [
      {
        dataIndex: 'one',
      },
      {
        dataIndex: 'two',
        render: (text, record, index) => {
          console.log(record, '图片放大了');
          if (Array.isArray(record.two) && index === 0) {
            return {
              children: (
                <Carousel autoplay>
                  {record.two &&
                    record.two.map((item, index) => {
                      return (
                        <div key={index} style={{ border: '1px dashed #ddd' }}>
                          <img
                            src={item}
                            alt="暂无图片"
                            onClick={this.showModal}
                            style={{ height: '100%', width: '100%' }}
                          />
                        </div>
                      );
                    })}
                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    centered
                    maskClosable
                  >
                    <img
                      style={{ width: '100%' }}
                      alt=""
                      onClick={this.handleOk}
                      src={this.state.imgSrc}
                    />
                  </Modal>
                </Carousel>
              ),
              props: {
                colSpan: 3,
              },
            };
          }
          if (index === 4) {
            return {
              children: text,
              props: {
                colSpan: 3,
              },
            };
          }
          return text;
        },
      },
      {
        dataIndex: 'three',
        render: (text, record, index) => {
          if (index === 0 || index === 4) {
            return {
              children: '',
              props: {
                colSpan: 0,
              },
            };
          }
          return text;
        },
      },
      {
        dataIndex: 'four',
        render: (text, record, index) => {
          if (index === 0 || index === 4) {
            return {
              children: '',
              props: {
                colSpan: 0,
              },
            };
          }
          return text;
        },
      },
    ],
  };

  componentDidMount() {
    // console.log('this.props.match.params.id_', routerParams(location.search));
    // const { id: productId } = routerParams(location.search);
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'platformManagement/getProductLog',
    //   payload: {
    //     pageNumber: 0,
    //     pageSize: 5,
    //     productId,
    //   },
    // });
    // dispatch({
    //   type: 'platformManagement/getProduct',
    //   payload: {
    //     productId,
    //   },
    // });
  }

  // 点击查看商品图放大
  showModal = e => {
    if (e.target.nodeName === 'IMG') {
      // 判断img 节点
      this.setState({
        visible: true,
        imgSrc: e.target.src,
      });
    }
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    // console.log('hahah_', this.props.platformManagement.productWithId.commodityInfo.productImage);
    const product = this.props.platformManagement.productWithId;
    const tabelArr = [
      {
        one: '商品主图',
        two: product.commodityInfo ? product.commodityInfo.productImage : [],
      },
      {
        one: '商品编号',
        two: product.commodityInfo ? product.commodityInfo.productId : '',
        three: '是否处方药',
        four: product.commodityInfo ? product.commodityInfo.isMap : '',
      },
      {
        one: '销售数量',
        two: product.commodityInfo ? product.commodityInfo.salesQuantity : '',
        three: '浏览数量',
        four: product.commodityInfo ? product.commodityInfo.views : '',
      },
      {
        one: '售卖状态',
        two: product.commodityInfo ? product.commodityInfo.sellStatus : '',
        three: '创建时间',
        four: product.commodityInfo ? product.commodityInfo.createTime : '',
      },
      {
        one: '原链接',
        two: product.commodityInfo ? product.commodityInfo.link : '',
      },
    ];
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={tabelArr}
        pagination={false}
        bordered
      />
    );
  }
}
