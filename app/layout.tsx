import type { Metadata } from 'next'
import ThemeRegistry from '@/lib/ThemeRegistry'

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'Real-time weather forecast powered by OpenWeatherMap',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
