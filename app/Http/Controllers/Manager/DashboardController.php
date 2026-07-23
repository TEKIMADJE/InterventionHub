<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $interventionsQuery = Intervention::query();

        $stats = [
            'total' => (clone $interventionsQuery)->count(),

            'en_attente' => (clone $interventionsQuery)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En attente');
                })
                ->count(),

            'en_cours' => (clone $interventionsQuery)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En cours');
                })
                ->count(),

            'terminees' => (clone $interventionsQuery)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'Terminée');
                })
                ->count(),

            'non_attribuees' => (clone $interventionsQuery)
                ->whereNull('technician_id')
                ->count(),
        ];

        $interventions = Intervention::with([
            'client',
            'technician',
            'priority',
            'status',
        ])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Manager/Dashboard', [
            'stats' => $stats,
            'interventions' => $interventions,
        ]);
    }
}