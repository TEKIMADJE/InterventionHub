<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\InterventionController;

use App\Http\Controllers\Manager\DashboardController as ManagerDashboardController;


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
            \App\Http\Controllers\Manager\InterventionController::class
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
    ->get('/technician/dashboard', function () {

        return Inertia::render('Technician/Dashboard');

    })->name('technician.dashboard');


// CLIENT
Route::middleware(['auth', 'role:Client'])
    ->get('/client/dashboard', function () {

        return Inertia::render('Client/Dashboard');

    })->name('client.dashboard');



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

});


require __DIR__.'/auth.php';