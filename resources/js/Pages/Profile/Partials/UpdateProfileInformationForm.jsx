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
                <h2 className="text-lg font-semibold text-gray-900">
                    Informations du profil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Modifiez vos informations personnelles et votre
                    photo de profil.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
            >
                {/* Photo actuelle */}
                <div>
                    <InputLabel value="Photo de profil" />

                    <div className="mt-2 flex items-center gap-4">
                        {user.photo ? (
                            <img
                                src={`/storage/${user.photo}`}
                                alt={user.name}
                                className="h-20 w-20 rounded-full border object-cover"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
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
                                        e.target.files[0] ?? null
                                    )
                                }
                                className="block w-full rounded-lg border border-gray-300 p-2"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                                JPG, PNG ou WEBP — 2 Mo maximum.
                            </p>
                        </div>
                    </div>

                    <InputError
                        className="mt-2"
                        message={errors.photo}
                    />
                </div>

                {/* Nom */}
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
                            setData('name', e.target.value)
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

                {/* Email */}
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
                            setData('email', e.target.value)
                        }
                        required
                        autoComplete="email"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.email}
                    />
                </div>

                {/* Téléphone */}
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

                {/* Adresse */}
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
                        rows="3"
                        maxLength="255"
                        placeholder="Votre adresse"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.adresse}
                    />
                </div>

                {mustVerifyEmail &&
                    user.email_verified_at === null && (
                        <div>
                            <p className="text-sm text-gray-800">
                                Votre adresse e-mail n’est pas vérifiée.

                                <Link
                                    href={route(
                                        'verification.send'
                                    )}
                                    method="post"
                                    as="button"
                                    className="ml-1 underline"
                                >
                                    Renvoyer l’e-mail de vérification
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {processing
                            ? 'Enregistrement...'
                            : 'Enregistrer'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">
                            Profil enregistré.
                        </p>
                    </Transition>
                </div>
                {/* Spécialité */}
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

                {/* Présentation */}
                <div>
                    <InputLabel
                        htmlFor="bio"
                        value="Présentation"
                    />

                        <textarea
                            id="bio"
                            value={data.bio}
                            onChange={(e) =>
                                setData('bio', e.target.value)
                            }
                            rows="5"
                            maxLength="1000"
                            placeholder="Présentez brièvement votre expérience ou votre activité..."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />

                <div className="mt-1 flex justify-between">
                    <InputError
                        message={errors.bio}
                    />

                        <p className="text-xs text-gray-500">
                            {data.bio.length}/1000
                        </p>
                </div>
            </div>
            </form>
        </section>
    );
}