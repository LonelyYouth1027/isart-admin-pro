<template>
  <ErrorPage :code="404"></ErrorPage>
</template>

<script setup lang="ts">
  import ErrorPage from './components/ErrorPage.vue';

  defineOptions({ name: 'NotFound' });
</script>

<style lang="less" scoped></style>
