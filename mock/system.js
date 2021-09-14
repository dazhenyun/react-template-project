import menuList from '../config/menu';


function getList() {
  const list = [];
  for (let i = 1; i <= 5; i += 1) {
    list.push({
      admin: false,
      createBy: null,
      createTime: "2020-08-03 19:52:26",
      id: i,
      menuIdList: ["10201", "102", "2"],
      name: `财务${i}`,
      page: null,
      pageSize: null,
      remark: "财务",
      roleSign: "",
      state: 1,
      updateBy: 1,
      updateTime: "2020-08-03 19:52:43",
      userId: null,
    })
  }
  return list;
}
function getUserList() {
  const list = [];
  for (let i = 1; i <= 5; i += 1) {
    list.push({
      admin: false,
      createTime: "2020-08-03 19:49:33",
      email: "shangh4@dazhenyun.com",
      id: i,
      loginIp: "10.1.20.57",
      loginName: "huoli4",
      mobile: "15958172908",
      password: "",
      remark: "",
      roleSign: "",
      status: 1,
      sysRoleIds: [1, 2],
      token: "",
      userId: null,
      userName: "火离4",
      userType: 0
    })
  }
  return list;
}

export default {
  'GET /api/role/list': {
    data: getList(),
    code: 200,
    success: true,
    total: 5
  },
  'GET /api/role/listAll': {
    data: getList(),
    code: 200,
    success: true,
    total: 5
  },
  'GET /api/user/list': {
    data: getUserList(),
    code: 200,
    success: true,
    total: 5
  },

  'PUT /api/user/edit/13': {
    data: {},
    code: 200,
    success: true,
  },
  'POST /api/user/add': {
    data: {},
    code: 200,
    success: true,
  },
  'DELETE /api/user/delete/1': {
    data: {},
    code: 200,
    success: true,
  },
  'PUT /api/reset/password/1': {
    data: {},
    code: 200,
    success: true,
  },

  'POST /api/role/add': (req, res) => {
    res.send({
      code: 200,
      data: {},
      success: true,
    });
  },
  'DELETE /api/role/delete/1': {
    data: {},
    code: 200,
    success: true,
  },
  'GET /api/menu/listAll': (req, res) => {
    res.send({
      code: 200,
      success: true,
      data: menuList.map(el => ({ ...el, state: 1 })),
    });
  },
  'POST /api/menu/save': (req, res) => {
    res.send({
      code: 200,
      data: 1,
      success: true,
    });
  },
  'PUT /api/menu/update/1': (req, res) => {
    res.send({
      code: 200,
      data: 1,
      success: true,
    });
  },
  'DELETE /api/menu/delete/1': (req, res) => {
    res.send({
      code: 200,
      data: 1,
      success: true,
    });
  },
  'PUT /api/menu/disable/1': (req, res) => {
    res.send({
      code: 200,
      data: 1,
      success: true,
    });
  },
}
