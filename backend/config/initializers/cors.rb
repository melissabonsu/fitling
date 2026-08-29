# Be sure to restart your server when you modify this file.

# Native iOS/Android requests (via Expo Go or a simulator) never hit CORS, but
# `npx expo start --web` runs the app in an actual browser, so the dev server
# needs this to reach the API from a different localhost port.
if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins(/\Ahttp:\/\/localhost:\d+\z/, /\Ahttp:\/\/127\.0\.0\.1:\d+\z/)

      resource "/api/*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
end
