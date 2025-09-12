import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage, type StorageType } from '../helpers/storage'

export interface Tag {
  text: string
}

export interface Account {
  id: number
  metka: Tag[]
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
  loginError?: boolean
  passwordError?: boolean
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  const storageType = ref<StorageType>('localStorage')

  // Добавление новой записи
  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now(),
      metka: [],
      type: 'Локальная',
      login: '',
      password: '',
      loginError: false,
      passwordError: false
    }
    accounts.value.push(newAccount)
    saveAccounts()
  }

  // Удаление записи
  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
    saveAccounts()
  }

  // Обновление записи
  const updateAccount = (id: number, updatedData: Partial<Account>) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedData }
      saveAccounts()
    }
  }

  // Валидация записи
  const validateAccount = (account: Account) => {
    account.loginError = !account.login.trim()

    if (account.type === 'Локальная') {
      account.passwordError = !account.password || account.password.trim() === ''
    } else {
      account.passwordError = false
      account.password = null
    }

    return !account.loginError && !account.passwordError
  }

  // Преобразование меток из строки в массив объектов
  const parseMetka = (metkaText: string): Tag[] => {
    return metkaText
      .split(';')
      .map(text => text.trim())
      .filter(text => text.length > 0)
      .map(text => ({ text }))
  }

  // Преобразование меток из массива объектов в строку
  const stringifyMetka = (metka: Tag[]): string => {
    return metka.map(tag => tag.text).join('; ')
  }

  // Сохранение в выбранное хранилище
  const saveAccounts = () => {
    storage.save('accounts', accounts.value, storageType.value)
  }

  // Загрузка из выбранного хранилища
  const loadAccounts = () => {
    const savedAccounts = storage.load('accounts', storageType.value)
    if (savedAccounts && Array.isArray(savedAccounts)) {
      accounts.value = savedAccounts.map(account => ({
        ...account,
        loginError: false,
        passwordError: false
      }))
    }
  }

  // Смена типа хранилища
  const setStorageType = (type: StorageType) => {
    storageType.value = type
    loadAccounts()
  }

  // Очистка всех данных
  const clearAll = () => {
    accounts.value = []
    storage.remove('accounts', storageType.value)
  }

  return {
    accounts,
    storageType,
    addAccount,
    removeAccount,
    updateAccount,
    validateAccount,
    parseMetka,
    stringifyMetka,
    saveAccounts,
    loadAccounts,
    setStorageType,
    clearAll
  }
})