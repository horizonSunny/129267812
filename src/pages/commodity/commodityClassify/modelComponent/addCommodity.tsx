import React from 'react';
import { Button, Modal, Table, Input } from 'antd';
import { connect } from 'dva';
import styles from './addCommodity.less';
import { commodityItem } from './commodityItem';

const { Search } = Input;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class AddCommodityModal extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = { visible: false };

  components = {
    body: {
      row: commodityItem,
    },
  };

  showModal = () => {
    const { dispatch } = this.props;
    console.log(']]]]]]]]]]]]]_', this.props.commodityClassify.selectedProductKeys);
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/productSearch',
        payload: '',
      });
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/productInsert',
      });
    }
    this.setState({
      visible: false,
    });
    location.reload([true]);
  };

  handleCancel = e => {
    console.log('handleCancel_', e);
    // 清空选中项
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyProduct',
        payload: [],
      });
      this.setState({
        visible: false,
      });
    }
  };

  // 搜索
  onSearch(e) {
    console.log('e_', e);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/productSearch',
        payload: e,
      });
    }
  }

  // 搜索弹框
  downSelect = () => {
    return (
      <div
        className={styles.main}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="buttonContain">
          <Search
            style={{
              marginLeft: '10px',
              width: '200px',
            }}
            placeholder=""
            onSearch={this.onSearch.bind(this)}
          />
          <Button
            type="primary"
            style={{
              marginLeft: '20px',
            }}
            onClick={this.handleOk.bind(this)}
          >
            添加
          </Button>
        </div>
      </div>
    );
  };

  // 选中添加项
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
    const { dispatch } = this.props;


    console.log(dispatch,'eeeeeee');
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyProduct',
        payload: selectedRowKeys,
      });
    }
  };

  render() {
    const columns = [
      {
        title: this.downSelect(),
        dataIndex: 'productCommonName',
        key: 'productId',
      },
    ];
    // 这里必须用状态管理中的数据,要是this.state会留存上一次的数据
    const { selectedProductKeys } = this.props.commodityClassify;
    const rowSelection = {
      selectedRowKeys: selectedProductKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.status === 2, // Column configuration not to be checked
        name: record.productCommonName,
      }),
    };
    return (
      <div>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          style={{
            height: '450px',
          }}
        >
          <Table
            columns={columns}
            dataSource={this.props.commodityClassify.modalProductList.pageList}
            components={this.components}
            rowSelection={rowSelection}
            rowKey={record => record.productId}
            pagination={{ pageSize: 5, total: this.props.commodityClassify.modalProductList.total }}
          />
        </Modal>
      </div>
    );
  }
}
