import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Row, Col, Input, Button, Table, Tag } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './chooseProducts.less';

// 请求
@connect(({ commodity }) => ({ commodity }))
class CommodityAdm extends React.Component {
  componentDidMount() {}

  state = {
    searchInfo: '',
    columns: [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
        render: (text, record, index) => `${index + 1 + this.state.currentPageNumber * 10}`,
      },
      {
        title: '商品图',
        dataIndex: 'productImage',
        key: 'productImage',
        render: (text, record, index) => {
          return (
            <div>
              <img
                src={record.productImage[0]}
                alt="暂无图片"
                style={{ height: '60px', width: '60px' }}
              />
            </div>
          );
        },
      },
      {
        title: '商品名',
        dataIndex: 'productCommonName',
        key: 'productCommonName',
        render: text => text,
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNumber',
        key: 'approvalNumber',
        render: text => text,
      },
      {
        title: '包装规格',
        dataIndex: 'productSpecif',
        key: 'productSpecif',
        render: text => text,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: text => text,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => (text === 1 ? '未添加' : '已添加'),
      },
      {
        title: '操作',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return record.status === 1 ? (
            <Button style={{ background: '#F5AB1C' }} onClick={this.handleNew.bind(this, record, 'editAdd')}>
              添加
            </Button>
          ) : (
            <Button style={{ background: '#BDBBBB' }} disabled>
              添加
            </Button>
          );
        },
      },
    ],
    dataSource: [],
    currentPageNumber: 0,
    totalElements: 0,
  };

  // 查询
  handleSearch = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { searchInfo } = fieldsValue;
      this.setState({
        searchInfo,
      });
      dispatch({
        type: 'commodity/productTemplateList',
        payload: { pageNumber: 0, pageSize: 10, keyword: searchInfo },
      }).then(res => {
        this.setState({
          dataSource: res.pageList,
          currentPageNumber: res.pageNumber,
          totalElements: res.totalElements,
        });
      });
    });
  };

  // 分页器
  onChange = e => {
    console.log('触发', this.searchInfo);
    const { dispatch } = this.props;
    const currentPage = e.current - 1;
    console.log('触发currentPage_', currentPage);
    dispatch({
      type: 'commodity/productTemplateList',
      payload: { pageNumber: currentPage, pageSize: 10, keyword: this.state.searchInfo },
    }).then(res => {
      this.setState({
        dataSource: res.pageList,
        currentPageNumber: res.pageNumber,
        totalElements: res.totalElements,
      });
    });
    return false;
  };

  // 模版新增产品
  handleNew = (record,type) => {
    const { dispatch } = this.props;
    console.log('record_', record);
    let params = {
      approvalNumber: '',
      englishName: '',
      isMp: '',
      manufacturer: '',
      pinyin: '',
      productBrand: '',
      productDesc: '',
      productExpire: '',
      productImage: [],
      productModel: '',
      productCommonName: '',
      productSpec: '',
      productSpecif: '',
      productType: '',
    }; 
    if (record) {
      params = record;
      params.productTemplateId = params.productId;
    }
    if(type =='editAdd'){
      router.push('/commodityAdm/management/edit?type=1');
    }else if(type =='addDress'){
      router.push('/commodityAdm/management/edit?type=2');
    }   

    dispatch({
      type: 'commodity/resetProduct',
      payload: params,
    });
    // router.push('/commodityAdm/management/edit');
  };

  render() {
    const { state } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper className={styles.main}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24} justify="space-around">
            <Col span={10} offset={4} className={styles.searchInput}>
              <Form.Item>
                {getFieldDecorator('searchInfo', {
                  rules: [],
                })(<Input placeholder="请输入商品名、通用名、批准文号" />)}
              </Form.Item>
              &nbsp;&nbsp;&nbsp;
              <span className={styles.searchInfo}>若未搜索到商品，则该商品不支持搜索添加</span>
            </Col>
            <Col span={8} style={{}}>
              <Button type="primary" htmlType="submit"> 
                搜索
              </Button>
              <Button
                style={{ marginLeft: 8, background: '#F5AB1C' }}
                onClick={this.handleNew.bind(this, false, 'addDress')}
              >
                手动添加
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          columns={state.columns}
          className={styles.table}
          pagination={{
            position: 'bottom',
            current: state.currentPageNumber + 1,
            pageSize: 10,
            total: state.totalElements,
          }}
          onChange={this.onChange}
          dataSource={state.dataSource}
        />
      </PageHeaderWrapper>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(CommodityAdm);
export default WrappedAdvancedSearchForm;
