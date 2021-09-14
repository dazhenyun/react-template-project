import React from 'react';
import styles from './UserLayout.less';

const UserLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>大箴科技管理系统</div>
        <div className={styles.login}>
          <h2>登录你的帐号</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
