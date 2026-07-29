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
                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
                    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/"
                            className="shrink-0 rounded-xl bg-white px-2 py-1.5 shadow-lg"
                        >
                            <img
                                src="/images/InterventionHub-logo.svg"
                                alt="InterventionHub"
                                className="h-10 w-auto max-w-[190px]"
                            />
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-3">
                            {auth?.user ? (
                                dashboardUrl && (
                                    <Link
                                        href={dashboardUrl}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 sm:px-5"
                                    >
                                        <i className="fa-solid fa-arrow-right-to-bracket"></i>

                                        <span className="hidden sm:inline">
                                            Mon espace
                                        </span>
                                    </Link>
                                )
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route(
                                                'login'
                                            )}
                                            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:px-5"
                                        >
                                            Connexion
                                        </Link>
                                    )}

                                    {canRegister && (
                                        <Link
                                            href={route(
                                                'register'
                                            )}
                                            className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 sm:px-5"
                                        >
                                            <span className="hidden sm:inline">
                                                Créer un compte
                                            </span>

                                            <span className="sm:hidden">
                                                S’inscrire
                                            </span>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    {/* Hero */}
                    <section className="relative overflow-hidden">
                        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>

                        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl"></div>

                        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
                            {/* Texte */}
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                    Assistance technique centralisée
                                </span>

                                <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    Vos interventions techniques,
                                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                        maîtrisées de bout en bout.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                                    InterventionHub centralise les
                                    demandes, facilite l’affectation
                                    des techniciens et permet un
                                    suivi clair jusqu’à la résolution.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    {auth?.user &&
                                    dashboardUrl ? (
                                        <Link
                                            href={dashboardUrl}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                                        >
                                            Accéder à mon espace
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    ) : (
                                        <>
                                            {canRegister && (
                                                <Link
                                                    href={route(
                                                        'register'
                                                    )}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                                                >
                                                    <i className="fa-solid fa-file-circle-plus"></i>
                                                    Faire une demande
                                                </Link>
                                            )}

                                            {canLogin && (
                                                <Link
                                                    href={route(
                                                        'login'
                                                    )}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold transition hover:bg-white/10"
                                                >
                                                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                                    Se connecter
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-9 grid max-w-xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
                                    <Benefit text="Suivi en temps réel" />
                                    <Benefit text="Notifications" />
                                    <Benefit text="Fichiers sécurisés" />
                                </div>
                            </div>

                            {/* Aperçu de l’application */}
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-xl"></div>

                                <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur sm:p-5">
                                    <div className="overflow-hidden rounded-2xl bg-white text-slate-900">
                                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                                    <i className="fa-solid fa-screwdriver-wrench"></i>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-500">
                                                        Intervention
                                                    </p>

                                                    <p className="font-bold">
                                                        INT-2026-001
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                En cours
                                            </span>
                                        </div>

                                        <div className="p-5">
                                            <div className="mb-5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        Maintenance
                                                        informatique
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Progression de
                                                        l’intervention
                                                    </p>
                                                </div>

                                                <span className="text-sm font-bold text-blue-600">
                                                    75 %
                                                </span>
                                            </div>

                                            <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                                            </div>

                                            <div className="space-y-3">
                                                <ProcessCard
                                                    icon="fa-solid fa-file-circle-check"
                                                    title="Demande créée"
                                                    text="Le besoin est enregistré."
                                                    active
                                                />

                                                <ProcessCard
                                                    icon="fa-solid fa-user-gear"
                                                    title="Technicien affecté"
                                                    text="La mission est attribuée."
                                                    active
                                                />

                                                <ProcessCard
                                                    icon="fa-solid fa-gears"
                                                    title="Traitement en cours"
                                                    text="Le suivi est actualisé."
                                                    active
                                                />

                                                <ProcessCard
                                                    icon="fa-solid fa-circle-check"
                                                    title="Résolution"
                                                    text="Le compte rendu sera transmis."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fonctionnement */}
                    <section className="bg-white py-16 text-slate-900 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <SectionTitle
                                label="Un processus clair"
                                title="De la demande à la résolution"
                                text="Chaque étape est centralisée pour garantir un traitement rapide et transparent."
                            />

                            <div className="mt-12 grid gap-6 md:grid-cols-3">
                                <Feature
                                    icon="fa-solid fa-file-pen"
                                    number="01"
                                    title="Créez votre demande"
                                    text="Décrivez le problème, indiquez sa catégorie, sa priorité et les coordonnées du contact."
                                />

                                <Feature
                                    icon="fa-solid fa-route"
                                    number="02"
                                    title="Suivez l’intervention"
                                    text="Recevez les changements de statut, les commentaires et les notifications importantes."
                                />

                                <Feature
                                    icon="fa-solid fa-clipboard-check"
                                    number="03"
                                    title="Consultez la solution"
                                    text="Retrouvez le compte rendu du technicien, les documents et l’historique complet."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Espaces */}
                    <section className="bg-slate-100 py-16 text-slate-900 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <SectionTitle
                                label="Une plateforme collaborative"
                                title="Un espace adapté à chaque rôle"
                                text="Chaque utilisateur dispose des outils correspondant à ses responsabilités."
                            />

                            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <Role
                                    icon="fa-solid fa-user-shield"
                                    color="bg-blue-100 text-blue-600"
                                    title="Administrateur"
                                    text="Supervise les utilisateurs et l’ensemble des interventions."
                                />

                                <Role
                                    icon="fa-solid fa-user-tie"
                                    color="bg-indigo-100 text-indigo-600"
                                    title="Responsable"
                                    text="Organise, priorise et affecte les missions techniques."
                                />

                                <Role
                                    icon="fa-solid fa-user-gear"
                                    color="bg-emerald-100 text-emerald-600"
                                    title="Technicien"
                                    text="Traite les missions et rédige les comptes rendus."
                                />

                                <Role
                                    icon="fa-solid fa-building-user"
                                    color="bg-cyan-100 text-cyan-600"
                                    title="Client"
                                    text="Crée ses demandes et suit leur évolution."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Appel à l’action */}
                    <section className="bg-gradient-to-r from-blue-700 to-indigo-700 py-14">
                        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
                            <div>
                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    Besoin d’une intervention ?
                                </h2>

                                <p className="mt-2 text-blue-100">
                                    Créez votre compte et transmettez
                                    votre première demande.
                                </p>
                            </div>

                            {!auth?.user &&
                                canRegister && (
                                    <Link
                                        href={route(
                                            'register'
                                        )}
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
                                    >
                                        Commencer maintenant
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                )}
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/10">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-7 text-center text-sm text-slate-400 sm:px-6 md:flex-row md:text-left lg:px-8">
                        <div className="rounded-lg bg-white px-2 py-1">
                            <img
                                src="/images/InterventionHub-logo.svg"
                                alt="InterventionHub"
                                className="h-8 w-auto"
                            />
                        </div>

                        <p>
                            © {new Date().getFullYear()}{' '}
                            InterventionHub. Tous droits réservés.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function Benefit({ text }) {
    return (
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-blue-400"></i>
            <span>{text}</span>
        </div>
    );
}

function ProcessCard({
    icon,
    title,
    text,
    active = false,
}) {
    return (
        <div
            className={`flex items-center gap-3 rounded-xl border p-3 ${
                active
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-slate-200 bg-slate-50'
            }`}
        >
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-200 text-slate-400'
                }`}
            >
                <i className={icon}></i>
            </div>

            <div className="min-w-0">
                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="truncate text-xs text-slate-500">
                    {text}
                </p>
            </div>
        </div>
    );
}

function SectionTitle({ label, title, text }) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-blue-600">
                {label}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {title}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
                {text}
            </p>
        </div>
    );
}

function Feature({ icon, number, title, text }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <i className={`${icon} text-lg`}></i>
                </div>

                <span className="text-sm font-bold text-blue-600">
                    ÉTAPE {number}
                </span>
            </div>

            <h3 className="mt-5 text-xl font-bold">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
                {text}
            </p>
        </article>
    );
}

function Role({ icon, color, title, text }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
            >
                <i className={`${icon} text-lg`}></i>
            </div>

            <h3 className="mt-5 text-lg font-bold">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
                {text}
            </p>
        </article>
    );
}