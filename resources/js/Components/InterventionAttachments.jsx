import { router, useForm, usePage } from '@inertiajs/react';

export default function InterventionAttachments({
    intervention,
}) {
    const { auth } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        files: [],
        description: '',
    });

    const attachments = intervention?.attachments ?? [];

    function submit(e) {
        e.preventDefault();

        const formElement = e.currentTarget;

        post(
            route(
                'attachments.store',
                intervention.id
            ),
            {
                forceFormData: true,
                preserveScroll: true,

                onSuccess: () => {
                    reset();
                    formElement.reset();
                },
            }
        );
    }

    function deleteAttachment(attachment) {
        const confirmed = window.confirm(
            `Supprimer le fichier « ${attachment.original_name} » ?`
        );

        if (!confirmed) {
            return;
        }

        router.delete(
            route(
                'attachments.destroy',
                attachment.id
            ),
            {
                preserveScroll: true,
            }
        );
    }

    function canDelete(attachment) {
        return (
            Number(attachment.user_id) ===
                Number(auth?.user?.id) ||
            auth?.user?.role?.nom === 'Administrateur'
        );
    }

    function formatSize(size) {
        if (!size) {
            return 'Taille inconnue';
        }

        if (size < 1024) {
            return `${size} octets`;
        }

        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} Ko`;
        }

        return `${(
            size /
            (1024 * 1024)
        ).toFixed(1)} Mo`;
    }

    return (
        <section className="mt-6 rounded-xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-4 text-xl font-bold">
                Pièces jointes
            </h2>

            {/* Formulaire d’envoi */}
            <form
                onSubmit={submit}
                className="mb-6 rounded-lg border bg-gray-50 p-4"
            >
                <div>
                    <label
                        htmlFor="files"
                        className="mb-2 block font-semibold"
                    >
                        Sélectionner des fichiers
                    </label>

                    <input
                        id="files"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={(e) =>
                            setData(
                                'files',
                                Array.from(e.target.files)
                            )
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-white p-2"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG, PDF, DOC ou DOCX — 5 Mo maximum
                        par fichier et 5 fichiers maximum.
                    </p>

                    {errors.files && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.files}
                        </p>
                    )}

                    {Object.entries(errors)
                        .filter(([key]) =>
                            key.startsWith('files.')
                        )
                        .map(([key, message]) => (
                            <p
                                key={key}
                                className="mt-1 text-sm text-red-600"
                            >
                                {message}
                            </p>
                        ))}
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="description"
                        className="mb-2 block font-semibold"
                    >
                        Description facultative
                    </label>

                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) =>
                            setData(
                                'description',
                                e.target.value
                            )
                        }
                        rows="2"
                        maxLength="500"
                        placeholder="Exemple : photo du matériel endommagé"
                        className="w-full rounded-lg border-gray-300"
                    />

                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={
                        processing ||
                        data.files.length === 0
                    }
                    className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing
                        ? 'Envoi en cours...'
                        : 'Ajouter les fichiers'}
                </button>
            </form>

            {/* Liste des fichiers */}
            {attachments.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                    Aucune pièce jointe pour cette intervention.
                </p>
            ) : (
                <div className="space-y-3">
                    {attachments.map((attachment) => (
                        <div
                            key={attachment.id}
                            className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="font-semibold">
                                    {attachment.original_name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {formatSize(
                                        attachment.file_size
                                    )}
                                    {' • '}
                                    Ajouté par{' '}
                                    {attachment.user?.name ??
                                        'Utilisateur supprimé'}
                                </p>

                                {attachment.description && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        {attachment.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <a
                                    href={route(
                                        'attachments.download',
                                        attachment.id
                                    )}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Télécharger
                                </a>

                                {canDelete(attachment) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteAttachment(
                                                attachment
                                            )
                                        }
                                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}