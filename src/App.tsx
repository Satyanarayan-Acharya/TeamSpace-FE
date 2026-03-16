import { AppRouter } from '@/app/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from '@/services/api'
import { setUser, logout } from '@/store/slices/authSlice'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          dispatch(setUser({ user: res.data.user, token }))
        })
        .catch(() => {
          dispatch(logout())
        })
    }
  }, [dispatch])

  return <AppRouter />
}
