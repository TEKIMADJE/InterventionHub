import InterventionAttachments from '@/Components/InterventionAttachments';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ intervention }) {
    function deleteIntervention() {
        const confirmed = window.confirm(
            `Voulez-vous vraiment supprimer l’intervention ${intervention.reference} ?`
        );

        if (!confirmed) {
            return;
        }

        router.delete(
            route(
                'admin.interventions.destroy',
                intervention.id
            )
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
                <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white shadow-lg">
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

                            <p className="mt-1 text-sm text-blue-100">
                                Informations complètes de
                                l’intervention
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={route(
                                    'admin.interventions.index'
                                )}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                                Retour
                            </Link>

                            <Link
                                href={route(
                                    'admin.interventions.edit',
                                    intervention.id
                                )}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                                Modifier
                            </Link>

                            <button
                                type="button"
                                onClick={deleteIntervention}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-700"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </section>

                {/* Informations */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Informations générales */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <i className="fa-solid fa-file-lines"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Informations générales
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Description de la demande
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Référence
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {intervention.reference}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Titre
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {intervention.titre}
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
                    </section>

                    {/* Classification */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                <i className="fa-solid fa-tags"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Classification
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Catégorie et traitement
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                                <span className="text-sm text-gray-500">
                                    Catégorie
                                </span>

                                <span className="text-right text-sm font-semibold text-gray-900">
                                    {intervention.category?.nom ??
                                        'Non définie'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                                <span className="text-sm text-gray-500">
                                    Priorité
                                </span>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityColor(
                                        intervention.priority?.nom
                                    )}`}
                                >
                                    {intervention.priority?.nom ??
                                        'Non définie'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                                <span className="text-sm text-gray-500">
                                    Statut
                                </span>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(
                                        intervention.status?.nom
                                    )}`}
                                >
                                    {intervention.status?.nom ??
                                        'Non défini'}
                                </span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Affectation */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <i className="fa-solid fa-users-gear"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900">
                                Affectation
                            </h2>

                            <p className="text-xs text-gray-500">
                                Participants liés à l’intervention
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {/* Client */}
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                                <i className="fa-solid fa-building-user"></i>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500">
                                    Client
                                </p>

                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {intervention.client?.name ??
                                        'Non renseigné'}
                                </p>
                            </div>
                        </div>

                        {/* Technicien */}
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <i className="fa-solid fa-user-gear"></i>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500">
                                    Technicien
                                </p>

                                <p
                                    className={`truncate text-sm font-semibold ${
                                        intervention.technician
                                            ? 'text-gray-900'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {intervention.technician
                                        ?.name ?? 'Non affecté'}
                                </p>
                            </div>
                        </div>

                        {/* Responsable */}
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <i className="fa-solid fa-user-tie"></i>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500">
                                    Responsable
                                </p>

                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {intervention.manager?.name ??
                                        'Non défini'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pièces jointes */}
                <InterventionAttachments
                    intervention={intervention}
                />
            </div>
        </>
    );
}

Show.layout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);