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
@connect(({ platformManagement }) => ({ platformManagement }))
export default class TableList extends React.Component {
  state = {
    visible: false,
    imgSrc: '',
    tabelArr: [],
    columns: [
      {
        dataIndex: 'one',
        width: '200px',
      },
      {
        className: 'two',
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
          return text;
        },
      },
      {
        dataIndex: 'three',
        width: '200px',
      },
      {
        dataIndex: 'four',
        width: '200px',
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
  // dataReverse(data) {
  //   const arr = [];
  //   let i = 0;
  //   for (const item in filterData) {
  //     const obj = new Object();
  //     obj.key = i++;
  //     obj.name = filterData[item];
  //     obj.value = data[item];
  //     arr.push(obj);
  //   }
  //   console.log('tabelArr_', arr);
  //   // return arr;
  //   this.setState({
  //     tabelArr: arr,
  //   });
  // }

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
        showHeader={false}
      />
    );
  }
}
