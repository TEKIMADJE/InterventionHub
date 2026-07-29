import AdminLayout from '@/Layouts/AdminLayout';
import ClientLayout from '@/Layouts/ClientLayout';
import ManagerLayout from '@/Layouts/ManagerLayout';
import TechnicianLayout from '@/Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';

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

    const profileRole =
        typeof profileUser.role === 'string'
            ? profileUser.role
            : profileUser.role?.nom ?? 'Utilisateur';

    const theme = roleTheme(profileRole);

    const content = (
        <>
            <Head title={`Profil de ${profileUser.name}`} />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                {/* En-tête du profil */}
                <section
                    className={`overflow-hidden rounded-2xl bg-gradient-to-r ${theme.gradient} text-white shadow-lg`}
                >
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                        <button
                            type="button"
                            onClick={() =>
                                window.history.back()
                            }
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Retour
                        </button>

                        {viewerRole ===
                            'Administrateur' && (
                            <Link
                                href={route(
                                    'admin.users.edit',
                                    profileUser.id
                                )}
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow transition hover:bg-gray-100"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>

                                <span className="hidden sm:inline">
                                    Modifier
                                </span>
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-8">
                        {/* Photo */}
                        <div className="relative shrink-0">
                            {profileUser.photo ? (
                                <img
                                    src={`/storage/${profileUser.photo}`}
                                    alt={profileUser.name}
                                    className="h-28 w-28 rounded-full border-4 border-white/80 object-cover shadow-xl"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/80 bg-white/20 text-4xl font-bold shadow-xl backdrop-blur">
                                    {profileUser.name
                                        ?.charAt(0)
                                        .toUpperCase() ?? 'U'}
                                </div>
                            )}

                            {typeof profileUser.is_active ===
                                'boolean' && (
                                <span
                                    className={`absolute bottom-2 right-1 h-5 w-5 rounded-full border-4 border-white ${
                                        profileUser.is_active
                                            ? 'bg-emerald-500'
                                            : 'bg-red-500'
                                    }`}
                                    title={
                                        profileUser.is_active
                                            ? 'Compte actif'
                                            : 'Compte inactif'
                                    }
                                ></span>
                            )}
                        </div>

                        {/* Identité */}
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                            <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap">
                                <h1 className="max-w-full truncate text-2xl font-bold sm:text-3xl">
                                    {profileUser.name}
                                </h1>

                                {typeof profileUser.is_active ===
                                    'boolean' && (
                                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                                        {profileUser.is_active
                                            ? 'Compte actif'
                                            : 'Compte inactif'}
                                    </span>
                                )}
                            </div>

                            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
                                    <i
                                        className={`${theme.icon} mr-2`}
                                    ></i>
                                    {profileRole}
                                </span>

                                {profileUser.specialite && (
                                    <span className="rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                                        <i className="fa-solid fa-certificate mr-2"></i>
                                        {
                                            profileUser.specialite
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid items-start gap-6 lg:grid-cols-3">
                    {/* Présentation */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 sm:p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.light}`}
                            >
                                <i className="fa-solid fa-user"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Présentation
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Informations personnelles et
                                    professionnelles
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                                {profileUser.bio ??
                                    'Aucune présentation renseignée.'}
                            </p>
                        </div>

                        {profileUser.specialite && (
                            <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.light}`}
                                >
                                    <i className="fa-solid fa-screwdriver-wrench"></i>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500">
                                        Spécialité
                                    </p>

                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {
                                            profileUser.specialite
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Coordonnées */}
                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                        <div className="mb-4 flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.light}`}
                            >
                                <i className="fa-solid fa-address-book"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Coordonnées
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Informations de contact
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Email */}
                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-xs text-gray-500">
                                    Adresse e-mail
                                </p>

                                {profileUser.email ? (
                                    <a
                                        href={`mailto:${profileUser.email}`}
                                        className={`mt-1 flex items-start gap-2 break-all text-sm font-semibold ${theme.link}`}
                                    >
                                        <i className="fa-solid fa-envelope mt-1 shrink-0"></i>
                                        {profileUser.email}
                                    </a>
                                ) : (
                                    <p className="mt-1 text-sm font-semibold text-gray-600">
                                        Non renseignée
                                    </p>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-xs text-gray-500">
                                    Téléphone
                                </p>

                                {profileUser.telephone ? (
                                    <a
                                        href={`tel:${profileUser.telephone}`}
                                        className={`mt-1 flex items-center gap-2 text-sm font-semibold ${theme.link}`}
                                    >
                                        <i className="fa-solid fa-phone"></i>
                                        {
                                            profileUser.telephone
                                        }
                                    </a>
                                ) : (
                                    <p className="mt-1 text-sm font-semibold text-gray-600">
                                        Non renseigné
                                    </p>
                                )}
                            </div>

                            {/* Adresse */}
                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-xs text-gray-500">
                                    Adresse
                                </p>

                                <p className="mt-1 flex items-start gap-2 text-sm font-semibold text-gray-800">
                                    <i className="fa-solid fa-location-dot mt-1 shrink-0 text-gray-400"></i>

                                    <span>
                                        {profileUser.adresse ??
                                            'Non renseignée'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
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

function roleTheme(role) {
    switch (role) {
        case 'Administrateur':
            return {
                gradient:
                    'from-blue-700 to-indigo-700',
                light: 'bg-blue-100 text-blue-600',
                link: 'text-blue-600 hover:text-blue-800',
                icon: 'fa-solid fa-user-shield',
            };

        case 'Responsable technique':
            return {
                gradient:
                    'from-indigo-700 to-purple-700',
                light:
                    'bg-indigo-100 text-indigo-600',
                link: 'text-indigo-600 hover:text-indigo-800',
                icon: 'fa-solid fa-user-tie',
            };

        case 'Technicien':
            return {
                gradient:
                    'from-emerald-700 to-teal-600',
                light:
                    'bg-emerald-100 text-emerald-600',
                link: 'text-emerald-600 hover:text-emerald-800',
                icon: 'fa-solid fa-user-gear',
            };

        case 'Client':
            return {
                gradient:
                    'from-cyan-600 to-blue-600',
                light: 'bg-cyan-100 text-cyan-600',
                link: 'text-cyan-600 hover:text-cyan-800',
                icon: 'fa-solid fa-building-user',
            };

        default:
            return {
                gradient:
                    'from-gray-700 to-gray-900',
                light: 'bg-gray-100 text-gray-600',
                link: 'text-gray-600 hover:text-gray-800',
                icon: 'fa-solid fa-user',
            };
    }
}