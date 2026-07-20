import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function Index({ interventions }) {

    return (
        <>
            <Head title="Interventions" />

            <div className="p-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <div>
                            <h1 className="text-3xl font-bold">
                                Gestion des interventions
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Suivi des demandes d'intervention technique
                            </p>
                        </div>


                        <Link
                            href="/admin/interventions/create"
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            shadow-md
                            transition
                            duration-200
                            "
                        >
                            + Nouvelle intervention
                        </Link>

                    </div>



                    <div className="overflow-x-auto">

                        <table className="w-full border-collapse">


                            <thead>

                                <tr className="bg-gray-100">

                                    <th className="border p-3 text-left">
                                        Référence
                                    </th>

                                    <th className="border p-3 text-left">
                                        Titre
                                    </th>

                                    <th className="border p-3 text-left">
                                        Client
                                    </th>

                                    <th className="border p-3 text-left">
                                        Priorité
                                    </th>

                                    <th className="border p-3 text-left">
                                        Statut
                                    </th>

                                    <th className="border p-3 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>



                            <tbody>


                            {interventions.map(intervention => (

                                <tr 
                                    key={intervention.id}
                                    className="hover:bg-gray-50"
                                >


                                    <td className="border p-3">
                                        {intervention.reference}
                                    </td>


                                    <td className="border p-3">
                                        {intervention.titre}
                                    </td>


                                    <td className="border p-3">
                                        {intervention.client?.name}
                                    </td>


                                    <td className="border p-3">
                                        {intervention.priority?.nom}
                                    </td>


                                    <td className="border p-3">
                                        {intervention.status?.nom}
                                    </td>


                                    <td className="border p-3 text-center">

                                        <Link
                                            href={`/admin/interventions/${intervention.id}`}
                                            className="
                                            bg-green-600
                                            text-white
                                            px-3
                                            py-1
                                            rounded"
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

            </div>

        </>
    );
}
Index.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);


export default Index;