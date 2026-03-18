import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'user'
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
}

const initialState: AuthState = {
    user: null, // Will be populated by '/me' request
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            state.loading = false
        },
        login: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            state.loading = false
            localStorage.setItem('token', action.payload.token)
        },
        loginFailure: (state) => {
            state.loading = false
            localStorage.removeItem('token')
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.loading = false
            localStorage.removeItem('token')
        },
    },
})

export const { setUser, login, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
