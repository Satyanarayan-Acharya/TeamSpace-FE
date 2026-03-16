import { useParams } from 'react-router-dom'

export function WorkspacePage() {
    const { id } = useParams()
    return (
        <div className="flex h-full items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900">Workspace Page [{id}]</h1>
        </div>
    )
}
