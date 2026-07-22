<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Status;

class InterventionController extends Controller
{
    public function index()
    {
        $interventions = Intervention::with([
            'client',
            'priority',
            'status',
            'category'
        ])
        ->where('technician_id', auth()->id())
        ->latest()
        ->get();


        return Inertia::render(
            'Technician/Interventions/Index',
            [
                'interventions' => $interventions
            ]
        );
    }
    public function show(Intervention $intervention)
{
    abort_if(
        $intervention->technician_id !== auth()->id(),
        403
    );


    $intervention->load([
        'client',
        'category',
        'priority',
        'status',
        'histories.user'
    ]);


    $statuses = Status::all();


    return Inertia::render(
        'Technician/Interventions/Show',
        [
            'intervention' => $intervention,
            'statuses' => $statuses
        ]
    );
}
public function update(Request $request, Intervention $intervention)
{
    // Sécurité : vérifier que l'intervention appartient au technicien connecté
    abort_if(
        $intervention->technician_id !== auth()->id(),
        403
    );


    $validated = $request->validate([
        'status_id' => 'required|exists:statuses,id',
        'solution' => 'nullable|string',
    ]);


    $ancienStatut = $intervention->status?->nom;

    $currentStatus = $intervention->status->nom;

$newStatus = Status::find($validated['status_id'])->nom;


if (
    $currentStatus === 'Terminée'
    && $newStatus !== 'Terminée'
) {
    return back()->withErrors([
        'status_id' => 
        'Une intervention terminée ne peut plus être modifiée.'
    ]);
}

    $intervention->update([
        'status_id' => $validated['status_id'],
        'solution' => $validated['solution'] ?? null,

        'started_at' => 
            $validated['status_id'] == 2 && !$intervention->started_at
            ? now()
            : $intervention->started_at,

        'completed_at' =>
            $validated['status_id'] == 3
            ? now()
            : $intervention->completed_at,
    ]);


    $intervention->load('status');


    // Historique
    \App\Models\InterventionHistory::create([
        'intervention_id' => $intervention->id,
        'user_id' => auth()->id(),
        'action' => 'Mise à jour technicien',
        'details' =>
            "Statut : {$ancienStatut} → {$intervention->status->nom}"
        . ($validated['solution']
            ? " | Compte rendu : {$validated['solution']}"
            : ""),
    ]);


    return redirect()
        ->back()
        ->with('success', 'Intervention mise à jour.');
}
}
