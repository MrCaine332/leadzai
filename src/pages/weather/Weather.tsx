import { memo, useEffect } from "react"
import styles from "./Weather.module.css"
import { Container } from "@/components/ui/container/Container"
import { WeatherNavigation } from "@/modules/weather/navigation"
import { WeatherDisplay } from "@/modules/weather/display"
import { useSearchParamsState } from "@/app/hooks/useQueryParamsState"
import { useUnit } from "effector-react"
import { Loader } from "@/components/ui/loader"
import {
  $getWeatherStatus,
  $weather,
  debouncedGetWeather,
  getWeather,
} from "@/app/store/weather"

export const DEFAULT_CITIES = [
  "Lisbon",
  "London",
  "New York",
  "Moscow",
  "Porto",
  "Alanya",
  "Istanbul",
]

export const GetWeatherPending = memo(() => {
  const { status, error } = useUnit($getWeatherStatus)

  if (status !== "pending") return null

  return (
    <div className={styles.weatherPending}>
      <Loader />
    </div>
  )
})

export const GetWeatherError = memo(() => {
  const { status, error } = useUnit($getWeatherStatus)

  if (status !== "fail" || error?.name === "CanceledError") return null

  return (
    <div className={styles.weatherError}>
      Unfortunately, we could not find weather in this city
    </div>
  )
})

export const GetWeatherDone = memo(
  ({ units }: { units: "metric" | "imperial" }) => {
    const weather = useUnit($weather)
    const { status, error } = useUnit($getWeatherStatus)

    if (status !== "done" || weather === null) return null

    return <WeatherDisplay weather={weather} units={units} />
  }
)

export const Weather = () => {
  /** Default value is taken from query params  "location" field
   *  or "Lisbon" if nothing in query params */
  const [location, setLocation] = useSearchParamsState<string>({
    name: "location",
    deserialize: (value) => (value?.trim() ? value : DEFAULT_CITIES[0]),
  })

  /** Default value is taken from query params "units" field
   *  or "metric" if nothing in query params */
  const [units, setUnits] = useSearchParamsState<"metric" | "imperial">({
    name: "units",
    deserialize: (value) => {
      if (value === "metric" || value === "imperial") {
        return value
      }
      return "metric"
    },
  })

  /** Fetch on location change. */
  const onLocationChange = (value: string) => {
    setLocation(value)
    if (!value) return
    debouncedGetWeather({ params: { q: value, units: units } })
  }

  /** Fetch on units change. */
  const onUnitsChange = (value: "metric" | "imperial") => {
    setUnits(value)
    debouncedGetWeather({ params: { q: location, units: value } })
  }

  /** Initial fetch of the weather.
   *  Takes values from query params or default values
   *  of { q: "Lisbon", units: "metric" }
   *  if no value in query params.
   *  */
  useEffect(() => {
    const controller = new AbortController()

    getWeather({
      signal: controller.signal,
      params: { q: location, units: units },
    })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <Container className={styles.weather}>
      <WeatherNavigation
        location={location}
        setLocation={onLocationChange}
        units={units}
        setUnits={onUnitsChange}
      />
      <>
        {/** Api request processing. */}
        {/** GetWeatherDone displays weather if api call is successful. */}
        <GetWeatherPending />
        <GetWeatherError />
        <GetWeatherDone units={units} />
      </>
    </Container>
  )
}
