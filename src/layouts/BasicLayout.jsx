/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Link, connect } from 'umi';
import { Auth, RightContent } from '@/components';
import { PageHeader } from 'antd';
import logo from '../assets/logo.svg';
import router from '../../config/router';

const routerListEnum = {};
function transfarRouterList(data) {
  if (data) {
    data.forEach(item => {
      if (item.routes && item.routes.length) {
        transfarRouterList(item.routes);
      }
      routerListEnum[item.path] = item;
    })
  }
}
transfarRouterList(router);

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    menuTreeData,
    history
  } = props;

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const { hasPageHeader, title } = routerListEnum[location.pathname] || {};

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => {
        const newRouters = [...routers];
        if (newRouters?.length) { // 最后一层面包屑不让点击，因为会有路径传参的问题
          newRouters[newRouters.length - 1].path = null;
        }
        return newRouters;
      }}

      menuDataRender={() => {
        return menuTreeData;
      }}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Auth pathname={location.pathname}>
        <PageContainer title={false} ghost={false} >
          {
            hasPageHeader &&
            <PageHeader
              style={{ padding: 0 }}
              onBack={() => history.goBack()}
              title={title || '需配置'}
            />}
          {children}
        </PageContainer>
      </Auth>
    </ProLayout>
  );
};

export default connect(({ global, settings, menu }) => ({
  collapsed: global.collapsed,
  settings,
  menuTreeData: menu.menuTreeData,
}))(BasicLayout);
