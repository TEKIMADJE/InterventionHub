import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Index({
    interventions,
    statuses = [],
    priorities = [],
    filters = {},
}) {
    const [form, setForm] = useState({
        search: filters.search ?? '',
        status_id: filters.status_id ?? '',
        priority_id: filters.priority_id ?? '',
    });

    const interventionList = interventions?.data ?? [];
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route('technician.interventions.index'),
                {
                    search: form.search || undefined,
                    status_id:
                        form.status_id || undefined,
                    priority_id:
                        form.priority_id || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['interventions', 'filters'],
                }
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [form]);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
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

    const filterClass =
        'w-full rounded-xl border-gray-300 text-sm focus:border-emerald-500 focus:ring-emerald-500';

    return (
        <>
            <Head title="Mes interventions" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 p-5 text-white shadow-lg">
                    <p className="text-sm text-emerald-100">
                        Espace technicien
                    </p>

                    <h1 className="mt-1 text-2xl font-bold">
                        Mes interventions
                    </h1>

                    <p className="mt-1 text-sm text-emerald-100">
                        Consultez et traitez les interventions qui
                        vous sont attribuées.
                    </p>
                </section>

                {/* Filtres */}
                <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-3 md:grid-cols-3">
                        {/* Recherche */}
                        <div>
                            <label
                                htmlFor="search"
                                className="mb-1.5 block text-xs font-semibold text-gray-600"
                            >
                                Rechercher
                            </label>

                            <div className="relative">
                                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>

                                <input
                                    id="search"
                                    name="search"
                                    type="search"
                                    value={form.search}
                                    onChange={handleChange}
                                    placeholder="Référence, titre ou client"
                                    className={`${filterClass} pl-10`}
                                />
                            </div>
                        </div>

                        {/* Statut */}
                        <div>
                            <label
                                htmlFor="status_id"
                                className="mb-1.5 block text-xs font-semibold text-gray-600"
                            >
                                Statut
                            </label>

                            <select
                                id="status_id"
                                name="status_id"
                                value={form.status_id}
                                onChange={handleChange}
                                className={filterClass}
                            >
                                <option value="">
                                    Tous les statuts
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
                        </div>

                        {/* Priorité */}
                        <div>
                            <label
                                htmlFor="priority_id"
                                className="mb-1.5 block text-xs font-semibold text-gray-600"
                            >
                                Priorité
                            </label>

                            <select
                                id="priority_id"
                                name="priority_id"
                                value={form.priority_id}
                                onChange={handleChange}
                                className={filterClass}
                            >
                                <option value="">
                                    Toutes les priorités
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
                        </div>
                    </div>
                </section>

                {/* Liste */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Interventions attribuées
                            </h2>

                            <p className="text-sm text-gray-500">
                                {interventions?.total ??
                                    interventionList.length}{' '}
                                résultat(s)
                            </p>
                        </div>
                    </div>

                    {interventionList.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <i className="fa-solid fa-toolbox text-xl"></i>
                            </div>

                            <p className="mt-3 font-semibold text-gray-900">
                                Aucune intervention
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Aucune intervention ne correspond
                                aux critères sélectionnés.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {interventionList.map(
                                (intervention) => (
                                    <div
                                        key={intervention.id}
                                        className="grid gap-3 px-4 py-4 transition hover:bg-gray-50 lg:grid-cols-[minmax(220px,1.5fr)_minmax(150px,1fr)_minmax(130px,auto)_auto] lg:items-center sm:px-5"
                                    >
                                        {/* Intervention */}
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-semibold text-emerald-600">
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
                                                <i className="fa-solid fa-tag mr-1"></i>

                                                {intervention.category
                                                    ?.nom ??
                                                    'Sans catégorie'}
                                            </p>
                                        </div>

                                        {/* Client */}
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500">
                                                Client
                                            </p>

                                            <p className="truncate text-sm font-medium text-gray-800">
                                                {intervention.client
                                                    ?.name ??
                                                    'Non renseigné'}
                                            </p>
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
                                                'technician.interventions.show',
                                                intervention.id
                                            )}
                                            title="Consulter l’intervention"
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                        >
                                            <i className="fa-solid fa-eye"></i>

                                            <span className="lg:hidden">
                                                Consulter
                                            </span>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>

                {/* Pagination */}
                {interventions?.links?.length > 3 && (
                    <nav className="flex flex-wrap justify-center gap-2">
                        {interventions.links.map(
                            (link, index) =>
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveState
                                        preserveScroll
                                        className={`rounded-xl border px-3 py-2 text-sm transition ${
                                            link.active
                                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="cursor-not-allowed rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => (
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);