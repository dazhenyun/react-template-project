import { queryRoleAll, } from '@/services/system';

const UserModel = {
  namespace: 'systemUser',
  state: {
    roleList: [], // 所有角色
  },
  effects: {
    *queryRoleAll(_, { call, put }) {
      const { data } = yield call(queryRoleAll);
      yield put({
        type: 'updateState',
        roleList: data || [],
      });
    },
  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload };
    },
  }
};
export default UserModel;
