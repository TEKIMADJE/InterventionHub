import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function NotificationDropdown({
    readRouteName,
}) {
    const { auth } = usePage().props;

    const [open, setOpen] = useState(false);

    const notifications = auth?.notifications ?? [];
    const unreadCount =
        auth?.unreadNotificationsCount ?? 0;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative rounded-full p-2 text-2xl hover:bg-gray-100"
                aria-label="Afficher les notifications"
            >
                🔔

                {unreadCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-96 overflow-hidden rounded-xl border bg-white shadow-xl">
                    <div className="border-b px-4 py-3">
                        <h2 className="font-bold">
                            Notifications
                        </h2>

                        <p className="text-xs text-gray-500">
                            {unreadCount} notification(s)
                            non lue(s)
                        </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="p-6 text-center text-sm text-gray-500">
                                Aucune notification
                            </p>
                        ) : (
                            notifications.map(
                                (notification) => (
                                    <Link
                                        key={notification.id}
                                        href={route(
                                            readRouteName,
                                            notification.id
                                        )}
                                        method="patch"
                                        as="button"
                                        className={`block w-full border-b p-4 text-left hover:bg-gray-50 ${
                                            notification.read_at
                                                ? 'bg-white'
                                                : 'bg-blue-50'
                                        }`}
                                    >
                                        <p className="font-semibold text-gray-900">
                                            {notification
                                                .data
                                                ?.title ??
                                                'Nouvelle notification'}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            {notification
                                                .data
                                                ?.message ??
                                                'Une intervention a été mise à jour.'}
                                        </p>

                                        {!notification.read_at && (
                                            <span className="mt-2 inline-block text-xs font-semibold text-blue-600">
                                                Non lue
                                            </span>
                                        )}
                                    </Link>
                                )
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}