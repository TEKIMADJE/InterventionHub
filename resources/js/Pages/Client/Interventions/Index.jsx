import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ interventions }) {
    return (
        <>
            <Head title="Mes interventions" />

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Mes interventions
                        </h1>

                        <p className="text-gray-500">
                            Liste de toutes vos demandes
                        </p>
                    </div>

                    <Link
                        href={route('client.interventions.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        + Nouvelle demande
                    </Link>

                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="p-3 text-left">Référence</th>
                                <th className="p-3 text-left">Titre</th>
                                <th className="p-3 text-left">Catégorie</th>
                                <th className="p-3 text-left">Statut</th>
                                <th className="p-3 text-left">Technicien</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {interventions.map(intervention => (

                                <tr
                                    key={intervention.id}
                                    className="border-t"
                                >

                                    <td className="p-3">
                                        {intervention.reference}
                                    </td>

                                    <td className="p-3">
                                        {intervention.titre}
                                    </td>

                                    <td className="p-3">
                                        {intervention.category?.nom}
                                    </td>

                                    <td className="p-3">
                                        {intervention.status?.nom}
                                    </td>

                                    <td className="p-3">
                                        {intervention.technician?.name ?? "Non affecté"}
                                    </td>

                                    <td className="p-3 text-center">

                                        <Link
                                            href={route('client.interventions.show', intervention.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Voir
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}

Index.layout = page => (
    <ClientLayout>
        {page}
    </ClientLayout>
);