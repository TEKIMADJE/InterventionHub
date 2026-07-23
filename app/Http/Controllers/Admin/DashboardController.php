<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::query();
        $interventions = Intervention::query();

        $stats = [
            'users' => (clone $users)->count(),

            'clients' => (clone $users)
                ->whereHas('role', function ($query) {
                    $query->where('nom', 'Client');
                })
                ->count(),

            'technicians' => (clone $users)
                ->whereHas('role', function ($query) {
                    $query->where('nom', 'Technicien');
                })
                ->count(),

            'managers' => (clone $users)
                ->whereHas('role', function ($query) {
                    $query->where(
                        'nom',
                        'Responsable technique'
                    );
                })
                ->count(),

            'interventions' => (clone $interventions)->count(),

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

            'unassigned' => (clone $interventions)
                ->whereNull('technician_id')
                ->count(),
        ];

        $recentInterventions = Intervention::with([
            'client',
            'technician',
            'status',
            'priority',
        ])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentInterventions' => $recentInterventions,
        ]);
    }
}