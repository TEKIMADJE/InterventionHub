import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({
    categories = [],
    priorities = [],
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        titre: '',
        description: '',
        lieu: '',
        contact_nom: '',
        contact_telephone: '',
        category_id: '',
        priority_id: '',
    });

    function submit(event) {
        event.preventDefault();

        post(route('client.interventions.store'));
    }

    function fieldClass(field) {
        return `w-full rounded-xl border py-2.5 transition focus:ring-2 ${
            errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-100'
        }`;
    }

    function ErrorMessage({ field }) {
        if (!errors[field]) {
            return null;
        }

        return (
            <p className="mt-1.5 text-sm text-red-600">
                {errors[field]}
            </p>
        );
    }

    return (
        <>
            <Head title="Nouvelle demande" />

            <div className="mx-auto w-full max-w-6xl space-y-6">
                {/* En-tête */}
                <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-cyan-100">
                            Espace client
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Nouvelle demande
                        </h1>

                        <p className="mt-1 text-sm text-cyan-100">
                            Décrivez le problème afin de demander
                            une intervention technique.
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
                </section>

                {/* Formulaire */}
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    {/* Demande */}
                    <section className="border-b border-gray-100 p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                <i className="fa-solid fa-file-circle-plus"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Description de la demande
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Nature et niveau de priorité du
                                    problème
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {/* Titre */}
                            <div className="lg:col-span-2">
                                <label
                                    htmlFor="titre"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Titre
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="titre"
                                        type="text"
                                        value={data.titre}
                                        onChange={(event) =>
                                            setData(
                                                'titre',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Exemple : Ordinateur en panne"
                                        className={`${fieldClass(
                                            'titre'
                                        )} pl-11`}
                                    />
                                </div>

                                <ErrorMessage field="titre" />
                            </div>

                            {/* Catégorie */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Catégorie
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(event) =>
                                        setData(
                                            'category_id',
                                            event.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'category_id'
                                    )}
                                >
                                    <option value="">
                                        Sélectionner
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.nom}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="category_id" />
                            </div>

                            {/* Priorité */}
                            <div>
                                <label
                                    htmlFor="priority_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Priorité
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    id="priority_id"
                                    value={data.priority_id}
                                    onChange={(event) =>
                                        setData(
                                            'priority_id',
                                            event.target.value
                                        )
                                    }
                                    className={fieldClass(
                                        'priority_id'
                                    )}
                                >
                                    <option value="">
                                        Sélectionner
                                    </option>

                                    {priorities.map((priority) => (
                                        <option
                                            key={priority.id}
                                            value={priority.id}
                                        >
                                            {priority.nom}
                                        </option>
                                    ))}
                                </select>

                                <ErrorMessage field="priority_id" />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 lg:col-span-4">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    id="description"
                                    rows="4"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            'description',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Expliquez clairement le problème rencontré..."
                                    className={`${fieldClass(
                                        'description'
                                    )} resize-y`}
                                />

                                <div className="flex items-center justify-between">
                                    <ErrorMessage field="description" />

                                    <span className="mt-1.5 text-xs text-gray-400">
                                        {data.description.length}{' '}
                                        caractère(s)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <i className="fa-solid fa-address-card"></i>
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Lieu et contact
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Informations nécessaires au
                                    déplacement du technicien
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {/* Lieu */}
                            <div>
                                <label
                                    htmlFor="lieu"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Lieu
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="lieu"
                                        type="text"
                                        value={data.lieu}
                                        onChange={(event) =>
                                            setData(
                                                'lieu',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Bureau ou adresse"
                                        className={`${fieldClass(
                                            'lieu'
                                        )} pl-11`}
                                    />
                                </div>

                                <ErrorMessage field="lieu" />
                            </div>

                            {/* Contact */}
                            <div>
                                <label
                                    htmlFor="contact_nom"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Nom du contact
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="contact_nom"
                                        type="text"
                                        value={data.contact_nom}
                                        onChange={(event) =>
                                            setData(
                                                'contact_nom',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Personne à contacter"
                                        className={`${fieldClass(
                                            'contact_nom'
                                        )} pl-11`}
                                    />
                                </div>

                                <ErrorMessage field="contact_nom" />
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label
                                    htmlFor="contact_telephone"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Téléphone
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                    <input
                                        id="contact_telephone"
                                        type="tel"
                                        value={
                                            data.contact_telephone
                                        }
                                        onChange={(event) =>
                                            setData(
                                                'contact_telephone',
                                                event.target.value
                                            )
                                        }
                                        autoComplete="tel"
                                        placeholder="Exemple : 0612345678"
                                        className={`${fieldClass(
                                            'contact_telephone'
                                        )} pl-11`}
                                    />
                                </div>

                                <ErrorMessage field="contact_telephone" />
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <Link
                            href={route(
                                'client.interventions.index'
                            )}
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <i
                                className={
                                    processing
                                        ? 'fa-solid fa-spinner fa-spin'
                                        : 'fa-solid fa-paper-plane'
                                }
                            ></i>

                            {processing
                                ? 'Enregistrement...'
                                : 'Envoyer la demande'}
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <ClientLayout>
        {page}
    </ClientLayout>
);