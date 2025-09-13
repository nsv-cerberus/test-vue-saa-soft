<template>
  <AppLabel
    :showOnlyOnMobile="true"
  >Тип Записи</AppLabel>
  <select
    v-model="account.type"
    @change="onTypeChange"
    class="form-control"
  >
    <option value="Локальная">Локальная</option>
    <option value="LDAP">LDAP</option>
  </select>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'

const props = defineProps<{
  account: any;
}>();

const handleTypeChange = inject<(account: any) => void>('handleTypeChange');

const onTypeChange = () => {
  if (handleTypeChange) {
    handleTypeChange(props.account);
  }
};
</script>
