import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ users }) {
    const userList = users?.data ?? [];

    return (
        <>
            <Head title="Gestion des utilisateurs" />

            <div className="p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Gestion des utilisateurs
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Consultation et administration des comptes
                        </p>
                    </div>

                    <Link
                         href={route('admin.users.create')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                    >
                        + Nouvel utilisateur
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow">
                    {userList.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">
                            Aucun utilisateur disponible.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left">
                                            Utilisateur
                                        </th>
                                        <th className="p-3 text-left">
                                            E-mail
                                        </th>
                                        <th className="p-3 text-left">
                                            Téléphone
                                        </th>
                                        <th className="p-3 text-left">
                                            Rôle
                                        </th>
                                        <th className="p-3 text-left">
                                            Statut
                                        </th>
                                        <th className="p-3 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {userList.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-t hover:bg-gray-50"
                                        >
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    {user.photo ? (
                                                        <img
                                                            src={`/storage/${user.photo}`}
                                                            alt={user.name}
                                                            className="h-10 w-10 rounded-full border object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                                            {user.name
                                                                ?.charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                    )}

                                                    <span className="font-semibold">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-3">
                                                {user.email}
                                            </td>

                                            <td className="p-3">
                                                {user.telephone ??
                                                    'Non renseigné'}
                                            </td>

                                            <td className="p-3">
                                                {user.role?.nom ??
                                                    'Sans rôle'}
                                            </td>

                                            <td className="p-3">
                                                {user.is_active ? (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Actif
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                        Inactif
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={route(
                                                            'users.profile.show',
                                                            user.id
                                                        )}
                                                        className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                                                    >
                                                        Profil
                                                    </Link>

                                                    <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                                                    >
                                                        Modifier
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users?.links?.length > 3 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {users.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`rounded-lg border px-3 py-2 text-sm ${
                                        link.active
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-gray-300 bg-white hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="cursor-not-allowed rounded-lg border px-3 py-2 text-sm text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
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