import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({
    clients = [],
    categories = [],
    priorities = [],
    statuses = [],
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        titre: '',
        description: '',
        client_id: '',
        category_id: '',
        priority_id: '',
        status_id: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('admin.interventions.store'));
    }

    function fieldClass(field) {
        return `w-full rounded-xl border py-2.5 transition focus:ring-2 ${
            errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
        }`;
    }

    function ErrorMessage({ field }) {
        if (!errors[field]) {
            return null;
        }

        return (
            <p className="mt-1.5 text-sm text-red-600">
                {errors[field]}
            </p>
        );
    }

    return (
        <>
            <Head title="Nouvelle intervention" />

            <div className="mx-auto w-full max-w-6xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-blue-100">
                            Gestion des interventions
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Nouvelle intervention
                        </h1>

                        <p className="mt-1 text-sm text-blue-100">
                            Enregistrez une nouvelle demande
                            d’intervention technique.
                        </p>
                    </div>

                    <Link
                        href={route(
                            'admin.interventions.index'
                        )}
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
                    {/* Informations générales */}
                    <section className="border-b border-gray-100 p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <i className="fa-solid fa-file-lines"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Informations générales
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Objet et description de la demande
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Titre */}
                            <div>
                                <label
                                    htmlFor="titre"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Titre
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="titre"
                                        type="text"
                                        value={data.titre}
                                        onChange={(e) =>
                                            setData(
                                                'titre',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Titre de l’intervention"
                                        className={`${fieldClass(
                                            'titre'
                                        )} pl-11`}
                                    />
                                </div>

                                <ErrorMessage field="titre" />
                            </div>

                            {/* Client */}
                            <div>
                                <label
                                    htmlFor="client_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Client
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="client_id"
                                    value={data.client_id}
                                    onChange={(e) =>
                                        setData(
                                            'client_id',
                                            e.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'client_id'
                                    )}
                                >
                                    <option value="">
                                        Choisir un client
                                    </option>

                                    {clients.map((client) => (
                                        <option
                                            key={client.id}
                                            value={client.id}
                                        >
                                            {client.name}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="client_id" />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    id="description"
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Décrivez précisément le problème ou la demande..."
                                    className={`${fieldClass(
                                        'description'
                                    )} resize-y`}
                                />

                                <div className="flex items-center justify-between">
                                    <ErrorMessage field="description" />

                                    <span className="mt-1.5 text-xs text-gray-400">
                                        {data.description.length}{' '}
                                        caractère(s)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Classification */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                <i className="fa-solid fa-tags"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Classification
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Catégorie, priorité et statut
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {/* Catégorie */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Catégorie
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            'category_id',
                                            e.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'category_id'
                                    )}
                                >
                                    <option value="">
                                        Choisir une catégorie
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.nom}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="category_id" />
                            </div>

                            {/* Priorité */}
                            <div>
                                <label
                                    htmlFor="priority_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Priorité
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="priority_id"
                                    value={data.priority_id}
                                    onChange={(e) =>
                                        setData(
                                            'priority_id',
                                            e.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'priority_id'
                                    )}
                                >
                                    <option value="">
                                        Choisir une priorité
                                    </option>

                                    {priorities.map((priority) => (
                                        <option
                                            key={priority.id}
                                            value={priority.id}
                                        >
                                            {priority.nom}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="priority_id" />
                            </div>

                            {/* Statut */}
                            <div>
                                <label
                                    htmlFor="status_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Statut
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="status_id"
                                    value={data.status_id}
                                    onChange={(e) =>
                                        setData(
                                            'status_id',
                                            e.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'status_id'
                                    )}
                                >
                                    <option value="">
                                        Choisir un statut
                                    </option>

                                    {statuses.map((status) => (
                                        <option
                                            key={status.id}
                                            value={status.id}
                                        >
                                            {status.nom}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="status_id" />
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <Link
                            href={route(
                                'admin.interventions.index'
                            )}
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
                                        : 'fa-solid fa-file-circle-plus'
                                }
                            ></i>

                            {processing
                                ? 'Enregistrement...'
                                : 'Créer l’intervention'}
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