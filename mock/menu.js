import menuList from '../config/menu';

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  'GET /api/menu/auth/by/app': (req, res) => {
    res.send({
      code: 200,
      data: {
        barMenuList: menuList,
        permissionList: ["system:user:list", "system:user:edit", "system:user:status", "system:user:add", "system:user:delete", "system:user:password", "system:role:list", "system:role:add", "system:role:edit", "system:role:delete", "system:menu:add", "system:menu:status", "system:menu:delete", "system:menu:edit"]
      },
      success: true,
    });
  },
  'GET /api/500': (req, res) => {
    res.code(500).send({
      timestamp: 1513932555104,
      code: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.code(404).send({
      timestamp: 1513932643431,
      code: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.code(403).send({
      timestamp: 1513932555104,
      code: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.code(401).send({
      timestamp: 1513932555104,
      code: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
