import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, tokenStorageKey, setToken } from "../../lib/api.js";

const initialState = {
  user: null,
  token: localStorage.getItem(tokenStorageKey) || null,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // For Sanctum cookie-based auth with SPA, you normally call /sanctum/csrf-cookie first.
    // Here we implement token-based for simplicity: backend will return plain token.
  const { data } = await api.post(`/api/auth/login`, credentials)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Login failed' })
  }
})

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
  const { data } = await api.post(`/api/auth/register`, payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Register failed' })
  }
})

export const fetchMe = createAsyncThunk('auth/me', async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await api.get(`/api/auth/me`)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Fetch me failed' })
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { getState, rejectWithValue }) => {
  try {
    await api.post(`/api/auth/logout`, {})
    return true
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Logout failed' })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
  setToken(action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Login failed'
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
  setToken(action.payload.token)
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        setToken(null)
      })
  },
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer
