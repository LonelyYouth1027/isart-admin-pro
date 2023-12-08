<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        label="账号"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        label="密码"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
        <template #extra>
          <a-link class="f-px-12">忘记密码?</a-link>
        </template>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <!--        <div class="login-form-password-actions">-->
        <!--          <a-checkbox-->
        <!--            checked="rememberPassword"-->
        <!--            :model-value="loginConfig.rememberPassword"-->
        <!--            @change="setRememberPassword as any"-->
        <!--          >-->
        <!--            {{ $t('login.form.rememberPassword') }}-->
        <!--          </a-checkbox>-->
        <!--          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>-->
        <!--        </div>-->
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
      <a-space
        :size="16"
        direction="vertical"
        style="margin-top: 48px"
        align="center"
      >
        <div class="f-px-12">其他方式登录</div>
      </a-space>
      <a-space :size="16" style="margin-top: 19px">
        <div v-for="item in jumpArr" :key="item.type" class="tabs-item"
          ><icon-font :type="item.type" :size="24"
        /></div>
      </a-space>
      <a-space
        :size="16"
        direction="vertical"
        style="margin-top: 35px"
        align="center"
      >
        <div class="f-px-12"
          >还没有账号? <a-link class="m-l-5 f-px-12">去注册</a-link></div
        >
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message, Icon } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  // import md5 from 'js-md5'; todo 使用MD5

  const IconFont: any = Icon.addFromIconFontCn({
    src: 'https://at.alicdn.com/t/c/font_4365166_fb57jk0bote.js',
  });
  const jumpArr = [
    { link: '', type: 'icon-google' },
    { link: '', type: 'icon-QQ' },
    { link: '', type: 'icon-weixin' },
  ];
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
  // const setRememberPassword = (value: boolean) => {
  //   loginConfig.value.rememberPassword = value;
  // };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }

    .tabs-item {
      width: 95px;
      height: 40px;
      opacity: 1;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
</style>
