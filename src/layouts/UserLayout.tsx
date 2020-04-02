import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Form, Row, Col, Input, Button, DatePicker, Select, TreeSelect } from 'antd';
import { Helmet } from 'react-helmet';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/login/icon.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  // console.log('props_children_', props.children);
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <Col span={10} style={{}}>
            <div className={styles.leftImg}>
              <img alt="logo" className={styles.logo} src={logo} />
            </div>
          </Col>
          <Col span={5} style={{}}>
            {children}
          </Col>
        </div>
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
