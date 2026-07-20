<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Intervention;
use App\Models\Status;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [

            'stats' => [

                'users' => User::count(),

                'technicians' => User::whereHas('role', function ($query) {
                    $query->where('nom', 'Technicien');
                })->count(),

                'interventions' => Intervention::count(),

                'pending' => Intervention::whereHas('status', function ($query) {
                    $query->where('nom', 'En attente');
                })->count(),

                'completed' => Intervention::whereHas('status', function ($query) {
                    $query->where('nom', 'Terminée');
                })->count(),

            ]

        ]);
    }
}
