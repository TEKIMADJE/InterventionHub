import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({
    users,
    filters = {},
}) {
    const [search, setSearch] = useState(
        filters.search ?? ''
    );

    const userList = users?.data ?? [];

    useEffect(() => {
        if (search === (filters.search ?? '')) {
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route('admin.users.index'),
                {
                    search: search || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['users', 'filters'],
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    function roleColor(role) {
        switch (role) {
            case 'Administrateur':
                return 'bg-blue-100 text-blue-700';

            case 'Responsable technique':
                return 'bg-purple-100 text-purple-700';

            case 'Technicien':
                return 'bg-emerald-100 text-emerald-700';

            case 'Client':
                return 'bg-cyan-100 text-cyan-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <>
            <Head title="Gestion des utilisateurs" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-blue-100">
                            Administration
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Gestion des utilisateurs
                        </h1>

                        <p className="mt-1 text-sm text-blue-100">
                            Consultation et administration des comptes
                        </p>
                    </div>

                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50"
                    >
                        <i className="fa-solid fa-user-plus"></i>
                        Nouvel utilisateur
                    </Link>
                </section>

                {/* Recherche */}
                <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <label
                        htmlFor="user-search"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Rechercher un utilisateur
                    </label>

                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                        <input
                            id="user-search"
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Nom de l’utilisateur..."
                            autoComplete="off"
                            className="w-full rounded-xl border-gray-300 py-2.5 pl-11 pr-11 focus:border-blue-500 focus:ring-blue-500"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                title="Effacer la recherche"
                                aria-label="Effacer la recherche"
                                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                </section>

                {/* Liste des utilisateurs */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Utilisateurs
                            </h2>

                            <p className="text-sm text-gray-500">
                                {users?.total ?? userList.length}{' '}
                                compte(s)
                            </p>
                        </div>

                        {search && (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                Recherche active
                            </span>
                        )}
                    </div>

                    {userList.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <i className="fa-solid fa-users text-xl"></i>
                            </div>

                            <p className="mt-3 font-semibold text-gray-900">
                                Aucun utilisateur
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {search
                                    ? `Aucun résultat pour « ${search} ».`
                                    : 'Aucun compte utilisateur disponible.'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {userList.map((user) => (
                                <div
                                    key={user.id}
                                    className="grid gap-3 px-4 py-4 transition hover:bg-gray-50 md:grid-cols-[minmax(180px,1.3fr)_minmax(180px,1fr)_minmax(130px,auto)_auto_auto] md:items-center sm:px-5"
                                >
                                    {/* Identité */}
                                    <div className="flex min-w-0 items-center gap-3">
                                        {user.photo ? (
                                            <img
                                                src={`/storage/${user.photo}`}
                                                alt={user.name}
                                                className="h-11 w-11 shrink-0 rounded-full border border-gray-200 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                                {user.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ??
                                                    'U'}
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs text-gray-500 md:hidden">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Coordonnées */}
                                    <div className="hidden min-w-0 md:block">
                                        <p className="truncate text-sm text-gray-700">
                                            <i className="fa-solid fa-envelope mr-2 text-gray-400"></i>
                                            {user.email}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            <i className="fa-solid fa-phone mr-2 text-gray-400"></i>

                                            {user.telephone ??
                                                'Non renseigné'}
                                        </p>
                                    </div>

                                    {/* Rôle */}
                                    <div>
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleColor(
                                                user.role?.nom
                                            )}`}
                                        >
                                            {user.role?.nom ??
                                                'Sans rôle'}
                                        </span>
                                    </div>

                                    {/* Statut */}
                                    <div>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                                user.is_active
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            <span
                                                className={`h-2 w-2 rounded-full ${
                                                    user.is_active
                                                        ? 'bg-emerald-500'
                                                        : 'bg-red-500'
                                                }`}
                                            ></span>

                                            {user.is_active
                                                ? 'Actif'
                                                : 'Inactif'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 md:justify-end">
                                        <Link
                                            href={route(
                                                'users.profile.show',
                                                user.id
                                            )}
                                            title="Consulter le profil"
                                            aria-label={`Consulter le profil de ${user.name}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                        >
                                            <i className="fa-solid fa-circle-user"></i>
                                        </Link>

                                        <Link
                                            href={route(
                                                'admin.users.edit',
                                                user.id
                                            )}
                                            title="Modifier l’utilisateur"
                                            aria-label={`Modifier ${user.name}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition hover:bg-blue-600 hover:text-white"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Pagination */}
                {users?.links?.length > 3 && (
                    <nav className="flex flex-wrap justify-center gap-2">
                        {users.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveState
                                    preserveScroll
                                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                                        link.active
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="cursor-not-allowed rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);