import InterventionAttachments from '@/Components/InterventionAttachments';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

function Show({ intervention }) {


    const deleteIntervention = () => {

        if(confirm(
            "Êtes-vous sûr de vouloir supprimer cette intervention ?"
        )) {

            router.delete(
                `/admin/interventions/${intervention.id}`
            );

        }

    };


    return (
        <>

            <Head title="Détail intervention" />


            <div className="p-6">


                <div className="flex justify-between items-center mb-6">


                    <div>

                        <h1 className="text-3xl font-bold">
                            Détail de l'intervention
                        </h1>

                        <p className="text-gray-500">
                            Informations complètes de la demande
                        </p>

                    </div>


                    <div className="mt-6 flex flex-wrap items-center gap-2 border-t pt-4">
    <Link
        href={route('admin.interventions.index')}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
    >
        ← Retour
    </Link>

    <Link
        href={route(
            'admin.interventions.edit',
            intervention.id
        )}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
    >
        Modifier
    </Link>

    <button
        type="button"
        onClick={deleteIntervention}
        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
    >
        Supprimer
    </button>
</div>


                </div>




                <div className="bg-white rounded-xl shadow p-6 space-y-6">


                    {/* Informations générales */}

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Informations générales
                        </h2>


                        <p>
                            <strong>Référence :</strong>
                            {' '}
                            {intervention.reference}
                        </p>


                        <p>
                            <strong>Titre :</strong>
                            {' '}
                            {intervention.titre}
                        </p>


                        <p>
                            <strong>Description :</strong>
                            {' '}
                            {intervention.description}
                        </p>

                    </div>





                    {/* Classification */}

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Classification
                        </h2>


                        <p>
                            <strong>Catégorie :</strong>
                            {' '}
                            {intervention.category?.nom}
                        </p>


                        <p>
                            <strong>Priorité :</strong>
                            {' '}
                            {intervention.priority?.nom}
                        </p>


                        <p>
                            <strong>Statut :</strong>
                            {' '}
                            {intervention.status?.nom}
                        </p>

                    </div>






                    {/* Utilisateurs */}

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Affectation
                        </h2>


                        <p>
                            <strong>Client :</strong>
                            {' '}
                            {intervention.client?.name}
                        </p>


                        <p>
                            <strong>Technicien :</strong>
                            {' '}
                            {
                                intervention.technician
                                ? intervention.technician.name
                                : "Non affecté"
                            }
                        </p>


                        <p>
                            <strong>Responsable :</strong>
                            {' '}
                            {
                                intervention.manager
                                ? intervention.manager.name
                                : "Non défini"
                            }
                        </p>


                    </div>




                </div>
                <InterventionAttachments
                    intervention={intervention}
                />
            </div>

        </>
    );
}



Show.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);


export default Show;