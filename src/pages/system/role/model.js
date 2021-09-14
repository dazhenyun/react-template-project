import { queryAppMenuData } from '@/services/system';
import { tranfarTree } from '@/utils/common';

export default {
  namespace: 'systemRole',
  state: {
    appMenuData: [], // 应用菜单
  },
  effects: {
    *queryAppMenuData(_, { call, put }) {
      const { success, data } = yield call(queryAppMenuData);
      let appMenuData = [];

      // 菜单数据
      if (success && data) {
        appMenuData = tranfarTree(data || [])
      }

      yield put({
        type: 'updateState',
        appMenuData,
      });
    },
  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload };
    },
  }
};
