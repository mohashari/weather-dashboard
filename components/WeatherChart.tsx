'use client'

import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { convertTemp, TempUnit } from './UnitToggle'
import { ForecastData } from '@/types/weather'

interface Props {
  data: ForecastData
  unit: TempUnit
}

export default function WeatherChart({ data, unit }: Props) {
  const theme = useTheme()
  const unitLabel = unit === 'F' ? '°F' : '°C'

  const chartData = data.list.slice(0, 16).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'short', hour: 'numeric' }),
    temp: convertTemp(item.main.temp, unit),
    feels: convertTemp(item.main.feels_like, unit),
    humidity: item.main.humidity,
  }))

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          48-Hour Temperature Trend ({unitLabel})
        </Typography>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ top: 5, right: 16, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
              unit={unit === 'F' ? '°F' : '°C'}
            />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 12,
                fontSize: 13,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              name="Temp (°C)"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="feels"
              name="Feels like (°C)"
              stroke={theme.palette.secondary.light}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
