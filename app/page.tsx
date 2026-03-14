'use client'

import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchBar from '@/components/SearchBar'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import ForecastRow from '@/components/ForecastRow'
import WeatherChart from '@/components/WeatherChart'
import { CurrentWeatherSkeleton, ForecastSkeleton, ChartSkeleton } from '@/components/LoadingSkeleton'
import UnitToggle, { TempUnit } from '@/components/UnitToggle'
import { ThemeToggleContext } from '@/lib/ThemeRegistry'
import { WeatherData, ForecastData } from '@/types/weather'

export default function HomePage() {
  const { mode, setMode } = React.useContext(ThemeToggleContext)
  const [weather, setWeather] = React.useState<WeatherData | null>(null)
  const [forecast, setForecast] = React.useState<ForecastData | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [unit, setUnit] = React.useState<TempUnit>('C')

  async function fetchByCoords(lat: number, lon: number) {
    setLoading(true)
    setError(null)
    try {
      const params = `lat=${lat}&lon=${lon}`
      const [wRes, fRes] = await Promise.all([
        fetch(`/api/weather?${params}`),
        fetch(`/api/forecast?${params}`),
      ])
      if (!wRes.ok) {
        const err = await wRes.json()
        throw new Error(err.error ?? 'Could not fetch weather data')
      }
      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()])
      setWeather(wData)
      setForecast(fData)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(lat: number, lon: number) {
    fetchByCoords(lat, lon)
  }

  function handleGeolocate() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        setLoading(false)
        setError('Location permission denied — try searching for a city')
      }
    )
  }

  React.useEffect(() => {
    handleGeolocate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasData = weather && forecast

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, sm: 4 } }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              Weather Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time weather &amp; 7-day forecast
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <UnitToggle unit={unit} onChange={setUnit} />
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} size="large">
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Search */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} loading={loading} />
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Current weather */}
        <Fade in={loading || !!weather} timeout={400}>
          <Box sx={{ mb: 3 }}>
            {loading
              ? <CurrentWeatherSkeleton />
              : weather
                ? <CurrentWeatherCard data={weather} unit={unit} />
                : <Box />}
          </Box>
        </Fade>

        {/* 7-day forecast */}
        {(loading || hasData) && (
          <Fade in timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1.5}>
                7-Day Forecast
              </Typography>
              {loading
                ? <ForecastSkeleton />
                : forecast
                  ? <ForecastRow data={forecast} unit={unit} />
                  : null}
            </Box>
          </Fade>
        )}

        {/* Temperature chart */}
        {(loading || hasData) && (
          <Fade in timeout={800}>
            <Box>
              {loading ? <ChartSkeleton /> : forecast ? <WeatherChart data={forecast} unit={unit} /> : null}
            </Box>
          </Fade>
        )}

        {/* Empty state */}
        {!loading && !weather && !error && (
          <Box sx={{ textAlign: 'center', mt: 10, color: 'text.secondary' }}>
            <Typography variant="h6">Search for a city to get started</Typography>
            <Typography variant="body2">Or allow location access for local weather</Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}
