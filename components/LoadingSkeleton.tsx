'use client'

import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export function CurrentWeatherSkeleton() {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Skeleton variant="text" width={160} height={48} />
            <Skeleton variant="text" width={60} height={28} />
          </Box>
          <Skeleton variant="rounded" width={100} height={32} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={120} height={72} />
        </Box>
        <Skeleton variant="text" width={200} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Skeleton variant="rounded" height={48} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export function ForecastSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Skeleton key={i} variant="rounded" width={120} height={140} sx={{ flexShrink: 0 }} />
      ))}
    </Box>
  )
}

export function ChartSkeleton() {
  return <Skeleton variant="rounded" width="100%" height={300} />
}
