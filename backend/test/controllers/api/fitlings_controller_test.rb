require "test_helper"

module Api
  class FitlingsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @user = User.create!(email: "rider@example.com", password: "password123")
      @token = JsonWebToken.encode(user_id: @user.id)
    end

    test "returns the current user's fitling when authenticated" do
      get api_fitling_url, headers: { "Authorization" => "Bearer #{@token}" }

      assert_response :success
      body = JSON.parse(response.body)
      assert_equal "Fitling", body["name"]
      assert_equal 1, body["level"]
      assert_equal 0, body["xp"]
      assert_equal 0, body["stats"]["strength"]
      assert_equal 0, body["stats"]["recovery"]
    end

    test "rejects a request with no Authorization header" do
      get api_fitling_url

      assert_response :unauthorized
    end

    test "rejects a request with a garbage token" do
      get api_fitling_url, headers: { "Authorization" => "Bearer not-a-real-token" }

      assert_response :unauthorized
    end

    test "rejects a token for a deleted user" do
      @user.destroy!

      get api_fitling_url, headers: { "Authorization" => "Bearer #{@token}" }

      assert_response :unauthorized
    end
  end
end
