<template>
  <component :is="props.icon"></component>
</template>

<script lang="ts" setup>
  interface Props {
    icon?: string;
  }

  const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped></style>
