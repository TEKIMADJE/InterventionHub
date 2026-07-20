import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {

    return (
        <div className="flex min-h-screen bg-gray-100">


            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-5">

                <h2 className="text-2xl font-bold mb-8">
                    InterventionHub
                </h2>


                <nav className="space-y-3">


                    <Link
                        href="/admin/dashboard"
                        className="block hover:bg-gray-700 p-2 rounded"
                    >
                        Dashboard
                    </Link>


                    <Link
                        href="/admin/users"
                        className="block hover:bg-gray-700 p-2 rounded"
                    >
                        Utilisateurs
                    </Link>


                    <Link
                        href="/admin/interventions"
                        className="block hover:bg-gray-700 p-2 rounded"
                    >
                        Interventions
                    </Link>


                </nav>


            </aside>



            {/* Contenu */}
            <main className="flex-1 p-6">

                {children}

            </main>


        </div>
    );
}