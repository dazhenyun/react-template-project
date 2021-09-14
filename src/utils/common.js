import { cloneDeep } from 'lodash';
import moment from 'moment';
import store from 'store';
import { parse } from 'querystring';

export function tranfarTree(list, idFiled = 'id', parentField = 'parentId') {
  const data = cloneDeep(list);
  const map = {};
  const val = [];
  if (!data) {
    return [];
  }

  // 生成数据对象集合
  data.forEach(it => {
    map[it[idFiled]] = it;
  })

  // 生成结果集
  data.forEach(it => {
    const parent = map[it[parentField]];   // pid_department_id为父节点的id
    if (parent) {
      if (!Array.isArray(parent.children)) parent.children = [];
      parent.children.push(it);
    } else {
      val.push(it)
    }
  })
  return val;
}

// 字符串转moment
export function normalizeDate(value, formatter = "YYYY-MM-DD") {
  if (value instanceof Array) {
    let [start, end] = value;
    if (start && typeof start === 'string') {
      start = moment(start, formatter);
    }
    if (end && typeof end === 'string') {
      end = moment(end, formatter);
    }
    return [start, end];
  }
  if (typeof value === 'string') {
    return moment(value, formatter);
  }
  return value;
};


/**
 * 单个判断权限
 * @param {*} code 
 */
export const isAuth = (code) => {
  const allAuth = store.get('auth');
  if (Array.isArray(code)) {
    return code.some(el => allAuth.includes(el));
  }
  return allAuth.includes(code);

}


// 是否登录
export const isLogin = () => {
  // return Cookies.get('token');
  return true;
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = path => reg.test(path);