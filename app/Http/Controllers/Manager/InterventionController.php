<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Http\Request;

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
        'status',
        'histories.user'
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
public function edit(Intervention $intervention)
{
    $intervention->load([
        'client',
        'technician',
        'category',
        'priority',
        'status',
        'histories.user'
    ]);

    $technicians = User::whereHas('role', function ($query) {
        $query->where('nom', 'Technicien');
    })
    ->where('is_active', 1)
    ->get();

    $priorities = Priority::all();
    $statuses = Status::all();

    return Inertia::render('Manager/Interventions/Edit', [
        'intervention' => $intervention,
        'technicians' => $technicians,
        'priorities' => $priorities,
        'statuses' => $statuses,
    ]);
}
public function update(Request $request, Intervention $intervention)
{
    $validated = $request->validate([
        'technician_id' => 'nullable|exists:users,id',
        'priority_id' => 'required|exists:priorities,id',
        'status_id' => 'required|exists:statuses,id',
    ]);

    $oldTechnician = $intervention->technician?->name ?? "Non affecté";
    $oldStatus = $intervention->status?->nom ?? "Aucun";
    $oldPriority = $intervention->priority?->nom ?? "Aucune";


    $intervention->update($validated);


    $intervention->load([
        'technician',
        'status',
        'priority'
    ]);


    $details = "";


    if ($oldTechnician !== ($intervention->technician?->name ?? "Non affecté")) {
        $details .= "Technicien : $oldTechnician → {$intervention->technician->name}. ";
    }


    if ($oldStatus !== $intervention->status->nom) {
        $details .= "Statut : $oldStatus → {$intervention->status->nom}. ";
    }


    if ($oldPriority !== $intervention->priority->nom) {
        $details .= "Priorité : $oldPriority → {$intervention->priority->nom}. ";
    }


    if ($details !== "") {

        \App\Models\InterventionHistory::create([
            'intervention_id' => $intervention->id,
            'user_id' => auth()->id(),
            'action' => 'Modification intervention',
            'details' => $details,
        ]);

    }


    return redirect()
        ->route('manager.interventions.show', $intervention)
        ->with('success', 'Intervention mise à jour avec succès.');
}
}