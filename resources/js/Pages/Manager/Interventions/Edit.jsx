import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({
    intervention,
    technicians = [],
    priorities = [],
    statuses = [],
}) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        technician_id:
            intervention.technician_id ?? '',
        priority_id: intervention.priority_id ?? '',
        status_id: intervention.status_id ?? '',
    });

    function submit(e) {
        e.preventDefault();

        put(
            route(
                'manager.interventions.update',
                intervention.id
            ),
            {
                preserveScroll: true,
            }
        );
    }

    function fieldClass(field) {
        return `w-full rounded-xl border py-2.5 transition focus:ring-2 ${
            errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
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
            <Head
                title={`Gérer ${intervention.reference}`}
            />

            <div className="mx-auto w-full max-w-6xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                                {intervention.reference}
                            </span>

                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                                Gestion technique
                            </span>
                        </div>

                        <h1 className="mt-3 truncate text-2xl font-bold">
                            Gérer l’intervention
                        </h1>

                        <p className="mt-1 truncate text-sm text-indigo-100">
                            {intervention.titre}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route(
                                'manager.interventions.show',
                                intervention.id
                            )}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Retour
                        </Link>

                        <Link
                            href={route(
                                'manager.interventions.index'
                            )}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow transition hover:bg-indigo-50"
                        >
                            <i className="fa-solid fa-list"></i>
                            Liste
                        </Link>
                    </div>
                </section>

                {/* Informations */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <i className="fa-solid fa-file-lines"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900">
                                Informations de l’intervention
                            </h2>

                            <p className="text-xs text-gray-500">
                                Informations principales de la
                                demande
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Référence
                            </p>

                            <p className="mt-1 truncate font-semibold text-gray-900">
                                {intervention.reference}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Client
                            </p>

                            <p className="mt-1 truncate font-semibold text-gray-900">
                                {intervention.client?.name ??
                                    'Non renseigné'}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Titre
                            </p>

                            <p
                                className="mt-1 truncate font-semibold text-gray-900"
                                title={intervention.titre}
                            >
                                {intervention.titre}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Catégorie
                            </p>

                            <p className="mt-1 truncate font-semibold text-gray-900">
                                {intervention.category?.nom ??
                                    'Non définie'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Formulaire */}
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                <i className="fa-solid fa-sliders"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Affectation et traitement
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Choisissez le technicien, la
                                    priorité et le statut
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {/* Technicien */}
                            <div>
                                <label
                                    htmlFor="technician_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Technicien
                                </label>

                                <select
                                    id="technician_id"
                                    value={data.technician_id}
                                    onChange={(e) =>
                                        setData(
                                            'technician_id',
                                            e.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'technician_id'
                                    )}
                                >
                                    <option value="">
                                        Non affecté
                                    </option>

                                    {technicians.map(
                                        (technician) => (
                                            <option
                                                key={
                                                    technician.id
                                                }
                                                value={
                                                    technician.id
                                                }
                                            >
                                                {
                                                    technician.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                <ErrorMessage field="technician_id" />
                            </div>

                            {/* Priorité */}
                            <div>
                                <label
                                    htmlFor="priority_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Priorité
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

                        {recentlySuccessful && (
                            <p className="mt-5 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">
                                <i className="fa-solid fa-circle-check mr-2"></i>
                                Modifications enregistrées avec
                                succès.
                            </p>
                        )}
                    </section>

                    {/* Actions */}
                    <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <Link
                            href={route(
                                'manager.interventions.show',
                                intervention.id
                            )}
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <i
                                className={
                                    processing
                                        ? 'fa-solid fa-spinner fa-spin'
                                        : 'fa-solid fa-floppy-disk'
                                }
                            ></i>

                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer les modifications'}
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <ManagerLayout>
        {page}
    </ManagerLayout>
);