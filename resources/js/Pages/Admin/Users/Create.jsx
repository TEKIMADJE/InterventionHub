import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ roles = [] }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        email: '',
        telephone: '',
        role_id: '',
        password: '',
        password_confirmation: '',
        is_active: true,
    });

    function submit(e) {
        e.preventDefault();

        post(route('admin.users.store'));
    }

    function inputClass(field) {
        return `w-full rounded-xl border py-2.5 transition focus:ring-2 ${
            errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
        }`;
    }

    return (
        <>
            <Head title="Nouvel utilisateur" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-blue-100">
                            Gestion des utilisateurs
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Nouvel utilisateur
                        </h1>

                        <p className="mt-1 text-sm text-blue-100">
                            Créez un compte et attribuez-lui un rôle.
                        </p>
                    </div>

                    <Link
                        href={route('admin.users.index')}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Retour
                    </Link>
                </section>

                {/* Formulaire */}
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    {/* Informations personnelles */}
                    <section className="border-b border-gray-100 p-5 sm:p-6">
                        <div className="mb-5">
                            <h2 className="font-bold text-gray-900">
                                Informations personnelles
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Informations principales de
                                l’utilisateur.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Nom */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Nom complet
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        autoComplete="name"
                                        placeholder="Nom et prénom"
                                        className={`${inputClass(
                                            'name'
                                        )} pl-11`}
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label
                                    htmlFor="telephone"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Téléphone
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="telephone"
                                        type="tel"
                                        value={data.telephone}
                                        onChange={(e) =>
                                            setData(
                                                'telephone',
                                                e.target.value
                                            )
                                        }
                                        autoComplete="tel"
                                        placeholder="+212 ..."
                                        className={`${inputClass(
                                            'telephone'
                                        )} pl-11`}
                                    />
                                </div>

                                {errors.telephone && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.telephone}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Adresse e-mail
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        autoComplete="email"
                                        placeholder="utilisateur@email.com"
                                        className={`${inputClass(
                                            'email'
                                        )} pl-11`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Rôle */}
                            <div>
                                <label
                                    htmlFor="role_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Rôle
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="role_id"
                                    value={data.role_id}
                                    onChange={(e) =>
                                        setData(
                                            'role_id',
                                            e.target.value
                                        )
                                    }
                                    className={inputClass('role_id')}
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
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.role_id}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Sécurité */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5">
                            <h2 className="font-bold text-gray-900">
                                Sécurité du compte
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Définissez les informations de
                                connexion.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Mot de passe */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Mot de passe
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                        autoComplete="new-password"
                                        placeholder="Minimum 8 caractères"
                                        className={`${inputClass(
                                            'password'
                                        )} pl-11`}
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirmation */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Confirmer le mot de passe
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={
                                            data.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value
                                            )
                                        }
                                        autoComplete="new-password"
                                        placeholder="Confirmer le mot de passe"
                                        className={`${inputClass(
                                            'password_confirmation'
                                        )} pl-11`}
                                    />
                                </div>

                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {
                                            errors.password_confirmation
                                        }
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Compte actif */}
                        <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                    <i className="fa-solid fa-user-check"></i>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Compte actif
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        L’utilisateur pourra se
                                        connecter immédiatement.
                                    </p>
                                </div>
                            </div>

                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData(
                                        'is_active',
                                        e.target.checked
                                    )
                                }
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        </label>
                    </section>

                    {/* Actions */}
                    <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <Link
                            href={route('admin.users.index')}
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <i
                                className={
                                    processing
                                        ? 'fa-solid fa-spinner fa-spin'
                                        : 'fa-solid fa-user-plus'
                                }
                            ></i>

                            {processing
                                ? 'Enregistrement...'
                                : 'Créer l’utilisateur'}
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);