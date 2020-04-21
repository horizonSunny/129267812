import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { orderStatus } from '@/utils/configInfo';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ businessAdm }) => ({
  businessAdm,
}))
class Title extends Component {
  state = {
    hour: '00',
    minute: '00',
    second: '00',
  };

  componentDidMount() {
    // const end = Date.parse(new Date('2018-11-29 24:00'));
    // const { currentRecord } = this.props.businessAdm;
    const testTime = 7200000;
    this.countFun(testTime);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countFun = countdownTime => {
    let remaining = countdownTime;
    this.timer = setInterval(() => {
      // 防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        const hour = Math.floor((remaining / 1000 / 3600) % 24);
        const minute = Math.floor((remaining / 1000 / 60) % 60);
        const second = Math.floor((remaining / 1000) % 60);

        this.setState({
          hour: hour < 10 ? `0${hour}` : hour,
          minute: minute < 10 ? `0${minute}` : minute,
          second: second < 10 ? `0${second}` : second,
        });
      } else {
        clearInterval(this.timer);
        // 倒计时结束时触发父组件的方法
        // this.props.timeEnd();
      }
    }, 1000);
  };

  render() {
    const { currentRecord } = this.props.businessAdm;
    return (
      <div className={`${styles.title}`}>
        <div className={`${styles.infopart}`}>
          <span>{orderStatus(currentRecord.orderStatus)}</span>
          {currentRecord.orderStatus === 0 && (
            <span className={`${styles.timeRemaining}`}>
              剩余{this.state.hour}小时{this.state.minute}分{this.state.second}秒自动关闭
            </span>
          )}
        </div>
        {currentRecord.orderStatus === 2 && (
          <div className={`${styles.expressage}`}>
            <img src={tipsIcon} alt="123" />
            <span>{currentRecord.shipperTypeId === 1 && '普通快递'}</span>
            <span>{currentRecord.shipperTypeId === 2 && '加急配送'}</span>
            <span>{currentRecord.shipperTypeId === 3 && '到店自提'}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Title;
