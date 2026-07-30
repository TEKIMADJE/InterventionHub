<?php

use App\Models\Role;
use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register as clients', function () {
    $clientRole = Role::create([
        'nom' => 'Client',
    ]);

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertGuest();

    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas(
            'status',
            'Compte créé avec succès. Vous pouvez maintenant vous connecter.'
        )
        ->assertRedirect(route('login'));

    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'role_id' => $clientRole->id,
        'is_active' => true,
    ]);
});