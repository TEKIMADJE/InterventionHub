<?php

use App\Models\Category;
use App\Models\Intervention;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Notifications\InterventionNotification;
use Illuminate\Support\Facades\Notification;

test('a manager can assign an intervention to a technician', function () {
    Notification::fake();

    $managerRole = Role::create([
        'nom' => 'Responsable technique',
        'description' => 'Supervise les interventions',
    ]);

    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $manager = User::factory()->create([
        'role_id' => $managerRole->id,
        'is_active' => true,
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

    $pendingStatus = Status::create([
        'nom' => 'En attente',
        'description' => 'Intervention créée',
    ]);

    $assignedStatus = Status::create([
        'nom' => 'Affectée',
        'description' => 'Technicien affecté',
    ]);

    $intervention = Intervention::create([
        'reference' => 'INT-TEST-001',
        'titre' => 'Serveur indisponible',
        'description' => 'Le serveur ne répond plus.',
        'lieu' => 'Salle informatique',
        'contact_nom' => $client->name,
        'contact_telephone' => '0600000000',
        'client_id' => $client->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $pendingStatus->id,
    ]);

    $response = $this
        ->actingAs($manager)
        ->put(
            route('manager.interventions.update', $intervention),
            [
                'technician_id' => $technician->id,
                'priority_id' => $priority->id,
                'status_id' => $assignedStatus->id,
            ]
        );

    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Intervention mise à jour avec succès.'
        )
        ->assertRedirect(
            route('manager.interventions.show', $intervention)
        );

    $this->assertDatabaseHas('interventions', [
        'id' => $intervention->id,
        'technician_id' => $technician->id,
        'assigned_by' => $manager->id,
        'status_id' => $assignedStatus->id,
    ]);

    $this->assertDatabaseHas('intervention_histories', [
        'intervention_id' => $intervention->id,
        'user_id' => $manager->id,
        'action' => 'Modification intervention',
    ]);

    Notification::assertSentTo(
        $technician,
        InterventionNotification::class,
        function ($notification) use ($technician) {
            return $notification->toArray($technician)['type']
                === 'assignment';
        }
    );

    Notification::assertSentTo(
        $client,
        InterventionNotification::class,
        function ($notification) use ($client) {
            return $notification->toArray($client)['type']
                === 'assignment';
        }
    );
});

test('a client cannot assign an intervention', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $category = Category::create([
        'nom' => 'Réseau',
        'description' => 'Interventions réseau',
        'is_active' => true,
    ]);

    $priority = Priority::create([
        'nom' => 'Moyenne',
        'description' => 'Priorité moyenne',
    ]);

    $status = Status::create([
        'nom' => 'En attente',
        'description' => 'Intervention créée',
    ]);

    $intervention = Intervention::create([
        'reference' => 'INT-TEST-002',
        'titre' => 'Problème réseau',
        'description' => 'La connexion réseau est indisponible.',
        'lieu' => 'Bureau secondaire',
        'contact_nom' => $client->name,
        'contact_telephone' => '0600000001',
        'client_id' => $client->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $status->id,
    ]);

    $response = $this
        ->actingAs($client)
        ->put(
            route('manager.interventions.update', $intervention),
            [
                'technician_id' => null,
                'priority_id' => $priority->id,
                'status_id' => $status->id,
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('interventions', [
        'id' => $intervention->id,
        'technician_id' => null,
        'assigned_by' => null,
        'status_id' => $status->id,
    ]);
});