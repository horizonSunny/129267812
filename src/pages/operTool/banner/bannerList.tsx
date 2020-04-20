import React from 'react';
import { Table, Button, Divider, Icon, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './bannerList.less';
import dataInfo from '../../../../mock/quick';

@connect(({ banner }) => ({
  banner,
}))
export default class BannerList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'banner/getBannerList',
        payload: {
          pageNumber: this.props.banner.pageNumber,
          pageSize: this.props.banner.pageSize,
        },
      }).then(() => {
        console.log('banner');
      });
    }
  }

  state = {
    columns: [
      {
        title: 'banner',
        dataIndex: 'bannerImage',
        key: 'bannerId',
        render: text => (
          <img
            src={text}
            style={{
              width: '80px',
              height: '80px',
            }}
          />
        ),
      },
      {
        title: '名称',
        dataIndex: 'bannerName',
        key: 'bannerName',
        render: text => <a>{text}</a>,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => <a>{text}</a>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) =>
          (record.status === 1 && (
            <Switch checked onChange={value => this.statusChange(value, record)} />
          )) ||
          (record.status !== 1 && (
            <Switch checked={false} onChange={value => this.statusChange(value, record)} />
          )),
      },
      {
        title: '调整排序',
        dataIndex: 'sort',
        key: 'sort',
        render: (text, record, dataIndex) => (
          <div className="iconFont">
            {dataIndex === 0 && (
              <div>
                <Icon type="caret-up" className="disableIcon" />
              </div>
            )}
            {dataIndex !== 0 && this.props.banner.categoryList.length !== 1 && (
              <div>
                <Icon
                  type="caret-up"
                  onClick={this.reverseBannerList.bind(this, dataIndex, 'up')}
                />
              </div>
            )}
            {dataIndex + 1 !== this.props.banner.categoryList.length && (
              <div>
                <Icon
                  type="caret-down"
                  onClick={this.reverseBannerList.bind(this, dataIndex, 'down')}
                />
              </div>
            )}
            {dataIndex + 1 === this.props.banner.categoryList.length && (
              <div>
                <Icon type="caret-down" className="disableIcon" />
              </div>
            )}
          </div>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <span>
            <a onClick={this.editorBanner.bind(this, record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={this.deleteBanner.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ],
  };

  statusChange(checked, record) {
    let status;
    if (checked) {
      status = 1;
    } else {
      status = 2;
    }
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'banner/resetBannerItem',
        payload: {
          bannerId: record.bannerId,
          status,
        },
      });
    }
  }

  deleteBanner(record) {
    console.log('record_', record.bannerId);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'banner/deleteBannerItem',
        payload: {
          bannerId: record.bannerId,
        },
      });
    }
  }

  editorBanner(record?) {
    const obj = {
      pathname: '/operTool/banner/newBanner',
    };
    console.log('record_', record);
    let recordInfo;
    const { dispatch } = this.props;
    if (record) {
      // 编辑
      recordInfo = {
        image: record.bannerImage,
        bannerName: record.bannerName,
        bannerId: record.bannerId,
        redirectUrl: record.redirectUrl,
      };
    } else {
      // 新建
      recordInfo = {
        image: '',
        bannerName: '',
        redirectUrl: '',
      };
    }
    dispatch({
      type: 'banner/saveBanner',
      payload: recordInfo,
    });
    router.push(obj);
  }

  // reverse排序
  reverseBannerList(index, direction) {
    console.log('index_', index, '_direction_', direction);
    const startId = this.props.banner.categoryList[index].bannerId;
    let endId;
    switch (direction) {
      case 'up':
        endId = this.props.banner.categoryList[index - 1].bannerId;
        break;
      case 'down':
        endId = this.props.banner.categoryList[index + 1].bannerId;
        break;
      default:
        break;
    }
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'banner/reverseBannerList',
        payload: {
          bannerIds: [startId, endId],
        },
      });
    }
  }

  tableChange = pagination => {
    console.log('pagination_', pagination);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'banner/getBannerList',
        payload: {
          pageNumber: pagination.current - 1,
          pageSize: this.props.banner.pageSize,
        },
      }).then(() => {
        console.log('banner');
      });
    }
  };

  render() {
    const { columns } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        {/* <Title level={4}>商品编辑</Title> */}
        <Button
          type="danger"
          icon="plus-circle"
          className="buttonAdd"
          onClick={this.editorBanner.bind(this, '')}
        >
          添加
        </Button>
        <div
          style={{
            clear: 'both',
          }}
        />
        <Table
          columns={columns}
          dataSource={this.props.banner.categoryList}
          pagination={{
            current: this.props.banner.pageNumber + 1,
            pageSize: this.props.banner.pageSize,
            // pageSize: 5,
            total: this.props.banner.totalElements,
          }}
          onChange={this.tableChange}
        />
      </PageHeaderWrapper>
    );
  }
}
