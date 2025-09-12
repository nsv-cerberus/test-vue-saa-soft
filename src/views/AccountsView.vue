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
      <!-- Заголовки таблицы -->
      <div class="table-header">
        <div class="header-cell">Метка</div>
        <div class="header-cell">Тип записи</div>
        <div class="header-cell">Логин</div>
        <div class="header-cell">Пароль</div>
        <div class="header-cell"></div>
      </div>

      <!-- Записи -->
      <div
        v-for="account in displayAccounts"
        :key="account.id"
        class="account-item"
      >
        <div class="form-row" :class="{ 'ldap-mode': account.type === 'LDAP' }">
          <div class="form-group">
            <label class="mobile-label">Метка</label>
            <input
              v-model="account.metkaText"
              @blur="handleMetkaBlur(account)"
              type="text"
              placeholder="xxx"
              maxlength="50"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label class="mobile-label">Тип записи</label>
            <select
              v-model="account.type"
              @change="handleTypeChange(account)"
              class="form-control"
            >
              <option value="Локальная">Локальная</option>
              <option value="LDAP">LDAP</option>
            </select>
          </div>

          <div class="form-group">
            <label class="mobile-label">Логин</label>
            <input
              v-model="account.login"
              @blur="handleLoginBlur(account)"
              type="text"
              placeholder="Значение"
              maxlength="100"
              class="form-control"
              :class="{ error: account.loginError }"
            />
          </div>

          <div class="form-group" v-if="account.type === 'Локальная'">
            <label class="mobile-label">Пароль</label>
            <input
              v-model="account.password"
              @blur="handlePasswordBlur(account)"
              type="password"
              placeholder="● ● ● ● ● ●"
              maxlength="100"
              class="form-control"
              :class="{ error: account.passwordError }"
            />
          </div>

          <div class="actions">
            <button @click="accountsStore.removeAccount(account.id)" class="delete-btn">
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAccountsStore } from '../stores/accounts'
import { Plus, Trash2, Info } from 'lucide-vue-next'

const accountsStore = useAccountsStore()

// Создаем computed для отображения с дополнительными полями
const displayAccounts = computed(() => {
  return accountsStore.accounts.map(account => ({
    ...account,
    metkaText: accountsStore.stringifyMetka(account.metka || [])
  }))
})

const handleMetkaBlur = (account) => {
  const tags = accountsStore.parseMetka(account.metkaText || '')
  accountsStore.updateAccount(account.id, { metka: tags })
  accountsStore.validateAccount(account)
}

const handleTypeChange = (account) => {
  accountsStore.updateAccount(account.id, { type: account.type })
  accountsStore.validateAccount(account)
}

const handleLoginBlur = (account) => {
  accountsStore.updateAccount(account.id, { login: account.login })
  accountsStore.validateAccount(account)
}

const handlePasswordBlur = (account) => {
  accountsStore.updateAccount(account.id, { password: account.password })
  accountsStore.validateAccount(account)
}

onMounted(() => {
  accountsStore.loadAccounts()
})
</script><style scoped>
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
  text-shadow: none;
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
}

/* Заголовки таблицы */
.table-header {
  display: grid;
  grid-template-columns: 200px 150px 200px 200px 80px;
  gap: 15px;
  padding: 20px 24px;
  background: #4a5568;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-cell {
  display: flex;
  align-items: center;
}

.account-item {
  padding: 24px;
  border-bottom: 1px solid #bababa;
  position: relative;
}

.account-item:last-child {
  border-bottom: none;
}

/* Основная сетка для строк */
.form-row {
  display: grid;
  grid-template-columns: 200px 150px 200px 200px 80px;
  gap: 15px;
  align-items: end;
}

/* Когда LDAP - логин занимает 2 колонки (свою + колонку пароля) */
.form-row.ldap-mode {
  grid-template-columns: 200px 150px 400px 80px;
}

.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Лейблы скрыты на десктопе */
.form-group .mobile-label {
  display: none;
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
}

.form-control {
  padding: 12px 16px;
  border: 1px solid #bababa;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  transition: all 0.3s ease;
  color: #2d3748;
  font-weight: 500;
}

.form-control:focus {
  outline: none;
  border-color: #4299e1;
}

.form-control.error {
  border-color: #f56565;
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.form-control::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

select.form-control {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
  appearance: none;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
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
}

.delete-btn:hover {
  background: #c53030;
}

.delete-btn:active {
  background: #9c1c1c;
}

/* Показываем лейблы на мобильных устройствах */
@media (max-width: 768px) {
  .accounts-page {
    padding: 20px 16px;
  }

  .table-header {
    display: none; /* Скрываем заголовки таблицы на мобильных */
  }

  .form-row,
  .form-row.ldap-mode {
    grid-template-columns: 1fr; /* Одна колонка на мобильных */
    gap: 16px;
  }

  .form-group .mobile-label {
    display: block; /* Показываем лейблы в карточках */
  }

  .account-item {
    margin-bottom: 20px;
    border: none;
    border-radius: 16px;
    background: white;
  }

  .accounts-list {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>