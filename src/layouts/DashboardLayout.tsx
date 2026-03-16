import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/navigation/Sidebar'
import { Navbar } from '@/components/navigation/Navbar'

export function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
