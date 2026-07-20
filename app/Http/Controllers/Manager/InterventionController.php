<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;

class InterventionController extends Controller
{
public function index()
{
    $interventions = \App\Models\Intervention::with([
        'client',
        'technician',
        'priority',
        'status'
    ])
    ->latest()
    ->get();

    return \Inertia\Inertia::render(
        'Manager/Interventions/Index',
        [
            'interventions' => $interventions
        ]
    );
}
public function show(Intervention $intervention)
{
    $intervention->load([
        'client',
        'technician',
        'category',
        'priority',
        'status'
    ]);

    $technicians = \App\Models\User::whereHas(
        'role',
        function ($query) {
            $query->where('nom', 'Technicien');
        }
    )->where('is_active', 1)
    ->get();


    return Inertia::render(
        'Manager/Interventions/Show',
        [
            'intervention' => $intervention,
            'technicians' => $technicians
        ]
    );
}
}