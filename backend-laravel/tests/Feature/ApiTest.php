<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_projects_retourne_status_200_et_tableau_json(): void
    {
        // Arrange
        $endpoint = '/api/projects';

        // Act
        $response = $this->getJson($endpoint);

        // Assert
        $response->assertStatus(200);
        $this->assertNotNull($response->json());
        $this->assertIsArray($response->json());
    }

    public function test_get_skills_retourne_status_200_et_tableau_json(): void
    {
        // Arrange
        $endpoint = '/api/skills';

        // Act
        $response = $this->getJson($endpoint);

        // Assert
        $response->assertStatus(200);
        $this->assertNotNull($response->json());
        $this->assertIsArray($response->json());
    }

    public function test_get_formations_retourne_status_200_et_tableau_json(): void
    {
        // Arrange
        $endpoint = '/api/formations';

        // Act
        $response = $this->getJson($endpoint);

        // Assert
        $response->assertStatus(200);
        $this->assertNotNull($response->json());
        $this->assertIsArray($response->json());
    }

    public function test_routes_publiques_retournent_un_tableau_json_non_null(): void
    {
        // Arrange
        $endpoints = ['/api/projects', '/api/skills', '/api/formations'];

        // Act
        $responses = array_map(fn ($endpoint) => $this->getJson($endpoint), $endpoints);

        // Assert
        foreach ($responses as $response) {
            $response->assertStatus(200);
            $this->assertNotNull($response->json());
            $this->assertIsArray($response->json());
        }
    }
}
