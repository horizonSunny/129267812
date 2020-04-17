import React from 'react';
import { Table, Button, Pagination } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './frightTemplate.less';
import { filterAreaName } from '@/utils/filterProperty';
// const { Search } = Input;
const columns = [
  {
    title: '配送范围',
    dataIndex: 'areas',
    render: (text, record) => <a>{filterAreaName(text)}</a>,
  },
  {
    title: '首件数(件)',
    className: 'column-money',
    dataIndex: 'firstNum',
  },
  {
    title: '运费(元)',
    dataIndex: 'firstPrice',
  },
  {
    title: '续件费(元/件)',
    dataIndex: 'continuePrice',
  },
];

// 运费list，运费模版展示
@connect(({ tradeSetting }) => ({
  tradeSetting,
}))
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
    const { totalElements, pageList } = this.props.tradeSetting.freightList;
    console.log('pageList_', pageList, '_totalElements_', totalElements);

    return (
      <div className={`${styles.main}`}>
        {pageList.map((item, index) => {
          return (
            <Table
              className={`${styles.table}`}
              columns={columns}
              dataSource={item.areaFreights}
              key={index}
              bordered
              title={() => {
                return (
                  <div className={`${styles.tableHeader}`}>
                    <div>
                      <span className={`${styles.tableHeaderSpan}`}>
                        模版名称:{item.templateName}
                      </span>
                      <span className={`${styles.tableHeaderSpan}`}>
                        使用中的商品:{item.useNumber}
                      </span>
                    </div>
                    <div>
                      <span className={`${styles.tableHeaderSpan}`}>
                        类型:{item.templateType === 1 && '普通'}
                        {item.templateType === 2 && '加急'}
                        {item.templateType === 3 && '包邮'}
                      </span>
                      <span className={`${styles.tableHeaderSpan}`}>
                        最后编辑时间:{item.updateTime}
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
        <Pagination defaultCurrent={1} pageSize={3} total={totalElements} />
      </div>
    );
  }
}
