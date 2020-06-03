// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import styles from './commodityInfo.less';
// import filterData from './filter';
import { connect } from 'dva';
import LabelInfo from '../../../../../components/Label/label';
import { filterStatus } from '@/utils/filterProperty';

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
    tabelArr: [
      {
        one: '商品主图',
        two: [
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/c8c5a771de288b302a33f8f8460d54ee.jpg',
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/080c958baf4d85268e1b97d8f225b41b.jpg',
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/d786a77e526e198750ec5a531d83a71b.jpg',
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/6406b9daac1246c089bbb85311d2a322.jpg',
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/8b1cfb3bba88b85e2613b78481e4962f.jpg',
          'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/12573/fe6220bfd52236738775526c628d51b2.jpg',
        ],
      },
      {
        one: '商品编号',
        two: 'xxxxxxxx',
        three: '是否处方药',
        four: 'rx',
      },
      {
        one: '销售数量',
        two: '118',
        three: '浏览数量',
        four: '12322',
      },
      {
        one: '售卖状态',
        two: '售空下架',
        three: '创建时间',
        four: '2020-12-12 21:11:11',
      },
      {
        one: '原链接',
        two: 'wwww.baidu.com',
      },
    ],
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

  // 获取处理后的数据
  dataReverse(data) {
    const arr = [];
    let i = 0;
    for (const item in filterData) {
      const obj = new Object();
      obj.key = i++;
      obj.name = filterData[item];
      obj.value = data[item];
      arr.push(obj);
    }
    console.log('tabelArr_', arr);
    // return arr;
    this.setState({
      tabelArr: arr,
    });
  }

  // 生命周期
  componentDidMount() {
    // this.dataReverse(this.props.platformManagement.productWithId);
  }

  componentWillReceiveProps() {
    // this.dataReverse(this.props.platformManagement.productWithId);
  }

  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={state.tabelArr}
        pagination={false}
        bordered
      />
    );
  }
}
