import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Prescription extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.table}`}>
        <div className={`${styles.titleInfo}  `}>处方信息</div>
        <div className={`${styles.tableContent}`}>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label} `}>用药人姓名</div>
            <div className={`${styles.message}`}>{currentRecord.prescribInfo.fullName}</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>性别</div>
            <div className={`${styles.message}`}>{currentRecord.prescribInfo.fullName}</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>年龄</div>
            <div className={`${styles.message}`}>{currentRecord.prescribInfo.fullName}</div>
          </div>
          <div className={`${'flex-between'} ${styles.lineInfo}`}>
            <div className={`${styles.label}`}>手机号</div>
            <div className={`${styles.message}`}>{currentRecord.prescribInfo.phone}</div>
          </div>
          <div className={`${styles.lineInfo} ${'flex-start'} ${'flex-wrap'}`}>
            {currentRecord.prescribInfo &&
              currentRecord.prescribInfo.prescribImg.map((item, index) => {
                return (
                  <img
                    key={index}
                    className={`${styles.prescribImg}`}
                    src={item}
                    alt="图片下载失败"
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Prescription;
