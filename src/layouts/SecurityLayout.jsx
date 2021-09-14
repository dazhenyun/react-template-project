import React from 'react';
import { PageLoading } from '@/components';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { isLogin } from '@/utils/common';
import Watermark from 'web-watermark';

// 水印配置
const gWatermark = new Watermark({
  x: 0,
  y: 150,
  width: 165,
  height: 180,
  color: 'blue',
  fontSize: 22,
  alpha: 0.08,
  deg: -45,
  watch: false,
});

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    this.setState({
      isReady: true,
    });

    if (dispatch && isLogin()) {
      dispatch({
        type: 'menu/queryMenuData', // 获取菜单权限
      });

      dispatch({
        type: 'user/fetchCurrent',
      }).then((data = {}) => {
        const { userName = '', mobile = '' } = data;
        if (userName || mobile) {
          gWatermark.render({ text: `${userName} ${mobile}` });
        }
      });
    }
  }

  componentWillUnmount() {
    gWatermark?.destroy();
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, menuLoading } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogined = isLogin();
    const queryString = stringify({
      redirect: window.location.href,
    });

    // 未登录
    if (!isLogined && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    // 数据还未加载完成
    if (loading || menuLoading || !isReady) {
      return <PageLoading />;
    }

    return children;
  }
}

export default connect(({ user, loading, menu }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  menuLoading: loading.effects['menu/queryMenuData'],
  menuTreeData: menu.menuTreeData
}))(SecurityLayout);
