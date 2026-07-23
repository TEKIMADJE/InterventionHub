<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use App\Models\InterventionHistory;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterventionController extends Controller
{
    /**
     * Afficher les interventions attribuées
     * au technicien connecté.
     */
    public function index(Request $request)
{
    $query = Intervention::with([
        'client',
        'priority',
        'status',
        'category',
    ])->where(
        'technician_id',
        auth()->id()
    );

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

    $query->when(
        $request->filled('status_id'),
        fn ($query) => $query->where(
            'status_id',
            $request->input('status_id')
        )
    );

    $query->when(
        $request->filled('priority_id'),
        fn ($query) => $query->where(
            'priority_id',
            $request->input('priority_id')
        )
    );

    $interventions = $query
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render(
        'Technician/Interventions/Index',
        [
            'interventions' => $interventions,

            'statuses' => Status::orderBy('id')
                ->get(['id', 'nom']),

            'priorities' => \App\Models\Priority::orderBy('id')
                ->get(['id', 'nom']),

            'filters' => $request->only([
                'search',
                'status_id',
                'priority_id',
            ]),
        ]
    );
}

    /**
     * Afficher une intervention.
     */
    public function show(Intervention $intervention)
    {
        abort_if(
            (int) $intervention->technician_id !== (int) auth()->id(),
            403,
            'Cette intervention ne vous est pas attribuée.'
        );

        $intervention->load([
            'client',
            'category',
            'priority',
            'status',
            'histories.user',
            'attachments.user',
        ]);

        $statuses = Status::orderBy('id')->get();

        return Inertia::render(
            'Technician/Interventions/Show',
            [
                'intervention' => $intervention,
                'statuses' => $statuses,
            ]
        );
    }

    /**
     * Mettre à jour le statut et le compte rendu.
     */
    public function update(
        Request $request,
        Intervention $intervention
    ) {
        abort_if(
            (int) $intervention->technician_id !== (int) auth()->id(),
            403,
            'Cette intervention ne vous est pas attribuée.'
        );

        $validated = $request->validate([
            'status_id' => [
                'required',
                'integer',
                'exists:statuses,id',
            ],
            'solution' => [
                'nullable',
                'string',
                'max:5000',
            ],
        ]);

        $intervention->loadMissing('status');

        $ancienStatut = $intervention->status?->nom ?? 'Non défini';

        $nouveauStatut = Status::findOrFail(
            $validated['status_id']
        );

        $solution = $validated['solution'] ?? null;

        /*
         * Une intervention terminée ne peut plus
         * revenir vers un autre statut.
         */
        if (
            $ancienStatut === 'Terminée' &&
            $nouveauStatut->nom !== 'Terminée'
        ) {
            return back()->withErrors([
                'status_id' =>
                    'Une intervention terminée ne peut plus être modifiée.',
            ]);
        }

        /*
         * Une solution est obligatoire avant
         * de terminer une intervention.
         */
        if (
            $nouveauStatut->nom === 'Terminée' &&
            blank($solution)
        ) {
            return back()->withErrors([
                'solution' =>
                    'Veuillez saisir un compte rendu avant de terminer l’intervention.',
            ]);
        }

        $intervention->update([
            'status_id' => $nouveauStatut->id,
            'solution' => $solution,

            'started_at' =>
                $nouveauStatut->nom === 'En cours' &&
                !$intervention->started_at
                    ? now()
                    : $intervention->started_at,

            'completed_at' =>
                $nouveauStatut->nom === 'Terminée' &&
                !$intervention->completed_at
                    ? now()
                    : $intervention->completed_at,
        ]);

        InterventionHistory::create([
            'intervention_id' => $intervention->id,
            'user_id' => auth()->id(),
            'action' => 'Mise à jour technicien',
            'details' =>
                "Statut : {$ancienStatut} → {$nouveauStatut->nom}"
                . ($solution
                    ? " | Compte rendu : {$solution}"
                    : ''),
        ]);

        return back()->with(
            'success',
            'Intervention mise à jour avec succès.'
        );
    }
}