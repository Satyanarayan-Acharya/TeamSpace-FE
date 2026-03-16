import axios from 'axios'
import { store } from '../store/store'
import { logout } from '../store/slices/authSlice'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const token = state.auth.token || localStorage.getItem('token')

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage and dispatch logout if token is invalid/expired
            localStorage.removeItem('token')
            store.dispatch(logout())
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
