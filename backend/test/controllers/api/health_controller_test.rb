require "test_helper"

module Api
  class HealthControllerTest < ActionDispatch::IntegrationTest
    test "returns ok status as json" do
      get api_health_url

      assert_response :success
      assert_equal({ "status" => "ok" }, JSON.parse(response.body))
    end
  end
end
