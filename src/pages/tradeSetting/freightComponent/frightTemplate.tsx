import React from 'react';
import { Table, Button, Pagination } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './frightTemplate.less';
// const { Search } = Input;
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
const columns = [
  {
    title: '配送范围',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '首件数(件)',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '运费(元)',
    dataIndex: 'address',
  },
  {
    title: '续件费(元/件)',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

// 运费list，运费模版展示
export default class Freight extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
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
        {[1, 2, 3].map((item, index) => {
          return (
            <Table
              className={`${styles.table}`}
              columns={columns}
              dataSource={data}
              key={index}
              bordered
              title={() => {
                return (
                  <div className={`${styles.tableHeader}`}>
                    <div>
                      <span className={`${styles.tableHeaderSpan}`}>模版名称:默认运费模版</span>
                      <span className={`${styles.tableHeaderSpan}`}>使用中的商品:0个</span>
                    </div>
                    <div>
                      <span className={`${styles.tableHeaderSpan}`}>类型:包邮</span>
                      <span className={`${styles.tableHeaderSpan}`}>
                        最后编辑时间:2020-04-01 10
                      </span>
                    </div>
                    <div>
                      <Button className={`${styles.tableHeaderButton}`}>修改</Button>
                      <Button className={`${styles.tableHeaderButton}`}>删除</Button>
                    </div>
                  </div>
                );
              }}
              pagination={false}
            />
          );
        })}
        <Pagination defaultCurrent={1} total={50} />
      </div>
    );
  }
}
