import React from 'react';
import { connect, Link } from 'umi';
import { Result, Button } from 'antd';
import routers from '../../../config/router';

const allPath = [];

function getAllRoutersPath(data) {
  data.forEach(el => {
    if (el.routes && el.routes.length) {
      getAllRoutersPath(el.routes);
    } else {
      allPath.push(el.path);
    }
  })
}

getAllRoutersPath(routers);

// 针对不存在的路由要404
const NoMatch = ({ pathname, }) => {

  if (allPath.includes(pathname)) {
    return (
      <Result
        status={403}
        title="403"
        subTitle="还未开通权限"
        extra={
          <Button type="primary">
            <Link to="/user/login">去登录</Link>
          </Button>
        }
      />
    );
  }
  return (
    <Result
      status={404}
      title="404"
      subTitle="页面找不到"
      extra={
        <Button type="primary">
          <Link to="/user/login">去登录</Link>
        </Button>
      }
    />
  );
}

const Auth = ({ menuListData = [], pathname, children, dispatch }) => {
  const allMenuPath = menuListData.map(el => el.menuHref);

  return (
    allMenuPath.includes(pathname) || pathname === '/' || pathname === '/welcome' ?
      children
      :
      <NoMatch pathname={pathname} dispatch={dispatch} />
  );
};

export default connect(({ menu }) => ({
  menuListData: menu.menuListData,
}))(Auth);