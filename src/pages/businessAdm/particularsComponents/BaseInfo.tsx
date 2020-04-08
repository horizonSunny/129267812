import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class BaseInfo extends Component {
  transTenantType = value => {
    if (value === 0) {
      return '单体药店';
    }
    if (value === 1) {
      return '连锁药店';
    }
    if (value === 2) {
      return '批发企业';
    }
  };

  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>基本信息</div>
        <div className={`${styles.table}`}>
          <table>
            <tbody>
              <tr>
                <td className={`${styles.tableleft}`}>企业类型</td>
                <td>{this.transTenantType(currentRecord.tenantType)}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>统一社会信用代码</td>
                <td>{currentRecord.socialCreditCode}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>店铺所在地</td>
                <td>
                  {currentRecord.province} {currentRecord.city} {currentRecord.area}
                </td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>店铺详细地址</td>
                <td>{currentRecord.address}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>法定代表人(负责人)姓名</td>
                <td>{currentRecord.contactFullName}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>管理员姓名</td>
                <td>{currentRecord.adminName}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>管理员手机号</td>
                <td>{currentRecord.adminTel}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>管理员手持身份证照片</td>
                <td>
                  <img
                    // src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                    src={currentRecord.adminCard}
                    alt=""
                    height="150"
                    width="150"
                  />
                </td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>用户名</td>
                <td>{currentRecord.userName}</td>
              </tr>
              <tr>
                <td className={`${styles.tableleft}`}>密码</td>
                <td>{currentRecord.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BaseInfo;
