import { Link } from '@inertiajs/react';

export default function ManagerLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white">

                <div className="p-6 border-b border-slate-700">

                    <h1 className="text-2xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="text-sm text-slate-400 mt-1">
                        Responsable Technique
                    </p>

                </div>

                <nav className="p-4 space-y-2">

                    <Link
                        href="/manager/dashboard"
                        className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        href="/manager/interventions"
                        className="block px-4 py-3 rounded-lg hover:bg-slate-800"
                    >
                        🛠 Interventions
                    </Link>

                    <Link
                        href="/profile"
                        className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                    >
                        👤 Mon profil
                    </Link>

                </nav>

            </aside>

            {/* Contenu */}
            <main className="flex-1 p-8">

                {children}

            </main>

        </div>
    );
}