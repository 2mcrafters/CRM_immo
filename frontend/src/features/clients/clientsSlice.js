import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../lib/api.js'

const initialState = {
  clients: [],
  currentClient: null,
  statistics: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
    last_page: 1,
  },
  filters: {
    type: null,
    statut: null,
    search: '',
  },
}

// Fetch all clients with filters and pagination
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/clients', { params })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur lors du chargement des clients' })
    }
  }
)

// Fetch a single client
export const fetchClient = createAsyncThunk(
  'clients/fetchClient',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/clients/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Client non trouvé' })
    }
  }
)

// Create a new client
export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/clients', clientData)
      return data.client
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur lors de la création du client' })
    }
  }
)

// Update an existing client
export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, ...clientData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/clients/${id}`, clientData)
      return data.client
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur lors de la mise à jour du client' })
    }
  }
)

// Delete a client
export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/clients/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur lors de la suppression du client' })
    }
  }
)

// Fetch client statistics
export const fetchClientStatistics = createAsyncThunk(
  'clients/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/clients/statistics')
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur lors du chargement des statistiques' })
    }
  }
)

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters(state) {
      state.filters = initialState.filters
    },
    clearCurrentClient(state) {
      state.currentClient = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clients
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients = action.payload.data || action.payload
        state.pagination = {
          current_page: action.payload.current_page || 1,
          per_page: action.payload.per_page || 15,
          total: action.payload.total || action.payload.length || 0,
          last_page: action.payload.last_page || 1,
        }
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Erreur lors du chargement des clients'
      })
      
      // Fetch Single Client
      .addCase(fetchClient.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentClient = action.payload
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Client non trouvé'
      })
      
      // Create Client
      .addCase(createClient.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients.unshift(action.payload)
        state.pagination.total += 1
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Erreur lors de la création du client'
      })
      
      // Update Client
      .addCase(updateClient.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.clients.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.clients[index] = action.payload
        }
        if (state.currentClient?.id === action.payload.id) {
          state.currentClient = action.payload
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Erreur lors de la mise à jour du client'
      })
      
      // Delete Client
      .addCase(deleteClient.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients = state.clients.filter((c) => c.id !== action.payload)
        state.pagination.total -= 1
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Erreur lors de la suppression du client'
      })
      
      // Fetch Statistics
      .addCase(fetchClientStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload
      })
  },
})

export const { setFilters, clearFilters, clearCurrentClient, clearError } = clientsSlice.actions
export default clientsSlice.reducer
