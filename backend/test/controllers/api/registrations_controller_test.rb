require "test_helper"

module Api
  class RegistrationsControllerTest < ActionDispatch::IntegrationTest
    test "creates a user and returns a token" do
      post api_signup_url, params: { email: "new@example.com", password: "password123" }

      assert_response :created
      body = JSON.parse(response.body)
      assert body["token"].present?
      assert_equal "new@example.com", body["user"]["email"]
      assert User.exists?(email: "new@example.com")
    end

    test "rejects a duplicate email" do
      User.create!(email: "taken@example.com", password: "password123")

      post api_signup_url, params: { email: "taken@example.com", password: "password123" }

      assert_response :unprocessable_entity
      body = JSON.parse(response.body)
      assert body["errors"].any? { |message| message.match?(/email/i) }
    end

    test "rejects a password that is too short" do
      post api_signup_url, params: { email: "new@example.com", password: "short" }

      assert_response :unprocessable_entity
      body = JSON.parse(response.body)
      assert body["errors"].any? { |message| message.match?(/password/i) }
    end
  end
end
