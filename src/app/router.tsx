import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layouts
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'

// Pages
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardPage } from '@/pages/DashboardPage'
import { WorkspacePage } from '@/pages/WorkspacePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />,
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />,
            },
        ],
    },
    {
        element: <ProtectedRoute />, // Protect all routes nested under this
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardPage />,
                    },
                    {
                        path: 'workspace/:id',
                        element: <WorkspacePage />,
                    },
                ],
            },
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
