class User < ApplicationRecord
  has_secure_password
  has_one :fitling, dependent: :destroy

  normalizes :email, with: ->(email) { email.strip.downcase }

  validates :email, presence: true, uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 8 }, allow_nil: true

  after_create :create_default_fitling

  private

  def create_default_fitling
    create_fitling!(name: "Fitling")
  end
end
