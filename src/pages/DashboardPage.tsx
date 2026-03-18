import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useRole } from '@/hooks/useRole'

export function DashboardPage() {
    const { isAdmin } = useRole()

    const recentTasks = [
        { id: 1, title: 'Update homepage copy', status: 'In Progress', priority: 'High' },
        { id: 2, title: 'Fix navigation bug', status: 'Todo', priority: 'Medium' },
        { id: 3, title: 'Design system review', status: 'Done', priority: 'Low' },
    ]

    const activities = [
        { id: 1, action: 'Sarah completed', target: 'Design system review', time: '2h ago' },
        { id: 2, action: 'You created', target: 'Navbar component', time: '4h ago' },
        { id: 3, action: 'Mike assigned', target: 'Update homepage copy', time: 'Yesterday' },
    ]

    const workspaces = [
        { id: 1, name: 'Marketing Website', members: 4, tasks: 12 },
        { id: 2, name: 'Q3 Mobile App', members: 8, tasks: 34 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                {isAdmin && <Button>Create Task</Button>}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content - Takes up 2 columns on large screens */}
                <div className="col-span-1 space-y-6 lg:col-span-2">

                    {/* Recent Tasks */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg">Recent Tasks</CardTitle>
                            <Button variant="outline" size="sm">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                {recentTasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <div>
                                                <p className="font-medium text-gray-900">{task.title}</p>
                                                <p className="text-xs text-gray-500">{task.status}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Workspaces Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Workspace Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                {workspaces.map((workspace) => (
                                    <div key={workspace.id} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-start justify-between">
                                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {workspace.name.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">{workspace.tasks} Tasks</span>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{workspace.members} members</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar content - 1 column */}
                <div className="col-span-1 space-y-6">
                    {/* Activity Feed */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Activity Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 mt-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                                            <span className="text-xs font-bold">{activity.action.charAt(0)}</span>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-medium text-gray-900 text-sm">{activity.action}</div>
                                                <time className="text-xs font-medium text-gray-500">{activity.time}</time>
                                            </div>
                                            <div className="text-sm text-gray-600">{activity.target}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
