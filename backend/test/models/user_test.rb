require "test_helper"

class UserTest < ActiveSupport::TestCase
  def valid_attributes
    { email: "rider@example.com", password: "password123" }
  end

  test "valid with a unique email and long-enough password" do
    assert User.new(valid_attributes).valid?
  end

  test "invalid without an email" do
    user = User.new(valid_attributes.merge(email: nil))
    assert_not user.valid?
  end

  test "invalid with a malformed email" do
    user = User.new(valid_attributes.merge(email: "not-an-email"))
    assert_not user.valid?
  end

  test "invalid with a duplicate email" do
    User.create!(valid_attributes)
    duplicate = User.new(valid_attributes)
    assert_not duplicate.valid?
  end

  test "email uniqueness is case-insensitive" do
    User.create!(valid_attributes)
    duplicate = User.new(valid_attributes.merge(email: valid_attributes[:email].upcase))
    assert_not duplicate.valid?
  end

  test "invalid with a password shorter than 8 characters" do
    user = User.new(valid_attributes.merge(password: "short"))
    assert_not user.valid?
  end

  test "invalid without a password" do
    user = User.new(valid_attributes.merge(password: nil))
    assert_not user.valid?
  end
end
