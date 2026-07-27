<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
{
    $search = trim(
        (string) $request->input('search', '')
    );

    $users = User::with('role')
        ->when(
            $search !== '',
            function ($query) use ($search) {
                $query->where(
                    'name',
                    'like',
                    "%{$search}%"
                );
            }
        )
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admin/Users/Index', [
        'users' => $users,

        'filters' => [
            'search' => $search,
        ],
    ]);
}

    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::orderBy('nom')
                ->get(['id', 'nom']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'telephone' => 'nullable|string|max:30',
            'role_id' => 'required|exists:roles,id',
            'password' => [
                'required',
                'confirmed',
                Rules\Password::defaults(),
            ],
            'is_active' => 'required|boolean',
        ]);

        $user = User::create($validated);

        $user->sendEmailVerificationNotification();

        $validated['password'] = Hash::make(
            $validated['password']
        );

        $user = User::create($validated);

        $user->sendEmailVerificationNotification();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Utilisateur créé avec succès.');
    }

    public function show(User $user)
    {
        return redirect()->route(
            'users.profile.show',
            $user
        );
    }

    public function edit(User $user)
    {
        $user->load('role');

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => Role::orderBy('nom')
                ->get(['id', 'nom']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $user->id,
            ],
            'telephone' => 'nullable|string|max:30',
            'role_id' => 'required|exists:roles,id',
            'password' => [
                'nullable',
                'confirmed',
                Rules\Password::defaults(),
            ],
            'is_active' => 'required|boolean',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make(
                $validated['password']
            );
        } else {
            unset($validated['password']);
        }

        $emailChanged =
            $user->email !== $validated['email'];

        $user->update($validated);

            if ($emailChanged) {
                $user->forceFill([
                    'email_verified_at' => null,
                ])->save();

            $user->sendEmailVerificationNotification();
            }
        
        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Utilisateur modifié avec succès.');

    }

    public function destroy(User $user)
    {
        abort_if(
            $user->id === auth()->id(),
            422,
            'Vous ne pouvez pas supprimer votre propre compte.'
        );

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Utilisateur supprimé.');
    }
}