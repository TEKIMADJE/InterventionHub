import NotificationDropdown from '@/Components/NotificationDropdown';
import { Link, usePage } from '@inertiajs/react';

export default function ManagerLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="flex w-64 flex-col bg-slate-900 text-white">
                <div className="border-b border-slate-700 p-6">
                    <h1 className="text-2xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Responsable Technique
                    </p>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    <Link
                        href={route('manager.dashboard')}
                        className="block rounded-lg px-4 py-3 transition hover:bg-slate-800"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        href={route(
                            'manager.interventions.index'
                        )}
                        className="block rounded-lg px-4 py-3 transition hover:bg-slate-800"
                    >
                        🛠 Interventions
                    </Link>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-slate-800"
                    >
                        {auth?.user?.photo ? (
                            <img
                                src={`/storage/${auth.user.photo}`}
                                alt={auth.user.name}
                                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
                                {auth?.user?.name
                                    ?.charAt(0)
                                    .toUpperCase() ?? 'U'}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="font-semibold">
                                Mon profil
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                {auth?.user?.name}
                            </p>
                        </div>
                    </Link>
                </nav>

                <div className="border-t border-slate-700 p-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full rounded-lg bg-red-600 px-4 py-2 text-left text-sm hover:bg-red-700"
                    >
                        Se déconnecter
                    </Link>
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                <header className="flex items-center justify-end border-b bg-white px-8 py-4 shadow-sm">
                    <NotificationDropdown
                        readRouteName="manager.notifications.read"
                    />
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}