const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';
const PERMISSION_LIST = 'permissionList';
const OPERATE_LIST = 'operateList';

/**
 * 判断是否登录
 */
const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

/**
 * 获取token
 */
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 储存token
 */
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * 清除token
 */
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * 存储用户信息
 */
const setUserInfo = (val: any) => {
  localStorage.setItem(USER_INFO, val);
};

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO) as any);
};

/**
 * 存储权限路由数据 (需后端配合)
 */
const setPermissionList = (val: any) => {
  localStorage.setItem(PERMISSION_LIST, val);
};

/**
 * 获取权限路由数据 (需后端配合)
 */
const getPermissionList = () => {
  return JSON.parse(localStorage.getItem(PERMISSION_LIST) as any);
};

/**
 * 存储权限按钮数据 (需后端配合)
 */
const setOperateList = (val: any) => {
  localStorage.setItem(OPERATE_LIST, val);
};

/**
 * 获取权限按钮数据 (需后端配合)
 */
const getOperateList = () => {
  return JSON.parse(localStorage.getItem(OPERATE_LIST) as any);
};

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  setUserInfo,
  getUserInfo,
  setPermissionList,
  getPermissionList,
  setOperateList,
  getOperateList,
};
