import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

function Create({
    clients,
    categories,
    priorities,
    statuses
}) {

    const { data, setData, post, processing, errors } = useForm({

        titre: '',
        description: '',
        client_id: '',
        category_id: '',
        priority_id: '',
        status_id: '',

    });


    const submit = (e) => {

        e.preventDefault();

        post('/admin/interventions');

    };


    return (
    <>
            <Head title="Créer une intervention" />

            <div className="p-6 max-w-4xl mx-auto">

               <div className="bg-white rounded-xl shadow p-8">

    <h1 className="text-3xl font-bold mb-2">
        Nouvelle intervention
    </h1>

    <p className="text-gray-500 mb-6">
        Créer une nouvelle demande d'intervention technique
    </p>

                <form onSubmit={submit}
                    className="space-y-4">


                    {/* Titre */}
                    <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre
                    </label>

                        <input
                            type="text"
                            className="border 
                                        rounded-lg 
                                        w-full 
                                        p-3 
                                        focus:ring-2 
                                        focus:ring-blue-500
                                    "
                            value={data.titre}
                            onChange={e =>
                                setData('titre', e.target.value)
                            }
                        />

                        {errors.titre &&
                            <p className="text-red-500">
                                {errors.titre}
                            </p>
                        }

                    </div>



                    {/* Description */}
                    <div>

                        <label>
                            Description
                        </label>

                        <textarea

                            className="border rounded w-full p-2"

                            value={data.description}

                            onChange={e =>
                                setData(
                                    'description',
                                    e.target.value
                                )
                            }

                        />

                    </div>




                    {/* Client */}
                    <div>

                        <label>
                            Client
                        </label>


                        <select

                            className="border rounded w-full p-2"

                            value={data.client_id}

                            onChange={e =>
                                setData(
                                    'client_id',
                                    e.target.value
                                )
                            }

                        >

                            <option value="">
                                Choisir un client
                            </option>


                            {clients.map(client => (

                                <option
                                    key={client.id}
                                    value={client.id}
                                >

                                    {client.name}

                                </option>

                            ))}


                        </select>

                    </div>





                    {/* Catégorie */}
                    <div>

                        <label>
                            Catégorie
                        </label>


                        <select

                            className="border rounded w-full p-2"

                            value={data.category_id}

                            onChange={e =>
                                setData(
                                    'category_id',
                                    e.target.value
                                )
                            }

                        >

                            <option value="">
                                Choisir une catégorie
                            </option>


                            {categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.nom}
                                </option>

                            ))}


                        </select>

                    </div>





                    {/* Priorité */}
                    <div>

                        <label>
                            Priorité
                        </label>


                        <select

                            className="border rounded w-full p-2"

                            value={data.priority_id}

                            onChange={e =>
                                setData(
                                    'priority_id',
                                    e.target.value
                                )
                            }

                        >

                            <option value="">
                                Choisir une priorité
                            </option>


                            {priorities.map(priority => (

                                <option
                                    key={priority.id}
                                    value={priority.id}
                                >
                                    {priority.nom}
                                </option>

                            ))}


                        </select>

                    </div>





                    {/* Statut */}
                    <div>

                        <label>
                            Statut
                        </label>


                        <select

                            className="border rounded w-full p-2"

                            value={data.status_id}

                            onChange={e =>
                                setData(
                                    'status_id',
                                    e.target.value
                                )
                            }

                        >

                            <option value="">
                                Choisir un statut
                            </option>


                            {statuses.map(status => (

                                <option
                                    key={status.id}
                                    value={status.id}
                                >
                                    {status.nom}
                                </option>

                            ))}


                        </select>

                    </div>




                    <button

                        disabled={processing}

                        className="
bg-blue-600 
hover:bg-blue-700 
text-white 
px-6 
py-3 
rounded-lg 
shadow
transition
"

                    >

                        {processing
                            ? 'Enregistrement...'
                            : 'Créer intervention'
                        }

                    </button>


                </form>
                </div>
            </div>
    </>
   );
}
Create.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Create;