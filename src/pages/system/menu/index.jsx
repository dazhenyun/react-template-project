import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag } from 'antd';
import { keyBy } from 'lodash';
import { TableBtns, ComIcon } from 'dz-com';
import React, { useRef, useState, useEffect } from 'react';
import { GTable } from '@/components';
import { queryMenuList, delMenu, updateMenu, addMenu, updateMenuStatus } from '@/services/system';
import { tranfarTree, isAuth } from '@/utils/common';
import { SYSTEM_MENU_TYPE, GLOBAL_ENABLE_STATUS_ENUM } from '@/utils/constant';
import EditModal from './components/EditModal';

const SYSTEM_MENU_TYPE_ENUM = keyBy(SYSTEM_MENU_TYPE.map(e => ({ ...e, text: e.label })), 'value');

const Menu = () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [menuTree, setMenuTree] = useState([]);
  const [treeSelect, setTreeSelect] = useState([]);
  const getMenuList = async () => {
    const { data = [] } = await queryMenuList();
    const treeDropList = data
      .filter(el => el.menuType !== 2 && el.state)
      .map(el => ({ ...el, title: el.menuName, key: el.id }));

    setTreeSelect([{ key: 0, title: '顶级', children: tranfarTree(treeDropList) }]);
    setMenuTree(tranfarTree(data));
  }

  useEffect(() => {
    getMenuList();
  }, [])

  const handleRemove = async ({ id }) => {
    if (!id) return;
    const { success } = await delMenu({ id });
    if (success) {
      message.success('删除成功，即将刷新');
      getMenuList();
    }
  };

  const onCancel = () => {
    setVisible(false);
    setRecord({});
  }

  const saveMenu = async (values) => {
    const { success } = await (values.id ? updateMenu(values) : addMenu(values));
    if (success) {
      message.success('操作成功');
      onCancel();
      getMenuList();
    }
  }

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '图标',
      dataIndex: 'menuIcon',
      key: 'menuIcon',
      renderText: (text) => <ComIcon type={text} style={{ color: 'rgb(19, 191, 248)' }} />
    },
    {
      title: '菜单URL',
      dataIndex: 'menuHref',
      key: 'menuHref',
    },
    {
      title: '授权标识',
      dataIndex: 'perms',
      key: 'perms',
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      key: 'menuType',
      renderText: (text) => {
        const { color, label } = SYSTEM_MENU_TYPE_ENUM[text] || {};
        return <Tag color={color}>{label}</Tag>
      }
    },
    {
      title: '排序',
      dataIndex: 'menuSort',
      key: 'menuSort',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      valueEnum: GLOBAL_ENABLE_STATUS_ENUM
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, item) => {
        const btns = [{
          name: '编辑',
          auth: 'system:menu:edit',
          method: () => {
            setRecord(item);
            setVisible(true);
          },
        }, {
          name: '删除',
          auth: 'system:menu:delete',
          method: () => {
            handleRemove(item);
          },
          type: 'confirm',
          confirmText: '确定删除菜单？',
        }, {
          type: 'status',
          method: async (v) => {
            const { success } = await updateMenuStatus({ id: item.id, status: v });
            if (success) {
              message.success(`操作成功`);
              queryMenuList();
            }
          },
          auth: 'system:menu:status',
        },];

        return (<TableBtns buttons={btns} />)
      },
    },
  ];
  return (
    <>
      <GTable
        headerTitle="菜单列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          isAuth("system:menu:add") &&
          <Button type="primary" key="add" onClick={() => { setVisible(true) }}>
            <PlusOutlined /> 新增菜单
          </Button>
        ]}
        dataSource={menuTree}
        columns={columns}
        search={false}
        pagination={false}
      />
      <EditModal
        visible={visible}
        record={record}
        onOk={saveMenu}
        onCancel={onCancel}
        treeOptions={treeSelect}
      />
    </>
  );
};

export default Menu;