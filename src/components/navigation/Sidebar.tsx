import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { toggleSidebar } from '@/store/slices/uiSlice'
import { cn } from '@/utils/cn'

export function Sidebar() {
    const isOpen = useSelector((state: RootState) => state.ui.sidebarOpen)
    const dispatch = useDispatch()

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Workspaces', path: '/workspace/1', icon: '📁' },
        { label: 'Tasks', path: '/tasks', icon: '✅' },
        { label: 'Messages', path: '/messages', icon: '💬' },
        { label: 'Notifications', path: '/notifications', icon: '🔔' },
        { label: 'Settings', path: '/settings', icon: '⚙️' },
    ]

    return (
        <aside
            className={cn(
                'transition-all duration-300 ease-in-out border-r border-gray-200 bg-white flex flex-col',
                isOpen ? 'w-64' : 'w-20'
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                {isOpen && <span className="text-xl font-bold text-gray-900">FlowSync</span>}
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
                >
                    {isOpen ? '◀' : '▶'}
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        )}
                        title={!isOpen ? item.label : undefined}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {isOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
