import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    stats = {},
    recentInterventions = [],
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
            <Head title="Dashboard Client" />

            <div className="p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Tableau de bord Client
                    </h1>

                    <Link
                        href={route('client.interventions.create')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
                    >
                        + Nouvelle intervention
                    </Link>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border-l-4 border-gray-500 bg-white p-6 shadow">
                        <h2 className="text-gray-500">
                            Total des demandes
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {stats.total ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow">
                        <h2 className="text-gray-500">
                            En attente
                        </h2>

                        <p className="mt-2 text-3xl font-bold text-yellow-600">
                            {stats.pending ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow">
                        <h2 className="text-gray-500">
                            En cours
                        </h2>

                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            {stats.in_progress ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow">
                        <h2 className="text-gray-500">
                            Terminées
                        </h2>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {stats.completed ?? 0}
                        </p>
                    </div>
                </div>

                {/* Interventions récentes */}
                <div className="mt-8 rounded-xl bg-white p-4 shadow sm:p-6">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-bold">
                            Mes demandes récentes
                        </h2>

                        <Link
                            href={route('client.interventions.index')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Toutes mes interventions
                        </Link>
                    </div>

                    {recentInterventions.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="mb-4 text-gray-500">
                                Vous n’avez créé aucune intervention.
                            </p>

                            <Link
                                href={route(
                                    'client.interventions.create'
                                )}
                                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Créer ma première demande
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[750px]">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-left">
                                        <th className="p-3">Référence</th>
                                        <th className="p-3">Titre</th>
                                        <th className="p-3">Catégorie</th>
                                        <th className="p-3">Priorité</th>
                                        <th className="p-3">Statut</th>
                                        <th className="p-3">
                                            Technicien
                                        </th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentInterventions.map(
                                        (intervention) => (
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

                                                <td className="p-3">
                                                    {intervention.technician
                                                        ?.name ??
                                                        'Non attribué'}
                                                </td>

                                                <td className="p-3">
                                                    <Link
                                                        href={route(
                                                            'client.interventions.show',
                                                            intervention.id
                                                        )}
                                                        className="text-blue-600 hover:underline"
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
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <ClientLayout>
        {page}
    </ClientLayout>
);