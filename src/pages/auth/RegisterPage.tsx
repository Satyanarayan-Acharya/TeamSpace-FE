import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import type { RootState } from '@/store/store'
import api from '@/services/api'

export function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({})
    const isLoading = useSelector((state: RootState) => state.auth.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Name is required'
        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        try {
            dispatch(login())
            setErrors({})
            const res = await api.post('/auth/register', { name, email, password })
            dispatch(loginSuccess({
                user: res.data.user,
                token: res.data.token
            }))
            navigate('/dashboard')
        } catch (err: any) {
            dispatch(loginFailure())
            setErrors((prev) => ({
                ...prev,
                general: err.response?.data?.message || 'Registration failed'
            }))
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle>Create an account</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Enter your details to get started with FlowSync</p>
            </CardHeader>
            <CardContent>
                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                        {errors.general}
                    </div>
                )}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                    </div>
                    <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
