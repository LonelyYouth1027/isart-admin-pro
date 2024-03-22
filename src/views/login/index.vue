<template>
  <div class="login">
    <a-row align="stretch" class="login-box">
      <a-col :xs="0" :sm="12" :md="15">
        <div class="login-left">
          <LoginImage></LoginImage>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="9">
        <div class="login-right">
          <a-form
            ref="FormRef"
            :size="'medium'"
            :model="userInfo"
            :rules="rules"
            :style="{ width: '84%' }"
            :label-col-style="{ display: 'none' }"
            :wrapper-col-style="{ flex: 1 }"
            @submit="handleSubmit"
          >
            <h3 class="login-form-title"
              ><pro-svg-icon name="logo" :size="32"></pro-svg-icon
              ><span>Isart Admin Pro</span></h3
            >
            <a-form-item field="username">
              <a-input
                v-model="userInfo.username"
                placeholder="账号 admin/user"
                allow-clear
              >
                <template #prefix
                  ><icon-user :stroke-width="1" :style="{ fontSize: '20px' }"
                /></template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password
                v-model="userInfo.password"
                placeholder="密码"
                allow-clear
              >
                <template #prefix
                  ><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }"
                /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                size="large"
                long
                :loading="loading"
                html-type="submit"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <LoginBg></LoginBg>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { FormInstance, Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import LoginImage from '@/assets/svgs/login-image.svg';
  import LoginBg from './components/LoginBg/index.vue';
  // import md5 from 'js-md5'; todo 使用MD5

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'admin', // 演示默认值
    password: 'admin', // demo default value
    // md5Password: '',  todo 使用MD5
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
    // md5Password: loginConfig.value.md5Password, todo 使用MD5
  });

  const rules: FormInstance['rules'] = {
    username: [{ required: true, message: '请输入账号' }],
    password: [{ required: true, message: '请输入密码' }],
  };

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        // const data = {
        //   username: values.username,
        //   md5Password: md5(values.md5Password) , todo 使用MD5时 把106行的values换成data即可
        // }
        console.log(222222, values);
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .register-btn,
  .register-btn:hover {
    color: var(--color-text-2);
  }

  .login-form-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }

  .theme-btn {
    position: fixed;
    top: 20px;
    left: 30px;
    z-index: 9999;
  }

  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-5);
    &-box {
      width: 86%;
      max-width: 720px;
      height: 380px;
      display: flex;
      z-index: 999;
      box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
    }
  }

  .login-left {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      60deg,
      rgb(var(--primary-6)),
      rgb(var(--primary-3))
    );
    .login-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all 0.3s;
      object-fit: cover;
    }
  }

  .login-right {
    width: 100%;
    height: 100%;
    background: var(--color-bg-1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    box-sizing: border-box;
  }
</style>
