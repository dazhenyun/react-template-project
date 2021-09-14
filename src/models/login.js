import { stringify } from 'querystring';
import { history } from 'umi';
import { login, loginout } from '@/services/login';
import { isLogin, getPageQuery } from '@/utils/common';
import store from 'store';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload, onSuccess }, { call }) {
      const { success } = yield call(login, payload);

      if (success) {
        if (onSuccess) {
          onSuccess();
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *logout(_, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (isLogin()) {
        yield call(loginout);
      }

      store.remove('auth');

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {},
};
export default Model;
