import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './platformAudEdit.less';

@connect(({ platformAudit, tradeSetting }) => ({ platformAudit, tradeSetting }))
export default class PlatformAudEdit extends React.Component {
  state = {
    isFirstForm: true,
  };

  componentDidMount() {
    // getFreightList;
    // const { dispatch } = this.props;
  }

  render() {
    const { isFirstForm } = this.state;
    return <PageHeaderWrapper className={styles.main} />;
  }
}
