<?php

use App\Models\Category;
use App\Models\Intervention;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Notifications\InterventionNotification;
use Illuminate\Support\Facades\Notification;

test('a client can create an intervention and managers are notified', function () {
    Notification::fake();

    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée et suit ses interventions',
    ]);

    $managerRole = Role::create([
        'nom' => 'Responsable technique',
        'description' => 'Supervise les interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $manager = User::factory()->create([
        'role_id' => $managerRole->id,
        'is_active' => true,
    ]);

    $category = Category::create([
        'nom' => 'Maintenance informatique',
        'description' => 'Maintenance du matériel',
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

    $response = $this
        ->actingAs($client)
        ->post(route('client.interventions.store'), [
            'titre' => 'Ordinateur en panne',
            'description' => 'L’ordinateur ne démarre plus.',
            'lieu' => 'Bureau principal',
            'contact_nom' => 'Client Test',
            'contact_telephone' => '0600000000',
            'category_id' => $category->id,
            'priority_id' => $priority->id,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Demande créée avec succès.'
        )
        ->assertRedirect(route('client.interventions.index'));

    $this->assertDatabaseHas('interventions', [
        'titre' => 'Ordinateur en panne',
        'client_id' => $client->id,
        'category_id' => $category->id,
        'priority_id' => $priority->id,
        'status_id' => $pendingStatus->id,
    ]);

    $intervention = Intervention::firstOrFail();

    expect($intervention->reference)
        ->toMatch('/^INT-\d{14}$/');

    Notification::assertSentTo(
        $manager,
        InterventionNotification::class,
        function ($notification) use ($manager, $intervention) {
            $data = $notification->toArray($manager);

            return $data['intervention_id'] === $intervention->id
                && $data['reference'] === $intervention->reference
                && $data['type'] === 'new_request';
        }
    );
});

test('a technician cannot create a client intervention', function () {
    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $technician = User::factory()->create([
        'role_id' => $technicianRole->id,
        'is_active' => true,
    ]);

    $response = $this
        ->actingAs($technician)
        ->post(route('client.interventions.store'), []);

    $response->assertForbidden();

    $this->assertDatabaseCount('interventions', 0);
});
