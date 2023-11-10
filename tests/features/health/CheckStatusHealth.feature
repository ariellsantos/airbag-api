Feature: API Health status
  As a health check
  I want to check if the API is running and healthy

  Scenario: Check the api status
    Given I send a GET request to "/health"
    Then the response status code should be 200
