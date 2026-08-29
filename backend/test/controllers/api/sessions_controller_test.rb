require "test_helper"

module Api
  class SessionsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @user = User.create!(email: "rider@example.com", password: "password123")
    end

    test "logs in with correct credentials and returns a token" do
      post api_login_url, params: { email: "rider@example.com", password: "password123" }

      assert_response :success
      body = JSON.parse(response.body)
      assert body["token"].present?
      assert_equal @user.id, JsonWebToken.decode(body["token"])[:user_id]
    end

    test "login is case-insensitive on email" do
      post api_login_url, params: { email: "RIDER@example.com", password: "password123" }

      assert_response :success
    end

    test "rejects an incorrect password" do
      post api_login_url, params: { email: "rider@example.com", password: "wrongpassword" }

      assert_response :unauthorized
    end

    test "rejects an unknown email" do
      post api_login_url, params: { email: "nobody@example.com", password: "password123" }

      assert_response :unauthorized
    end
  end
end
