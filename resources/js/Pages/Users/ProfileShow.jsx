import AdminLayout from '@/Layouts/AdminLayout';
import ClientLayout from '@/Layouts/ClientLayout';
import ManagerLayout from '@/Layouts/ManagerLayout';
import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head } from '@inertiajs/react';

export default function ProfileShow({
    profileUser,
    viewerRole,
}) {
    const layouts = {
        Administrateur: AdminLayout,
        'Responsable technique': ManagerLayout,
        Technicien: TechnicianLayout,
        Client: ClientLayout,
    };

    const SelectedLayout = layouts[viewerRole];

    const content = (
        <>
            <Head title={`Profil de ${profileUser.name}`} />

            <div className="p-4 sm:p-6">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Retour
                </button>

                <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                        <div className="flex flex-col items-center gap-5 sm:flex-row">
                            {profileUser.photo ? (
                                <img
                                    src={`/storage/${profileUser.photo}`}
                                    alt={profileUser.name}
                                    className="h-28 w-28 rounded-full border-4 border-white object-cover"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-400 text-4xl font-bold">
                                    {profileUser.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold">
                                    {profileUser.name}
                                </h1>

                                <p className="mt-1 text-blue-100">
                                    {profileUser.role}
                                </p>

                                {profileUser.specialite && (
                                    <p className="mt-2 font-semibold">
                                        {profileUser.specialite}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 p-6 sm:p-8">
                        <section>
                            <h2 className="mb-2 text-xl font-bold">
                                Présentation
                            </h2>

                            <p className="whitespace-pre-line text-gray-700">
                                {profileUser.bio ??
                                    'Aucune présentation renseignée.'}
                            </p>
                        </section>

                        {(profileUser.email ||
                            profileUser.telephone ||
                            profileUser.adresse) && (
                            <section className="border-t pt-6">
                                <h2 className="mb-4 text-xl font-bold">
                                    Coordonnées
                                </h2>

                                <div className="space-y-3">
                                    {profileUser.email && (
                                        <p>
                                            <strong>E-mail :</strong>{' '}
                                            {profileUser.email}
                                        </p>
                                    )}

                                    {profileUser.telephone && (
                                        <p>
                                            <strong>Téléphone :</strong>{' '}
                                            {profileUser.telephone}
                                        </p>
                                    )}

                                    {profileUser.adresse && (
                                        <p>
                                            <strong>Adresse :</strong>{' '}
                                            {profileUser.adresse}
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    if (!SelectedLayout) {
        return (
            <div className="min-h-screen bg-gray-100">
                {content}
            </div>
        );
    }

    return (
        <SelectedLayout>
            {content}
        </SelectedLayout>
    );
}