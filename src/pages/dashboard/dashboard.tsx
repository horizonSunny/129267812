import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Redirect } from 'react-router-dom';
import router from 'umi/router';
// 外部引入
import styles from './dashboard.less';

export default class dashboard extends Component {
    render() {
        // setTimeout(()=>{
        //     router.push('/commodityAdm/management');
        // },1000)
        return (
            <PageHeaderWrapper>
                <div className={styles.container}>
                    欢迎登陆线上商城管理后台!
                </div>
            </PageHeaderWrapper>
        )
    }
}
