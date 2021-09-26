import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'umi';
import { GForm } from '@dzo/com';
import store from 'store';
import styles from './style.less';

const Login = props => {
  const { submitting } = props;
  const formRef = useRef();
  const [remenber, setRemenber] = useState(true);

  const handleSubmit = (values) => {
    const { dispatch } = props;

    dispatch({
      type: 'login/login',
      payload: values,
      onSuccess: () => {
        if (remenber) {
          store.set('accountInfo', values);
        } else {
          store.set('accountInfo', null);
        }
      }
    });
  };

  const remenberMe = (e) => {
    setRemenber(e.target.checked);
  }

  useEffect(() => {
    formRef.current.setFieldsValue(store.get('accountInfo') || {});
  }, []);

  return (
    <div className={styles.main}>
      <GForm
        actionRef={formRef}
        formSet={[{
          type: 'input',
          dataIndex: 'username',
          validOptions: {
            rules: [{
              required: true,
              message: '不能为空',
            },]
          },
          props: {
            prefix: <UserOutlined />,
            className: "loginInput",
            size: 'large'
          }
        }, {
          type: 'password',
          dataIndex: 'password',
          validOptions: {
            rules: [{
              required: true,
              message: '不能为空',
            },]
          },
          props: {
            prefix: <LockOutlined />,
            className: "loginInput",
            size: 'large'
          }
        }]}
        column={1}
        defaultFooterBar={false}
        labelBasicSpan={0}
        totalSpan={24}
      />
      <Checkbox onChange={remenberMe} checked={remenber} >记住我</Checkbox>
      <Button
        size="large"
        type="primary"
        className="loginBtn"
        loading={submitting}
        onClick={() => { formRef.current.onValidate(handleSubmit) }}>
        登录
      </Button>

    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
