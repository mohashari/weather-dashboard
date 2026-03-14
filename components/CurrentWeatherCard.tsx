'use client'

import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import AnimatedWeatherIcon from './AnimatedWeatherIcon'
import { convertTemp, TempUnit } from './UnitToggle'
import { WeatherData } from '@/types/weather'

interface Props {
  data: WeatherData
  unit: TempUnit
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.75 }}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}


export default function CurrentWeatherCard({ data, unit }: Props) {
  const condition = data.weather[0]
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const unitLabel = unit === 'F' ? '°F' : '°C'

  return (
    <Card
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #1565c0 0%, #0288d1 100%)',
        color: '#fff',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 10 },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* City + Condition chip */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              {data.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
              {data.sys.country}
            </Typography>
          </Box>
          <Chip
            label={condition.description}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', textTransform: 'capitalize', fontWeight: 600 }}
          />
        </Box>

        {/* Animated icon + temperature */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AnimatedWeatherIcon
            icon={condition.icon}
            conditionId={condition.id}
            description={condition.description}
            size={80}
          />
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{ lineHeight: 1, fontSize: { xs: '3rem', sm: '3.75rem' } }}
          >
            {convertTemp(data.main.temp, unit)}{unitLabel}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.85, mb: 3 }}>
          Feels like {convertTemp(data.main.feels_like, unit)}{unitLabel}
          &nbsp;·&nbsp;
          H:{convertTemp(data.main.temp_max, unit)}° &nbsp;
          L:{convertTemp(data.main.temp_min, unit)}°
        </Typography>

        {/* Stats grid */}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <StatItem
              icon={<WaterDropIcon sx={{ opacity: 0.85 }} />}
              label="Humidity"
              value={`${data.main.humidity}%`}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatItem
              icon={<AirIcon sx={{ opacity: 0.85 }} />}
              label="Wind"
              value={`${Math.round(data.wind.speed)} m/s ${(['N','NE','E','SE','S','SW','W','NW'])[Math.round(data.wind.deg / 45) % 8]}`}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatItem
              icon={<VisibilityIcon sx={{ opacity: 0.85 }} />}
              label="Visibility"
              value={`${(data.visibility / 1000).toFixed(1)} km`}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatItem
              icon={<DeviceThermostatIcon sx={{ opacity: 0.85 }} />}
              label="Pressure"
              value={`${data.main.pressure} hPa`}
            />
          </Grid>
        </Grid>

        {/* Sunrise / Sunset */}
        <Box sx={{ display: 'flex', gap: 3, mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            🌅 Sunrise {sunriseTime}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            🌇 Sunset {sunsetTime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
