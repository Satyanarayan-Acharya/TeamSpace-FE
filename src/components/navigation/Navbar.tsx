import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import type { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'

export function Navbar() {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <div className="flex flex-1 items-center max-w-sm">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700 relative">
                    🔔
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <Dropdown
                    align="right"
                    trigger={
                        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <Avatar src="" alt={user?.name || 'User'} className="h-8 w-8" />
                        </button>
                    }
                >
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || 'guest@example.com'}</p>
                    </div>
                    <DropdownItem onClick={() => navigate('/settings/profile')}>
                        Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/settings')}>
                        Settings
                    </DropdownItem>
                    <div className="border-t border-gray-100"></div>
                    <DropdownItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        Log out
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    )
}
