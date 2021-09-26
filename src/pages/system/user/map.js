import React from 'react';
import { patternPhone, patternEmail, patternPwd } from '@/utils/verify';
import { Button, } from 'antd';
import { Link } from 'umi';
import { GLOBAL_ENABLE_STATUS_ENUM } from '@/utils/constant';

export function getCloumns({ isEdit, roleList = [], tableBtnSet }) {
  return [
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'digit',
      formItemProps: {
        precision: 0,
      },
      column: isEdit ? 1 : 0, // 占比列数为0，即可隐藏
      props: {
        disabled: isEdit
      }
    },
    {
      title: '登录名',
      dataIndex: 'loginName',
      validOptions: { // 校验相关配置
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          {
            max: 30,
            message: '字数不能超过30',
          },
        ],
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      search: false,
      validOptions: { // 校验相关配置
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          {
            max: 30,
            message: '字数不能超过30',
          },
        ],
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      search: false,
      validOptions: { // 校验相关配置
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          {
            pattern: patternPhone,
            message: '手机号格式不正确',
          },
        ],
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
      validOptions: { // 校验相关配置
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          {
            pattern: patternEmail,
            message: '邮箱格式不正确',
          },
        ],
      },
    },
    {
      dataIndex: 'password',
      title: '密码',
      type: 'password',
      hideInForm: isEdit, // 当编辑时去除密码字段
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
      },
      hideInTable: true,
      search: false
    },
    {
      dataIndex: 'confirm',
      title: '密码确认',
      type: 'password',
      hideInForm: isEdit, // 当编辑时去除密码字段
      validOptions: {
        dependencies: ['password'],
        rules: [
          {
            required: true,
            message: '不能为空',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码不一致'));
            },
          }),
        ]
      },
      hideInTable: true,
      search: false
    },
    {
      dataIndex: 'sysRoleIds',
      title: '角色',
      type: !roleList.length ? 'custom' : 'checkboxgroup',
      optionsData: roleList,
      models: ['id', 'name'],
      validOptions: {
        rules: [
          {
            required: true,
            message: '不能为空',
          },
        ],
      },
      render: <Link to="/system/role/edit"> <Button type="link">去创建角色</Button></Link>,
      hideInTable: true,
      search: false
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: GLOBAL_ENABLE_STATUS_ENUM,
      hideInForm: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInForm: true,
      width: 200,
      render: tableBtnSet
    },
  ];
}