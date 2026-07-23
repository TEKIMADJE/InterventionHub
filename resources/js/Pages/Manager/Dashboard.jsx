import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    stats = {},
    interventions = [],
}) {
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
            <Head title="Dashboard Manager" />

            <div className="p-4 sm:p-6">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Dashboard Responsable Technique
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Suivi et attribution des interventions
                            techniques
                        </p>
                    </div>

                    <Link
                        href={route('manager.interventions.index')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
                    >
                        Gérer les interventions
                    </Link>
                </div>

                {/* Statistiques */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <div className="rounded-xl border-l-4 border-gray-500 bg-white p-5 shadow">
                        <h3 className="text-gray-500">
                            Total
                        </h3>

                        <p className="mt-2 text-3xl font-bold">
                            {stats.total ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-5 shadow">
                        <h3 className="text-gray-500">
                            En attente
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-yellow-600">
                            {stats.en_attente ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-blue-500 bg-white p-5 shadow">
                        <h3 className="text-gray-500">
                            En cours
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            {stats.en_cours ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-green-500 bg-white p-5 shadow">
                        <h3 className="text-gray-500">
                            Terminées
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {stats.terminees ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-red-500 bg-white p-5 shadow">
                        <h3 className="text-gray-500">
                            Non attribuées
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-red-600">
                            {stats.non_attribuees ?? 0}
                        </p>
                    </div>
                </div>

                {/* Dernières interventions */}
                <div className="rounded-xl bg-white p-4 shadow sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-bold">
                            Dernières interventions
                        </h2>

                        <Link
                            href={route(
                                'manager.interventions.index'
                            )}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Voir toutes
                        </Link>
                    </div>

                    {interventions.length === 0 ? (
                        <p className="py-8 text-center text-gray-500">
                            Aucune intervention disponible.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px]">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-left">
                                        <th className="p-3">Référence</th>
                                        <th className="p-3">Titre</th>
                                        <th className="p-3">Client</th>
                                        <th className="p-3">
                                            Technicien
                                        </th>
                                        <th className="p-3">Priorité</th>
                                        <th className="p-3">Statut</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {interventions.map((intervention) => (
                                        <tr
                                            key={intervention.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-semibold">
                                                {intervention.reference}
                                            </td>

                                            <td className="p-3">
                                                {intervention.titre}
                                            </td>

                                            <td className="p-3">
                                                {intervention.client?.name ??
                                                    'Non renseigné'}
                                            </td>

                                            <td className="p-3">
                                                {intervention.technician
                                                    ?.name ?? (
                                                    <span className="font-semibold text-red-600">
                                                        Non attribué
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-3">
                                                {intervention.priority?.nom ??
                                                    'Non définie'}
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                                                        intervention.status
                                                            ?.nom
                                                    )}`}
                                                >
                                                    {intervention.status
                                                        ?.nom ??
                                                        'Non défini'}
                                                </span>
                                            </td>

                                            <td className="p-3">
                                                <Link
                                                    href={route(
                                                        'manager.interventions.show',
                                                        intervention.id
                                                    )}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Voir
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <ManagerLayout>
        {page}
    </ManagerLayout>
);