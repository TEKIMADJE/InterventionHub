<?php

use App\Models\Category;
use App\Models\Comment;
use App\Models\Intervention;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Notifications\NewCommentNotification;
use Illuminate\Support\Facades\Notification;

function createCommentWorkflowScenario(): array
{
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $technicianRole = Role::create([
        'nom' => 'Technicien',
        'description' => 'Exécute les interventions',
    ]);

    $managerRole = Role::create([
        'nom' => 'Responsable technique',
        'description' => 'Supervise les interventions',
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

    $manager = User::factory()->create([
        'role_id' => $managerRole->id,
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
        'reference' => 'INT-COMMENT-001',
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
        'manager',
        'intervention'
    );
}

test('a client can comment and recipients are notified once', function () {
    Notification::fake();

    $scenario = createCommentWorkflowScenario();

    $response = $this
        ->actingAs($scenario['client'])
        ->post(
            route(
                'comments.store',
                $scenario['intervention']
            ),
            [
                'contenu' =>
                    'Pouvez-vous me communiquer l’avancement ?',
            ]
        );

    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'success',
            'Commentaire ajouté avec succès.'
        );

    $this->assertDatabaseHas('comments', [
        'intervention_id' =>
            $scenario['intervention']->id,
        'user_id' => $scenario['client']->id,
        'contenu' =>
            'Pouvez-vous me communiquer l’avancement ?',
    ]);

    Notification::assertSentToTimes(
        $scenario['technician'],
        NewCommentNotification::class,
        1
    );

    Notification::assertSentToTimes(
        $scenario['manager'],
        NewCommentNotification::class,
        1
    );

    Notification::assertNotSentTo(
        $scenario['client'],
        NewCommentNotification::class
    );
});

test('an unrelated client cannot comment on an intervention', function () {
    Notification::fake();

    $scenario = createCommentWorkflowScenario();

    $response = $this
        ->actingAs($scenario['otherClient'])
        ->post(
            route(
                'comments.store',
                $scenario['intervention']
            ),
            [
                'contenu' => 'Commentaire interdit',
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseCount('comments', 0);

    Notification::assertNothingSent();
});

test('a comment author can delete their own comment', function () {
    $scenario = createCommentWorkflowScenario();

    $comment = Comment::create([
        'intervention_id' =>
            $scenario['intervention']->id,
        'user_id' => $scenario['client']->id,
        'contenu' => 'Commentaire à supprimer',
    ]);

    $response = $this
        ->actingAs($scenario['client'])
        ->delete(route('comments.destroy', $comment));

    $response
        ->assertSessionHas(
            'success',
            'Commentaire supprimé.'
        );

    $this->assertDatabaseMissing('comments', [
        'id' => $comment->id,
    ]);
});

test('a manager cannot delete another users comment', function () {
    $scenario = createCommentWorkflowScenario();

    $comment = Comment::create([
        'intervention_id' =>
            $scenario['intervention']->id,
        'user_id' => $scenario['client']->id,
        'contenu' => 'Commentaire du client',
    ]);

    $response = $this
        ->actingAs($scenario['manager'])
        ->delete(route('comments.destroy', $comment));

    $response->assertForbidden();

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
    ]);
});
