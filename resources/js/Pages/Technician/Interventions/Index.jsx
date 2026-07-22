import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';


export default function Index({ interventions }) {

    return (
        <>

            <Head title="Mes interventions" />


            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Mes interventions
                </h1>


                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">
                                    Référence
                                </th>

                                <th className="p-3 text-left">
                                    Titre
                                </th>

                                <th className="p-3 text-left">
                                    Priorité
                                </th>

                                <th className="p-3 text-left">
                                    Statut
                                </th>

                                <th className="p-3">
                                    Action
                                </th>

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
                                    {intervention.priority?.nom}
                                </td>


                                <td className="p-3">
                                    {intervention.status?.nom}
                                </td>


                                <td className="p-3 text-center">

                                    <Link
                                        href={route(
                                            'technician.interventions.show',
                                            intervention.id
                                        )}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);