import CommentSection from '@/Components/CommentSection';
import InterventionAttachments from '@/Components/InterventionAttachments';
import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ intervention = null }) {
    function statusColor(status) {
        switch (status) {
            case 'En attente':
                return 'bg-amber-100 text-amber-700';

            case 'En cours':
                return 'bg-blue-100 text-blue-700';

            case 'Terminée':
                return 'bg-emerald-100 text-emerald-700';

            case 'Planifiée':
                return 'bg-purple-100 text-purple-700';

            case 'Annulée':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    function priorityColor(priority) {
        switch (priority) {
            case 'Critique':
                return 'bg-red-100 text-red-700';

            case 'Haute':
                return 'bg-orange-100 text-orange-700';

            case 'Moyenne':
                return 'bg-amber-100 text-amber-700';

            case 'Faible':
                return 'bg-emerald-100 text-emerald-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    function formatDate(date) {
        if (!date) {
            return 'Non renseignée';
        }

        return new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(date));
    }

    if (!intervention) {
        return (
            <>
                <Head title="Intervention introuvable" />

                <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                    </div>

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Intervention introuvable
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Les informations de cette intervention ne
                        sont pas disponibles.
                    </p>

                    <Link
                        href={route(
                            'client.interventions.index'
                        )}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Retour aux demandes
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Head
                title={`Intervention ${intervention.reference}`}
            />

            <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* En-tête */}
                <section className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white shadow-lg">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                                    {intervention.reference}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                                        intervention.status?.nom
                                    )}`}
                                >
                                    {intervention.status?.nom ??
                                        'Statut non défini'}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                                        intervention.priority?.nom
                                    )}`}
                                >
                                    {intervention.priority?.nom ??
                                        'Priorité non définie'}
                                </span>
                            </div>

                            <h1 className="mt-3 truncate text-2xl font-bold">
                                {intervention.titre}
                            </h1>

                            <p className="mt-1 text-sm text-cyan-100">
                                Détail et suivi de votre demande
                            </p>
                        </div>

                        <Link
                            href={route(
                                'client.interventions.index'
                            )}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Retour
                        </Link>
                    </div>
                </section>

                <div className="grid items-start gap-6 lg:grid-cols-3">
                    {/* Informations principales */}
                    <div className="space-y-6 lg:col-span-2">
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Informations générales
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Description et classification
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Référence
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {intervention.reference}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Catégorie
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {intervention.category
                                            ?.nom ??
                                            'Non définie'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl bg-gray-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Description du problème
                                </p>

                                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                                    {intervention.description ??
                                        'Aucune description renseignée.'}
                                </p>
                            </div>
                        </section>

                        {/* Compte rendu */}
                        <section
                            className={`rounded-2xl border p-5 shadow-sm ${
                                intervention.solution
                                    ? 'border-emerald-200 bg-emerald-50'
                                    : 'border-gray-200 bg-white'
                            }`}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                        intervention.solution
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    <i className="fa-solid fa-clipboard-check"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Compte rendu du technicien
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Résultat de l’intervention
                                    </p>
                                </div>
                            </div>

                            <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                                {intervention.solution ??
                                    'Aucun compte rendu pour le moment.'}
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <i className="fa-solid fa-address-card"></i>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Informations de contact
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Coordonnées transmises au
                                        technicien
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Contact
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                        {intervention.contact_nom ??
                                            'Non renseigné'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Téléphone
                                    </p>

                                    {intervention.contact_telephone ? (
                                        <a
                                            href={`tel:${intervention.contact_telephone}`}
                                            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:underline"
                                        >
                                            <i className="fa-solid fa-phone"></i>

                                            {
                                                intervention.contact_telephone
                                            }
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            Non renseigné
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-xs text-gray-500">
                                        Lieu
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        {intervention.lieu ??
                                            'Non renseigné'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Résumé */}
                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                <i className="fa-solid fa-circle-info"></i>
                            </div>

                            <h2 className="font-bold text-gray-900">
                                Résumé
                            </h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                                <span className="text-sm text-gray-500">
                                    Statut
                                </span>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(
                                        intervention.status?.nom
                                    )}`}
                                >
                                    {intervention.status?.nom ??
                                        'Non défini'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                                <span className="text-sm text-gray-500">
                                    Priorité
                                </span>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityColor(
                                        intervention.priority?.nom
                                    )}`}
                                >
                                    {intervention.priority?.nom ??
                                        'Non définie'}
                                </span>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-xs text-gray-500">
                                    Technicien
                                </p>

                                {intervention.technician ? (
                                    <Link
                                        href={route(
                                            'users.profile.show',
                                            intervention.technician
                                                .id
                                        )}
                                        className="mt-1 block truncate text-sm font-semibold text-cyan-700 hover:underline"
                                    >
                                        {
                                            intervention.technician
                                                .name
                                        }
                                    </Link>
                                ) : (
                                    <p className="mt-1 text-sm font-semibold text-gray-600">
                                        Non attribué
                                    </p>
                                )}
                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-xs text-gray-500">
                                    Date de création
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {formatDate(
                                        intervention.created_at
                                    )}
                                </p>
                            </div>
                        </div>
                    </aside>
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

Show.layout = (page) => (
    <ClientLayout>
        {page}
    </ClientLayout>
);