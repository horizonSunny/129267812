import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './platformAudEdit.less';
import Form from './component/platformAudEdit/Form';
import NextForm from './component/platformAudEdit/NextForm';

@connect(({ platformAudit, tradeSetting }) => ({ platformAudit, tradeSetting }))
export default class PlatformAudEdit extends React.Component {
  state = {
    isFirstForm: true,
  };

  componentDidMount() {
    // getFreightList;
    const { dispatch } = this.props;
    dispatch({
      type: 'tradeSetting/getFreightList',
      payload: {
        pageNumber: 0,
        pageSize: 10000,
      },
    });
  }

  modifyFormPage = status => {
    this.setState({
      isFirstForm: status,
    });
  };

  render() {
    const { isFirstForm } = this.state;
    return (
      <PageHeaderWrapper className={styles.main}>
        {/* <Title level={4}>商品编辑</Title> */}
        {isFirstForm && <Form modifyFormPage={this.modifyFormPage} />}
        {!isFirstForm && <NextForm modifyFormPage={this.modifyFormPage} />}
      </PageHeaderWrapper>
    );
  }
}
