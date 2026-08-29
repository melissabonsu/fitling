module Api
  class SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email].to_s.strip.downcase)

      if user&.authenticate(params[:password].to_s)
        render json: { token: JsonWebToken.encode(user_id: user.id), user: user_json(user) }
      else
        render json: { errors: ["Invalid email or password"] }, status: :unauthorized
      end
    end

    private

    def user_json(user)
      { id: user.id, email: user.email }
    end
  end
end
