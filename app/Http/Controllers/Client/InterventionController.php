<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Priority;
use Illuminate\Http\Request;
use App\Models\Status;


class InterventionController extends Controller
{
    public function index()
    {
        $interventions = Intervention::with([
            'technician',
            'priority',
            'status',
            'category',
        ])
        ->where('client_id', auth()->id())
        ->latest()
        ->get();

        return Inertia::render(
            'Client/Interventions/Index',
            [
                'interventions' => $interventions
            ]
        );
    }
    public function create()
{
    return Inertia::render('Client/Interventions/Create', [
        'categories' => Category::all(),
        'priorities' => Priority::all(),
    ]);
}
public function store(Request $request)
{
    $validated = $request->validate([
        'titre' => 'required|string|max:255',
        'description' => 'required|string',
        'lieu' => 'required|string|max:255',
        'contact_nom' => 'required|string|max:255',
        'contact_telephone' => 'required|string|max:20',
        'category_id' => 'required|exists:categories,id',
        'priority_id' => 'required|exists:priorities,id',
    ]);

    Intervention::create([
        ...$validated,

        'reference' => 'INT-' . now()->format('YmdHis'),

        'client_id' => auth()->id(),

        // En attente
        'status_id' => 1,
    ]);

    return redirect()
        ->route('client.interventions.index')
        ->with('success', 'Demande créée avec succès.');
}
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
    ]);

    return Inertia::render('Technician/Interventions/Show', [
        'intervention' => $intervention,
        'statuses' => Status::all(),
    ]);
}
}
