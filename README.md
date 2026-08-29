# Fitling

A gamified fitness tracker. Logging real workouts, measurements, and recovery
grows a cute virtual pet — a bunny mascot.

**Design philosophy: no punishment.** Missed days never hurt the pet, never lose
XP, never reset progress, and never trigger guilt-based notifications. Recovery
is a first-class, rewarded behavior — not a failure state.

## Repo layout

| Path       | What it is                                              |
| ---------- | ------------------------------------------------------- |
| `backend/` | Ruby on Rails API-only app, PostgreSQL                   |
| `mobile/`  | Expo (React Native + TypeScript) app using Expo Router   |

## Prerequisites

- Ruby 3.4+ and Bundler
- PostgreSQL 17 running locally on port 5432
- Node.js 22+ and npm
- [Expo Go](https://expo.dev/go) on your phone, or an iOS Simulator / Android Emulator

## Running the Rails API

```bash
cd backend
bundle install
bin/rails db:create      # first time only
bin/rails server -p 3000 -b 0.0.0.0
```

Binding to `0.0.0.0` (rather than the default `localhost`) is what lets a
physical phone on the same Wi-Fi network reach the API.

Verify it's up:

```bash
curl http://localhost:3000/api/health
# => {"status":"ok"}
```

### Database configuration

`config/database.yml` defaults to `postgres@localhost:5432` with no password.
Override with environment variables if your setup differs:

- `FITLING_DATABASE_HOST`
- `FITLING_DATABASE_PORT`
- `FITLING_DATABASE_USERNAME`
- `FITLING_DATABASE_PASSWORD`

### Tests

```bash
cd backend
bin/rails test
```

## Running the Expo app

```bash
cd mobile
npm install
npx expo start
```

This starts the Metro bundler and prints a QR code. From there:

- **Physical device (Expo Go):** install Expo Go, make sure the phone is on the
  **same Wi-Fi network** as your computer, then scan the QR code — iOS with the
  Camera app, Android from inside Expo Go.
- **iOS Simulator:** press `i` (macOS only)
- **Android Emulator:** press `a`

### How the app finds the backend

The app derives the API host from the Metro bundler's own hostname (see
[api.ts](mobile/src/config/api.ts)), so a physical device automatically points at
your computer's LAN IP rather than at its own `localhost`. The Rails server must
be running and bound to `0.0.0.0` for this to work.

The placeholder home screen fetches `GET /api/health` on load and displays
`Fitling backend: ok` or `Fitling backend: down`.
