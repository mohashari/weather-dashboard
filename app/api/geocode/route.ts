import { NextRequest, NextResponse } from 'next/server'

export interface GeoResult {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  if (!q || q.length < 2) return NextResponse.json([])

  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) return NextResponse.json([])
  const data: GeoResult[] = await res.json()
  return NextResponse.json(data)
}
