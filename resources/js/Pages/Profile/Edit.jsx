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

    const SelectedLayout = layouts[roleName];

    const content = (
        <>
            <Head title="Mon profil" />

            <div className="py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Mon profil
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gérez vos informations personnelles et
                            la sécurité de votre compte.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4 shadow sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-xl bg-white p-4 shadow sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-xl bg-white p-4 shadow sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );

    if (!SelectedLayout) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
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