<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $stats = [
            'total' => Intervention::where('client_id', $user->id)->count(),

            'pending' => Intervention::where('client_id', $user->id)
                ->whereHas('status', fn($q) => $q->where('nom', 'En attente'))
                ->count(),

            'in_progress' => Intervention::where('client_id', $user->id)
                ->whereHas('status', fn($q) => $q->where('nom', 'En cours'))
                ->count(),

            'completed' => Intervention::where('client_id', $user->id)
                ->whereHas('status', fn($q) => $q->where('nom', 'Terminée'))
                ->count(),
        ];

        return Inertia::render(
            'Client/Dashboard',
            [
                'stats' => $stats
            ]
        );
    }
}
