require "test_helper"

class JsonWebTokenTest < ActiveSupport::TestCase
  test "encodes and decodes a payload round-trip" do
    token = JsonWebToken.encode(user_id: 42)

    assert_equal 42, JsonWebToken.decode(token)[:user_id]
  end

  test "returns nil for a garbage token" do
    assert_nil JsonWebToken.decode("not-a-real-token")
  end

  test "returns nil for an expired token" do
    token = JsonWebToken.encode({ user_id: 42 }, 1.hour.ago)

    assert_nil JsonWebToken.decode(token)
  end
end
