import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ stats }) {

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard Administrateur
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-gray-500">Utilisateurs</h2>
                    <p className="text-4xl font-bold">{stats.users}</p>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-gray-500">Techniciens</h2>
                    <p className="text-4xl font-bold">{stats.technicians}</p>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-gray-500">Interventions</h2>
                    <p className="text-4xl font-bold">{stats.interventions}</p>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-gray-500">En attente</h2>
                    <p className="text-4xl font-bold">{stats.pending}</p>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-gray-500">Terminées</h2>
                    <p className="text-4xl font-bold">{stats.completed}</p>
                </div>

            </div>

        </AdminLayout>

    );
}