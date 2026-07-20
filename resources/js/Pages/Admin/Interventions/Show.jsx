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


                    <Link
                        href={`/admin/interventions/${intervention.id}/edit`}
                        className="
                        bg-amber-500
                        hover:bg-amber-600
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        shadow-sm
                        transition
                        duration-200"
                        >
                        Modifier
                    </Link>
                    <button
                        onClick={deleteIntervention}
                        className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        shadow-sm
                        transition
                        duration-200
                        "
                        >
                        Supprimer
                    </button>
                    <Link
                        href="/admin/interventions"
                        className="
                        bg-gray-700
                        hover:bg-gray-800
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        shadow-sm
                        transition
                        duration-200
                        "
                    >
                        Retour
                    </Link>


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