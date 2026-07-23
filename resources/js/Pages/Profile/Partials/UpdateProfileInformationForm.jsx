import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        _method: 'patch',
        name: user.name ?? '',
        email: user.email ?? '',
        telephone: user.telephone ?? '',
        adresse: user.adresse ?? '',
        specialite: user.specialite ?? '',
        bio: user.bio ?? '',
        photo: null,
    });

    function submit(e) {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
    <section className={className}>
        <header>
            <h2 className="text-xl font-semibold text-gray-900">
                Informations du profil
            </h2>

            <p className="mt-1 text-sm text-gray-600">
                Modifiez vos informations personnelles et votre
                photo de profil.
            </p>
        </header>

        <form
            onSubmit={submit}
            className="mt-6"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Photo sur toute la largeur */}
                <div className="md:col-span-2">
                    <InputLabel value="Photo de profil" />

                    <div className="mt-2 flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
                        {user.photo ? (
                            <img
                                src={`/storage/${user.photo}`}
                                alt={user.name}
                                className="h-20 w-20 rounded-full border-2 border-white object-cover shadow"
                            />
                        ) : (
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                                {user.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}

                        <div className="flex-1">
                            <input
                                id="photo"
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={(e) =>
                                    setData(
                                        'photo',
                                        e.target.files[0] ??
                                            null
                                    )
                                }
                                className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Formats acceptés : JPG, PNG ou
                                WEBP — 2 Mo maximum.
                            </p>

                            <InputError
                                className="mt-2"
                                message={errors.photo}
                            />
                        </div>
                    </div>
                </div>

                {/* Ligne 1 : nom et téléphone */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nom complet"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) =>
                            setData(
                                'name',
                                e.target.value
                            )
                        }
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.name}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="telephone"
                        value="Téléphone"
                    />

                    <TextInput
                        id="telephone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.telephone}
                        onChange={(e) =>
                            setData(
                                'telephone',
                                e.target.value
                            )
                        }
                        placeholder="+212 6 00 00 00 00"
                        autoComplete="tel"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.telephone}
                    />
                </div>

                {/* Ligne 2 : email et spécialité */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Adresse e-mail"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) =>
                            setData(
                                'email',
                                e.target.value
                            )
                        }
                        required
                        autoComplete="email"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.email}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="specialite"
                        value="Profession ou spécialité"
                    />

                    <TextInput
                        id="specialite"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.specialite}
                        onChange={(e) =>
                            setData(
                                'specialite',
                                e.target.value
                            )
                        }
                        placeholder="Exemple : Technicien réseau"
                        maxLength="255"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.specialite}
                    />
                </div>

                {/* Ligne 3 : adresse et présentation */}
                <div>
                    <InputLabel
                        htmlFor="adresse"
                        value="Adresse"
                    />

                    <textarea
                        id="adresse"
                        value={data.adresse}
                        onChange={(e) =>
                            setData(
                                'adresse',
                                e.target.value
                            )
                        }
                        rows="6"
                        maxLength="255"
                        placeholder="Votre adresse complète"
                        className="mt-1 block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />

                    <div className="mt-1 flex justify-between gap-4">
                        <InputError
                            message={errors.adresse}
                        />

                        <p className="ml-auto text-xs text-gray-500">
                            {data.adresse.length}/255
                        </p>
                    </div>
                </div>

                <div>
                    <InputLabel
                        htmlFor="bio"
                        value="Présentation"
                    />

                    <textarea
                        id="bio"
                        value={data.bio}
                        onChange={(e) =>
                            setData(
                                'bio',
                                e.target.value
                            )
                        }
                        rows="6"
                        maxLength="1000"
                        placeholder="Présentez brièvement votre expérience ou votre activité..."
                        className="mt-1 block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />

                    <div className="mt-1 flex justify-between gap-4">
                        <InputError
                            message={errors.bio}
                        />

                        <p className="ml-auto text-xs text-gray-500">
                            {data.bio.length}/1000
                        </p>
                    </div>
                </div>

                {/* Vérification email */}
                {mustVerifyEmail &&
                    user.email_verified_at === null && (
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 md:col-span-2">
                            <p className="text-sm text-yellow-800">
                                Votre adresse e-mail n’est pas
                                vérifiée.

                                <Link
                                    href={route(
                                        'verification.send'
                                    )}
                                    method="post"
                                    as="button"
                                    className="ml-1 font-semibold underline"
                                >
                                    Renvoyer l’e-mail de
                                    vérification
                                </Link>
                            </p>

                            {status ===
                                'verification-link-sent' && (
                                <p className="mt-2 text-sm font-medium text-green-600">
                                    Un nouveau lien de vérification
                                    a été envoyé.
                                </p>
                            )}
                        </div>
                    )}
            </div>

            {/* Bouton en bas */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm font-medium text-green-600">
                        Profil enregistré.
                    </p>
                </Transition>

                <PrimaryButton disabled={processing}>
                    {processing
                        ? 'Enregistrement...'
                        : 'Enregistrer les modifications'}
                </PrimaryButton>
            </div>
        </form>
    </section>
);
}