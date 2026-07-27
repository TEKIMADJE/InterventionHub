<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Intervention;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\NewCommentNotification;
use Illuminate\Support\Facades\Notification;

class CommentController extends Controller
{
    public function store(
        Request $request,
        Intervention $intervention
    ) {
        abort_unless(
            $this->canAccess($request->user(), $intervention),
            403,
            'Vous ne pouvez pas commenter cette intervention.'
        );

        $validated = $request->validate([
            'contenu' => [
                'required',
                'string',
                'max:2000',
            ],
        ]);

        $comment = $intervention->comments()->create([
            'user_id' => $request->user()->id,
            'contenu' => $validated['contenu'],
        ]);

        $comment->load([
            'user.role',
            'intervention.client.role',
            'intervention.technician.role',
        ]);

        $authorId = (int) $request->user()->id;

        $administratorsAndManagers = User::whereHas(
            'role',
                function ($query) {
                    $query->whereIn('nom', [
                        'Administrateur',
                        'Responsable technique',
                    ]);
                }
            )
                ->where('is_active', true)
                ->get();

$author = $request->user();
$author->loadMissing('role');

$authorRole = $author->role?->nom;

$administratorsAndManagers = User::whereHas(
    'role',
    function ($query) {
        $query->whereIn('nom', [
            'Administrateur',
            'Responsable technique',
        ]);
    }
)
    ->where('is_active', true)
    ->get();

$recipients = match ($authorRole) {
    'Client' => collect([
        $intervention->technician,
    ])->merge($administratorsAndManagers),

    'Technicien' => collect([
        $intervention->client,
    ])->merge($administratorsAndManagers),

    'Responsable technique',
    'Administrateur' => collect([
        $intervention->client,
        $intervention->technician,
    ]),

    default => collect(),
};

$recipients = $recipients
    ->filter()
    ->reject(
        fn (User $user) =>
            (int) $user->id === (int) $author->id
    )
    ->unique('id')
    ->values();

Notification::send(
    $recipients,
    new NewCommentNotification($comment)
);

Notification::send(
    $recipients,
    new NewCommentNotification($comment)
);

        return back()->with(
            'success',
            'Commentaire ajouté avec succès.'
        );
    }

    public function destroy(
        Request $request,
        Comment $comment
    ) {
        $comment->loadMissing('intervention');

        abort_unless(
            $this->canAccess(
                $request->user(),
                $comment->intervention
            ),
            403
        );

        $user = $request->user();
        $user->loadMissing('role');

        $canDelete =
            (int) $comment->user_id === (int) $user->id
            || $user->role?->nom === 'Administrateur';

        abort_unless(
            $canDelete,
            403,
            'Vous ne pouvez pas supprimer ce commentaire.'
        );

        $comment->delete();

        return back()->with(
            'success',
            'Commentaire supprimé.'
        );
    }

    private function canAccess(
        User $user,
        Intervention $intervention
    ): bool {
        $user->loadMissing('role');

        return match ($user->role?->nom) {
            'Administrateur' => true,

            'Responsable technique' => true,

            'Technicien' =>
                (int) $intervention->technician_id
                === (int) $user->id,

            'Client' =>
                (int) $intervention->client_id
                === (int) $user->id,

            default => false,
        };
    }
}