import request from '@/utils/request';

// 用户列表
export async function queryUserList(data) {
  return request.get('/api/user/list', data);
}
// 用户新增
export async function addUser(data) {
  return request.post('/api/user/add', data);
}
// 用户编辑
export async function updateUser(data) {
  return request.put('/api/user/edit', data);
}
// 用户删除
export async function delUser(data) {
  return request.delete('/api/user/delete', data);
}
// 用户停用启用
export async function changeStatus(data) {
  return request.put('/api/user/change/status', data);
}

// 用户-修改密码
export async function updatePassword(data) {
  return request.put('/api/reset/password', data);
}

// 用户-获取角色选项
export async function queryRoleAll(data) {
  return request.get('/api/role/listAll', data);
}

// 角色列表
export async function queryRoleList(data) {
  return request.get('/api/role/list', data);
}
// 角色新增
export async function addRole(data) {
  return request.post('/api/role/add', data);
}
// 角色详情
export async function queryRoleInfo(data) {
  return request.get('/api/role/info', data);
}
// 角色编辑
export async function updateRole(data) {
  return request.put('/api/role/update', data);
}
// 角色删除
export async function delRole(data) {
  return request.delete('/api/role/delete', data);
}

// 获取所有应用的菜单
export async function queryAppMenuData(data) {
  return request.get('/api/menu/listAll', data);
}

// 应用-获取列表 
export async function getApplicationList(params) {
  return request.get('/api/app/list', params);
}

// 应用-删除应用 
export async function deleteApplication(params) {
  return request.delete('/api/app/delete', params);
}

// 应用-新增应用 
export async function postApplication(params) {
  return request.post('/api/app/add', params);
}

// 应用-根据应用id获取应用信息
export async function postApplicationInfo(params) {
  return request.get('/api/app/info', params);
}

// 应用-应用启用或者停用
export async function putApplicationModify(params) {
  return request.put('/api/app/modify', params);
}

// 应用-更新应用
export async function putApplicationUpdate(params) {
  return request.put('/api/app/update', params);
}

// 应用-重置secret
export async function putResetSecret(params) {
  return request.put('/api/app/reset', params);
}

// 应用-下拉列表
export async function queryAppAll(params) {
  return request.get('/api/app/list/all', params);
}

// 应用-所有应用code
export async function queryAppCodeList(params) {
  return request.get('/api/app/code/list', params);
}
// 菜单列表
export async function queryMenuList(data) {
  return request.get('/api/menu/listAll', data);
}
// 菜单新增
export async function addMenu(data) {
  return request.post('/api/menu/save', data);
}
// 菜单编辑
export async function updateMenu(data) {
  return request.put('/api/menu/update', data);
}
// 菜单删除
export async function delMenu(data) {
  return request.delete('/api/menu/delete', data);
}
// 菜单启用停用
export async function updateMenuStatus(data) {
  return request.put('/api/menu/disable', data);
}