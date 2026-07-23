import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, useForm } from '@inertiajs/react';
import InterventionAttachments from '@/Components/InterventionAttachments';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ intervention, statuses }) {


    const { data, setData, put, processing } = useForm({
        status_id: intervention.status_id,
        solution: intervention.solution ?? '',
    });


    function submit(e) {
        e.preventDefault();

        put(
            route(
                'technician.interventions.update',
                intervention.id
            )
        );
    }


    return (
        <>

            <Head title="Détail intervention" />


            <div className="p-6">


                <h1 className="text-3xl font-bold mb-6">
                    Détail intervention
                </h1>



                <div className="bg-white shadow rounded-xl p-6">


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
                        {intervention.client ? (
                            <Link
                                href={route(
                                    'users.profile.show',
                                    intervention.client.id
                                )}
                                className="font-semibold text-blue-600 hover:underline"
                            >
                        {intervention.client.name}
                            </Link>
                                ) : (
                                    <span className="font-semibold">
                                        Non renseigné
                                    </span>
                                )}
                    </p>


                    <p>
                        <strong>Statut :</strong>
                        {intervention.status?.nom}
                    </p>

                    <p>
                        <strong>Compte rendu :</strong>

                                {intervention.solution
                                ?? "Aucun compte rendu pour le moment"}
                    </p>
                </div>



                {/* Formulaire mise à jour */}

                <div className="bg-white shadow rounded-xl p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        Mise à jour de l'intervention
                    </h2>


                    <form onSubmit={submit}>


                        <label className="block mb-2 font-semibold">
                            Statut
                        </label>


                        <select
                            value={data.status_id}
                            onChange={e => setData('status_id', e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        >

                            {statuses.map(status => (

                                <option
                                    key={status.id}
                                    value={status.id}
                                >
                                    {status.nom}
                                </option>

                            ))}

                        </select>



                        <label className="block mt-4 mb-2 font-semibold">
                            Compte rendu
                        </label>


                        <textarea
                            value={data.solution}
                            onChange={e => setData('solution', e.target.value)}
                            className="border rounded-lg p-3 w-full"
                            rows="5"
                        />



                        <button
                            disabled={processing}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Enregistrer
                        </button>


                    </form>

                </div>
                section className="bg-white rounded-xl shadow p-6">
    <h2 className="text-xl font-bold mb-4">
        Contact du client
    </h2>

    <div className="space-y-3">
        <div>
            <p className="text-sm text-gray-500">
                Nom du contact
            </p>

            <p className="font-semibold">
                {intervention.contact_nom ?? 'Non renseigné'}
            </p>
        </div>

        <div>
            <p className="text-sm text-gray-500">
                Téléphone
            </p>

            <a
                href={`tel:${intervention.contact_telephone}`}
                className="font-semibold text-blue-600 hover:underline"
            >
                {intervention.contact_telephone ?? 'Non renseigné'}
            </a>
        </div>

        <div>
            <p className="text-sm text-gray-500">
                Lieu de l’intervention
            </p>

            <p className="font-semibold">
                {intervention.lieu ?? 'Non renseigné'}
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
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);