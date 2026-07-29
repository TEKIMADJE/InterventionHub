import NotificationDropdown from '@/Components/NotificationDropdown';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function TechnicianLayout({ children }) {
    const { auth } = usePage().props;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const menuRef = useRef(null);

    const navigation = [
        {
            label: 'Tableau de bord',
            icon: 'fa-solid fa-chart-column',
            href: route('technician.dashboard'),
            active: route().current(
                'technician.dashboard'
            ),
        },
        {
            label: 'Mes interventions',
            icon: 'fa-solid fa-toolbox',
            href: route(
                'technician.interventions.index'
            ),
            active: route().current(
                'technician.interventions.*'
            ),
        },
    ];

    function linkClass(active) {
        return `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
            active
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/30'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`;
    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setUserMenuOpen(false);
                setSidebarOpen(false);
            }
        }

        document.addEventListener(
            'mousedown',
            handleOutsideClick
        );

        document.addEventListener(
            'keydown',
            handleEscape
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleOutsideClick
            );

            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Fond sombre sur mobile */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-gray-950/60 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gray-950 text-white shadow-2xl transition-transform duration-300 ${
                    sidebarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                } lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-gray-800 px-6">
                    <Link
                        href={route('technician.dashboard')}
                        onClick={() => setSidebarOpen(false)}
                        className="flex min-w-0 items-center rounded-xl bg-white px-2 py-1.5"
                    >
                    <img
                        src="/images/InterventionHub-logo.svg"
                        alt="InterventionHub"
                        className="h-10 w-auto max-w-[190px]"
                    />
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
                        aria-label="Fermer la navigation"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                    <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Espace de travail
                    </p>

                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                            className={linkClass(item.active)}
                        >
                            <span className="flex h-8 w-8 items-center justify-center">
                                <i className={item.icon}></i>
                            </span>

                            <span>{item.label}</span>

                            {item.active && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Profil sidebar */}
                <div className="border-t border-gray-800 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-900 p-3">
                        {auth?.user?.photo ? (
                            <img
                                src={`/storage/${auth.user.photo}`}
                                alt={auth.user.name}
                                className="h-10 w-10 rounded-full border border-gray-700 object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold">
                                {auth?.user?.name
                                    ?.charAt(0)
                                    .toUpperCase() ?? 'T'}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                {auth?.user?.name}
                            </p>

                            <p className="truncate text-xs text-gray-400">
                                Technicien
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Contenu principal */}
            <div className="min-h-screen lg:ml-72">
                {/* Barre supérieure */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 lg:hidden"
                            aria-label="Ouvrir la navigation"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <div>
                            <p className="text-sm text-gray-500">
                                Espace technicien
                            </p>

                            <p className="hidden font-semibold text-gray-900 sm:block">
                                Gestion de vos interventions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <NotificationDropdown
                            readRouteName="technician.notifications.read"
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
                                        (current) => !current
                                    )
                                }
                                aria-expanded={userMenuOpen}
                                className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition hover:border-gray-200 hover:bg-gray-50"
                            >
                                {auth?.user?.photo ? (
                                    <img
                                        src={`/storage/${auth.user.photo}`}
                                        alt={auth.user.name}
                                        className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                                        {auth?.user?.name
                                            ?.charAt(0)
                                            .toUpperCase() ?? 'T'}
                                    </div>
                                )}

                                <div className="hidden text-left md:block">
                                    <p className="max-w-40 truncate text-sm font-semibold text-gray-800">
                                        {auth?.user?.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Technicien
                                    </p>
                                </div>

                                <i
                                    className={`fa-solid fa-chevron-down hidden text-xs text-gray-400 transition-transform sm:block ${
                                        userMenuOpen
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                ></i>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                                    <div className="border-b border-gray-100 px-4 py-4">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                            {auth?.user?.name}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {auth?.user?.email}
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        <Link
                                            href={route(
                                                'profile.edit'
                                            )}
                                            onClick={() =>
                                                setUserMenuOpen(
                                                    false
                                                )
                                            }
                                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <i className="fa-solid fa-user-gear w-5 text-gray-400"></i>
                                            Mon profil
                                        </Link>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            onClick={() =>
                                                setUserMenuOpen(
                                                    false
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                        >
                                            <i className="fa-solid fa-right-from-bracket w-5"></i>
                                            Se déconnecter
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="min-w-0 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}