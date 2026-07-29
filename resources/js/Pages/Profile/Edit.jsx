import AdminLayout from '@/Layouts/AdminLayout';
import ClientLayout from '@/Layouts/ClientLayout';
import ManagerLayout from '@/Layouts/ManagerLayout';
import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
    roleName,
}) {
    const layouts = {
        Administrateur: AdminLayout,
        'Responsable technique': ManagerLayout,
        Technicien: TechnicianLayout,
        Client: ClientLayout,
    };

    const themes = {
        Administrateur: {
            gradient:
                'from-blue-700 to-indigo-700',
            light: 'bg-blue-100 text-blue-600',
            subtitle: 'text-blue-100',
        },
        'Responsable technique': {
            gradient:
                'from-indigo-700 to-purple-700',
            light: 'bg-indigo-100 text-indigo-600',
            subtitle: 'text-indigo-100',
        },
        Technicien: {
            gradient:
                'from-emerald-700 to-teal-600',
            light: 'bg-emerald-100 text-emerald-600',
            subtitle: 'text-emerald-100',
        },
        Client: {
            gradient: 'from-cyan-600 to-blue-600',
            light: 'bg-cyan-100 text-cyan-600',
            subtitle: 'text-cyan-100',
        },
    };

    const SelectedLayout = layouts[roleName];
    const theme =
        themes[roleName] ?? themes.Administrateur;

    const content = (
        <>
            <Head title="Mon profil" />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section
                    className={`rounded-2xl bg-gradient-to-r ${theme.gradient} p-5 text-white shadow-lg`}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl backdrop-blur">
                            <i className="fa-solid fa-user-gear"></i>
                        </div>

                        <div>
                            <p
                                className={`text-sm ${theme.subtitle}`}
                            >
                                {roleName ??
                                    'Espace utilisateur'}
                            </p>

                            <h1 className="mt-1 text-2xl font-bold">
                                Mon profil
                            </h1>

                            <p
                                className={`mt-1 text-sm ${theme.subtitle}`}
                            >
                                Gérez vos informations personnelles
                                et la sécurité de votre compte.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Informations et sécurité */}
                <div className="grid items-start gap-6 xl:grid-cols-2">
                    {/* Informations personnelles */}
                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.light}`}
                            >
                                <i className="fa-solid fa-address-card"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Informations personnelles
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Identité, coordonnées et photo
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={
                                    mustVerifyEmail
                                }
                                status={status}
                                className="w-full"
                            />
                        </div>
                    </section>

                    {/* Mot de passe */}
                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Sécurité du compte
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Modification du mot de passe
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </section>
                </div>

                {/* Suppression */}
                <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-red-100 bg-red-50 px-5 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-red-900">
                                Zone sensible
                            </h2>

                            <p className="text-xs text-red-600">
                                Actions irréversibles sur votre
                                compte
                            </p>
                        </div>
                    </div>

                    <div className="p-5 sm:p-6">
                        <DeleteUserForm className="w-full max-w-2xl" />
                    </div>
                </section>
            </div>
        </>
    );

    if (!SelectedLayout) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
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