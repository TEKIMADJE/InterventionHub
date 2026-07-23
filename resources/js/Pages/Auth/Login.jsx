import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}) {
    const [showPassword, setShowPassword] =
        useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    }

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600">
                    Bienvenue
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Connectez-vous
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Accédez à votre espace InterventionHub.
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold text-slate-700"
                    >
                        Adresse e-mail
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        autoComplete="username"
                        autoFocus
                        required
                        placeholder="vous@exemple.com"
                        className="mt-2 w-full rounded-xl border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />

                    <InputError
                        message={errors.email}
                        className="mt-2"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Mot de passe
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route(
                                    'password.request'
                                )}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <div className="relative mt-2">
                        <input
                            id="password"
                            type={
                                showPassword
                                    ? 'text'
                                    : 'password'
                            }
                            value={data.password}
                            onChange={(e) =>
                                setData(
                                    'password',
                                    e.target.value
                                )
                            }
                            autoComplete="current-password"
                            required
                            placeholder="Votre mot de passe"
                            className="w-full rounded-xl border-slate-300 px-4 py-3 pr-20 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute inset-y-0 right-4 text-sm font-medium text-slate-500 hover:text-blue-600"
                        >
                            {showPassword
                                ? 'Masquer'
                                : 'Afficher'}
                        </button>
                    </div>

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) =>
                            setData(
                                'remember',
                                e.target.checked
                            )
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    Se souvenir de moi
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing
                        ? 'Connexion...'
                        : 'Se connecter'}
                </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
                Vous n’avez pas encore de compte ?{' '}

                <Link
                    href={route('register')}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Créer un compte
                </Link>
            </p>
        </GuestLayout>
    );
}