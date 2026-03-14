'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AnimatedWeatherIcon from './AnimatedWeatherIcon'
import { convertTemp, TempUnit } from './UnitToggle'
import { ForecastData } from '@/types/weather'

interface Props {
  data: ForecastData
  unit: TempUnit
}

interface DayForecast {
  date: string
  icon: string
  conditionId: number
  description: string
  tempMax: number
  tempMin: number
  pop: number
}

function groupByDay(data: ForecastData): DayForecast[] {
  const days: Record<string, DayForecast> = {}

  for (const item of data.list) {
    const date = item.dt_txt.split(' ')[0]
    if (!days[date]) {
      days[date] = {
        date,
        icon: item.weather[0].icon,
        conditionId: item.weather[0].id,
        description: item.weather[0].description,
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        pop: item.pop,
      }
    } else {
      if (item.main.temp_max > days[date].tempMax) days[date].tempMax = item.main.temp_max
      if (item.main.temp_min < days[date].tempMin) days[date].tempMin = item.main.temp_min
      if (item.pop > days[date].pop) days[date].pop = item.pop
      if (item.dt_txt.includes('12:00')) {
        days[date].icon = item.weather[0].icon
        days[date].conditionId = item.weather[0].id
        days[date].description = item.weather[0].description
      }
    }
  }

  return Object.values(days).slice(0, 7)
}

function formatDay(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function ForecastRow({ data, unit }: Props) {
  const days = groupByDay(data)

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': { height: 4 },
        '&::-webkit-scrollbar-thumb': { borderRadius: 2, bgcolor: 'divider' },
      }}
    >
      {days.map((day) => (
        <Card
          key={day.date}
          sx={{
            minWidth: 115,
            flex: '0 0 auto',
            textAlign: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
          }}
        >
          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block">
              {formatDay(day.date)}
            </Typography>
            <Box sx={{ my: 0.5, display: 'flex', justifyContent: 'center' }}>
              <AnimatedWeatherIcon
                icon={day.icon}
                conditionId={day.conditionId}
                description={day.description}
                size={48}
              />
            </Box>
            <Typography variant="body2" fontWeight={700}>
              {convertTemp(day.tempMax, unit)}°
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {convertTemp(day.tempMin, unit)}°
            </Typography>
            {day.pop > 0 && (
              <Typography variant="caption" display="block" color="primary.main" fontWeight={600}>
                💧 {Math.round(day.pop * 100)}%
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
