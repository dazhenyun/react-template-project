import React, { useRef, useEffect, useState } from 'react';
import { SYSTEM_MENU_TYPE, GLOBAL_ENABLE_STATUS_ENUM, GLOBAL_IS } from '@/utils/constant';
import { ModalForm } from 'dz-com';
import { values } from 'lodash';

const GLOBAL_ENABLE_STATUS = values(GLOBAL_ENABLE_STATUS_ENUM);

const requiredRule = [
  {
    required: true,
    message: '不能为空',
  },
]
/**
 * 新增、编辑菜单
 * @param  param0 
 */
const EditModal = ({ visible, onCancel, record, onOk, treeOptions }) => {
  const formRef = useRef();
  const { id } = record;
  const [menuType, setMenuType] = useState(1);

  useEffect(() => {
    if (visible) {
      formRef.current?.resetFields();
    }
    setMenuType(record.menuType || 0);
  }, [visible]);

  const props = {
    formRef,
    title: id ? '编辑菜单' : '新增菜单',
    visible,
    onCancel,
    formProps: {
      initialValues: {
        state: 1,
        visible: 1,
        menuType: 0,
        ...record,
      }
    },
    onValuesChange: (changedValues) => {
      if ('menuType' in changedValues) {
        setMenuType(changedValues.menuType);
      }
    },
    onOk,
    formSet: [{
      type: 'input',
      name: 'id',
      column: 0,
    },
    {
      type: 'radiogroup',
      name: 'menuType',
      label: '菜单类型',
      optionsData: SYSTEM_MENU_TYPE,
      validOptions: { // 校验相关配置
        rules: requiredRule
      },
    },
    {
      type: 'input',
      name: 'menuName',
      label: '名称',
      validOptions: {
        rules: [
          ...requiredRule,
          {
            max: 30,
            message: '字数不能超过30',
          },
        ],
      },
    },
    {
      type: 'treeselect',
      name: 'parentId',
      label: '上级菜单',
      props: {
        treeData: treeOptions
      },
      validOptions: {
        rules: requiredRule
      },
    },
    {
      type: 'input',
      name: 'menuHref',
      label: '菜单URL',
      validOptions: {
        rules: [
          ...requiredRule,
          {
            max: 60,
            message: '字数不能超过60',
          },]
      },
      hideInForm: menuType !== 1,
    },
    {
      type: 'input',
      name: 'perms',
      label: '授权标识',
      validOptions: {
        rules: [
          {
            required: menuType === 2,
            message: '不能为空',
          },
          {
            max: 60,
            message: '字数不能超过60',
          },]
      },
      hideInForm: menuType === 0,
    },
    {
      type: 'input',
      name: 'menuIcon',
      label: '菜单图标',
      validOptions: {
        rules: [{
          max: 30,
          message: '字数不能超过30',
        },]
      },
      hideInForm: menuType === 2,
    },
    {
      type: 'inputnumber',
      name: 'menuSort',
      label: '排序',
      hideInForm: menuType === 2,
    },
    {
      type: 'radiogroup',
      name: 'visible',
      label: '是否显示',
      optionsData: GLOBAL_IS,
      validOptions: { // 校验相关配置
        rules: requiredRule
      },
      hideInForm: menuType === 2,
    },
    {
      type: 'radiogroup',
      name: 'state',
      label: '状态',
      optionsData: GLOBAL_ENABLE_STATUS,
      models: ['value', 'text'],
      validOptions: { // 校验相关配置
        rules: requiredRule
      },
      hideInForm: !!id
    },
    ]
  };

  return (
    <ModalForm {...props} />
  );
};

export default EditModal