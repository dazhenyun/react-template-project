import React, { useRef, useEffect } from 'react';
import { ModalForm } from '@dzo/com';
import { updatePassword } from '@/services/system';
import { patternPwd } from '@/utils/verify';
import { message } from 'antd';

/**
 * 重置密码
 * @param  param0 
 */
const PasswordModal = ({ visible, onCancel, record = {}, }) => {
  const formRef = useRef();

  useEffect(() => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, [visible]);

  const props = {
    initialValues: record,
    formRef,
    title: '重置密码',
    visible,
    onCancel,
    onOk: async (values) => {
      const { success } = await updatePassword(values);
      if (success) {
        message.success('操作成功');
        onCancel();
      }
    },
    formSet: [{
      type: 'input',
      dataIndex: 'id',
      title: 'id',
      column: 0, // 占比列数为0，即可隐藏
    },
    {
      type: 'custom',
      dataIndex: 'name',
      title: '用户名',
      render: <span>{record.userName}</span>
    },
    {
      type: 'password',
      dataIndex: 'newPassword',
      title: '密码框',
      validOptions: {
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          {
            min: 6,
            message: '至少6位数字加字母组成',
          },
          {
            pattern: patternPwd,
            message: '密码必须由6-20位数字加字母组成',
          },
        ],
      }
    },
    {
      type: 'password',
      dataIndex: 'confirm',
      title: '密码确认',
      validOptions: {
        dependencies: ['newPassword'],
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码不一致'));
            },
          }),
        ]
      }
    }]
  };

  return (
    <ModalForm {...props} />
  );
};

export default PasswordModal;