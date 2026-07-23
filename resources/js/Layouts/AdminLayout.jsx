import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    function linkClass(active) {
        return `block rounded p-2 transition ${
            active
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700'
        }`;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Barre latérale */}
            <aside className="flex w-64 flex-col bg-gray-900 p-5 text-white">
                <h2 className="mb-8 text-2xl font-bold">
                    InterventionHub
                </h2>

                <nav className="flex-1 space-y-3">
                    <Link
                        href="/admin/dashboard"
                        className={linkClass(
                            route().current(
                                'admin.dashboard'
                            )
                        )}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/users"
                        className={linkClass(
                            route().current('users.*')
                        )}
                    >
                        Utilisateurs
                    </Link>

                    <Link
                        href="/admin/interventions"
                        className={linkClass(
                            route().current(
                                'admin.interventions.*'
                            )
                        )}
                    >
                        Interventions
                    </Link>

                    <Link
                        href={route('profile.edit')}
                        className={`flex items-center gap-3 rounded-lg p-2 transition ${
                        route().current('profile.*')
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                    >
                    {auth?.user?.photo ? (
                    <img
                        src={`/storage/${auth.user.photo}`}
                        alt={auth.user.name}
                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
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

                            <p className="truncate text-xs text-gray-300">
                                {auth?.user?.name}
                            </p>
                        </div>
                    </Link>
                </nav>

                {/* Utilisateur connecté */}
                <div className="mt-8 border-t border-gray-700 pt-4">
                    <p className="truncate font-semibold">
                        {auth?.user?.name}
                    </p>

                    <p className="mb-3 truncate text-sm text-gray-400">
                        {auth?.user?.email}
                    </p>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full rounded bg-red-600 px-3 py-2 text-left text-sm hover:bg-red-700"
                    >
                        Se déconnecter
                    </Link>
                </div>
            </aside>

            {/* Contenu */}
            <main className="min-w-0 flex-1 p-6">
                {children}
            </main>
        </div>
    );
}