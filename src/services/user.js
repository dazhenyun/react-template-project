import request from '@/utils/request';

export async function queryCurrent() {
  return request.get('/api/user/personal/info');
}

export async function updatePersonalPsw() {
  return request.post('/api/user/personal/psw/update');
}

// 获取菜单权限
export async function queryMenuAuthData(data) {
  return request.get('/api/menu/auth/by/app', data);
}