import React, { Component } from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Operationrecord extends Component {
  onChange = page => {
    const { dispatch } = this.props;
    const { recordPagenation, currentRecord } = this.props.businessAdm;
    dispatch({
      type: 'businessAdm/getOperationRecord',
      payload: {
        ...recordPagenation,
        pageNumber: page,
        tenantId: currentRecord.tenantId,
      },
    });
  };

  render() {
    const { operaRecord, recordPagenation } = this.props.businessAdm;
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>操作记录</div>
        <div className={`${styles.table}`}>
          <table>
            <tbody>
              {operaRecord &&
                operaRecord.map(item => (
                  <tr key={item.id}>
                    <td className={`${styles.tableleft}`}>{item.operation}</td>
                    <td>
                      <span>{item.optTime}</span>
                      <span className={`${styles.operater}`}>操作人: {item.operator}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {recordPagenation.totalElements >
        (recordPagenation.pageNumber + 1) * recordPagenation.pageSize ? (
          <div className={`${styles.page}`}>
            <Pagination
              current={recordPagenation.pageNumber}
              onChange={this.onChange}
              total={recordPagenation.totalElements}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Operationrecord;
