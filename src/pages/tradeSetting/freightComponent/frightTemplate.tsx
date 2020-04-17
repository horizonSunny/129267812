import React from 'react';
import { Table, Button, Pagination, Modal } from 'antd';
import { connect } from 'dva';
// 外部引入
import styles from './frightTemplate.less';
import { filterAreaName } from '@/utils/filterProperty';

const { confirm } = Modal;
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
  componentDidMount() {}

  state = {
    visible: false,
    currentTemplate: {},
    currentPage: 1,
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    const { dispatch } = this.props;
    console.log('this.state.currentTemplate.freightTemplateId,', this.state.currentTemplate);

    if (dispatch) {
      dispatch({
        type: 'tradeSetting/deleteFreight',
        payload: {
          freightTemplateId: this.state.currentTemplate.freightTemplateId,
        },
      }).then(() => {
        const { saveSearchInfo } = this.props.tradeSetting;
        const { currentPage } = this.state;
        const searchInfo = {
          ...saveSearchInfo,
          pageNumber: currentPage - 1,
        };
        dispatch({
          type: 'tradeSetting/getFreightList',
          payload: searchInfo,
        });
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  deleteTemplate = template => {
    console.log('currentTemplate_', template);
    this.setState({
      currentTemplate: template,
      visible: true,
    });
  };

  paginationChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
    });
    const { saveSearchInfo } = this.props.tradeSetting;
    const { dispatch } = this.props;
    const searchInfo = {
      ...saveSearchInfo,
      pageNumber: page - 1,
    };
    dispatch({
      type: 'tradeSetting/getFreightList',
      payload: searchInfo,
    });
  };

  render() {
    const { totalElements, pageList } = this.props.tradeSetting.freightList;
    console.log('pageList_', pageList, '_totalElements_', totalElements);
    const { currentPage } = this.state;
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
                      <Button
                        className={`${styles.tableHeaderButton}`}
                        onClick={this.deleteTemplate.bind(this, item)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                );
              }}
              pagination={false}
            />
          );
        })}
        <Pagination
          current={currentPage}
          pageSize={3}
          total={totalElements}
          onChange={this.paginationChange}
        />
        <Modal
          title="删除模版"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <span>是否确认删除该模版?</span>
        </Modal>
      </div>
    );
  }
}
