<?php

use App\Models\Category;
use App\Models\Intervention;
use App\Models\InterventionAttachment;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function createAttachmentWorkflowScenario(): array
{
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $otherClient = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $technician = User::factory()->create([
        'role_id' => $technicianRole->id,
        'is_active' => true,
    ]);

    $category = Category::create([
        'nom' => 'Maintenance',
        'description' => 'Maintenance informatique',
        'is_active' => true,
    ]);

    $priority = Priority::create([
        'nom' => 'Haute',
        'description' => 'Intervention urgente',
    ]);

    $status = Status::create([
        'nom' => 'En cours',
        'description' => 'Intervention en cours',
    ]);

    $intervention = Intervention::create([
        'reference' => 'INT-FILE-001',
        'titre' => 'Ordinateur en panne',
        'description' => 'L’ordinateur ne démarre plus.',
        'lieu' => 'Bureau principal',
        'contact_nom' => $client->name,
        'contact_telephone' => '0600000000',
        'client_id' => $client->id,
        'technician_id' => $technician->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $status->id,
    ]);

    return compact(
        'client',
        'otherClient',
        'technician',
        'intervention'
    );
}

test('a client can upload and delete an attachment', function () {
    Storage::fake('local');

    $scenario = createAttachmentWorkflowScenario();

    $file = UploadedFile::fake()->create(
        'rapport.pdf',
        100,
        'application/pdf'
    );

    $uploadResponse = $this
        ->actingAs($scenario['client'])
        ->post(
            route(
                'attachments.store',
                $scenario['intervention']
            ),
            [
                'files' => [$file],
                'description' => 'Rapport du problème',
            ]
        );

    $uploadResponse
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Pièce(s) jointe(s) ajoutée(s) avec succès.'
        );

    $attachment = InterventionAttachment::firstOrFail();

    $this->assertDatabaseHas('intervention_attachments', [
        'id' => $attachment->id,
        'intervention_id' =>
            $scenario['intervention']->id,
        'user_id' => $scenario['client']->id,
        'original_name' => 'rapport.pdf',
        'description' => 'Rapport du problème',
    ]);

    Storage::disk('local')->assertExists(
        $attachment->file_path
    );

    $downloadResponse = $this
        ->actingAs($scenario['technician'])
        ->get(route('attachments.download', $attachment));

    $downloadResponse
        ->assertSuccessful()
        ->assertDownload('rapport.pdf');

    $deleteResponse = $this
        ->actingAs($scenario['client'])
        ->delete(route('attachments.destroy', $attachment));

    $deleteResponse->assertSessionHas(
        'success',
        'Pièce jointe supprimée avec succès.'
    );

    $this->assertDatabaseMissing('intervention_attachments', [
        'id' => $attachment->id,
    ]);

    Storage::disk('local')->assertMissing(
        $attachment->file_path
    );
});

test('an unrelated client cannot access intervention attachments', function () {
    Storage::fake('local');

    $scenario = createAttachmentWorkflowScenario();

    $uploadResponse = $this
        ->actingAs($scenario['otherClient'])
        ->post(
            route(
                'attachments.store',
                $scenario['intervention']
            ),
            [
                'files' => [
                    UploadedFile::fake()->create(
                        'document.pdf',
                        50,
                        'application/pdf'
                    ),
                ],
            ]
        );

    $uploadResponse->assertForbidden();

    $this->assertDatabaseCount(
        'intervention_attachments',
        0
    );

    $path = 'intervention-attachments/test/document.pdf';

    Storage::disk('local')->put(
        $path,
        'Contenu du document'
    );

    $attachment = InterventionAttachment::create([
        'intervention_id' =>
            $scenario['intervention']->id,
        'user_id' => $scenario['client']->id,
        'original_name' => 'document.pdf',
        'file_path' => $path,
        'mime_type' => 'application/pdf',
        'file_size' => 20,
        'description' => null,
    ]);

    $downloadResponse = $this
        ->actingAs($scenario['otherClient'])
        ->get(route('attachments.download', $attachment));

    $downloadResponse->assertForbidden();

    Storage::disk('local')->assertExists($path);
});
