<template>
  <div class="accounts-page">
    <div class="header">
      <h1>Учетные записи</h1>
      <button type="button" @click="accountsStore.addAccount" class="add-btn">
        <Plus :size="20" />
      </button>
    </div>

    <div class="hint">
      <Info :size="18" />
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
    </div>

    <div class="accounts-list">
      <div class="table-header">
        <div>Метка</div>
        <div>Тип записи</div>
        <div>Логин</div>
        <div>Пароль</div>
        <div></div>
      </div>

      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import { Plus, Info } from 'lucide-vue-next'
import AccountItem from './item/AccountItem.vue'

const accountsStore = useAccountsStore()

onMounted(() => {
  accountsStore.loadAccounts()
})

const accounts = computed(() => {
  return accountsStore.accounts.map(account => ({
    ...account,
    markText: accountsStore.stringifyMark(account.mark || [])
  }))
})

const handleMarkBlur = (account: any) => {
  const tags = accountsStore.parseMark(account.markText || '')
  accountsStore.updateAccount(account.id, { mark: tags })
  accountsStore.validateAccount(account)
}

const handleTypeChange = (account: any) => {
  accountsStore.updateAccount(account.id, { type: account.type })
  accountsStore.validateAccount(account)
}

const handleLoginBlur = (account: any) => {
  accountsStore.updateAccount(account.id, { login: account.login })
  accountsStore.validateAccount(account)
}

const handlePasswordBlur = (account: any) => {
  accountsStore.updateAccount(account.id, { password: account.password })
  accountsStore.validateAccount(account)
}

const removeAccount = (id: number) => {
  accountsStore.removeAccount(id)
}

provide('handleMarkBlur', handleMarkBlur)
provide('handleTypeChange', handleTypeChange)
provide('handleLoginBlur', handleLoginBlur)
provide('handlePasswordBlur', handlePasswordBlur)
provide('removeAccount', removeAccount)
</script>

<style scoped>
.accounts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.header h1 {
  color: #2d3748;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.add-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: #4299e1;
  color: white;
  cursor: pointer;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #3182ce;
}

.add-btn:active {
  background: #2c5282;
}

.hint {
  background: #dbeafe;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 16px;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.hint svg {
  color: #2563eb;
  flex-shrink: 0;
}

.accounts-list {
  background: white;
  border: 1px solid #bababa;
  border-radius: 20px;
  overflow: hidden;

  --col-actions: 46px;
  --gap: 15px;
  --width: calc(25% - 15px - 11.5px);
  --col-mark: var(--width);
  --col-type: var(--width);
  --col-login: var(--width);
  --col-password: var(--width);
  --col-login-ldap: calc(50% - var(--col-actions) + calc(var(--gap) /2));
}

.table-header {
  display: grid;
  grid-template-columns: var(--col-mark) var(--col-type) var(--col-login) var(--col-password) var(--col-actions);
  gap: 15px;
  padding: 20px 24px;
  background: #4a5568;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  & > div {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .accounts-page {
    padding: 20px 16px;
  }

  .table-header {
    display: none;
  }

  .accounts-list {
    background: transparent;
    border: none;
    border-radius: 0;
  }
}
</style>