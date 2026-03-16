import React from 'react'
import { cn } from '@/utils/cn'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, ...props }, ref) => {
        const [hasError, setHasError] = React.useState(false)

        return (
            <div
                ref={ref}
                className={cn(
                    'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100',
                    className
                )}
            >
                {src && !hasError ? (
                    <img
                        src={src}
                        alt={alt}
                        className="aspect-square h-full w-full object-cover"
                        onError={() => setHasError(true)}
                        {...props}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                        {fallback || alt?.charAt(0).toUpperCase() || '?'}
                    </div>
                )}
            </div>
        )
    }
)
Avatar.displayName = 'Avatar'
