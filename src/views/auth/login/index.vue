<template>
  <div class="container">
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/banner-01.png');
    background-size: 100% 100%;
    position: relative;

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      opacity: 1;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0px 19px 39px rgba(222, 225, 255, 1);
      backdrop-filter: blur(20px);
      padding: 113px 120px 134px 121px;
      border-radius: 20px;
    }
  }
</style>
