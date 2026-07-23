import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('register'), {
            onFinish: () =>
                reset(
                    'password',
                    'password_confirmation'
                ),
        });
    }

    return (
        <GuestLayout>
            <Head title="Créer un compte" />

            <div className="mb-7">
                <p className="text-sm font-semibold text-blue-600">
                    Espace Client
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Créer un compte
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Inscrivez-vous pour créer et suivre vos
                    demandes d’intervention.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="space-y-4"
            >
                <Field
                    id="name"
                    label="Nom ou raison sociale"
                    value={data.name}
                    onChange={(value) =>
                        setData('name', value)
                    }
                    error={errors.name}
                    autoComplete="name"
                    placeholder="Votre nom ou entreprise"
                />

                <Field
                    id="email"
                    label="Adresse e-mail"
                    type="email"
                    value={data.email}
                    onChange={(value) =>
                        setData('email', value)
                    }
                    error={errors.email}
                    autoComplete="username"
                    placeholder="vous@exemple.com"
                />

                <PasswordField
                    id="password"
                    label="Mot de passe"
                    value={data.password}
                    onChange={(value) =>
                        setData('password', value)
                    }
                    error={errors.password}
                    show={showPassword}
                    toggle={() =>
                        setShowPassword(!showPassword)
                    }
                    autoComplete="new-password"
                />

                <PasswordField
                    id="password_confirmation"
                    label="Confirmer le mot de passe"
                    value={data.password_confirmation}
                    onChange={(value) =>
                        setData(
                            'password_confirmation',
                            value
                        )
                    }
                    error={
                        errors.password_confirmation
                    }
                    show={showPassword}
                    toggle={() =>
                        setShowPassword(!showPassword)
                    }
                    autoComplete="new-password"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing
                        ? 'Création...'
                        : 'Créer mon compte'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Vous avez déjà un compte ?{' '}

                <Link
                    href={route('login')}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Se connecter
                </Link>
            </p>
        </GuestLayout>
    );
}

function Field({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    autoComplete,
    placeholder,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                autoComplete={autoComplete}
                required
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            <InputError
                message={error}
                className="mt-2"
            />
        </div>
    );
}

function PasswordField({
    id,
    label,
    value,
    onChange,
    error,
    show,
    toggle,
    autoComplete,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <div className="relative mt-2">
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    autoComplete={autoComplete}
                    required
                    placeholder="8 caractères minimum"
                    className="w-full rounded-xl border-slate-300 px-4 py-3 pr-20 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute inset-y-0 right-4 text-sm font-medium text-slate-500 hover:text-blue-600"
                >
                    {show ? 'Masquer' : 'Afficher'}
                </button>
            </div>

            <InputError
                message={error}
                className="mt-2"
            />
        </div>
    );
}