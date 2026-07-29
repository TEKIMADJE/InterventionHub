import CommentSection from '@/Components/CommentSection';
import InterventionAttachments from '@/Components/InterventionAttachments';
import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({
    intervention,
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
        status_id: intervention.status_id ?? '',
        solution: intervention.solution ?? '',
    });

    function submit(e) {
        e.preventDefault();

        put(
            route(
                'technician.interventions.update',
                intervention.id
            ),
            {
                preserveScroll: true,
            }
        );
    }

    function statusColor(status) {
        switch (status) {
            case 'En attente':
                return 'bg-amber-100 text-amber-700';

            case 'En cours':
                return 'bg-blue-100 text-blue-700';

            case 'Terminée':
                return 'bg-emerald-100 text-emerald-700';

            case 'Planifiée':
                return 'bg-purple-100 text-purple-700';

            case 'Annulée':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    function priorityColor(priority) {
        switch (priority) {
            case 'Critique':
                return 'bg-red-100 text-red-700';

            case 'Haute':
                return 'bg-orange-100 text-orange-700';

            case 'Moyenne':
                return 'bg-amber-100 text-amber-700';

            case 'Faible':
                return 'bg-emerald-100 text-emerald-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <>
            <Head
                title={`Intervention ${intervention.reference}`}
            />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 p-5 text-white shadow-lg">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                                    {intervention.reference}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                                        intervention.status?.nom
                                    )}`}
                                >
                                    {intervention.status?.nom ??
                                        'Statut non défini'}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                                        intervention.priority?.nom
                                    )}`}
                                >
                                    {intervention.priority?.nom ??
                                        'Priorité non définie'}
                                </span>
                            </div>

                            <h1 className="mt-3 truncate text-2xl font-bold">
                                {intervention.titre}
                            </h1>

                            <p className="mt-1 text-sm text-emerald-100">
                                Consultation et traitement de
                                l’intervention
                            </p>
                        </div>

                        <Link
                            href={route(
                                'technician.interventions.index'
                            )}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Retour
                        </Link>
                    </div>
                </section>

                <div className="grid items-start gap-6 lg:grid-cols-3">
                    {/* Colonne des informations */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Informations générales */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Informations générales
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Détails de la demande
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Client
                                    </p>

                                    {intervention.client ? (
                                        <Link
                                            href={route(
                                                'users.profile.show',
                                                intervention
                                                    .client.id
                                            )}
                                            className="mt-1 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:underline"
                                        >
                                            <i className="fa-solid fa-building-user text-sm"></i>
                                            {
                                                intervention.client
                                                    .name
                                            }
                                        </Link>
                                    ) : (
                                        <p className="mt-1 font-semibold text-gray-700">
                                            Non renseigné
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Catégorie
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {intervention.category
                                            ?.nom ??
                                            'Non définie'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl bg-gray-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Description
                                </p>

                                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                                    {intervention.description ??
                                        'Aucune description renseignée.'}
                                </p>
                            </div>

                            {intervention.solution && (
                                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                                        Compte rendu actuel
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-emerald-900">
                                        {intervention.solution}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Contact */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                    <i className="fa-solid fa-address-card"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Contact du client
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Coordonnées pour
                                        l’intervention
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Nom du contact
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                        {intervention.contact_nom ??
                                            'Non renseigné'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Téléphone
                                    </p>

                                    {intervention.contact_telephone ? (
                                        <a
                                            href={`tel:${intervention.contact_telephone}`}
                                            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                                        >
                                            <i className="fa-solid fa-phone"></i>

                                            {
                                                intervention.contact_telephone
                                            }
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            Non renseigné
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Lieu
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        {intervention.lieu ??
                                            'Non renseigné'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Mise à jour */}
                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Mise à jour
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Statut et compte rendu
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >
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
                                    className={`w-full rounded-xl ${
                                        errors.status_id
                                            ? 'border-red-300'
                                            : 'border-gray-300'
                                    } focus:border-emerald-500 focus:ring-emerald-500`}
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

                                {errors.status_id && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.status_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="solution"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Compte rendu
                                </label>

                                <textarea
                                    id="solution"
                                    rows="6"
                                    value={data.solution}
                                    onChange={(e) =>
                                        setData(
                                            'solution',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Décrivez les actions réalisées et la solution apportée..."
                                    className={`w-full resize-y rounded-xl ${
                                        errors.solution
                                            ? 'border-red-300'
                                            : 'border-gray-300'
                                    } focus:border-emerald-500 focus:ring-emerald-500`}
                                />

                                {errors.solution && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.solution}
                                    </p>
                                )}
                            </div>

                            {recentlySuccessful && (
                                <p className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                                    <i className="fa-solid fa-circle-check mr-2"></i>
                                    Modifications enregistrées.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    : 'Enregistrer'}
                            </button>
                        </form>
                    </aside>
                </div>

                <InterventionAttachments
                    intervention={intervention}
                />

                <CommentSection
                    interventionId={intervention.id}
                    comments={intervention.comments ?? []}
                />
            </div>
        </>
    );
}

Show.layout = (page) => (
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);