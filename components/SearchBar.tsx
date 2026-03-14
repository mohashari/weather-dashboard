'use client'

import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { GeoResult } from '@/app/api/geocode/route'

interface Props {
  onSearch: (lat: number, lon: number, label: string) => void
  onGeolocate: () => void
  loading: boolean
}

export default function SearchBar({ onSearch, onGeolocate, loading }: Props) {
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<GeoResult[]>([])
  const [fetching, setFetching] = React.useState(false)

  // Debounce city lookup
  React.useEffect(() => {
    if (inputValue.length < 2) { setOptions([]); return }
    const timer = setTimeout(async () => {
      setFetching(true)
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(inputValue)}`)
        const data: GeoResult[] = await res.json()
        setOptions(data)
      } finally {
        setFetching(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [inputValue])

  function getLabel(opt: GeoResult | string): string {
    if (typeof opt === 'string') return opt
    return [opt.name, opt.state, opt.country].filter(Boolean).join(', ')
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 1,
        borderRadius: 4,
        boxShadow: 3,
        maxWidth: 560,
        width: '100%',
      }}
    >
      <Autocomplete
        sx={{ flex: 1 }}
        freeSolo
        options={options}
        getOptionLabel={getLabel}
        inputValue={inputValue}
        onInputChange={(_, val) => setInputValue(val)}
        onChange={(_, val) => {
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            const geo = val as GeoResult
            onSearch(geo.lat, geo.lon, getLabel(geo))
            setInputValue(getLabel(geo))
          }
        }}
        loading={fetching}
        filterOptions={(x) => x} // server handles filtering
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search city…"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              sx: { px: 1, fontSize: '1rem' },
              endAdornment: fetching ? <CircularProgress size={16} /> : null,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && options.length === 0 && inputValue.trim()) {
                // Fallback: search by city name string if no autocomplete result selected
                fetch(`/api/geocode?q=${encodeURIComponent(inputValue.trim())}`)
                  .then((r) => r.json())
                  .then((data: GeoResult[]) => {
                    if (data[0]) onSearch(data[0].lat, data[0].lon, getLabel(data[0]))
                  })
              }
            }}
          />
        )}
      />
      <Tooltip title="Use my location">
        <IconButton onClick={onGeolocate} aria-label="use my location" disabled={loading} sx={{ mr: 0.5 }}>
          <MyLocationIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  )
}
