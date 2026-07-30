<?php

use App\Models\Role;
use App\Models\User;

test('a guest is redirected to login from a protected dashboard', function () {
    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('login'));
});

test('an unverified client is redirected to email verification', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $client = User::factory()
        ->unverified()
        ->create([
            'role_id' => $clientRole->id,
            'is_active' => true,
        ]);

    $response = $this
        ->actingAs($client)
        ->get(route('client.dashboard'));

    $response->assertRedirect(
        route('verification.notice')
    );
});

test('a verified client can access the client dashboard', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $response = $this
        ->actingAs($client)
        ->get(route('client.dashboard'));

    $response->assertSuccessful();
});

test('a client cannot access the administrator dashboard', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);

    $response = $this
        ->actingAs($client)
        ->get(route('admin.dashboard'));

    $response->assertForbidden();
});

test('an inactive user is logged out and denied access', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
        'description' => 'Crée des interventions',
    ]);

    $client = User::factory()->create([
        'role_id' => $clientRole->id,
        'is_active' => false,
    ]);

    $response = $this
        ->actingAs($client)
        ->get(route('client.dashboard'));

    $this->assertGuest();

    $response
        ->assertRedirect(route('login'))
        ->assertSessionHas(
            'error',
            'Votre compte a été désactivé.'
        );
});
