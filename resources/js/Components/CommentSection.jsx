import {
    router,
    useForm,
    usePage,
} from '@inertiajs/react';

export default function CommentSection({
    interventionId,
    comments = [],
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
        contenu: '',
    });

    function submit(e) {
        e.preventDefault();

        post(
            route(
                'comments.store',
                interventionId
            ),
            {
                preserveScroll: true,
                onSuccess: () => reset('contenu'),
            }
        );
    }

    function deleteComment(commentId) {
        if (
            !confirm(
                'Voulez-vous supprimer ce commentaire ?'
            )
        ) {
            return;
        }

        router.delete(
            route(
                'comments.destroy',
                commentId
            ),
            {
                preserveScroll: true,
            }
        );
    }

    return (
        <section className="mt-8 rounded-xl bg-white p-6 shadow">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Commentaires
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Échangez des informations concernant
                    cette intervention.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="mb-8"
            >
                <textarea
                    value={data.contenu}
                    onChange={(e) =>
                        setData(
                            'contenu',
                            e.target.value
                        )
                    }
                    rows="4"
                    maxLength="2000"
                    placeholder="Écrire un commentaire..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />

                <div className="mt-2 flex items-center justify-between">
                    <div>
                        {errors.contenu && (
                            <p className="text-sm text-red-600">
                                {errors.contenu}
                            </p>
                        )}

                        <p className="text-xs text-gray-400">
                            {data.contenu.length}/2000
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={
                            processing ||
                            !data.contenu.trim()
                        }
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing
                            ? 'Envoi...'
                            : 'Publier'}
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
                        Aucun commentaire pour le moment.
                    </p>
                ) : (
                    comments.map((comment) => {
                        const isAuthor =
                            Number(comment.user_id) ===
                            Number(auth?.user?.id);

                        const isAdmin =
                            auth?.user?.role?.nom ===
                            'Administrateur';

                        return (
                            <article
                                key={comment.id}
                                className="rounded-xl border border-gray-200 p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                            {comment.user?.name
                                                ?.charAt(0)
                                                .toUpperCase() ??
                                                'U'}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {comment.user
                                                    ?.name ??
                                                    'Utilisateur'}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {comment.user
                                                    ?.role
                                                    ?.nom ??
                                                    'Utilisateur'}
                                                {' • '}
                                                {formatDate(
                                                    comment.created_at
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {(isAuthor ||
                                        isAdmin) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteComment(
                                                    comment.id
                                                )
                                            }
                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>

                                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">
                                    {comment.contenu}
                                </p>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}

function formatDate(date) {
    if (!date) {
        return '';
    }

    return new Intl.DateTimeFormat(
        'fr-FR',
        {
            dateStyle: 'medium',
            timeStyle: 'short',
        }
    ).format(new Date(date));
}