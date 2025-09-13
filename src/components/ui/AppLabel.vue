<template>
  <label
    class="app-label"
    :class="{ 'mobile-only': props.showOnlyOnMobile }"
  >
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  showOnlyOnMobile?: boolean;
}>();
</script>

<style scoped>
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }
}
</style>