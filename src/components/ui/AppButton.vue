<template>
  <el-button :type="type" :icon="icon" @click="$emit('click')">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon?: string
}

defineProps<Props>()
defineEmits(['click'])
</script>