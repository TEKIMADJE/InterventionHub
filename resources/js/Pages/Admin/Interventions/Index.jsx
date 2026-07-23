import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

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

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function submit(e) {
        e.preventDefault();

        router.get(
            route('admin.interventions.index'),
            form,
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    function resetFilters() {
        const emptyFilters = {
            search: '',
            status_id: '',
            priority_id: '',
            category_id: '',
            technician_id: '',
        };

        setForm(emptyFilters);

        router.get(
            route('admin.interventions.index'),
            emptyFilters,
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    function statusColor(status) {
        switch (status) {
            case 'En attente':
                return 'bg-yellow-100 text-yellow-800';

            case 'En cours':
                return 'bg-blue-100 text-blue-800';

            case 'Terminée':
                return 'bg-green-100 text-green-800';

            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <>
            <Head title="Gestion des interventions" />

            <div className="p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Gestion des interventions
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Recherche et suivi des demandes techniques
                        </p>
                    </div>

                    <Link
                        href={route(
                            'admin.interventions.create'
                        )}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-center text-white hover:bg-blue-700"
                    >
                        + Nouvelle intervention
                    </Link>
                </div>

                {/* Filtres */}
                <form
                    onSubmit={submit}
                    className="mb-6 rounded-xl bg-white p-4 shadow sm:p-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <div>
                            <label className="mb-1 block text-sm font-semibold">
                                Rechercher
                            </label>

                            <input
                                name="search"
                                value={form.search}
                                onChange={handleChange}
                                placeholder="Référence, titre ou client"
                                className="w-full rounded-lg border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">
                                Statut
                            </label>

                            <select
                                name="status_id"
                                value={form.status_id}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300"
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

                        <div>
                            <label className="mb-1 block text-sm font-semibold">
                                Priorité
                            </label>

                            <select
                                name="priority_id"
                                value={form.priority_id}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300"
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

                        <div>
                            <label className="mb-1 block text-sm font-semibold">
                                Catégorie
                            </label>

                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300"
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

                        <div>
                            <label className="mb-1 block text-sm font-semibold">
                                Technicien
                            </label>

                            <select
                                name="technician_id"
                                value={form.technician_id}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300"
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

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            Appliquer
                        </button>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </form>

                {/* Tableau */}
                <div className="overflow-hidden rounded-xl bg-white shadow">
                    {interventionList.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">
                            Aucune intervention trouvée.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[950px]">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left">
                                            Référence
                                        </th>
                                        <th className="p-3 text-left">
                                            Titre
                                        </th>
                                        <th className="p-3 text-left">
                                            Client
                                        </th>
                                        <th className="p-3 text-left">
                                            Technicien
                                        </th>
                                        <th className="p-3 text-left">
                                            Catégorie
                                        </th>
                                        <th className="p-3 text-left">
                                            Priorité
                                        </th>
                                        <th className="p-3 text-left">
                                            Statut
                                        </th>
                                        <th className="p-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {interventionList.map(
                                        (intervention) => (
                                            <tr
                                                key={intervention.id}
                                                className="border-t hover:bg-gray-50"
                                            >
                                                <td className="p-3 font-semibold">
                                                    {intervention.reference}
                                                </td>

                                                <td className="p-3">
                                                    {intervention.titre}
                                                </td>

                                                <td className="p-3">
                                                    {intervention.client
                                                        ?.name ??
                                                        'Non renseigné'}
                                                </td>

                                                <td className="p-3">
                                                    {intervention.technician
                                                        ?.name ??
                                                        'Non affecté'}
                                                </td>

                                                <td className="p-3">
                                                    {intervention.category
                                                        ?.nom ??
                                                        'Non définie'}
                                                </td>

                                                <td className="p-3">
                                                    {intervention.priority
                                                        ?.nom ??
                                                        'Non définie'}
                                                </td>

                                                <td className="p-3">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                                                            intervention
                                                                .status?.nom
                                                        )}`}
                                                    >
                                                        {intervention.status
                                                            ?.nom ??
                                                            'Non défini'}
                                                    </span>
                                                </td>

                                                <td className="p-3 text-center">
                                                    <Link
                                                        href={route(
                                                            'admin.interventions.show',
                                                            intervention.id
                                                        )}
                                                        className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                                                    >
                                                        Voir
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {interventions?.links?.length > 3 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {interventions.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveState
                                    preserveScroll
                                    className={`rounded-lg border px-3 py-2 text-sm ${
                                        link.active
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-gray-300 bg-white hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="cursor-not-allowed rounded-lg border px-3 py-2 text-sm text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
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