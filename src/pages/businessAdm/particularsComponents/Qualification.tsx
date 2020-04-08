import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Qualification extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>企业资质</div>
        <div className={`${styles.picList}`}>
          {currentRecord.enterpriseQualification && currentRecord.enterpriseQualification.length > 0
            ? currentRecord.enterpriseQualification.map((item, index) => {
                return (
                  <div className={`${styles.picItem}`} key={index}>
                    <img src={item.url} alt="" />
                    <div className={`${styles.picName}`}>{item.name}</div>
                  </div>
                );
              })
            : '无'}
        </div>
      </div>
    );
  }
}

export default Qualification;
