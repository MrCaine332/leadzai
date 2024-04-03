import React from "react"
import styles from "./WeatherNavigation.module.css"
import {
  Combobox,
  ComboboxButton,
  ComboboxClear,
  ComboboxDropdown,
  ComboboxHead,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox/Combobox"
import { Toggle } from "@/components/ui/toggle"
import { DEFAULT_CITIES } from "@/pages/weather/Weather"

type WeatherNavigationProps = {
  location: string
  setLocation: (value: string) => void
  units: "metric" | "imperial"
  setUnits: (value: "metric" | "imperial") => void
}

export const WeatherNavigation = ({
  location,
  setLocation,
  units,
  setUnits,
}: WeatherNavigationProps) => {
  const filteredCities = DEFAULT_CITIES.filter((city) =>
    city.includes(location)
  )

  const onToggle = () => {
    setUnits(units === "metric" ? "imperial" : "metric")
  }

  return (
    <div className={styles.weatherNavigation}>
      <Combobox>
        <ComboboxHead>
          <ComboboxInput
            placeholder="Pick the city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.weatherNavigationInput}
          />
          <ComboboxClear onClick={() => setLocation("")} />
        </ComboboxHead>
        <ComboboxDropdown>
          {filteredCities.length === 0 ? (
            <ComboboxItem>No city found</ComboboxItem>
          ) : (
            filteredCities.map((city, index) => (
              <ComboboxButton key={index} onClick={() => setLocation(city)}>
                {city}
              </ComboboxButton>
            ))
          )}
        </ComboboxDropdown>
      </Combobox>

      <div className={styles.weatherNavigationToggleWrapper}>
        <span>&#176;C</span>
        <Toggle onClick={onToggle} isActive={units === "imperial"} />
        <span>&#176;F</span>
      </div>
    </div>
  )
}
