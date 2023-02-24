import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo, // todo 对接接口需要删除此行
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth'; // todo  setUserInfo getUserInfo在这里引入
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  // todo 在这里定义接口返回的类型
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // mock模拟获取用户信息
      const res = await getUserInfo();
      this.setInfo(res.data);
      // const res = getUserInfo(); todo 对接接口要把这行注释打开 需要引入 /utils/auth.ts文件下的getUserInfo
      // this.setInfo(res); todo 对接接口要把这行注释打开
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res: any = await userLogin(loginForm);
        // setUserInfo(res?.result?.userInfo); todo 对接接口要把这行注释打开
        // this.setInfo(res?.result?.userInfo); todo 对接接口要把这行注释打开
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
        // clearToken(); todo 退出登录需要打开此行并注释上一行，因为可能没有登录接口
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
