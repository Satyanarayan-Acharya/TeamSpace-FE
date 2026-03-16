import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import api from '@/services/api'

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            setError('Email is required')
            return
        }

        try {
            setIsLoading(true)
            setError(null)
            const res = await api.post('/auth/forgot-password', { email })
            setSuccess(res.data.message)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle>Reset Password</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Enter your email and we'll send you a reset link</p>
            </CardHeader>
            <CardContent>
                {success && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm border border-green-200">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send reset link'}
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
