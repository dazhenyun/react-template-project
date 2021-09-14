import Cookies from 'js-cookie';

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据


export default {
  // 支持值为 Object 和 Array
  'GET /api/user/personal/info': {
    data: {
      admin: false,
      createTime: "2020-07-09 20:32:42",
      email: "hhhhh@163.com",
      id: 6,
      loginIp: "10.1.100.3",
      loginName: "管理员",
      mobile: "18710901434",
      password: "",
      remark: "1232",
      roleSign: "",
      status: 1,
      sysRoleIds: [14],
      token: "",
      userId: null,
      userName: "AAASSSS",
      userType: 0
    },
    code: 200,
    success: true
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login': (req, res) => {
    Cookies.set('token', '123456');
    res.send({
      code: 200,
      success: true,
    });
  },
  'GET /api/out': (req, res) => {
    res.send({
      code: 200,
      success: true,
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      code: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
