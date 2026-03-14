'use client'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export type TempUnit = 'C' | 'F'

interface Props {
  unit: TempUnit
  onChange: (unit: TempUnit) => void
}

export function convertTemp(celsius: number, unit: TempUnit): number {
  return unit === 'F' ? Math.round(celsius * 9 / 5 + 32) : Math.round(celsius)
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <ToggleButtonGroup
      value={unit}
      exclusive
      onChange={(_, val) => val && onChange(val)}
      size="small"
      aria-label="temperature unit"
      sx={{ '& .MuiToggleButton-root': { px: 1.5, py: 0.5, fontWeight: 700 } }}
    >
      <ToggleButton value="C">°C</ToggleButton>
      <ToggleButton value="F">°F</ToggleButton>
    </ToggleButtonGroup>
  )
}
