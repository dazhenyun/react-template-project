import { queryMenuAuthData } from '@/services/user';
import { tranfarTree } from '@/utils/common';
import store from 'store';

const UserModel = {
  namespace: 'menu',
  state: {
    menuListData: [],
    menuTreeData: []
  },
  effects: {
    *queryMenuData(_, { call, put }) {
      const { data, success } = yield call(queryMenuAuthData);
      if (success) {
        const { permissionList = [], barMenuList = [] } = data || {};
        const newData = barMenuList
          .sort((a, b) => a.menuSort - b.menuSort)
          .map(el => ({
            ...el,
            key: el.menuHref,
            path: el.menuHref,
            icon: `icon-${el.menuIcon}`,
            hideInMenu: !el.visible,
            name: el.menuName
          }));
        const menuTreeData = tranfarTree(newData, 'id', 'parentId');

        // 菜单数据
        yield put({
          type: 'updateState',
          payload: {
            menuListData: newData,
            menuTreeData,
          }
        });

        // 按钮权限数据
        store.set('auth', permissionList || []);
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  }
};
export default UserModel;
