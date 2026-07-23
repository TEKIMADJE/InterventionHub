<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Priority;
use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\User;
use App\Notifications\InterventionNotification;
use Illuminate\Support\Facades\Notification;


class InterventionController extends Controller
{
    public function index(Request $request)
{
    $query = Intervention::with([
        'technician',
        'priority',
        'status',
        'category',
    ])->where(
        'client_id',
        auth()->id()
    );

    $query->when(
        $request->filled('search'),
        function ($query) use ($request) {
            $search = $request->input('search');

            $query->where(function ($query) use ($search) {
                $query
                    ->where('reference', 'like', "%{$search}%")
                    ->orWhere('titre', 'like', "%{$search}%");
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

    $query->when(
        $request->filled('category_id'),
        fn ($query) => $query->where(
            'category_id',
            $request->input('category_id')
        )
    );

    $interventions = $query
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render(
        'Client/Interventions/Index',
        [
            'interventions' => $interventions,

            'statuses' => Status::orderBy('id')
                ->get(['id', 'nom']),

            'priorities' => Priority::orderBy('id')
                ->get(['id', 'nom']),

            'categories' => Category::where('is_active', true)
                ->orderBy('nom')
                ->get(['id', 'nom']),

            'filters' => $request->only([
                'search',
                'status_id',
                'priority_id',
                'category_id',
            ]),
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

    $statusEnAttente = Status::where(
        'nom',
        'En attente'
    )->firstOrFail();

    $intervention = Intervention::create([
        ...$validated,

        'reference' =>
            'INT-' . now()->format('YmdHis'),

        'client_id' => auth()->id(),

        'status_id' => $statusEnAttente->id,
    ]);

    /*
     * Rechercher les responsables techniques actifs.
     */
    $managers = User::whereHas(
        'role',
        function ($query) {
            $query->where(
                'nom',
                'Responsable technique'
            );
        }
    )
        ->where('is_active', true)
        ->get();

    /*
     * Notifier tous les responsables techniques.
     */
    if ($managers->isNotEmpty()) {
        Notification::send(
            $managers,
            new InterventionNotification(
                $intervention,
                'Nouvelle demande d’intervention',
                "Une nouvelle intervention {$intervention->reference} a été créée par "
                    . auth()->user()->name
                    . '.',
                "/manager/interventions/{$intervention->id}",
                'new_request'
            )
        );
    }

    return redirect()
        ->route('client.interventions.index')
        ->with(
            'success',
            'Demande créée avec succès.'
        );
}
public function show(Intervention $intervention)
{
    abort_if(
        (int) $intervention->client_id !== (int) auth()->id(),
        403,
        'Cette intervention ne vous appartient pas.'
    );

    $intervention->load([
        'category',
        'priority',
        'status',
        'technician',
        'attachments.user',
        'comments.user.role',
    ]);

    return Inertia::render(
        'Client/Interventions/Show',
        [
            'intervention' => $intervention,
        ]
    );
}
}
