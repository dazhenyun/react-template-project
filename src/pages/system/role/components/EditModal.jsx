import React, { useRef, useEffect } from 'react';
import { connect } from 'umi';
import { message } from 'antd';
import { ModalForm } from 'dz-com';
import { addRole, updateRole } from '@/services/system';
import { getCloumns } from '../map';

const Edit = ({ visible, record, onCancel, systemRole, dispatch }) => {
  const isEdit = !!record.id;
  const { appMenuData } = systemRole;
  const formRef = useRef();

  useEffect(() => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    dispatch({ type: "systemRole/queryAppMenuData" });
  }, []);


  // 更新请求
  const editRole = async (values) => {
    const { success } = await (values.id ? updateRole(values) : addRole(values));
    if (success) {
      message.success('操作成功');
      onCancel();
    }
  }

  return (
    <ModalForm
      formRef={formRef}
      initialValues={record}
      title={isEdit ? '修改角色' : '新增角色'}
      visible={visible}
      onCancel={onCancel}
      onOk={editRole}
      formSet={getCloumns({ isEdit, appMenuData })} // 表单配置
    />
  );
};

export default connect(({ systemRole }) => ({
  systemRole,
}))(Edit);;