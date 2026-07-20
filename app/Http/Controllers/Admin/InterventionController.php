<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Intervention;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Support\Str;

class InterventionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $interventions = Intervention::with([
        'client',
        'technician',
        'category',
        'priority',
        'status'
    ])
    ->latest()
    ->get();

    return Inertia::render('Admin/Interventions/Index', [
        'interventions' => $interventions
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
public function create()
{
    return Inertia::render('Admin/Interventions/Create', [

        'clients' => User::where('role_id', 4)
            ->select('id', 'name')
            ->get(),

        'categories' => Category::where('is_active', true)
            ->select('id', 'nom')
            ->get(),

        'priorities' => Priority::select('id', 'nom')
            ->get(),

        'statuses' => Status::select('id', 'nom')
            ->get(),
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([

        'titre' => 'required|string|max:255',

        'description' => 'required|string',

        'client_id' => 'required|exists:users,id',

        'category_id' => 'required|exists:categories,id',

        'priority_id' => 'required|exists:priorities,id',

        'status_id' => 'required|exists:statuses,id',

    ]);


    Intervention::create([

        'reference' => 'INT-' . strtoupper(Str::random(8)),

        'titre' => $validated['titre'],

        'description' => $validated['description'],

        'client_id' => $validated['client_id'],

        'category_id' => $validated['category_id'],

        'priority_id' => $validated['priority_id'],

        'status_id' => $validated['status_id'],

    ]);


    return redirect()
        ->route('admin.interventions.index')
        ->with('success', 'Intervention créée avec succès.');
}

    /**
     * Display the specified resource.
     */
    public function show(Intervention $intervention)
{
    $intervention->load([
        'client',
        'technician',
        'category',
        'priority',
        'status',
        'manager'
    ]);


    return Inertia::render(
        'Admin/Interventions/Show',
        [
            'intervention' => $intervention
        ]
    );
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Intervention $intervention)
{
    $intervention->load([
        'client',
        'technician',
        'category',
        'priority',
        'status'
    ]);


    return Inertia::render(
        'Admin/Interventions/Edit',
        [
            'intervention' => $intervention,

            'clients' => User::where('role_id', 4)
                ->select('id', 'name')
                ->get(),

            'technicians' => User::where('role_id', 3)
                ->select('id', 'name')
                ->get(),

            'categories' => Category::where('is_active', true)
                ->select('id', 'nom')
                ->get(),

            'priorities' => Priority::select('id', 'nom')
                ->get(),

            'statuses' => Status::select('id', 'nom')
                ->get(),
        ]
    );
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Intervention $intervention)
{

    $validated = $request->validate([

        'titre' => 'required|string|max:255',

        'description' => 'required|string',

        'client_id' => 'required|exists:users,id',

        'technician_id' => 'nullable|exists:users,id',

        'category_id' => 'required|exists:categories,id',

        'priority_id' => 'required|exists:priorities,id',

        'status_id' => 'required|exists:statuses,id',

    ]);


    $intervention->update($validated);


    return redirect()
        ->route('admin.interventions.show', $intervention)
        ->with(
            'success',
            'Intervention modifiée avec succès.'
        );
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Intervention $intervention)
{
    $intervention->delete();


    return redirect()
        ->route('admin.interventions.index')
        ->with(
            'success',
            'Intervention supprimée avec succès.'
        );
}
}
