import { Link, usePage } from '@inertiajs/react';


export default function ClientLayout({ children }) {
    const { auth } = usePage().props;
    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-gray-900 text-white p-6">

                
            <p className="text-gray-300">
                Bienvenue, {auth.user.name}
            </p>

                <nav className="space-y-3">

                    <Link
                        href={route('client.dashboard')}
                        className="block hover:text-blue-300"
                    >
                        Tableau de bord
                    </Link>

                    <Link
                        href={route('client.interventions.index')}
                        className="block hover:text-blue-300"
                    >
                        Mes interventions
                    </Link>

                    <Link
                        href={route('client.interventions.create')}
                        className="block hover:text-blue-300"
                    >
                        Nouvelle demande
                    </Link>

                </nav>
                 <div className="mt-8 border-t border-gray-700 pt-5">
                    <p className="text-sm text-gray-400">
                        Contact de l’entreprise
                    </p>

                    <p className="mt-2 font-semibold">
                        {company?.name}
                    </p>

                    <a
                        href={`tel:${company?.phone}`}
                        className="block mt-1 text-sm text-blue-300"
                    >
                        {company?.phone}
                    </a>

                    <a
                        href={`mailto:${company?.email}`}
                        className="block mt-1 text-sm text-blue-300"
                    >
                        {company?.email}
                    </a>

                    <p className="mt-1 text-sm text-gray-300">
                        {company?.address}
                    </p>
                </div>

            </aside>

            <main className="flex-1 p-6">
                {children}
            </main>

        </div>
    );
}