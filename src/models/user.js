import { queryCurrent, updatePersonalPsw } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {

    *fetchCurrent(_, { call, put }) { // 获取当前用户信息
      const { data } = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: data || {},
      });
      return data;
    },

    *updatePassword(_, { call }) { // 修改个人密码
      const { success } = yield call(updatePersonalPsw);
      return success;
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
