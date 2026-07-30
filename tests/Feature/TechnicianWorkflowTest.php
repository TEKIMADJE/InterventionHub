<?php

use App\Models\Category;
use App\Models\Intervention;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Notifications\InterventionNotification;
use Illuminate\Support\Facades\Notification;

test('a technician can start and complete an assigned intervention', function () {
    Notification::fake();

    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $technician = User::factory()->create([
        'role_id' => $technicianRole->id,
        'is_active' => true,
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
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

    $assignedStatus = Status::create([
        'nom' => 'Affectée',
        'description' => 'Technicien affecté',
    ]);

    $inProgressStatus = Status::create([
        'nom' => 'En cours',
        'description' => 'Intervention en cours',
    ]);

    $completedStatus = Status::create([
        'nom' => 'Terminée',
        'description' => 'Intervention terminée',
    ]);

    $intervention = Intervention::create([
        'reference' => 'INT-TECH-001',
        'titre' => 'Réparation ordinateur',
        'description' => 'L’ordinateur ne démarre plus.',
        'lieu' => 'Bureau principal',
        'contact_nom' => $client->name,
        'contact_telephone' => '0600000000',
        'client_id' => $client->id,
        'technician_id' => $technician->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $assignedStatus->id,
    ]);

    /*
     * Première étape : démarrer l’intervention.
     */
    $startResponse = $this
        ->actingAs($technician)
        ->put(
            route('technician.interventions.update', $intervention),
            [
                'status_id' => $inProgressStatus->id,
                'solution' => null,
            ]
        );

    $startResponse
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Intervention mise à jour avec succès.'
        );

    $intervention->refresh();

    expect($intervention->status_id)
        ->toBe($inProgressStatus->id);

    expect($intervention->started_at)
        ->not->toBeNull();

    expect($intervention->completed_at)
        ->toBeNull();

    /*
     * Deuxième étape : refuser la clôture
     * lorsqu’aucune solution n’est saisie.
     */
    $invalidCompletionResponse = $this
        ->actingAs($technician)
        ->put(
            route('technician.interventions.update', $intervention),
            [
                'status_id' => $completedStatus->id,
                'solution' => '',
            ]
        );

    $invalidCompletionResponse
        ->assertSessionHasErrors([
            'solution',
        ]);

    $intervention->refresh();

    expect($intervention->status_id)
        ->toBe($inProgressStatus->id);

    expect($intervention->completed_at)
        ->toBeNull();

    /*
     * Troisième étape : terminer avec une solution.
     */
    $completionResponse = $this
        ->actingAs($technician)
        ->put(
            route('technician.interventions.update', $intervention),
            [
                'status_id' => $completedStatus->id,
                'solution' =>
                    'Remplacement de l’alimentation défectueuse.',
            ]
        );

    $completionResponse
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Intervention mise à jour avec succès.'
        );

    $intervention->refresh();

    expect($intervention->status_id)
        ->toBe($completedStatus->id);

    expect($intervention->solution)
        ->toBe(
            'Remplacement de l’alimentation défectueuse.'
        );

    expect($intervention->started_at)
        ->not->toBeNull();

    expect($intervention->completed_at)
        ->not->toBeNull();

    $this->assertDatabaseHas('intervention_histories', [
        'intervention_id' => $intervention->id,
        'user_id' => $technician->id,
        'action' => 'Mise à jour technicien',
    ]);

    Notification::assertSentToTimes(
        $client,
        InterventionNotification::class,
        2
    );
});

test('a technician cannot update another technician intervention', function () {
    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $assignedTechnician = User::factory()->create([
        'role_id' => $technicianRole->id,
        'is_active' => true,
    ]);

    $otherTechnician = User::factory()->create([
        'role_id' => $technicianRole->id,
        'is_active' => true,
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $category = Category::create([
        'nom' => 'Réseau',
        'description' => 'Maintenance réseau',
        'is_active' => true,
    ]);

    $priority = Priority::create([
        'nom' => 'Moyenne',
        'description' => 'Priorité moyenne',
    ]);

    $assignedStatus = Status::create([
        'nom' => 'Affectée',
        'description' => 'Technicien affecté',
    ]);

    $inProgressStatus = Status::create([
        'nom' => 'En cours',
        'description' => 'Intervention en cours',
    ]);

    $intervention = Intervention::create([
        'reference' => 'INT-TECH-002',
        'titre' => 'Problème réseau',
        'description' => 'Connexion indisponible.',
        'lieu' => 'Bureau secondaire',
        'contact_nom' => $client->name,
        'contact_telephone' => '0600000001',
        'client_id' => $client->id,
        'technician_id' => $assignedTechnician->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $assignedStatus->id,
    ]);

    $response = $this
        ->actingAs($otherTechnician)
        ->put(
            route('technician.interventions.update', $intervention),
            [
                'status_id' => $inProgressStatus->id,
                'solution' => null,
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('interventions', [
        'id' => $intervention->id,
        'technician_id' => $assignedTechnician->id,
        'status_id' => $assignedStatus->id,
        'started_at' => null,
    ]);
});
