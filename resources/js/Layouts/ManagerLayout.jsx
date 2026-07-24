import NotificationDropdown from '@/Components/NotificationDropdown';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ManagerLayout({ children }) {
    const { auth } = usePage().props;
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef(null);

    function linkClass(active) {
        return `block rounded-lg px-4 py-3 transition ${
            active
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`;
    }

    useEffect(() => {
        function closeMenu(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', closeMenu);

        return () => {
            document.removeEventListener(
                'mousedown',
                closeMenu
            );
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar fixe */}
            <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col overflow-y-auto bg-slate-900 text-white">
                <div className="border-b border-slate-700 p-6">
                    <h1 className="text-2xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Responsable technique
                    </p>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    <Link
                        href={route('manager.dashboard')}
                        className={linkClass(
                            route().current(
                                'manager.dashboard'
                            )
                        )}
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        href={route(
                            'manager.interventions.index'
                        )}
                        className={linkClass(
                            route().current(
                                'manager.interventions.*'
                            )
                        )}
                    >
                        🛠 Interventions
                    </Link>
                </nav>

                <div className="border-t border-slate-700 p-4">
                    <p className="truncate text-sm font-semibold">
                        {auth?.user?.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                        Responsable technique
                    </p>
                </div>
            </aside>

            {/* Contenu placé après la sidebar */}
            <div className="ml-64 min-h-screen">
                {/* Barre supérieure */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <NotificationDropdown
                            readRouteName="manager.notifications.read"
                        />

                        {/* Menu utilisateur */}
                        <div
                            ref={menuRef}
                            className="relative"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setUserMenuOpen(
                                        !userMenuOpen
                                    )
                                }
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-gray-100"
                            >
                                {auth?.user?.photo ? (
                                    <img
                                        src={`/storage/${auth.user.photo}`}
                                        alt={auth.user.name}
                                        className="h-9 w-9 rounded-full border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                        {auth?.user?.name
                                            ?.charAt(0)
                                            .toUpperCase() ??
                                            'U'}
                                    </div>
                                )}

                                <div className="hidden text-left sm:block">
                                    <p className="max-w-40 truncate text-sm font-semibold text-gray-800">
                                        {auth?.user?.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Responsable technique
                                    </p>
                                </div>

                                <span
                                    className={`text-xs text-gray-500 transition ${
                                        userMenuOpen
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                >
                                    ▼
                                </span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
                                    <div className="border-b px-4 py-3">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {auth?.user?.name}
                                        </p>

                                        <p className="truncate text-xs text-gray-500">
                                            {auth?.user?.email}
                                        </p>
                                    </div>

                                    <Link
                                        href={route(
                                            'profile.edit'
                                        )}
                                        onClick={() =>
                                            setUserMenuOpen(
                                                false
                                            )
                                        }
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        👤 Mon profil
                                    </Link>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                    >
                                        🚪 Se déconnecter
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="min-w-0 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}