module Authenticatable
  extend ActiveSupport::Concern

  private

  def authenticate_request!
    render json: { errors: ["Unauthorized"] }, status: :unauthorized unless current_user
  end

  def current_user
    @current_user ||= user_from_token
  end

  def user_from_token
    token = request.headers["Authorization"]&.split(" ")&.last
    return nil unless token

    payload = JsonWebToken.decode(token)
    return nil unless payload

    User.find_by(id: payload[:user_id])
  end
end
