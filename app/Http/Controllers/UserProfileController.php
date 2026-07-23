<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    public function show(
        Request $request,
        User $user
    ): Response {
        $viewer = $request->user();

        $viewer->loadMissing('role');
        $user->loadMissing('role');

        $viewerRole = $viewer->role?->nom;
        $targetRole = $user->role?->nom;

        $hasAccess = $this->canViewProfile(
            $viewer,
            $user,
            $viewerRole,
            $targetRole
        );

        abort_unless(
            $hasAccess,
            403,
            'Vous ne pouvez pas consulter ce profil.'
        );

        /*
         * Seuls l’administrateur, le manager
         * et le propriétaire voient les coordonnées privées.
         */
        $canViewContact =
            $viewer->id === $user->id ||
            in_array(
                $viewerRole,
                [
                    'Administrateur',
                    'Responsable technique',
                ],
                true
            );

        return Inertia::render('Users/ProfileShow', [
            'profileUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'photo' => $user->photo,
                'specialite' => $user->specialite,
                'bio' => $user->bio,
                'role' => $targetRole,
                'email' =>
                    $canViewContact ? $user->email : null,
                'telephone' =>
                    $canViewContact ? $user->telephone : null,
                'adresse' =>
                    $canViewContact ? $user->adresse : null,
            ],

            'viewerRole' => $viewerRole,
        ]);
    }

    private function canViewProfile(
        User $viewer,
        User $target,
        ?string $viewerRole,
        ?string $targetRole
    ): bool {
        // Chaque utilisateur peut consulter son profil.
        if ($viewer->id === $target->id) {
            return true;
        }

        // L’administrateur peut consulter tous les profils.
        if ($viewerRole === 'Administrateur') {
            return true;
        }

        // Le manager peut consulter clients et techniciens.
        if ($viewerRole === 'Responsable technique') {
            return in_array(
                $targetRole,
                ['Client', 'Technicien'],
                true
            );
        }

        // Un client voit uniquement ses techniciens.
        if (
            $viewerRole === 'Client' &&
            $targetRole === 'Technicien'
        ) {
            return Intervention::where(
                'client_id',
                $viewer->id
            )
                ->where(
                    'technician_id',
                    $target->id
                )
                ->exists();
        }

        // Un technicien voit uniquement ses clients.
        if (
            $viewerRole === 'Technicien' &&
            $targetRole === 'Client'
        ) {
            return Intervention::where(
                'technician_id',
                $viewer->id
            )
                ->where(
                    'client_id',
                    $target->id
                )
                ->exists();
        }

        return false;
    }
}
