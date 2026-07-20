<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [

            'total' => Intervention::count(),

            'en_attente' => Intervention::whereHas('status', function ($q) {
                $q->where('nom', 'En attente');
            })->count(),

            'en_cours' => Intervention::whereHas('status', function ($q) {
                $q->where('nom', 'En cours');
            })->count(),

            'terminees' => Intervention::whereHas('status', function ($q) {
                $q->where('nom', 'Terminée');
            })->count(),

        ];


        $interventions = Intervention::with([
            'client',
            'technician',
            'priority',
            'status'
        ])
        ->latest()
        ->take(5)
        ->get();


        return Inertia::render('Manager/Dashboard', [

            'stats' => $stats,

            'interventions' => $interventions

        ]);
    }
}