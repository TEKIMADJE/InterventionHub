import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    stats = {},
    interventions = [],
}) {
    const statCards = [
        {
            label: 'Total',
            value: stats.total ?? 0,
            icon: 'fa-solid fa-folder-open',
            color: 'text-gray-700',
            background: 'bg-gray-100',
        },
        {
            label: 'En attente',
            value: stats.en_attente ?? 0,
            icon: 'fa-solid fa-clock',
            color: 'text-amber-600',
            background: 'bg-amber-100',
        },
        {
            label: 'En cours',
            value: stats.en_cours ?? 0,
            icon: 'fa-solid fa-spinner',
            color: 'text-blue-600',
            background: 'bg-blue-100',
        },
        {
            label: 'Terminées',
            value: stats.terminees ?? 0,
            icon: 'fa-solid fa-circle-check',
            color: 'text-emerald-600',
            background: 'bg-emerald-100',
        },
        {
            label: 'Non attribuées',
            value: stats.non_attribuees ?? 0,
            icon: 'fa-solid fa-user-slash',
            color: 'text-red-600',
            background: 'bg-red-100',
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
                return 'text-red-600';

            case 'Haute':
                return 'text-orange-600';

            case 'Moyenne':
                return 'text-amber-600';

            case 'Faible':
                return 'text-emerald-600';

            default:
                return 'text-gray-700';
        }
    }

    return (
        <>
            <Head title="Tableau de bord Responsable" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-indigo-100">
                            Responsable technique
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Tableau de bord
                        </h1>

                        <p className="mt-1 text-sm text-indigo-100">
                            Suivi et attribution des interventions
                        </p>
                    </div>

                    <Link
                        href={route(
                            'manager.interventions.index'
                        )}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow transition hover:bg-indigo-50"
                    >
                        <i className="fa-solid fa-list-check"></i>
                        Gérer les interventions
                    </Link>
                </section>

                {/* Statistiques */}
                <section>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">
                            État des interventions
                        </h2>

                        <Link
                            href={route(
                                'manager.interventions.index'
                            )}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Consulter
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                        {statCards.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.background} ${item.color}`}
                                >
                                    <i className={item.icon}></i>
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                                        {item.label}
                                    </p>

                                    <p className="text-2xl font-bold text-gray-900">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Interventions récentes */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
                        <div>
                            <h2 className="font-bold text-gray-900 sm:text-lg">
                                Dernières interventions
                            </h2>

                            <p className="hidden text-sm text-gray-500 sm:block">
                                Interventions récemment enregistrées
                            </p>
                        </div>

                        <Link
                            href={route(
                                'manager.interventions.index'
                            )}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Tout voir
                            <i className="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>

                    {interventions.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                <i className="fa-solid fa-folder-open text-xl"></i>
                            </div>

                            <p className="mt-3 font-semibold text-gray-900">
                                Aucune intervention
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Les interventions apparaîtront ici.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {interventions.map(
                                (intervention) => (
                                    <div
                                        key={intervention.id}
                                        className="grid gap-3 px-4 py-4 transition hover:bg-gray-50 md:grid-cols-[minmax(0,1fr)_minmax(120px,auto)_minmax(120px,auto)_auto] md:items-center sm:px-5"
                                    >
                                        {/* Intervention */}
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-semibold text-indigo-600">
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

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                <i className="fa-solid fa-building mr-1"></i>

                                                {intervention
                                                    .client
                                                    ?.name ??
                                                    'Client non renseigné'}
                                            </p>
                                        </div>

                                        {/* Technicien */}
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500">
                                                Technicien
                                            </p>

                                            {intervention.technician ? (
                                                <p className="truncate text-sm font-medium text-gray-800">
                                                    {
                                                        intervention
                                                            .technician
                                                            .name
                                                    }
                                                </p>
                                            ) : (
                                                <p className="truncate text-sm font-semibold text-red-600">
                                                    Non attribué
                                                </p>
                                            )}
                                        </div>

                                        {/* Priorité */}
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Priorité
                                            </p>

                                            <p
                                                className={`text-sm font-semibold ${priorityColor(
                                                    intervention
                                                        .priority
                                                        ?.nom
                                                )}`}
                                            >
                                                {intervention
                                                    .priority
                                                    ?.nom ??
                                                    'Non définie'}
                                            </p>
                                        </div>

                                        {/* Action */}
                                        <Link
                                            href={route(
                                                'manager.interventions.show',
                                                intervention.id
                                            )}
                                            title="Consulter et gérer"
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-indigo-50 px-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
                                        >
                                            <i className="fa-solid fa-gear"></i>

                                            <span className="md:hidden">
                                                Gérer
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
    <ManagerLayout>
        {page}
    </ManagerLayout>
);