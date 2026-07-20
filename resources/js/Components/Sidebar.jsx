import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white">

            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                InterventionHub
            </div>

            <nav className="mt-6">

                <Link
                    href="/admin/dashboard"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Dashboard
                </Link>

                <Link
                    href="/admin/users"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Utilisateurs
                </Link>

                <Link
                    href="/admin/categories"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Catégories
                </Link>

                <Link
                    href="/admin/statuses"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Statuts
                </Link>

                <Link
                    href="/admin/priorities"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Priorités
                </Link>

                <Link
                    href="/admin/interventions"
                    className="block px-6 py-3 hover:bg-gray-700"
                >
                    Interventions
                </Link>

            </nav>

        </aside>
    );
}