import axios from 'axios'

export const tokenStorageKey = 'auth_token'

// Always use a relative base URL so the Vite dev proxy forwards /api -> backend.
// For production, set your reverse proxy or serve frontend and backend under the same origin.
const baseURL = ''

export const api = axios.create({
  baseURL,
  withCredentials: false,
})

let storeRef = null

export function setupApi(store) {
  storeRef = store

  api.interceptors.request.use((config) => {
    const state = storeRef.getState?.()
    const token = state?.auth?.token || localStorage.getItem(tokenStorageKey)
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response?.status === 401) {
        try {
          // Clear local token and auth state; avoid making another API call here
          localStorage.removeItem(tokenStorageKey)
          const action = { type: 'auth/clearAuth' }
          storeRef?.dispatch?.(action)
        } catch {}
      }
      return Promise.reject(error)
    }
  )
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(tokenStorageKey, token)
  } else {
    localStorage.removeItem(tokenStorageKey)
  }
}

export default api
