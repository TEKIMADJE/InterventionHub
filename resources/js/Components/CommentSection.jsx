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

    const currentRole =
        auth?.user?.role?.nom ?? 'Utilisateur';

    const currentTheme = roleTheme(currentRole);

    function submit(e) {
        e.preventDefault();

        if (!data.contenu.trim()) {
            return;
        }

        post(
            route('comments.store', interventionId),
            {
                preserveScroll: true,
                onSuccess: () => reset('contenu'),
            }
        );
    }

    function deleteComment(commentId) {
        const confirmed = window.confirm(
            'Voulez-vous supprimer ce commentaire ?'
        );

        if (!confirmed) {
            return;
        }

        router.delete(
            route('comments.destroy', commentId),
            {
                preserveScroll: true,
            }
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${currentTheme.light}`}
                    >
                        <i className="fa-solid fa-comments"></i>
                    </div>

                    <div>
                        <h2 className="font-bold text-gray-900 sm:text-lg">
                            Discussion
                        </h2>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            Échangez autour de cette intervention.
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {comments.length}{' '}
                    {comments.length > 1
                        ? 'commentaires'
                        : 'commentaire'}
                </span>
            </div>

            {/* Nouveau commentaire */}
            <form
                onSubmit={submit}
                className="border-b border-gray-100 bg-gray-50/70 p-4 sm:p-6"
            >
                <div className="flex items-start gap-3">
                    <UserAvatar
                        user={auth?.user}
                        theme={currentTheme}
                    />

                    <div className="min-w-0 flex-1">
                        <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <textarea
                                value={data.contenu}
                                onChange={(e) =>
                                    setData(
                                        'contenu',
                                        e.target.value
                                    )
                                }
                                rows="3"
                                maxLength="2000"
                                placeholder="Écrire un commentaire..."
                                className="w-full resize-y border-0 px-4 py-3 text-sm focus:ring-0"
                            />

                            <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
                                <span
                                    className={`text-xs ${
                                        data.contenu.length >
                                        1900
                                            ? 'font-semibold text-red-600'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {data.contenu.length}/2000
                                </span>

                                <button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        !data.contenu.trim()
                                    }
                                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${currentTheme.button}`}
                                >
                                    <i
                                        className={
                                            processing
                                                ? 'fa-solid fa-spinner fa-spin'
                                                : 'fa-solid fa-paper-plane'
                                        }
                                    ></i>

                                    {processing
                                        ? 'Envoi...'
                                        : 'Publier'}
                                </button>
                            </div>
                        </div>

                        {errors.contenu && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.contenu}
                            </p>
                        )}
                    </div>
                </div>
            </form>

            {/* Liste des commentaires */}
            {comments.length === 0 ? (
                <div className="px-4 py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <i className="fa-regular fa-comments text-xl"></i>
                    </div>

                    <h3 className="mt-3 font-semibold text-gray-900">
                        Aucune discussion
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Soyez le premier à ajouter un commentaire.
                    </p>
                </div>
            ) : (
                <div className="max-h-[600px] space-y-4 overflow-y-auto p-4 sm:p-6">
                    {comments.map((comment) => {
                        const isAuthor =
                            Number(comment.user_id) ===
                            Number(auth?.user?.id);

                        const isAdmin =
                            currentRole ===
                            'Administrateur';

                        const commentRole =
                            comment.user?.role?.nom ??
                            'Utilisateur';

                        const theme =
                            roleTheme(commentRole);

                        return (
                            <article
                                key={comment.id}
                                className={`rounded-2xl border p-4 transition hover:shadow-sm ${
                                    isAuthor
                                        ? `${theme.border} ${theme.background}`
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <UserAvatar
                                            user={comment.user}
                                            theme={theme}
                                            size="small"
                                        />

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {comment.user
                                                        ?.name ??
                                                        'Utilisateur'}
                                                </p>

                                                {isAuthor && (
                                                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-600 shadow-sm">
                                                        Vous
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}
                                                >
                                                    {commentRole}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    {formatDate(
                                                        comment.created_at
                                                    )}
                                                </span>
                                            </div>
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
                                            title="Supprimer le commentaire"
                                            aria-label="Supprimer le commentaire"
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-100 hover:text-red-600"
                                        >
                                            <i className="fa-solid fa-trash-can text-sm"></i>
                                        </button>
                                    )}
                                </div>

                                <p className="mt-4 whitespace-pre-line break-words text-sm leading-6 text-gray-700">
                                    {comment.contenu}
                                </p>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

function UserAvatar({
    user,
    theme,
    size = 'normal',
}) {
    const sizeClass =
        size === 'small'
            ? 'h-10 w-10'
            : 'h-11 w-11';

    if (user?.photo) {
        return (
            <img
                src={`/storage/${user.photo}`}
                alt={user.name ?? 'Utilisateur'}
                className={`${sizeClass} shrink-0 rounded-full border border-gray-200 object-cover`}
            />
        );
    }

    return (
        <div
            className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-full font-bold text-white ${theme.avatar}`}
        >
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
    );
}

function roleTheme(role) {
    switch (role) {
        case 'Administrateur':
            return {
                avatar: 'bg-blue-600',
                light: 'bg-blue-100 text-blue-600',
                button:
                    'bg-blue-600 hover:bg-blue-700',
                badge: 'bg-blue-100 text-blue-700',
                border: 'border-blue-200',
                background: 'bg-blue-50/50',
            };

        case 'Responsable technique':
            return {
                avatar: 'bg-indigo-600',
                light:
                    'bg-indigo-100 text-indigo-600',
                button:
                    'bg-indigo-600 hover:bg-indigo-700',
                badge:
                    'bg-indigo-100 text-indigo-700',
                border: 'border-indigo-200',
                background: 'bg-indigo-50/50',
            };

        case 'Technicien':
            return {
                avatar: 'bg-emerald-600',
                light:
                    'bg-emerald-100 text-emerald-600',
                button:
                    'bg-emerald-600 hover:bg-emerald-700',
                badge:
                    'bg-emerald-100 text-emerald-700',
                border: 'border-emerald-200',
                background: 'bg-emerald-50/50',
            };

        case 'Client':
            return {
                avatar: 'bg-cyan-600',
                light: 'bg-cyan-100 text-cyan-600',
                button:
                    'bg-cyan-600 hover:bg-cyan-700',
                badge: 'bg-cyan-100 text-cyan-700',
                border: 'border-cyan-200',
                background: 'bg-cyan-50/50',
            };

        default:
            return {
                avatar: 'bg-gray-600',
                light: 'bg-gray-100 text-gray-600',
                button:
                    'bg-gray-600 hover:bg-gray-700',
                badge: 'bg-gray-100 text-gray-700',
                border: 'border-gray-200',
                background: 'bg-gray-50',
            };
    }
}

function formatDate(date) {
    if (!date) {
        return '';
    }

    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
}