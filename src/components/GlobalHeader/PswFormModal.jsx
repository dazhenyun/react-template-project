import React from 'react';
import { ModalForm } from 'dz-com';
import { connect } from 'umi';
import { message } from 'antd';

const commonRules = [{
  required: true,
  message: '不能为空',
}]

const PswFormModal = ({ visible, onCancel, dispatch, submitting }) => {
  return (
    <ModalForm
      title="修改密码"
      visible={visible}
      loading={submitting}
      formSet={[{
        type: 'password',
        dataIndex: 'password',
        title: '新密码',
        validOptions: {
          rules: commonRules
        }
      },
      {
        type: 'password',
        dataIndex: 'confirm',
        title: '确认密码',
        validOptions: {
          dependencies: ['password'],
          rules: [
            ...commonRules,
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码不一致'));
              },
            }),
          ]
        }
      },]}
      onOk={(values) => {
        dispatch({
          type: 'user/updatePassword',
          payload: values
        }).then(success => {
          if (success) {
            message.success('密码修改成功')
            onCancel();
          }
        })
      }}
      onCancel={onCancel}
    />
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['user/updatePassword']
}))(PswFormModal);