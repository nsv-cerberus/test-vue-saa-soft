export type StorageType = 'localStorage' | 'sessionStorage' | 'cookies'

export const storage = {
  save: (key: string, data: any, type: StorageType = 'localStorage') => {
    const jsonData = JSON.stringify(data)

    switch (type) {
      case 'localStorage':
        localStorage.setItem(key, jsonData)
        break
      case 'sessionStorage':
        sessionStorage.setItem(key, jsonData)
        break
      case 'cookies':
        document.cookie = `${key}=${encodeURIComponent(jsonData)}; path=/; max-age=${365 * 24 * 60 * 60}`
        break
    }
  },

  load: (key: string, type: StorageType = 'localStorage') => {
    let data = null

    switch (type) {
      case 'localStorage':
        data = localStorage.getItem(key)
        break
      case 'sessionStorage':
        data = sessionStorage.getItem(key)
        break
      case 'cookies':
        const cookies = document.cookie.split(';')
        const cookie = cookies.find(c => c.trim().startsWith(`${key}=`))
        if (cookie) {
          data = decodeURIComponent(cookie.split('=')[1])
        }
        break
    }

    return data ? JSON.parse(data) : null
  },

  remove: (key: string, type: StorageType = 'localStorage') => {
    switch (type) {
      case 'localStorage':
        localStorage.removeItem(key)
        break
      case 'sessionStorage':
        sessionStorage.removeItem(key)
        break
      case 'cookies':
        document.cookie = `${key}=; path=/; max-age=0`
        break
    }
  },

  clear: (type: StorageType = 'localStorage') => {
    switch (type) {
      case 'localStorage':
        localStorage.clear()
        break
      case 'sessionStorage':
        sessionStorage.clear()
        break
      case 'cookies':
        document.cookie.split(';').forEach(cookie => {
          const eqPos = cookie.indexOf('=')
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
          document.cookie = `${name}=; path=/; max-age=0`
        })
        break
    }
  }
}