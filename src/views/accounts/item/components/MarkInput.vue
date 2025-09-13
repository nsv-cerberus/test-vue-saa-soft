<template>
  <AppLabel :showOnlyOnMobile="true">Метка</AppLabel>
  <input
    v-model="account.markText"
    @blur="onBlur"
    type="text"
    placeholder="xxx"
    maxlength="50"
    class="form-control"
  />
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'

const props = defineProps<{
  account: any;
}>();

const handleMarkBlur = inject<(account: any) => void>('handleMarkBlur');

const onBlur = () => {
  if (handleMarkBlur) {
    handleMarkBlur(props.account);
  }
}
</script>