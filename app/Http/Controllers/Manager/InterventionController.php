<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Notifications\InterventionNotification;

class InterventionController extends Controller
{
public function index(Request $request)
{
    $query = Intervention::with([
        'client',
        'technician',
        'priority',
        'status',
    ]);

    // Recherche par référence, titre ou client
    $query->when(
        $request->filled('search'),
        function ($query) use ($request) {
            $search = $request->input('search');

            $query->where(function ($query) use ($search) {
                $query
                    ->where('reference', 'like', "%{$search}%")
                    ->orWhere('titre', 'like', "%{$search}%")
                    ->orWhereHas('client', function ($query) use ($search) {
                        $query->where(
                            'name',
                            'like',
                            "%{$search}%"
                        );
                    });
            });
        }
    );

    // Filtre par statut
    $query->when(
        $request->filled('status_id'),
        function ($query) use ($request) {
            $query->where(
                'status_id',
                $request->input('status_id')
            );
        }
    );

    // Filtre par priorité
    $query->when(
        $request->filled('priority_id'),
        function ($query) use ($request) {
            $query->where(
                'priority_id',
                $request->input('priority_id')
            );
        }
    );

    // Filtre par technicien
    $query->when(
        $request->filled('technician_id'),
        function ($query) use ($request) {
            if ($request->input('technician_id') === 'unassigned') {
                $query->whereNull('technician_id');
            } else {
                $query->where(
                    'technician_id',
                    $request->input('technician_id')
                );
            }
        }
    );

    $interventions = $query
        ->latest()
        ->paginate(10)
        ->withQueryString();

    $technicians = User::whereHas('role', function ($query) {
        $query->where('nom', 'Technicien');
    })
        ->where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name']);

    return Inertia::render('Manager/Interventions/Index', [
        'interventions' => $interventions,

        'statuses' => Status::orderBy('id')
            ->get(['id', 'nom']),

        'priorities' => Priority::orderBy('id')
            ->get(['id', 'nom']),

        'technicians' => $technicians,

        'filters' => $request->only([
            'search',
            'status_id',
            'priority_id',
            'technician_id',
        ]),
    ]);
}
public function show(Intervention $intervention)
{
    $intervention->load([
        'client',
        'technician',
        'category',
        'priority',
        'status',
        'histories.user',
        'attachments.user',
        'comments.user.role',
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
        'histories.user',
        'attachments.user',
        'comments.user.role',
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

    $oldTechnicianId = $intervention->technician_id;
    $oldTechnician = $intervention->technician?->name ?? 'Non affecté';
    $oldStatus = $intervention->status?->nom ?? 'Aucun';
    $oldPriority = $intervention->priority?->nom ?? 'Aucune';

    $intervention->update($validated);

    // Recharger les nouvelles relations après la modification
    $intervention->load([
        'technician',
        'status',
        'priority',
        'attachments.user',
        'comments.user.role',
    ]);

    // Notification uniquement si le technicien a changé
    if (
        (int) $oldTechnicianId !== (int) $intervention->technician_id
        && $intervention->technician
    ) {
        $intervention->technician->notify(
            new InterventionNotification(
                $intervention,
                'Nouvelle intervention attribuée',
                "L’intervention {$intervention->reference} vous a été attribuée.",
                "/technician/interventions/{$intervention->id}",
                'assignment'
            )
        );
    }

    $newTechnician = $intervention->technician?->name ?? 'Non affecté';
    $newStatus = $intervention->status?->nom ?? 'Aucun';
    $newPriority = $intervention->priority?->nom ?? 'Aucune';

    $details = '';

    if ($oldTechnician !== $newTechnician) {
        $details .= "Technicien : {$oldTechnician} → {$newTechnician}. ";
    }

    if ($oldStatus !== $newStatus) {
        $details .= "Statut : {$oldStatus} → {$newStatus}. ";
    }

    if ($oldPriority !== $newPriority) {
        $details .= "Priorité : {$oldPriority} → {$newPriority}. ";
    }

    if ($details !== '') {
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