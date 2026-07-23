<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Models\InterventionAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class InterventionAttachmentController extends Controller
{
    /**
     * Déposer une ou plusieurs pièces jointes.
     */
    public function store(
        Request $request,
        Intervention $intervention
    ) {
        $this->authorizeAccess($request, $intervention);

        $validated = $request->validate([
            'files' => [
                'required',
                'array',
                'min:1',
                'max:5',
            ],

            'files.*' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,pdf,doc,docx',
                'max:5120',
            ],

            'description' => [
                'nullable',
                'string',
                'max:500',
            ],
        ]);

        foreach ($request->file('files') as $file) {
            $path = $file->store(
                "intervention-attachments/{$intervention->id}",
                'local'
            );

            InterventionAttachment::create([
                'intervention_id' => $intervention->id,
                'user_id' => $request->user()->id,
                'original_name' =>
                    $file->getClientOriginalName(),
                'file_path' => $path,
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'description' =>
                    $validated['description'] ?? null,
            ]);
        }

        return back()->with(
            'success',
            'Pièce(s) jointe(s) ajoutée(s) avec succès.'
        );
    }

    /**
     * Télécharger une pièce jointe.
     */
    public function download(
        Request $request,
        InterventionAttachment $attachment
    ) {
        $attachment->loadMissing('intervention');

        $this->authorizeAccess(
            $request,
            $attachment->intervention
        );

        abort_unless(
            Storage::disk('local')->exists(
                $attachment->file_path
            ),
            404,
            'Le fichier demandé est introuvable.'
        );

        return Storage::disk('local')->download(
            $attachment->file_path,
            $attachment->original_name
        );
    }

    /**
     * Supprimer une pièce jointe.
     */
    public function destroy(
        Request $request,
        InterventionAttachment $attachment
    ) {
        $role = $request->user()->role?->nom;

        $canDelete =
            (int) $attachment->user_id ===
                (int) $request->user()->id
            || $role === 'Administrateur';

        abort_unless(
            $canDelete,
            403,
            'Vous ne pouvez pas supprimer cette pièce jointe.'
        );

        Storage::disk('local')->delete(
            $attachment->file_path
        );

        $attachment->delete();

        return back()->with(
            'success',
            'Pièce jointe supprimée avec succès.'
        );
    }

    /**
     * Vérifier si l’utilisateur peut accéder
     * aux fichiers de l’intervention.
     */
    private function authorizeAccess(
        Request $request,
        Intervention $intervention
    ): void {
        $user = $request->user();
        $role = $user->role?->nom;

        $hasAccess = match ($role) {
            'Administrateur',
            'Responsable technique' => true,

            'Technicien' =>
                (int) $intervention->technician_id ===
                (int) $user->id,

            'Client' =>
                (int) $intervention->client_id ===
                (int) $user->id,

            default => false,
        };

        abort_unless(
            $hasAccess,
            403,
            'Vous ne pouvez pas accéder aux pièces jointes de cette intervention.'
        );
    }
}
