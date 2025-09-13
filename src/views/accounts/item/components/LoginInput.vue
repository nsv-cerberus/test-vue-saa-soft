<template>
  <AppLabel :showOnlyOnMobile="true">Логин</AppLabel>
  <input
    v-model="account.login"
    @blur="onBlur"
    type="text"
    placeholder="Введите Логин"
    maxlength="100"
    class="form-control"
  />
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'

const props = defineProps<{
  account: any;
}>();

const handleLoginBlur = inject<(account: any) => void>('handleLoginBlur');

const onBlur = () => {
  if (handleLoginBlur) {
    handleLoginBlur(props.account);
  }
};
</script>