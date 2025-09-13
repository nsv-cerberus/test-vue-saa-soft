import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storage, type StorageType } from '../helpers/storage'

export interface Tag {
  text: string
}

export interface Account {
  id: number
  mark: Tag[]
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
  loginError?: boolean
  passwordError?: boolean
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  const storageType = ref<StorageType>('localStorage')

  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now(),
      mark: [],
      type: 'Локальная',
      login: '',
      password: '',
      loginError: false,
      passwordError: false
    }
    accounts.value.push(newAccount)
    saveAccounts()
  }

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
    saveAccounts()
  }

  const updateAccount = (id: number, updatedData: Partial<Account>) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedData }
      saveAccounts()
    }
  }

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

  const parseMetka = (markText: string): Tag[] => {
    return markText
      .split(';')
      .map(text => text.trim())
      .filter(text => text.length > 0)
      .map(text => ({ text }))
  }

  const stringifyMetka = (metka: Tag[]): string => {
    return metka.map(tag => tag.text).join('; ')
  }

  const saveAccounts = () => {
    storage.save('accounts', accounts.value, storageType.value)
  }

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

  const setStorageType = (type: StorageType) => {
    storageType.value = type
    loadAccounts()
  }

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
    parseMark: parseMetka,
    stringifyMark: stringifyMetka,
    saveAccounts,
    loadAccounts,
    setStorageType,
    clearAll
  }
})