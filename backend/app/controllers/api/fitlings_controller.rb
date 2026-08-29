module Api
  class FitlingsController < ApplicationController
    before_action :authenticate_request!

    def show
      render json: fitling_json(current_user.fitling)
    end

    private

    def fitling_json(fitling)
      {
        id: fitling.id,
        name: fitling.name,
        level: fitling.level,
        xp: fitling.xp,
        stats: {
          strength: fitling.strength,
          stamina: fitling.stamina,
          discipline: fitling.discipline,
          confidence: fitling.confidence,
          flexibility: fitling.flexibility,
          style: fitling.style,
          recovery: fitling.recovery,
        },
      }
    end
  end
end
