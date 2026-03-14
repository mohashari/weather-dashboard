'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import { keyframes } from '@mui/system'

// ── Animations ──────────────────────────────────────────────
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.12); opacity: 0.85; }
`
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-4px) rotate(-3deg); }
  40%       { transform: translateX(4px) rotate(3deg); }
  60%       { transform: translateX(-3px) rotate(-2deg); }
  80%       { transform: translateX(3px) rotate(2deg); }
`
const drip = keyframes`
  0%, 100% { transform: translateY(0px) scaleY(1); }
  50%       { transform: translateY(4px) scaleY(0.96); }
`
const swirl = keyframes`
  0%   { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(10deg) scale(1.05); }
  100% { transform: rotate(0deg) scale(1); }
`

// ── Map condition ID → animation ────────────────────────────
function getAnimation(conditionId: number, duration: string) {
  if (conditionId >= 200 && conditionId < 300) return `${shake} ${duration} ease-in-out infinite`      // Thunderstorm
  if (conditionId >= 300 && conditionId < 400) return `${drip} ${duration} ease-in-out infinite`       // Drizzle
  if (conditionId >= 500 && conditionId < 600) return `${drip} ${duration} ease-in-out infinite`       // Rain
  if (conditionId >= 600 && conditionId < 700) return `${float} ${duration} ease-in-out infinite`      // Snow
  if (conditionId >= 700 && conditionId < 800) return `${swirl} ${duration} ease-in-out infinite`      // Atmosphere (fog/mist/haze)
  if (conditionId === 800) return `${spin} ${duration} linear infinite`                                 // Clear sky (sun spin)
  if (conditionId >= 801 && conditionId < 900) return `${float} ${duration} ease-in-out infinite`      // Clouds
  return `${pulse} ${duration} ease-in-out infinite`                                                    // Fallback
}

interface Props {
  icon: string          // OpenWeatherMap icon code e.g. "01d"
  conditionId: number   // OWM condition ID e.g. 800
  description: string
  size?: number         // px
}

export default function AnimatedWeatherIcon({ icon, conditionId, description, size = 80 }: Props) {
  // Slower for clear sky so the spin isn't dizzying; faster for storms
  const duration =
    conditionId === 800 ? '12s' :
    conditionId >= 200 && conditionId < 300 ? '0.5s' :
    '3s'

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: getAnimation(conditionId, duration),
        // Only spin around the center of the image for clear sky
        transformOrigin: conditionId === 800 ? 'center center' : 'center center',
        willChange: 'transform',
      }}
    >
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        width={size}
        height={size}
        style={{ display: 'block' }}
      />
    </Box>
  )
}
