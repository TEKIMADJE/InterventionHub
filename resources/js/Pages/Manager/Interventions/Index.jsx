import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';

function Index({ interventions }) {

    return (
        <>
            <Head title="Interventions à traiter" />

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Interventions
                        </h1>

                        <p className="text-gray-500">
                            Gestion des interventions à traiter
                        </p>
                    </div>

                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">Référence</th>
                                <th className="p-3 text-left">Titre</th>
                                <th className="p-3 text-left">Client</th>
                                <th className="p-3 text-left">Technicien</th>
                                <th className="p-3 text-left">Priorité</th>
                                <th className="p-3 text-left">Statut</th>
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
                                        {intervention.client?.name}
                                    </td>

                                    <td className="p-3">

                                        {intervention.technician
                                            ? intervention.technician.name
                                            : "Non affecté"}

                                    </td>

                                    <td className="p-3">
                                        {intervention.priority?.nom}
                                    </td>

                                    <td className="p-3">
                                        {intervention.status?.nom}
                                    </td>

                                    <td className="p-3 text-center">

                                        <Link
                                            href={`/manager/interventions/${intervention.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Gérer
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
Dashboard.layout = page => (
    <ManagerLayout>
        {page}
    </ManagerLayout>
);
export default Dashboard;