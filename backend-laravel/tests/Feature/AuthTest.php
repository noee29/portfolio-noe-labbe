<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_avec_identifiants_valides(): void
    {
        // Arrange
        $user = User::factory()->create([
            'password' => Hash::make('secret123'),
        ]);

        // Act
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'secret123',
        ]);

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_login_avec_mauvais_mot_de_passe(): void
    {
        // Arrange
        $user = User::factory()->create([
            'password' => Hash::make('secret123'),
        ]);

        // Act
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        // Assert
        $response->assertStatus(401);
    }

    public function test_login_avec_email_inexistant(): void
    {
        // Arrange
        User::factory()->create();

        // Act
        $response = $this->postJson('/api/login', [
            'email' => 'inexistant@example.com',
            'password' => 'secret123',
        ]);

        // Assert
        $response->assertStatus(401);
    }

    public function test_logout_avec_token_valide(): void
    {
        // Arrange
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Act
        $response = $this->withToken($token)->postJson('/api/logout');

        // Assert
        $response->assertStatus(200);
    }

    public function test_acces_route_protegee_sans_token(): void
    {
        // Arrange
        $endpoint = '/api/user';

        // Act
        $response = $this->getJson($endpoint);

        // Assert
        $response->assertStatus(401);
    }

    public function test_acces_route_protegee_avec_token_valide(): void
    {
        // Arrange
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Act
        $response = $this->getJson('/api/user');

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('id', $user->id);
    }
}
