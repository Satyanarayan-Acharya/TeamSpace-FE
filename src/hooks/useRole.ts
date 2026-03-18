import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

export const useRole = () => {
    const userRole = useSelector((state: RootState) => state.auth.user?.role)

    return {
        role: userRole,
        isAdmin: userRole === 'admin',
        isUser: userRole === 'user',
    }
}
