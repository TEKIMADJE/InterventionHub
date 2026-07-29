import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Index({
    interventions,
    statuses = [],
    priorities = [],
    categories = [],
    technicians = [],
    filters = {},
}) {
    const [form, setForm] = useState({
        search: filters.search ?? '',
        status_id: filters.status_id ?? '',
        priority_id: filters.priority_id ?? '',
        category_id: filters.category_id ?? '',
        technician_id: filters.technician_id ?? '',
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
                route('admin.interventions.index'),
                {
                    search: form.search || undefined,
                    status_id:
                        form.status_id || undefined,
                    priority_id:
                        form.priority_id || undefined,
                    category_id:
                        form.category_id || undefined,
                    technician_id:
                        form.technician_id || undefined,
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
        'w-full rounded-xl border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500';

    return (
        <>
            <Head title="Gestion des interventions" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-blue-100">
                            Administration
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Gestion des interventions
                        </h1>

                        <p className="mt-1 text-sm text-blue-100">
                            Recherche et suivi des demandes
                            techniques
                        </p>
                    </div>

                    <Link
                        href={route(
                            'admin.interventions.create'
                        )}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50"
                    >
                        <i className="fa-solid fa-file-circle-plus"></i>
                        Nouvelle intervention
                    </Link>
                </section>

                {/* Filtres */}
                <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
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
                                    placeholder="Référence, titre, client"
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

                        {/* Catégorie */}
                        <div>
                            <label
                                htmlFor="category_id"
                                className="mb-1.5 block text-xs font-semibold text-gray-600"
                            >
                                Catégorie
                            </label>

                            <select
                                id="category_id"
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className={filterClass}
                            >
                                <option value="">
                                    Toutes les catégories
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
                        </div>

                        {/* Technicien */}
                        <div>
                            <label
                                htmlFor="technician_id"
                                className="mb-1.5 block text-xs font-semibold text-gray-600"
                            >
                                Technicien
                            </label>

                            <select
                                id="technician_id"
                                name="technician_id"
                                value={form.technician_id}
                                onChange={handleChange}
                                className={filterClass}
                            >
                                <option value="">
                                    Tous les techniciens
                                </option>

                                <option value="unassigned">
                                    Non attribuées
                                </option>

                                {technicians.map((technician) => (
                                    <option
                                        key={technician.id}
                                        value={technician.id}
                                    >
                                        {technician.name}
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
                                Interventions
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
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <i className="fa-solid fa-folder-open text-xl"></i>
                            </div>

                            <p className="mt-3 font-semibold text-gray-900">
                                Aucune intervention
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Aucune intervention ne correspond
                                aux critères.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {interventionList.map(
                                (intervention) => (
                                    <div
                                        key={intervention.id}
                                        className="grid gap-3 px-4 py-4 transition hover:bg-gray-50 lg:grid-cols-[minmax(200px,1.4fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(110px,auto)_auto] lg:items-center sm:px-5"
                                    >
                                        {/* Intervention */}
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-semibold text-blue-600">
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

                                        {/* Technicien */}
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500">
                                                Technicien
                                            </p>

                                            <p
                                                className={`truncate text-sm font-semibold ${
                                                    intervention.technician
                                                        ? 'text-gray-800'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {intervention
                                                    .technician
                                                    ?.name ??
                                                    'Non affecté'}
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
                                                'admin.interventions.show',
                                                intervention.id
                                            )}
                                            title="Consulter l’intervention"
                                            aria-label={`Consulter l’intervention ${intervention.reference}`}
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
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
                                                ? 'border-blue-600 bg-blue-600 text-white'
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
    <AdminLayout>
        {page}
    </AdminLayout>
);