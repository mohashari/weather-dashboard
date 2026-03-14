# Weather Dashboard

Real-time weather app with 7-day forecast, animated icons, and city search.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Material UI (MUI) v5
- **Language**: TypeScript
- **Charts**: Recharts
- **API**: OpenWeatherMap (Current Weather, Forecast, Geocoding)

## Features

- Real-time current weather (temperature, humidity, wind, pressure, visibility)
- 7-day forecast with animated weather icons
- 48-hour temperature trend chart
- City autocomplete search with geolocation fallback
- °C / °F toggle
- Dark / light mode
- Fully mobile responsive

## Setup

```bash
# Clone the repo
git clone https://github.com/mohashari/weather-dashboard.git
cd weather-dashboard

# Install dependencies
npm install

# Add your API key
cp .env.example .env.local
# Then edit .env.local and add your OpenWeatherMap API key

# Start development server
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `OPENWEATHER_API_KEY` | Your [OpenWeatherMap](https://openweathermap.org/api) API key |

## Live Demo

_Coming soon_

---

> Part of [mohashari's portfolio](https://github.com/mohashari) — 10 web app projects
