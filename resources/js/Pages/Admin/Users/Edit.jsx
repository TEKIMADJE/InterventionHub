import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ user, roles = [] }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        telephone: user.telephone ?? '',
        role_id: user.role_id ?? '',
        password: '',
        password_confirmation: '',
        is_active: Boolean(user.is_active),
    });

    function submit(e) {
        e.preventDefault();

        put(route('admin.users.update', user.id));
    }

    return (
        <>
            <Head title={`Modifier ${user.name}`} />

            <div className="mx-auto max-w-3xl p-4 sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Modifier l’utilisateur
                        </h1>

                        <p className="mt-1 text-gray-500">
                            {user.name}
                        </p>
                    </div>

                    <Link
                        href={route('admin.users.index')}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        Retour
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl bg-white p-6 shadow"
                >
                    <div>
                        <label className="mb-1 block font-semibold">
                            Nom complet
                        </label>

                        <input
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-semibold">
                            Adresse e-mail
                        </label>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-semibold">
                            Téléphone
                        </label>

                        <input
                            value={data.telephone}
                            onChange={(e) =>
                                setData('telephone', e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300"
                        />

                        {errors.telephone && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.telephone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-semibold">
                            Rôle
                        </label>

                        <select
                            value={data.role_id}
                            onChange={(e) =>
                                setData('role_id', e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300"
                        >
                            <option value="">
                                Choisir un rôle
                            </option>

                            {roles.map((role) => (
                                <option
                                    key={role.id}
                                    value={role.id}
                                >
                                    {role.nom}
                                </option>
                            ))}
                        </select>

                        {errors.role_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.role_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-semibold">
                            Nouveau mot de passe
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300"
                        />

                        <p className="mt-1 text-sm text-gray-500">
                            Laisse vide pour conserver le mot de passe actuel.
                        </p>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-semibold">
                            Confirmation du nouveau mot de passe
                        </label>

                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData(
                                    'is_active',
                                    e.target.checked
                                )
                            }
                        />

                        Compte actif
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing
                            ? 'Modification...'
                            : 'Enregistrer les modifications'}
                    </button>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AdminLayout>{page}</AdminLayout>
);