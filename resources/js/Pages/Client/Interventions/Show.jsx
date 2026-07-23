import InterventionAttachments from '@/Components/InterventionAttachments';
import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ intervention = null }) {
    if (!intervention) {
        return (
            <>
                <Head title="Intervention introuvable" />

                <div className="p-6">
                    <h1 className="text-2xl font-bold text-red-600">
                        Intervention introuvable
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Les données de l’intervention n’ont pas été envoyées
                        à cette page.
                    </p>

                    <Link
                        href={route('client.interventions.index')}
                        className="mt-4 inline-block text-blue-600 hover:underline"
                    >
                        ← Retour aux interventions
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`Intervention ${intervention.reference}`} />

            <div className="p-4 sm:p-6">
                <div className="mb-6">
                    <Link
                        href={route('client.interventions.index')}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        ← Retour à mes interventions
                    </Link>
                </div>

                <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
                    Détail de l’intervention
                </h1>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Informations principales */}
                    <div className="space-y-6 lg:col-span-2">
                        <section className="rounded-xl bg-white p-4 shadow sm:p-6">
                            <h2 className="mb-4 text-xl font-bold">
                                Informations générales
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                        Statut
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

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Technicien
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.technician ? (
                                            <a
                                                href={route(
                                                    'users.profile.show',
                                                    intervention.technician.id
                                                )}
                                                className="font-semibold text-blue-600 hover:underline"
                                            >
                                        {intervention.technician.name}
                                            </a>
                                                ) : (
                                                    <span className="font-semibold">
                                                        Non attribué
                                                    </span>
                                                )}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Description */}
                        <section className="rounded-xl bg-white p-4 shadow sm:p-6">
                            <h2 className="mb-4 text-xl font-bold">
                                Description du problème
                            </h2>

                            <p className="whitespace-pre-line text-gray-700">
                                {intervention.description ??
                                    'Aucune description'}
                            </p>
                        </section>

                        {/* Solution du technicien */}
                        <section className="rounded-xl bg-white p-4 shadow sm:p-6">
                            <h2 className="mb-4 text-xl font-bold">
                                Compte rendu du technicien
                            </h2>

                            <p className="whitespace-pre-line text-gray-700">
                                {intervention.solution ??
                                    'Aucun compte rendu pour le moment'}
                            </p>
                        </section>
                    </div>

                    {/* Informations complémentaires */}
                    <div className="space-y-6">
                        <section className="rounded-xl bg-white p-4 shadow sm:p-6">
                            <h2 className="mb-4 text-xl font-bold">
                                Informations de contact
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
                                            className="break-all font-semibold text-blue-600 hover:underline"
                                        >
                                            {intervention.contact_telephone}
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

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Date de création
                                    </p>

                                    <p className="font-semibold">
                                        {intervention.created_at
                                            ? new Date(
                                                  intervention.created_at
                                              ).toLocaleDateString('fr-FR')
                                            : 'Non renseignée'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <InterventionAttachments
                    intervention={intervention}
                />
            </div>
        </>
    );
}

Show.layout = (page) => (
    <ClientLayout>
        {page}
    </ClientLayout>
);