import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';


export default function Dashboard({ stats, interventions }) {

    return (
        <>
            <Head title="Dashboard Manager" />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-2">
                    Dashboard Responsable Technique
                </h1>

                <p className="text-gray-500 mb-8">
                    Suivi des interventions techniques
                </p>



                {/* STATISTIQUES */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">


                    <div className="bg-white shadow rounded-xl p-6">
                        <h3 className="text-gray-500">
                            Total interventions
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.total}
                        </p>
                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <h3 className="text-gray-500">
                            En attente
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.en_attente}
                        </p>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <h3 className="text-gray-500">
                            En cours
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.en_cours}
                        </p>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <h3 className="text-gray-500">
                            Terminées
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.terminees}
                        </p>

                    </div>


                </div>




                {/* DERNIERES INTERVENTIONS */}

                <div className="bg-white shadow rounded-xl p-6">


                    <div className="flex justify-between items-center mb-5">

                        <h2 className="text-xl font-bold">
                            Dernières interventions
                        </h2>


                        <Link
                            href="/manager/interventions"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Voir toutes
                        </Link>

                    </div>




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
                                    Statut
                                </th>


                            </tr>

                        </thead>



                        <tbody>


                        {interventions.map(intervention => (

                            <tr key={intervention.id}>


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
                                    {intervention.status?.nom}
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