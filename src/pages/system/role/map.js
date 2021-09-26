// 列表及表单配置
export function getCloumns({ isEdit, appMenuData, tableBtnSet }) {
  return [
    {
      title: '角色ID',
      dataIndex: 'id',
      search: false,
      column: isEdit ? 1 : 0, // 占比列数为0，即可隐藏
      props: {
        disabled: isEdit
      }
    },
    {
      title: '角色名称',
      dataIndex: 'name',
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
      title: '角色描述',
      dataIndex: 'remark',
      search: false,
      type: 'textarea',
      validOptions: { // 校验相关配置
        rules: [
          {
            max: 100,
            message: '字数不能超过100',
          },
        ],
      },
    },
    {
      dataIndex: 'menuIdList',
      title: '权限',
      search: false,
      hideInTable: true,
      type: 'roletree',
      props: {
        treeData: appMenuData || []
      },
      validOptions: { // 校验相关配置
        rules: [
          {
            required: true,
            message: '不能为空',
          },
        ],
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      search: false,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInForm: true,
      width: 100,
      render: tableBtnSet
    },
  ];
}