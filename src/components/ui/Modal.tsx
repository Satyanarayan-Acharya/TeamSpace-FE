import React from 'react'
import { cn } from '@/utils/cn'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div
                className={cn(
                    "relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl overflow-hidden",
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}
