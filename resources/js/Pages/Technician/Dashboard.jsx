import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head } from '@inertiajs/react';



export default function Dashboard({ stats }) {

    return (
        <>

            <Head title="Dashboard Technicien" />


            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Tableau de bord Technicien
                </h1>


                <div className="grid grid-cols-4 gap-6">


                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">
                            Total
                        </h2>

                        <p className="text-3xl font-bold">
                            {stats.total}
                        </p>
                    </div>



                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">
                            En attente
                        </h2>

                        <p className="text-3xl font-bold">
                            {stats.en_attente}
                        </p>
                    </div>



                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">
                            En cours
                        </h2>

                        <p className="text-3xl font-bold">
                            {stats.en_cours}
                        </p>
                    </div>



                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">
                            Terminées
                        </h2>

                        <p className="text-3xl font-bold">
                            {stats.terminees}
                        </p>
                    </div>


                </div>

            </div>

        </>
    );
}


Dashboard.layout = page => (
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);