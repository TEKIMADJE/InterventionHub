<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $technicianId = auth()->id();

        $interventions = Intervention::where(
            'technician_id',
            $technicianId
        );

        $stats = [
            'total' => (clone $interventions)->count(),

            'en_attente' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En attente');
                })
                ->count(),

            'en_cours' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En cours');
                })
                ->count(),

            'terminees' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'Terminée');
                })
                ->count(),
        ];

        $recentInterventions = Intervention::with([
            'client',
            'status',
            'priority',
        ])
            ->where('technician_id', $technicianId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Technician/Dashboard', [
            'stats' => $stats,
            'recentInterventions' => $recentInterventions,
        ]);
    }
}