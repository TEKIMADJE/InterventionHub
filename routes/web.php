<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CommentController;

use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\InterventionController;
use App\Http\Controllers\InterventionAttachmentController;

use App\Http\Controllers\Manager\DashboardController as ManagerDashboardController;
use App\Http\Controllers\Technician\DashboardController as TechnicianDashboardController;
use App\Http\Controllers\Technician\InterventionController as TechnicianInterventionController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\Client\InterventionController as ClientInterventionController;
use App\Http\Controllers\Manager\InterventionController as ManagerInterventionController;

Route::get('/', function () {
    $user = request()->user();

    if ($user) {
        $user->loadMissing('role');
    }

    $dashboardUrl = match ($user?->role?->nom) {
        'Administrateur' => route('admin.dashboard'),
        'Responsable technique' => route('manager.dashboard'),
        'Technicien' => route('technician.dashboard'),
        'Client' => route('client.dashboard'),
        default => null,
    };

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'dashboardUrl' => $dashboardUrl,
    ]);
})->name('home');


Route::get('/dashboard', function () {
    $user = request()->user();

    $routeName = match ($user->role?->nom) {
        'Administrateur' => 'admin.dashboard',
        'Responsable technique' => 'manager.dashboard',
        'Technicien' => 'technician.dashboard',
        'Client' => 'client.dashboard',
        default => null,
    };

    if (!$routeName) {
        abort(403, 'Aucun rôle valide attribué à cet utilisateur.');
    }

    return redirect()->route($routeName);
})->middleware('auth')->name('dashboard');

// ADMIN
Route::middleware([
    'auth',
    'verified',
    'role:Administrateur',
])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');


        Route::resource('users', UserController::class);


        Route::resource('interventions', InterventionController::class);

        Route::patch(
            '/notifications/{notification}/read',
            function (
                \Illuminate\Http\Request $request,
                string $notification
            ) {
            $notification = $request->user()
                ->notifications()
                ->findOrFail($notification);

            $url = $notification->data['url']
                ?? route('admin.dashboard');

            $notification->markAsRead();

                return redirect($url);
            }
        )->name('notifications.read');

        });



// MANAGER
Route::middleware([
    'auth',
    'verified',
    'role:Responsable technique',
])
    ->prefix('manager')
    ->name('manager.')
    ->group(function () {

        Route::get('/dashboard', [ManagerDashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource(
                'interventions',
                ManagerInterventionController::class
                )
        ->only([
            'index',
            'show',
            'edit',
            'update'
        ]);

        Route::patch(
            '/notifications/{notification}/read',
            function (
                \Illuminate\Http\Request $request,
                string $notification
            ) {
                $notification = $request->user()
                    ->notifications()
                    ->findOrFail($notification);

                $notification->markAsRead();

                return redirect(
                    $notification->data['url']
                    ?? route('manager.dashboard')
                );
            }
        )->name('notifications.read');

    });


// TECHNICIEN
Route::middleware([
    'auth',
    'verified',
    'role:Technicien',
])
    ->prefix('technician')
    ->name('technician.')
    ->group(function () {

        Route::get('/dashboard', [TechnicianDashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource(
            'interventions',
            TechnicianInterventionController::class
        )
        ->only([
            'index',
            'show',
            'update'
        ]);
        Route::patch(
            '/notifications/{notification}/read',
            function (
                \Illuminate\Http\Request $request,
                string $notification
            ) {
                $notification = $request->user()
                    ->notifications()
                    ->findOrFail($notification);

                $notification->markAsRead();

                return redirect(
                    $notification->data['url']
                        ?? route('technician.dashboard')
                );
            }
        )->name('notifications.read');

    });


// CLIENT
Route::middleware([
    'auth',
    'verified',
    'role:Client',
])
    ->prefix('client')
    ->name('client.')
    ->group(function () {

        Route::get('/dashboard', [ClientDashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('interventions', ClientInterventionController::class)
    ->only([
        'index',
        'create',
        'store',
        'show'
    ]);
        Route::patch(
            '/notifications/{notification}/read',
            function (
                \Illuminate\Http\Request $request,
                string $notification
            ) {
                $notification = $request->user()
                    ->notifications()
                    ->findOrFail($notification);

                $notification->markAsRead();

                    return redirect(
                        $notification->data['url']
                        ?? route('client.dashboard')
                    );
            }
        )->name('notifications.read');

    });



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    
    Route::get('/users/{user}/profile',[UserProfileController::class, 'show']
            )->name('users.profile.show');
    
    Route::post(
        '/interventions/{intervention}/comments',
        [CommentController::class, 'store']
    )->middleware('verified')
    ->name('comments.store');

    Route::delete(
        '/comments/{comment}',
        [CommentController::class, 'destroy']
        )->middleware('verified')
        ->name('comments.destroy');
}   );

//ATTACHEMENT
Route::middleware([
    'auth',
    'verified',
])->group(function () {
    Route::post(
        '/interventions/{intervention}/attachments',
        [InterventionAttachmentController::class, 'store']
    )->name('attachments.store');

    Route::get(
        '/attachments/{attachment}/download',
        [InterventionAttachmentController::class, 'download']
    )->name('attachments.download');

    Route::delete(
        '/attachments/{attachment}',
        [InterventionAttachmentController::class, 'destroy']
    )->name('attachments.destroy');
});


require __DIR__.'/auth.php';