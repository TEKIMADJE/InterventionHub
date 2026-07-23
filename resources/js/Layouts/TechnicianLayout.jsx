import { Link, usePage } from '@inertiajs/react';

export default function TechnicianLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="flex w-64 flex-col bg-white shadow-lg">
                <div className="border-b p-6">
                    <h1 className="text-xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="text-sm text-gray-500">
                        Espace Technicien
                    </p>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    <Link
                        href={route(
                            'technician.dashboard'
                        )}
                        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        href={route(
                            'technician.interventions.index'
                        )}
                        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
                    >
                        🛠️ Mes interventions
                    </Link>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-gray-100"
                    >
                        {auth?.user?.photo ? (
                            <img
                                src={`/storage/${auth.user.photo}`}
                                alt={auth.user.name}
                                className="h-10 w-10 rounded-full border object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                {auth?.user?.name
                                    ?.charAt(0)
                                    .toUpperCase() ?? 'U'}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="font-semibold">
                                Mon profil
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                {auth?.user?.name}
                            </p>
                        </div>
                    </Link>
                </nav>

                <div className="border-t p-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full rounded-lg bg-red-600 px-4 py-2 text-left text-sm text-white hover:bg-red-700"
                    >
                        Se déconnecter
                    </Link>
                </div>
            </aside>

            <main className="min-w-0 flex-1 p-6">
                {children}
            </main>
        </div>
    );
}