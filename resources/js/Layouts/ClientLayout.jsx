import NotificationDropdown from '@/Components/NotificationDropdown';
import { Link, usePage } from '@inertiajs/react';

export default function ClientLayout({ children }) {
    const { auth, company } = usePage().props;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="flex w-64 flex-col bg-gray-900 p-6 text-white">
                <div className="mb-6">
                    <h1 className="text-xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Espace Client
                    </p>
                </div>

                <nav className="flex-1 space-y-3">
                    <Link
                        href={route('client.dashboard')}
                        className="block rounded-lg p-2 hover:bg-gray-700"
                    >
                        Tableau de bord
                    </Link>

                    <Link
                        href={route(
                            'client.interventions.index'
                        )}
                        className="block rounded-lg p-2 hover:bg-gray-700"
                    >
                        Mes interventions
                    </Link>

                    <Link
                        href={route(
                            'client.interventions.create'
                        )}
                        className="block rounded-lg p-2 hover:bg-gray-700"
                    >
                        Nouvelle demande
                    </Link>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-700"
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

                            <p className="truncate text-xs text-gray-300">
                                {auth?.user?.name}
                            </p>
                        </div>
                    </Link>
                </nav>

                <div className="mt-8 border-t border-gray-700 pt-5">
                    <p className="text-sm text-gray-400">
                        Contact de l’entreprise
                    </p>

                    <p className="mt-2 font-semibold">
                        {company?.name ?? 'InterventionHub'}
                    </p>

                    {company?.phone && (
                        <a
                            href={`tel:${company.phone}`}
                            className="mt-1 block text-sm text-blue-300"
                        >
                            {company.phone}
                        </a>
                    )}

                    {company?.email && (
                        <a
                            href={`mailto:${company.email}`}
                            className="mt-1 block text-sm text-blue-300"
                        >
                            {company.email}
                        </a>
                    )}

                    <p className="mt-1 text-sm text-gray-300">
                        {company?.address}
                    </p>
                </div>

                <div className="mt-5 border-t border-gray-700 pt-4">
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
                <header className="flex items-center justify-end border-b bg-white px-6 py-4 shadow-sm">
                    <NotificationDropdown
                        readRouteName="client.notifications.read"
                    />
                </header>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}