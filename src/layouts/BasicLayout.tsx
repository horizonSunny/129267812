/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Result, Button } from 'antd';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
// 做面包屑的动态配置
import classfyB from '../utils/classfyBreadcrumb';

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

// const defaultFooterDom = (
//   <DefaultFooter
//     copyright="2019 蚂蚁金服体验技术部出品"
//     links={[
//       {
//         key: 'Ant Design Pro',
//         title: 'Ant Design Pro',
//         href: 'https://pro.ant.design',
//         blankTarget: true,
//       },
//       {
//         key: 'github',
//         title: <Icon type="github" />,
//         href: 'https://github.com/ant-design/ant-design-pro',
//         blankTarget: true,
//       },
//       {
//         key: 'Ant Design',
//         title: 'Ant Design',
//         href: 'https://ant.design',
//         blankTarget: true,
//       },
//     ]}
//   />
// );

// const footerRender: BasicLayoutProps['footerRender'] = () => {
//   if (!isAntDesignPro()) {
//     return defaultFooterDom;
//   }

//   return (
//     <>
//       {defaultFooterDom}
//       <div
//         style={{
//           padding: '0px 24px 24px',
//           textAlign: 'center',
//         }}
//       >
//         <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
//           <img
//             src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
//             width="82px"
//             alt="netlify logo"
//           />
//         </a>
//       </div>
//     </>
//   );
// };

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <ProLayout
      // logo={logo}
      // menuHeaderRender={(logoDom, titleDom) => (
      //   <span>
      //     {logoDom}
      //     {titleDom}
      //   </span>
      // )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      itemRender={(route, params, routes, paths) => {
        const toPath = paths[paths.length - 1];
        const first = routes.indexOf(route) !== 0 && routes.indexOf(route) !== routes.length - 1;
        const crumbName = classfyB(toPath, location.query.id);
        return first ? (
          // 前面必须加上'/'
          <Link to={`/${paths[paths.length - 1]}`}>{route.breadcrumbName}</Link>
        ) : (
          <span>{crumbName || route.breadcrumbName}</span>
        );
      }}
      // 取消脚部展示信息
      // footerRender={footerRender}
      menuDataRender={menuDataRender}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
