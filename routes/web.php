<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\InterventionController;

use App\Http\Controllers\Manager\DashboardController as ManagerDashboardController;
use App\Http\Controllers\Technician\DashboardController as TechnicianDashboardController;
use App\Http\Controllers\Technician\InterventionController as TechnicianInterventionController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\Client\InterventionController as ClientInterventionController;
use App\Http\Controllers\Manager\InterventionController as ManagerInterventionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// ADMIN
Route::middleware(['auth', 'role:Administrateur'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');


        Route::resource('users', UserController::class);


        Route::resource('interventions', InterventionController::class);

    });


// MANAGER
Route::middleware(['auth', 'role:Responsable technique'])
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

    });


// TECHNICIEN
Route::middleware(['auth', 'role:Technicien'])
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

    });


// CLIENT
Route::middleware(['auth', 'role:Client'])
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

    });



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

});


require __DIR__.'/auth.php';