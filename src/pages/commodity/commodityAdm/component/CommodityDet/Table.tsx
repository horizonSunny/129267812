// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel } from 'antd';
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
    tabelArr: [],
    columns: [
      {
        dataIndex: 'name',
      },
      {
        className: 'column-money',
        dataIndex: 'value',
        render: (text, record) => {
          if (record.name === '商品图') {
            return (
              <Carousel>
                <Carousel>
                  {record.value.map((item, index) => {
                    return (
                      <div>
                        <img src={item} alt="暂无图片" style={{ height: '100%', width: '100%' }} />
                      </div>
                    );
                  })}
                </Carousel>
              </Carousel>
            );
          } else if (record.name === '是否处方药') {
            let styleInfo, textInfo;
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
            return <LabelInfo text={textInfo} classInfo={styleInfo}></LabelInfo>;
          } else if (record.name === '商品类别') {
            return record.value.map(item => {
              return <div>{filterStatus(item, this.props.commodity.allProductType)}</div>;
            });
          } else {
            return text;
          }
        },
      },
    ],
  };
  // 获取处理后的数据
  dataReverse(data) {
    const arr = [];
    let i = 0;
    for (let item in data) {
      // this.state.tabelArr.push(obj);
      if (filterData.hasOwnProperty(item)) {
        const obj = new Object();
        obj.key = i++;
        obj.value = data[item];
        obj.name = filterData[item];
        arr.push(obj);
      }
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

  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={state.columns}
        dataSource={state.tabelArr}
        bordered
        pagination={false}
      />
    );
  }
}
