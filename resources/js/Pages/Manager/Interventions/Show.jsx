import CommentSection from '@/Components/CommentSection';
import InterventionAttachments from '@/Components/InterventionAttachments';
import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ intervention }) {
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

    function formatDate(date) {
        if (!date) {
            return 'Date non disponible';
        }

        return new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(date));
    }

    return (
        <>
            <Head
                title={`Intervention ${intervention.reference}`}
            />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 p-5 text-white shadow-lg">
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

                            <p className="mt-1 text-sm text-indigo-100">
                                Détails et suivi de l’intervention
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={route(
                                    'manager.interventions.index'
                                )}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                                Retour
                            </Link>

                            <Link
                                href={route(
                                    'manager.interventions.edit',
                                    intervention.id
                                )}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow transition hover:bg-indigo-50"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                                Gérer
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="grid items-start gap-6 lg:grid-cols-3">
                    {/* Informations */}
                    <div className="space-y-6 lg:col-span-2">
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Informations générales
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Description et classification
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
                                        Compte rendu du technicien
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-emerald-900">
                                        {intervention.solution}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Affectation */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                    <i className="fa-solid fa-users-gear"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Affectation
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Client et technicien concernés
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                                        <i className="fa-solid fa-building-user"></i>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Client
                                        </p>

                                        {intervention.client ? (
                                            <Link
                                                href={route(
                                                    'users.profile.show',
                                                    intervention
                                                        .client.id
                                                )}
                                                className="block truncate text-sm font-semibold text-indigo-600 hover:underline"
                                            >
                                                {
                                                    intervention
                                                        .client.name
                                                }
                                            </Link>
                                        ) : (
                                            <p className="text-sm font-semibold text-gray-700">
                                                Non renseigné
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <i className="fa-solid fa-user-gear"></i>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Technicien
                                        </p>

                                        {intervention.technician ? (
                                            <Link
                                                href={route(
                                                    'users.profile.show',
                                                    intervention
                                                        .technician
                                                        .id
                                                )}
                                                className="block truncate text-sm font-semibold text-indigo-600 hover:underline"
                                            >
                                                {
                                                    intervention
                                                        .technician
                                                        .name
                                                }
                                            </Link>
                                        ) : (
                                            <p className="text-sm font-semibold text-red-600">
                                                Non affecté
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Résumé */}
                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                <i className="fa-solid fa-chart-simple"></i>
                            </div>

                            <h2 className="font-bold text-gray-900">
                                Résumé
                            </h2>
                        </div>

                        <div className="space-y-3">
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
                                    Catégorie
                                </span>

                                <span className="text-right text-sm font-semibold text-gray-800">
                                    {intervention.category?.nom ??
                                        'Non définie'}
                                </span>
                            </div>
                        </div>

                        <Link
                            href={route(
                                'manager.interventions.edit',
                                intervention.id
                            )}
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <i className="fa-solid fa-gear"></i>
                            Gérer l’intervention
                        </Link>
                    </aside>
                </div>

                {/* Historique */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900">
                                Historique
                            </h2>

                            <p className="text-xs text-gray-500">
                                Évolution de l’intervention
                            </p>
                        </div>
                    </div>

                    {!intervention.histories?.length ? (
                        <p className="rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                            Aucun historique disponible.
                        </p>
                    ) : (
                        <div className="space-y-0">
                            {intervention.histories.map(
                                (history, index) => (
                                    <div
                                        key={history.id}
                                        className="relative flex gap-4 pb-5 last:pb-0"
                                    >
                                        {index !==
                                            intervention.histories
                                                .length -
                                                1 && (
                                            <span className="absolute left-[17px] top-9 h-[calc(100%-20px)] w-px bg-gray-200"></span>
                                        )}

                                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                            <i className="fa-solid fa-circle-check text-xs"></i>
                                        </div>

                                        <div className="min-w-0 flex-1 rounded-xl bg-gray-50 p-4">
                                            <p className="font-semibold text-gray-900">
                                                {history.action}
                                            </p>

                                            {history.details && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {
                                                        history.details
                                                    }
                                                </p>
                                            )}

                                            <p className="mt-2 text-xs text-gray-500">
                                                Par{' '}
                                                {history.user
                                                    ?.name ??
                                                    'Système'}
                                                {' · '}
                                                {formatDate(
                                                    history.created_at
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>

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
    <ManagerLayout>
        {page}
    </ManagerLayout>
);