import { Link } from '@inertiajs/react';

export default function TechnicianLayout({ children }) {

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">

                <div className="p-6 border-b">

                    <h1 className="text-xl font-bold">
                        InterventionHub
                    </h1>

                    <p className="text-sm text-gray-500">
                        Espace Technicien
                    </p>

                </div>


                <nav className="p-4 space-y-2">

                    <Link
                        href={route('technician.dashboard')}
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                        📊 Dashboard
                    </Link>


                    <Link
                        href={route('technician.interventions.index')}
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                        🛠️ Mes Interventions
                    </Link>


                </nav>

            </aside>



            {/* Contenu principal */}
            <main className="flex-1">

                <div className="p-6">
                    {children}
                </div>

            </main>


        </div>
    );
}