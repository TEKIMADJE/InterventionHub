import ManagerLayout from "@/Layouts/ManagerLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({
    intervention,
    technicians,
    priorities,
    statuses,
}) {
    const { data, setData, put, processing, errors } = useForm({
        technician_id: intervention.technician_id || "",
        priority_id: intervention.priority_id,
        status_id: intervention.status_id,
    });

    function submit(e) {
        e.preventDefault();

        put(route("manager.interventions.update", intervention.id));
    }

    return (
        <>
            <Head title="Modifier une intervention" />

            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    Gestion de l'intervention
                </h1>

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="grid grid-cols-2 gap-4 mb-8">

                        <div>
                            <label className="font-semibold">Référence</label>
                            <p>{intervention.reference}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Client</label>
                            <p>{intervention.client?.name}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Titre</label>
                            <p>{intervention.titre}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Catégorie</label>
                            <p>{intervention.category?.nom}</p>
                        </div>

                    </div>

                    <form onSubmit={submit} className="space-y-6">

                        <div>
                            <label className="block font-semibold mb-2">
                                Technicien
                            </label>

                            <select
                                className="w-full border rounded-lg p-3"
                                value={data.technician_id}
                                onChange={(e) =>
                                    setData("technician_id", e.target.value)
                                }
                            >
                                <option value="">Non affecté</option>

                                {technicians.map((tech) => (
                                    <option key={tech.id} value={tech.id}>
                                        {tech.name}
                                    </option>
                                ))}
                            </select>

                            {errors.technician_id && (
                                <p className="text-red-500">
                                    {errors.technician_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Priorité
                            </label>

                            <select
                                className="w-full border rounded-lg p-3"
                                value={data.priority_id}
                                onChange={(e) =>
                                    setData("priority_id", e.target.value)
                                }
                            >
                                {priorities.map((priority) => (
                                    <option key={priority.id} value={priority.id}>
                                        {priority.nom}
                                    </option>
                                ))}
                            </select>

                            {errors.priority_id && (
                                <p className="text-red-500">
                                    {errors.priority_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Statut
                            </label>

                            <select
                                className="w-full border rounded-lg p-3"
                                value={data.status_id}
                                onChange={(e) =>
                                    setData("status_id", e.target.value)
                                }
                            >
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.nom}
                                    </option>
                                ))}
                            </select>

                            {errors.status_id && (
                                <p className="text-red-500">
                                    {errors.status_id}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            Enregistrer les modifications
                        </button>

                    </form>

                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <ManagerLayout>{page}</ManagerLayout>
);