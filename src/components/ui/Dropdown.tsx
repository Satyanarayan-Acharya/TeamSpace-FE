import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'

interface DropdownProps {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
    align?: 'left' | 'right'
}

export function Dropdown({ trigger, children, className, align = 'right' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={cn(
                        'absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
                        className
                    )}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export function DropdownItem({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                className
            )}
            role="menuitem"
        >
            {children}
        </button>
    )
}
