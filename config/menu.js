export default [
  {
    id: 1,
    menuHref: "/welcome",
    menuIcon: "systemmanager",
    menuSort: 1,
    menuType: 1,
    menuName: "控制面板",
    parentId: 0,
    visible: 1,
  },
  {
    id: 2,
    menuHref: "/system",
    menuIcon: "systemmanager",
    menuSort: 2,
    menuType: 0,
    menuName: "系统管理",
    parentId: 0,
    visible: 1
  },
  {
    id: 200,
    menuHref: "/system/menu",
    menuIcon: "",
    menuSort: 1,
    menuType: 1,
    menuName: "菜单管理",
    parentId: 2,
    visible: 1
  },
  {
    id: 201,
    menuHref: "/system/user",
    menuIcon: "",
    menuSort: 1,
    menuType: 1,
    menuName: "用户管理",
    parentId: 2,
    visible: 1
  },
  {
    id: 202,
    menuHref: "/system/role/list",
    menuIcon: "",
    menuSort: 2,
    menuType: 1,
    menuName: "角色管理",
    parentId: 2,
    visible: 1
  },
];