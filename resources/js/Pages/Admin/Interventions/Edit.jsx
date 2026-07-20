import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';


function Edit({
    intervention,
    clients,
    technicians,
    categories,
    priorities,
    statuses
}) {


    const { data, setData, put, processing, errors } = useForm({

        titre: intervention.titre ?? '',

        description: intervention.description ?? '',

        client_id: intervention.client_id ?? '',

        technician_id: intervention.technician_id ?? '',

        category_id: intervention.category_id ?? '',

        priority_id: intervention.priority_id ?? '',

        status_id: intervention.status_id ?? '',

    });



    const submit = (e) => {

        e.preventDefault();

        put(`/admin/interventions/${intervention.id}`);

    };



    return (

        <>

            <Head title="Modifier intervention" />


            <div className="p-6 max-w-4xl mx-auto">


                <div className="bg-white rounded-xl shadow p-8">


                    <h1 className="text-3xl font-bold mb-2">
                        Modifier l'intervention
                    </h1>


                    <p className="text-gray-500 mb-6">
                        Mise à jour des informations de l'intervention
                    </p>




                    <form
                        onSubmit={submit}
                        className="space-y-4"
                    >



                        {/* Titre */}

                        <div>

                            <label className="block font-medium mb-1">
                                Titre
                            </label>


                            <input

                                type="text"

                                className="border rounded-lg w-full p-3"

                                value={data.titre}

                                onChange={e =>
                                    setData(
                                        'titre',
                                        e.target.value
                                    )
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

                            <label className="block font-medium mb-1">
                                Description
                            </label>


                            <textarea

                                className="border rounded-lg w-full p-3"

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

                            <label className="block font-medium mb-1">
                                Client
                            </label>


                            <select

                                className="border rounded-lg w-full p-3"

                                value={data.client_id}

                                onChange={e =>
                                    setData(
                                        'client_id',
                                        e.target.value
                                    )
                                }

                            >

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





                        {/* Technicien */}

                        <div>

                            <label className="block font-medium mb-1">
                                Technicien
                            </label>


                            <select

                                className="border rounded-lg w-full p-3"

                                value={data.technician_id}

                                onChange={e =>
                                    setData(
                                        'technician_id',
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">
                                    Aucun technicien
                                </option>


                                {technicians.map(technician => (

                                    <option
                                        key={technician.id}
                                        value={technician.id}
                                    >
                                        {technician.name}
                                    </option>

                                ))}


                            </select>


                        </div>






                        {/* Catégorie */}

                        <div>

                            <label className="block font-medium mb-1">
                                Catégorie
                            </label>


                            <select

                                className="border rounded-lg w-full p-3"

                                value={data.category_id}

                                onChange={e =>
                                    setData(
                                        'category_id',
                                        e.target.value
                                    )
                                }

                            >

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

                            <label className="block font-medium mb-1">
                                Priorité
                            </label>


                            <select

                                className="border rounded-lg w-full p-3"

                                value={data.priority_id}

                                onChange={e =>
                                    setData(
                                        'priority_id',
                                        e.target.value
                                    )
                                }

                            >

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

                            <label className="block font-medium mb-1">
                                Statut
                            </label>


                            <select

                                className="border rounded-lg w-full p-3"

                                value={data.status_id}

                                onChange={e =>
                                    setData(
                                        'status_id',
                                        e.target.value
                                    )
                                }

                            >

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
                            "

                        >

                            {processing
                                ? "Modification..."
                                : "Mettre à jour"
                            }


                        </button>



                    </form>


                </div>


            </div>

        </>

    );
}



Edit.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);


export default Edit;