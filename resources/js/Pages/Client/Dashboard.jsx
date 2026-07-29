import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    stats = {},
    recentInterventions = [],
}) {
    const statCards = [
        {
            label: 'Total',
            value: stats.total ?? 0,
            icon: 'fa-solid fa-folder-open',
            iconColor: 'text-gray-700',
            iconBackground: 'bg-gray-100',
        },
        {
            label: 'En attente',
            value: stats.pending ?? 0,
            icon: 'fa-solid fa-clock',
            iconColor: 'text-amber-600',
            iconBackground: 'bg-amber-100',
        },
        {
            label: 'En cours',
            value: stats.in_progress ?? 0,
            icon: 'fa-solid fa-spinner',
            iconColor: 'text-blue-600',
            iconBackground: 'bg-blue-100',
        },
        {
            label: 'Terminées',
            value: stats.completed ?? 0,
            icon: 'fa-solid fa-circle-check',
            iconColor: 'text-emerald-600',
            iconBackground: 'bg-emerald-100',
        },
    ];

    function statusColor(status) {
        switch (status) {
            case 'En attente':
                return 'bg-amber-100 text-amber-700';

            case 'En cours':
                return 'bg-blue-100 text-blue-700';

            case 'Terminée':
                return 'bg-emerald-100 text-emerald-700';

            case 'Annulée':
                return 'bg-red-100 text-red-700';

            case 'Planifiée':
                return 'bg-purple-100 text-purple-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <>
            <Head title="Tableau de bord Client" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-cyan-100">
                            Vue d’ensemble
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Tableau de bord
                        </h1>

                        <p className="mt-1 text-sm text-cyan-100">
                            Consultez et suivez rapidement vos demandes.
                        </p>
                    </div>

                    <Link
                        href={route(
                            'client.interventions.create'
                        )}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-cyan-700 shadow transition hover:bg-cyan-50"
                    >
                        <i className="fa-solid fa-plus"></i>
                        Nouvelle demande
                    </Link>
                </section>

                {/* Statistiques */}
                <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div
                            key={card.label}
                            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBackground} ${card.iconColor}`}
                            >
                                <i className={card.icon}></i>
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                                    {card.label}
                                </p>

                                <p className="text-2xl font-bold text-gray-900">
                                    {card.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Interventions récentes */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
                        <div>
                            <h2 className="font-bold text-gray-900 sm:text-lg">
                                Demandes récentes
                            </h2>

                            <p className="hidden text-sm text-gray-500 sm:block">
                                Vos dernières interventions enregistrées
                            </p>
                        </div>

                        <Link
                            href={route(
                                'client.interventions.index'
                            )}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                        >
                            Tout voir
                            <i className="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>

                    {recentInterventions.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                                <i className="fa-solid fa-folder-open text-xl"></i>
                            </div>

                            <h3 className="mt-3 font-semibold text-gray-900">
                                Aucune demande
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Vous n’avez encore créé aucune intervention.
                            </p>

                            <Link
                                href={route(
                                    'client.interventions.create'
                                )}
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
                            >
                                <i className="fa-solid fa-plus"></i>
                                Créer une demande
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {recentInterventions.map(
                                (intervention) => (
                                    <div
                                        key={intervention.id}
                                        className="grid gap-3 px-4 py-4 transition hover:bg-gray-50 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:px-5"
                                    >
                                        {/* Informations principales */}
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-semibold text-cyan-600">
                                                    {
                                                        intervention.reference
                                                    }
                                                </span>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(
                                                        intervention
                                                            .status
                                                            ?.nom
                                                    )}`}
                                                >
                                                    {intervention
                                                        .status
                                                        ?.nom ??
                                                        'Non défini'}
                                                </span>
                                            </div>

                                            <p className="mt-1 truncate font-semibold text-gray-900">
                                                {
                                                    intervention.titre
                                                }
                                            </p>

                                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                                <span>
                                                    <i className="fa-solid fa-tag mr-1"></i>

                                                    {intervention
                                                        .category
                                                        ?.nom ??
                                                        'Sans catégorie'}
                                                </span>

                                                <span>
                                                    <i className="fa-solid fa-user-gear mr-1"></i>

                                                    {intervention
                                                        .technician
                                                        ?.name ??
                                                        'Non attribué'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Priorité */}
                                        <div className="text-sm">
                                            <span className="text-gray-500">
                                                Priorité :
                                            </span>{' '}

                                            <span className="font-semibold text-gray-800">
                                                {intervention
                                                    .priority
                                                    ?.nom ??
                                                    'Non définie'}
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <Link
                                            href={route(
                                                'client.interventions.show',
                                                intervention.id
                                            )}
                                            title="Consulter l’intervention"
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-cyan-50 px-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
                                        >
                                            <i className="fa-solid fa-eye"></i>

                                            <span className="sm:hidden">
                                                Consulter
                                            </span>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <ClientLayout>
        {page}
    </ClientLayout>
);