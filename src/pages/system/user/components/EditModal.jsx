import React, { useRef, useEffect } from 'react';
import { ModalForm } from '@dzo/com';
import { message } from 'antd';
import { connect } from 'umi';
import { addUser, updateUser } from '@/services/system';
import { getCloumns } from '../map';

const Edit = ({ visible, record, onCancel, onSuccess, systemUser, dispatch }) => {
  const isEdit = !!record.id;
  const { roleList } = systemUser;
  const formRef = useRef();

  useEffect(() => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    dispatch({ type: "systemUser/queryRoleAll" }); // 获取所有角色
  }, []);


  // 更新请求
  const editUser = async (values) => {
    const { success } = await (values.id ? updateUser(values) : addUser(values));
    if (success) {
      message.success('操作成功');
      onCancel();
      onSuccess();
    }
  }

  return (
    <ModalForm
      formRef={formRef}
      initialValues={record}
      title={isEdit ? '修改用户' : '新增用户'}
      visible={visible}
      onCancel={onCancel}
      onOk={editUser}
      formSet={getCloumns({ isEdit, roleList })} // 表单配置
    />
  );
};

export default connect(({ systemUser }) => ({
  systemUser,
}))(Edit);;