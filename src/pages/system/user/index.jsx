/*
 * @CreatDate: 2021-09-26 09:28:20 
 * @Describe: 用户管理
 */

import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import { GTable } from '@/components';
import { TableBtns } from '@dzo/com';
import { queryUserList, delUser, changeStatus, } from '@/services/system';
import { isAuth } from '@/utils/common';
import PasswordModal from './components/PasswordModal';
import EditModal from './components/EditModal';
import { getCloumns } from './map';

const User = () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const tableBtnSet = (_, record) => { // 表格操作按钮配置
    const btns = [
      {
        type: 'status',
        status: record.status,
        auth: isAuth('system:user:status'),
        method: async (v) => {
          const { success } = await changeStatus({ id: record.id, status: v });
          if (success) {
            message.success('操作成功');
            actionRef.current.reload();
          }
        },
      },
      {
        name: '编辑',
        auth: isAuth('system:user:edit'),
        method: () => {
          setEditVisible(true);
          setCurrentItem(record);
        },
      }, {
        name: '重置密码',
        auth: isAuth('system:user:password'),
        method: () => {
          setVisible(true);
          setCurrentItem(record);
        },
      }, {
        name: '删除',
        auth: isAuth('system:user:delete'),
        method: async () => {
          const { success } = await delUser({ id: record.id });
          if (success) {
            message.success('删除成功，即将刷新');
            actionRef.current.reload();
          }
        },
        type: 'confirm',
        confirmText: '确定删除账号？',
      }];

    return (<TableBtns buttons={btns} />)
  }
  // 列的配置
  const columns = getCloumns({ tableBtnSet });


  return (
    <>
      <GTable
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          isAuth("system:user:add") &&
          <Button key="add" type="primary" onClick={() => { setEditVisible(true); }}>
            新增用户
          </Button>
        ]}
        request={queryUserList}
        columns={columns}
        onRow={record => {
          return {
            className: !record.status ? 'disabled' : ""
          };
        }}
      />

      <PasswordModal
        visible={visible}
        record={currentItem}
        onCancel={() => {
          setVisible(false);
          setCurrentItem({});
        }} />

      <EditModal
        visible={editVisible}
        record={currentItem}
        onSuccess={() => {
          actionRef.current.reload();
        }}
        onCancel={() => {
          setEditVisible(false);
          setCurrentItem({});
        }} />
    </>
  );
};

export default User;
