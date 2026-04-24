<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_contact_avec_donnees_valides_sauvegarde_en_base(): void
    {
        // Arrange
        $payload = [
            'name' => 'Noé Labbé',
            'email' => 'noe@example.com',
            'message' => 'Message de test suffisamment long.',
        ];

        // Act
        $response = $this->postJson('/api/contact', $payload);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('contacts', [
            'name' => 'Noé Labbé',
            'email' => 'noe@example.com',
        ]);
    }

    public function test_post_contact_avec_email_invalide_retourne_422(): void
    {
        // Arrange
        $payload = [
            'name' => 'Noé Labbé',
            'email' => 'email-invalide',
            'message' => 'Message de test suffisamment long.',
        ];

        // Act
        $response = $this->postJson('/api/contact', $payload);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_post_contact_avec_champs_manquants_retourne_422(): void
    {
        // Arrange
        $payload = [];

        // Act
        $response = $this->postJson('/api/contact', $payload);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }
}
