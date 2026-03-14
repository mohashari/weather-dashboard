import { NextRequest, NextResponse } from 'next/server'

const BASE = 'https://api.openweathermap.org/data/2.5'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  let query: string
  if (lat && lon) {
    query = `lat=${lat}&lon=${lon}`
  } else if (city) {
    query = `q=${encodeURIComponent(city)}`
  } else {
    return NextResponse.json({ error: 'city or coordinates required' }, { status: 400 })
  }

  const res = await fetch(`${BASE}/weather?${query}&units=metric&appid=${apiKey}`, {
    next: { revalidate: 300 }, // cache for 5 minutes
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'Weather fetch failed' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
