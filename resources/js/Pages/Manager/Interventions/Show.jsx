import CommentSection from '@/Components/CommentSection';
import InterventionAttachments from '@/Components/InterventionAttachments';
import ManagerLayout from '@/Layouts/ManagerLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({
    intervention,
    technicians
}) {

    return (
        <>

            <Head title="Détail intervention" />


            <div className="p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                    Détails de l'intervention
                    </h1>

                    <Link
                        href={route("manager.interventions.edit", intervention.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                        Modifier
                    </Link>
                    <Link
                        href={route("manager.interventions.index")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                        Retour
                    </Link>
                </div>


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
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                            {intervention.status?.nom}
                        </span>
                    </p>


                    <hr className="my-5"/>


                    <p>
                    <strong>Technicien affecté :</strong>
                        {intervention.technician?.name ?? "Non affecté"}
                    </p>

                    <p>
                    <strong>Priorité :</strong>
                        {intervention.priority?.nom}
                    </p>

                    <p>
                    <strong>Catégorie :</strong>
                        {intervention.category?.nom}
                    </p>


                </div>
                <div className="mt-8">

                    <h2 className="text-xl font-bold mb-4">
                        Historique
                    </h2>

                    <div className="space-y-4">

                        {intervention.histories?.map((history) => (

                    <div
                        key={history.id}
                        className="border rounded-lg p-4 bg-gray-50"
                    >

                        <p className="font-semibold">
                            {history.action}
                        </p>

                        <p>
                            {history.details}
                        </p>

                        <p className="text-sm text-gray-500">
                            Par {history.user?.name ?? "Système"}
                            {" - "}
                            {new Date(history.created_at)
                            .toLocaleString()}
                        </p>

                </div>

            ))}

            </div>

            </div>
                <InterventionAttachments
                    intervention={intervention}
                />
                <CommentSection
                    interventionId={intervention.id}
                    comments={intervention.comments ?? []}
                />
            </div>

        </>
    );
}


Show.layout = page => (
    <ManagerLayout>
        {page}
    </ManagerLayout>
);