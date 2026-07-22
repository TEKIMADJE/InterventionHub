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

        $stats = [
            'total' => Intervention::where('technician_id', $technicianId)
                ->count(),

            'en_attente' => Intervention::where('technician_id', $technicianId)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En attente');
                })
                ->count(),

            'en_cours' => Intervention::where('technician_id', $technicianId)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'En cours');
                })
                ->count(),

            'terminees' => Intervention::where('technician_id', $technicianId)
                ->whereHas('status', function ($query) {
                    $query->where('nom', 'Terminée');
                })
                ->count(),
        ];


        return Inertia::render(
            'Technician/Dashboard',
            [
                'stats' => $stats
            ]
        );
    }
}
