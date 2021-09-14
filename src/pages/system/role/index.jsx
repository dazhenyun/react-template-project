import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GTable } from '@/components';
import { TableBtns } from 'dz-com';
import { queryRoleList, delRole } from '@/services/system';
import { isAuth } from '@/utils/common';
import { getCloumns } from './map';
import EditModal from './components/EditModal';

const Role = () => {
  const actionRef = useRef();
  const [editVisible, setEditVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const tableBtnSet = (_, record) => { // 表格操作按钮配置
    const btns = [{
      name: '编辑',
      auth: isAuth('system:role:edit'),
      method: () => {
        setEditVisible(true);
        setCurrentItem(record);
      },
    }, {
      name: '删除',
      auth: isAuth('system:role:delete'),
      method: async () => {
        const { success } = await delRole({ id: record.id });
        if (success) {
          message.success('删除成功，即将刷新');
          actionRef.current.reload();
        }
      },
      type: 'confirm',
      confirmText: '确定删除角色？',
    }];

    return (<TableBtns buttons={btns} />)
  }

  const columns = getCloumns({ tableBtnSet });

  return (
    <>
      <GTable
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          isAuth("system:role:add") &&
          <Button key="add" type="primary" onClick={() => { setEditVisible(true) }}>
            <PlusOutlined /> 新增角色
          </Button>
        ]}
        request={queryRoleList}
        columns={columns}
      />

      <EditModal
        visible={editVisible}
        record={currentItem}
        onCancel={() => {
          setEditVisible(false);
          setCurrentItem({});
        }} />
    </>
  );
};

export default Role;
