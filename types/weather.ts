export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainWeatherData {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface WindData {
  speed: number
  deg: number
  gust?: number
}

export interface CloudsData {
  all: number
}

export interface SysData {
  type?: number
  id?: number
  country: string
  sunrise: number
  sunset: number
}

export interface CoordData {
  lon: number
  lat: number
}

export interface VisibilityData {
  visibility?: number
}

export interface WeatherData {
  coord: CoordData
  weather: WeatherCondition[]
  base: string
  main: MainWeatherData
  visibility: number
  wind: WindData
  clouds: CloudsData
  dt: number
  sys: SysData
  timezone: number
  id: number
  name: string
  cod: number
}

export interface ForecastMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface ForecastItem {
  dt: number
  main: ForecastMain
  weather: WeatherCondition[]
  clouds: CloudsData
  wind: WindData
  visibility: number
  pop: number
  dt_txt: string
}

export interface ForecastCity {
  id: number
  name: string
  coord: CoordData
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface ForecastData {
  cod: string
  message: number
  cnt: number
  list: ForecastItem[]
  city: ForecastCity
}
