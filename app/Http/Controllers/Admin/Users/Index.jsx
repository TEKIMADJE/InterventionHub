import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ users }) {

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Gestion des utilisateurs
            </h1>

            <table className="min-w-full bg-white shadow rounded">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="p-3 text-left">Nom</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Rôle</th>

                    </tr>

                </thead>

                <tbody>

                    {users.data.map((user) => (

                        <tr key={user.id} className="border-b">

                            <td className="p-3">{user.name}</td>

                            <td className="p-3">{user.email}</td>

                            <td className="p-3">

                                {user.role?.nom}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </AdminLayout>

    );

}