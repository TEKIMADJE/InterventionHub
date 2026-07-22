import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({
    intervention = null,
    statuses = [],
}) {
    const { data, setData, put, processing, errors } = useForm({
        status_id: intervention?.status_id ?? '',
        solution: intervention?.solution ?? '',
    });

    function submit(e) {
        e.preventDefault();

        if (!intervention?.id) {
            return;
        }

        put(
            route(
                'technician.interventions.update',
                intervention.id
            )
        );
    }

    if (!intervention) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-red-600">
                    Intervention introuvable
                </h1>

                <p className="mt-2 text-gray-600">
                    Les données de l’intervention n’ont pas été envoyées
                    à la page.
                </p>
            </div>
        );
    }

    return (
        <>
            <Head title="Détail intervention" />

            <div className="p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Détail de l’intervention
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informations principales */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white shadow rounded-xl p-4 sm:p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Informations générales
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Référence
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.reference}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Titre
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.titre}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Client
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.client?.name ??
                                            'Non renseigné'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Statut actuel
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.status?.nom ??
                                            'Non défini'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Priorité
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.priority?.nom ??
                                            'Non définie'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Catégorie
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.category?.nom ??
                                            'Non définie'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white shadow rounded-xl p-4 sm:p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Description du problème
                            </h2>

                            <p className="text-gray-700 whitespace-pre-line">
                                {intervention.description ??
                                    'Aucune description'}
                            </p>
                        </section>

                        <section className="bg-white shadow rounded-xl p-4 sm:p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Compte rendu actuel
                            </h2>

                            <p className="text-gray-700 whitespace-pre-line">
                                {intervention.solution ??
                                    'Aucun compte rendu pour le moment'}
                            </p>
                        </section>

                        {/* Formulaire de mise à jour */}
                        <section className="bg-white shadow rounded-xl p-4 sm:p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Mise à jour de l’intervention
                            </h2>

                            <form onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="status_id"
                                        className="block mb-2 font-semibold"
                                    >
                                        Statut
                                    </label>

                                    <select
                                        id="status_id"
                                        value={data.status_id}
                                        onChange={(e) =>
                                            setData(
                                                'status_id',
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg p-2 w-full"
                                    >
                                        {statuses?.map((status) => (
                                            <option
                                                key={status.id}
                                                value={status.id}
                                            >
                                                {status.nom}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.status_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status_id}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="solution"
                                        className="block mb-2 font-semibold"
                                    >
                                        Compte rendu
                                    </label>

                                    <textarea
                                        id="solution"
                                        value={data.solution}
                                        onChange={(e) =>
                                            setData(
                                                'solution',
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg p-3 w-full"
                                        rows="5"
                                        placeholder="Décrivez le travail effectué..."
                                    />

                                    {errors.solution && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.solution}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg"
                                >
                                    {processing
                                        ? 'Enregistrement...'
                                        : 'Enregistrer'}
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Colonne latérale */}
                    <div className="space-y-6">
                        <section className="bg-white rounded-xl shadow p-4 sm:p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Contact du client
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Nom du contact
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.contact_nom ??
                                            'Non renseigné'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Téléphone
                                    </p>

                                    {intervention.contact_telephone ? (
                                        <a
                                            href={`tel:${intervention.contact_telephone}`}
                                            className="font-semibold text-blue-600 hover:underline break-all"
                                        >
                                            {
                                                intervention.contact_telephone
                                            }
                                        </a>
                                    ) : (
                                        <p className="font-semibold">
                                            Non renseigné
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Lieu de l’intervention
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.lieu ??
                                            'Non renseigné'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => (
    <TechnicianLayout>
        {page}
    </TechnicianLayout>
);