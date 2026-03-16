import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import api from '@/services/api'

export function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password || password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (!token) {
            setError('Reset token is missing or invalid')
            return
        }

        try {
            setIsLoading(true)
            setError(null)
            const res = await api.post('/auth/reset-password', { token, newPassword: password })
            setSuccess(res.data.message)
            setTimeout(() => navigate('/login'), 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle>Create New Password</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Please enter your new password</p>
            </CardHeader>
            <CardContent>
                {success && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm border border-green-200">
                        {success} Redirecting to login...
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">New Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || !!success}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Back to sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
