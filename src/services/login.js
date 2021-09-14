import request from '@/utils/request';

export async function login(params) {
  return request.post('/api/login', params);
}

export async function loginout(params) {
  return request.get('/api/out', params);
}