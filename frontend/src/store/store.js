import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import { setupApi } from '../lib/api.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Setup axios interceptors with access to the store
setupApi(store)
