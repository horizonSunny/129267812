// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel, Modal } from 'antd';
import React from 'react';
import styles from './Table.less';
import filterData from './filter';
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
@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  state = {
    visible: false,
    imgSrc: '',
    tabelArr: [],
    columns: [
      {
        dataIndex: 'name',
        width: '200px',
      },
      {
        className: 'column-money',
        dataIndex: 'value',
        render: (text, record) => {
          console.log(record, '图片放大了');
          if (record.name === '商品图') {
            return (
              <Carousel autoplay>
                {record.value &&
                  record.value.map((item, index) => {
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
            );
          }
          if (record.name === '是否处方药') {
            let styleInfo;
            let textInfo;
            switch (text) {
              case 0:
                textInfo = 'otc';
                styleInfo = Object.assign(
                  {
                    border: '1px solid green',
                    color: 'green',
                  },
                  isMapClass,
                );
                break;
              case 1:
                textInfo = 'otc';
                styleInfo = Object.assign(
                  {
                    border: '1px solid red',
                    color: 'red',
                  },
                  isMapClass,
                );
                break;
              case 2:
                textInfo = 'Rx';
                styleInfo = Object.assign(
                  {
                    border: '1px solid red',
                    color: 'red',
                  },
                  isMapClass,
                );
                break;
              case 2:
                textInfo = '其他';
                styleInfo = Object.assign(
                  {
                    border: '1px solid rgb(136,136,136)',
                    color: 'rgb(136,136,136)',
                  },
                  isMapClass,
                );
                break;
              default:
                break;
            }
            return <LabelInfo text={textInfo} classInfo={styleInfo} />;
          }
          if (record.name === '商品类别') {
            return (
              record.value &&
              record.value.map(item => {
                return <div>{filterStatus(item, this.props.commodity.allProductType)}</div>;
              })
            );
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
    this.dataReverse(this.props.commodity.productWithId);
  }

  componentWillReceiveProps() {
    this.dataReverse(this.props.commodity.productWithId);
  }

  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={state.tabelArr}
        pagination={false}
      />
    );
  }
}
