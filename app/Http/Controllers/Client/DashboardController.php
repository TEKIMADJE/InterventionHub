<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $clientId = auth()->id();

        $interventions = Intervention::where(
            'client_id',
            $clientId
        );

        $stats = [
            'total' => (clone $interventions)->count(),

            'pending' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En attente');
                })
                ->count(),

            'in_progress' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En cours');
                })
                ->count(),

            'completed' => (clone $interventions)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'Terminée');
                })
                ->count(),
        ];

        $recentInterventions = Intervention::with([
            'status',
            'priority',
            'category',
            'technician',
        ])
            ->where('client_id', $clientId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Client/Dashboard', [
            'stats' => $stats,
            'recentInterventions' => $recentInterventions,
        ]);
    }
}