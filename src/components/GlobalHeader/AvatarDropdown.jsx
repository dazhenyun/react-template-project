import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import PswFormModal from './PswFormModal';
import usericon from '../../assets/usericon.svg';

class AvatarDropdown extends React.Component {
  state = {
    visible: false
  };

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    if (key === 'settings') {
      this.setState({ visible: true })
      return;
    }

    history.push(`/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
    } = this.props;
    const { visible } = this.state;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="settings">
          <SettingOutlined />
            修改密码
          </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        {

          currentUser && currentUser.loginName ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={usericon}
                  alt="avatar" />
                <span className={styles.name}>{currentUser.loginName}</span>
              </span>
            </HeaderDropdown>
          ) : (
              <span className={`${styles.action} ${styles.account}`}>
                <Spin
                  size="small"
                  style={{
                    marginLeft: 8,
                    marginRight: 8,
                  }}
                />
              </span>
            )
        }
        <PswFormModal visible={visible} onCancel={() => { this.setState({ visible: false }) }} />
      </>
    )
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser || {},
}))(AvatarDropdown);
