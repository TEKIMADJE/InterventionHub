import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

function Index({ users }) {
    return (
        <>
            <Head title="Gestion des utilisateurs" />

            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">
                    Gestion des utilisateurs
                </h1>

                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Nom</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Rôle</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">
                                    {user.role?.nom}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
Index.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Index;