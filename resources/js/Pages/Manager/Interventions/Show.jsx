import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head } from '@inertiajs/react';


export default function Show({
    intervention,
    technicians
}) {

    return (
        <>

            <Head title="Détail intervention" />


            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Détail de l'intervention
                </h1>


                <div className="bg-white rounded-xl shadow p-6">


                    <p>
                        <strong>Référence :</strong>
                        {intervention.reference}
                    </p>


                    <p>
                        <strong>Titre :</strong>
                        {intervention.titre}
                    </p>


                    <p>
                        <strong>Client :</strong>
                        {intervention.client?.name}
                    </p>


                    <p>
                        <strong>Statut :</strong>
                        {intervention.status?.nom}
                    </p>


                    <hr className="my-5"/>


                    <h2 className="text-xl font-bold">
                        Techniciens disponibles
                    </h2>


                    <ul>

                        {technicians.map(technician => (

                            <li key={technician.id}>
                                {technician.name}
                            </li>

                        ))}

                    </ul>


                </div>

            </div>

        </>
    );
}


Show.layout = page => (
    <ManagerLayout>
        {page}
    </ManagerLayout>
);