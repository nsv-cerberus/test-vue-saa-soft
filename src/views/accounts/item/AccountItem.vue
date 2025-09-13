<template>
  <div class="account-item">
    <div class="row" :class="{ 'ldap-mode': props.account.type === 'LDAP' }">
      <div>
        <MarkInput :account="props.account" />
      </div>
      <div>
        <TypeSelector :account="props.account" />
      </div>
      <div>
        <LoginInput :account="props.account" />
      </div>
      <div v-if="props.account.type === 'Локальная'">
        <PasswordInput :account="props.account" />
      </div>
      <div>
        <button @click="onBlur(props.account.id)" class="delete-btn">
          <Trash2 :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Trash2 } from 'lucide-vue-next'
import MarkInput from './components/MarkInput.vue'
import TypeSelector from './components/TypeSelector.vue'
import LoginInput from './components/LoginInput.vue'
import PasswordInput from './components/PasswordInput.vue'
import { inject } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    required: true,
  }
})

const removeAccount = inject<(id: number) => void>('removeAccount')

const onBlur = (id: number) => {
  if (removeAccount) {
    removeAccount(id);
  }
};
</script>

<style scoped lang="scss">
.account-item {
  padding: 24px;
  border-bottom: 1px solid #bababa;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
}

.row {
  display: grid;
  grid-template-columns: var(--col-mark) var(--col-type) var(--col-login) var(--col-password) var(--col-actions);
  gap: 15px;
  align-items: end;
  width: 100%;

  &>div {
    display: flex;
    flex-direction: column;

    &:last-child {
      flex-shrink: 0;
      max-width: 46px;
      min-width: 46px;
    }
  }

  &.ldap-mode {
    grid-template-columns: var(--col-mark) var(--col-type) var(--col-login-ldap) var(--col-actions);
  }
}

@media (max-width: 768px) {
  .account-item {
    margin-bottom: 20px;
    border: none;
    border-radius: 16px;
    background: white;

    .row {
      display: block;
      min-width: 0;
      width: 100%;

      &.ldap-mode {
        min-width: 0;
        width: 100%;
      }

      > div {
        margin-bottom: 16px;
        width: 100%;
        box-sizing: border-box;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .mobile-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #4a5568;
      }
    }
  }
}

.delete-btn {
  width: 46px;
  height: 46px;
  border: none;
  background: #e53e3e;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:active {
    background: #9c1c1c;
  }

  &:hover {
    background: #c53030;
  }
}
</style>