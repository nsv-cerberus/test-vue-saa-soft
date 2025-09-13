<template>
  <AppLabel :showOnlyOnMobile="true">Пароль</AppLabel>
  <input
    v-model="account.password"
    @blur="onBlur"
    type="password"
    placeholder="Введите Пароль"
    maxlength="100"
    class="form-control"
    :class="{ error: account.passwordError }"
  />
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'

const props = defineProps<{
  account: any;
}>();

const handlePasswordBlur = inject<(account: any) => void>('handlePasswordBlur')

const onBlur = () => {
  if (handlePasswordBlur) {
    handlePasswordBlur(props.account);
  }
}
</script>