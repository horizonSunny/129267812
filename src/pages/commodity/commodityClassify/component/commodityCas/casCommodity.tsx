import React from 'react';
import { Table, Input, Button } from 'antd';
import { connect } from 'dva';
import { commodityItem } from './commodityItem';
import styles from './casCommodity.less';
import AddCommodity from '../../modelComponent/addCommodity';
import SortTo from '../../modelComponent/sortTo';

const { Search } = Input;

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class CasCommodity extends React.Component {
  state = {};

  components = {
    body: {
      row: commodityItem,
    },
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyCommodity',
        payload: selectedRowKeys,
      });
    }
  };

  downSelect = () => {
    return (
      <div className="buttonContain">
        <Button type="danger" onClick={this.removeCom.bind(this)}>
          移除
        </Button>
        <Button onClick={this.clickSortModal.bind(this)}>分类至 >|</Button>
      </div>
    );
  };

  search = e => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyKeyWord',
        payload: e.target.value,
      });
    }
  };

  onSearch = e => {
    console.log('onSearch_', e);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/selectCasInKeyword',
      });
    }
  };

  // 移除选中的药物
  removeCom() {
    const { dispatch } = this.props;
    console.log(this.props,'this.props先进点击移除的地方吗');
    
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/removeCommodity',
      });
    }
  }

  //  为此分类下添加商品
  onRef = ref => {
    this.child = ref;
  };

  clickModal(this) {
    console.log(this,'111111111')
    this.child.showModal();
  }

  // 分类至弹窗
  onSortTo = ref => {
    this.childSortTo = ref; 
  };

  clickSortModal() {
    this.childSortTo.showModal();
  }

  render() {
    const columns = [
      {
        title: this.downSelect(),
        dataIndex: 'productCommonName',
        key: 'productId',
      },
    ];
    // 这里必须用状态管理中的数据,要是this.state会留存上一次的数据
    const { selectedRowKeys } = this.props.commodityClassify;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.main}>
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: '1px solid rgb(208,208,208)',
            borderRadius: '5px',
            height: '33px',
          }}
        >
          <div>
            共
            <span
              style={{
                color: 'red',
              }}
            >
              {this.props.commodityClassify.commodityInfo.totalElements}
            </span>
            件商品
          </div>
          <Search
            placeholder="请输入关键字"
            className="searchInput"
            onChange={this.search.bind(this)}
            style={{ width: 200 }}
            value={this.props.commodityClassify.searchKeyword}
            onSearch={this.onSearch.bind(this)}
          />
          <Button
            type="danger"
            style={{
              fontSize: '14px',
              width: '20px',
            }}
            size="small"
            shape="circle"
            icon="plus"
            onClick={this.clickModal.bind(this)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={this.props.commodityClassify.commodityInfo.pageList}
          components={this.components}
          rowSelection={rowSelection}
          rowKey={record => record.productId}
          pagination={{
            pageSize: 5,
            total: this.props.commodityClassify.commodityInfo.pageList.length,
          }}
        />
        <AddCommodity onRef={this.onRef} />
        <SortTo onRef={this.onSortTo} />
      </div>
    );
  }
}
