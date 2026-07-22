import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories, priorities }) {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        lieu: '',
        contact_nom: '',
        contact_telephone: '',
        category_id: '',
        priority_id: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('client.interventions.store'));
    };

    return (
        <>
            <Head title="Nouvelle demande" />

            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Nouvelle demande
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Décrivez le problème pour demander une intervention.
                        </p>
                    </div>

                    <Link
                        href={route('client.interventions.index')}
                        className="inline-flex justify-center rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
                    >
                        Retour
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label
                                htmlFor="titre"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Titre
                            </label>

                            <input
                                id="titre"
                                type="text"
                                value={data.titre}
                                onChange={(event) =>
                                    setData('titre', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Exemple : Ordinateur en panne"
                            />

                            {errors.titre && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.titre}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                rows="5"
                                value={data.description}
                                onChange={(event) =>
                                    setData('description', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Expliquez clairement le problème rencontré..."
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="category_id"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Catégorie
                            </label>

                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(event) =>
                                    setData('category_id', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">
                                    Sélectionner une catégorie
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

                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="priority_id"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Priorité
                            </label>

                            <select
                                id="priority_id"
                                value={data.priority_id}
                                onChange={(event) =>
                                    setData('priority_id', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">
                                    Sélectionner une priorité
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

                            {errors.priority_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.priority_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="lieu"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Lieu
                            </label>

                            <input
                                id="lieu"
                                type="text"
                                value={data.lieu}
                                onChange={(event) =>
                                    setData('lieu', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Bureau, bâtiment ou adresse"
                            />

                            {errors.lieu && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.lieu}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="contact_nom"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Nom du contact
                            </label>

                            <input
                                id="contact_nom"
                                type="text"
                                value={data.contact_nom}
                                onChange={(event) =>
                                    setData('contact_nom', event.target.value)
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Nom de la personne à contacter"
                            />

                            {errors.contact_nom && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.contact_nom}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="contact_telephone"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Téléphone du contact
                            </label>

                            <input
                                id="contact_telephone"
                                type="text"
                                value={data.contact_telephone}
                                onChange={(event) =>
                                    setData(
                                        'contact_telephone',
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Exemple : 0612345678"
                            />

                            {errors.contact_telephone && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.contact_telephone}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">
                        <Link
                            href={route('client.interventions.index')}
                            className="inline-flex justify-center rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing
                                ? 'Enregistrement...'
                                : 'Envoyer la demande'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => <ClientLayout>{page}</ClientLayout>;