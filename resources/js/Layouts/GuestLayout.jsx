import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950">
            <div className="grid min-h-screen lg:grid-cols-2">
                <section className="relative hidden overflow-hidden p-12 lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                    <Link
                        href="/"
                        className="relative flex items-center gap-3 text-white"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold shadow-lg shadow-blue-600/30">
                            IH
                        </div>

                        <div>
                            <p className="text-xl font-bold">
                                InterventionHub
                            </p>

                            <p className="text-xs text-slate-400">
                                Gestion des interventions
                            </p>
                        </div>
                    </Link>

                    <div className="relative max-w-xl">
                        <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                            Assistance technique centralisée
                        </span>

                        <h1 className="mt-7 text-4xl font-bold leading-tight text-white xl:text-5xl">
                            Suivez chaque intervention
                            <span className="block text-blue-500">
                                de la demande à la résolution
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            Créez vos demandes, recevez des
                            notifications et consultez leur évolution
                            depuis un espace sécurisé.
                        </p>

                        <div className="mt-9 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
                            <Feature text="Suivi en temps réel" />
                            <Feature text="Notifications automatiques" />
                            <Feature text="Documents sécurisés" />
                            <Feature text="Historique des actions" />
                        </div>
                    </div>

                    <p className="relative text-sm text-slate-500">
                        © {new Date().getFullYear()}{' '}
                        InterventionHub
                    </p>
                </section>

                <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-8 flex items-center justify-center gap-3 lg:hidden"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                IH
                            </div>

                            <p className="text-xl font-bold text-slate-900">
                                InterventionHub
                            </p>
                        </Link>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
                            {children}
                        </div>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            <Link
                                href="/"
                                className="font-medium text-blue-600 hover:text-blue-700"
                            >
                                ← Retour à l’accueil
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

function Feature({ text }) {
    return (
        <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-300">
                ✓
            </span>

            <span>{text}</span>
        </div>
    );
}