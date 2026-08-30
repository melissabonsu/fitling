require "test_helper"

class FitlingTest < ActiveSupport::TestCase
  test "invalid without a name" do
    fitling = Fitling.new(user: User.create!(name: "Owner", email: "owner@example.com", password: "password123"), name: nil)

    assert_not fitling.valid?
  end

  test "defaults level, xp, and stats to zero-ish baseline via the database" do
    user = User.create!(name: "Owner Two", email: "owner2@example.com", password: "password123")

    assert_equal 1, user.fitling.level
    assert_equal 0, user.fitling.xp
    %i[strength stamina discipline confidence flexibility style recovery].each do |stat|
      assert_equal 0, user.fitling.public_send(stat)
    end
  end
end
