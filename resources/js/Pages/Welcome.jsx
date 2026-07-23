import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    canLogin,
    canRegister,
    dashboardUrl,
}) {
    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen bg-slate-950 text-white">
                <header className="border-b border-white/10">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold shadow-lg shadow-blue-600/30">
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

                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                dashboardUrl && (
                                    <a
                                        href={dashboardUrl}
                                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
                                    >
                                        Mon espace
                                    </a>
                                )
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:block"
                                        >
                                            Se connecter
                                        </Link>
                                    )}

                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                                        >
                                            Créer un compte
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    <section className="relative overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

                        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                            <div>
                                <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                                    Assistance technique centralisée
                                </span>

                                <h1 className="mt-7 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                                    Gérez vos interventions
                                    <span className="block text-blue-500">
                                        simplement et efficacement
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                                    InterventionHub centralise les
                                    demandes, facilite l’affectation des
                                    techniciens et permet un suivi en
                                    temps réel jusqu’à la résolution.
                                </p>

                                <div className="mt-9 flex flex-wrap gap-4">
                                    {auth?.user && dashboardUrl ? (
                                        <a
                                            href={dashboardUrl}
                                            className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                                        >
                                            Accéder à mon espace
                                        </a>
                                    ) : (
                                        <>
                                            {canRegister && (
                                                <Link
                                                    href={route(
                                                        'register'
                                                    )}
                                                    className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                                                >
                                                    Faire une demande
                                                </Link>
                                            )}

                                            {canLogin && (
                                                <Link
                                                    href={route(
                                                        'login'
                                                    )}
                                                    className="rounded-xl border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/10"
                                                >
                                                    Se connecter
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
                                    <span>✓ Suivi en temps réel</span>
                                    <span>✓ Notifications</span>
                                    <span>✓ Documents sécurisés</span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur">
                                    <div className="rounded-2xl bg-white p-6 text-slate-900">
                                        <div className="flex items-center justify-between border-b pb-5">
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Intervention
                                                </p>

                                                <p className="mt-1 font-bold">
                                                    INT-20260723082413
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                                En cours
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <Card
                                                icon="📝"
                                                title="Demande créée"
                                                text="Le client décrit son besoin."
                                                active
                                            />

                                            <Card
                                                icon="👨‍🔧"
                                                title="Technicien affecté"
                                                text="Sarah prend en charge l’intervention."
                                                active
                                            />

                                            <Card
                                                icon="⚙️"
                                                title="Intervention en cours"
                                                text="Le traitement est suivi en temps réel."
                                                active
                                            />

                                            <Card
                                                icon="✅"
                                                title="Résolution"
                                                text="Le rapport sera transmis au client."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white py-20 text-slate-900">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="font-semibold text-blue-600">
                                    Un processus clair
                                </p>

                                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    De la demande à la résolution
                                </h2>

                                <p className="mt-4 text-slate-600">
                                    Chaque acteur dispose d’un espace
                                    adapté à ses responsabilités.
                                </p>
                            </div>

                            <div className="mt-14 grid gap-6 md:grid-cols-3">
                                <Feature
                                    number="01"
                                    title="Créez votre demande"
                                    text="Décrivez le problème, choisissez sa catégorie et sa priorité, puis ajoutez les documents nécessaires."
                                />

                                <Feature
                                    number="02"
                                    title="Suivez l’intervention"
                                    text="Un responsable affecte un technicien et chaque changement important déclenche une notification."
                                />

                                <Feature
                                    number="03"
                                    title="Recevez la solution"
                                    text="Consultez le statut, le compte rendu du technicien et les documents associés à l’intervention."
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-100 py-20 text-slate-900">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid gap-8 lg:grid-cols-3">
                                <Role
                                    icon="🏢"
                                    title="Espace Client"
                                    text="Créer des demandes, suivre leur évolution, consulter les rapports et recevoir des notifications."
                                />

                                <Role
                                    icon="🛠️"
                                    title="Espace Technicien"
                                    text="Consulter les missions affectées, modifier leur statut et rédiger un compte rendu."
                                />

                                <Role
                                    icon="📊"
                                    title="Espace Responsable"
                                    text="Organiser les interventions, affecter les techniciens et suivre toute l’activité."
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-600 py-16">
                        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center lg:flex-row lg:px-8 lg:text-left">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    Besoin d’une intervention ?
                                </h2>

                                <p className="mt-2 text-blue-100">
                                    Créez votre demande et suivez sa prise
                                    en charge depuis votre espace.
                                </p>
                            </div>

                            {!auth?.user && canRegister && (
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Commencer maintenant
                                </Link>
                            )}
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/10">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row lg:px-8">
                        <p>
                            © {new Date().getFullYear()}{' '}
                            InterventionHub. Tous droits réservés.
                        </p>

                        <p>
                            Gestion moderne des interventions
                            techniques
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function Card({ icon, title, text, active = false }) {
    return (
        <div
            className={`flex gap-4 rounded-xl border p-4 ${
                active
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-slate-200 bg-slate-50'
            }`}
        >
            <div className="text-xl">{icon}</div>

            <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-500">
                    {text}
                </p>
            </div>
        </div>
    );
}

function Feature({ number, title, text }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-sm font-bold text-blue-600">
                ÉTAPE {number}
            </span>

            <h3 className="mt-4 text-xl font-bold">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
                {text}
            </p>
        </article>
    );
}

function Role({ icon, title, text }) {
    return (
        <article className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="text-4xl">{icon}</div>

            <h3 className="mt-5 text-xl font-bold">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
                {text}
            </p>
        </article>
    );
}