import styles from "./WeatherDisplay.module.css"
import { Weather } from "@/app/types/models"
import React from "react"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

type WeatherDisplayProps = {
  weather: Weather
  units: "metric" | "imperial"
}

export const WeatherDisplay = ({ weather, units }: WeatherDisplayProps) => {
  const unit = units === "metric" ? "C" : "F"

  const sunriseTime = dayjs
    .unix(weather.sys.sunrise)
    .utc()
    .utcOffset(60)
    .format("H:mm")
  const sunsetTime = dayjs
    .unix(weather.sys.sunset)
    .utc()
    .utcOffset(60)
    .format("H:mm")

  return (
    <div className={styles.weatherDisplay}>
      {/** Temperature */}
      <div className={styles.weatherTemperature}>
        <h1>
          {Math.round(weather.main.temp)} <span>&#176;{unit}</span>
        </h1>
      </div>

      {/** Weather Icon */}
      <div className={styles.weatherImage}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>

      <div className={styles.weatherSunriseSunset}>
        <span>Sunrise: {sunriseTime}</span>
        <span>Sunset: {sunsetTime}</span>
      </div>

      {/** Separator */}
      <hr className={styles.weatherDisplaySeparator} />

      {/** Details, first group - feels like, humidity, pressure */}
      <div className={styles.weatherDetails}>
        <div className={styles.weatherDisplayColumn}>
          <span>Feels Like:</span>
          <span>Humidity:</span>
          <span>Pressure:</span>
        </div>
        <div
          className={[
            styles.weatherDisplayColumn,
            styles.weatherDetailsValues,
          ].join(" ")}
        >
          <span>
            {Math.round(weather.main.feels_like)}&#176;{unit}
          </span>
          <span>{weather.main.humidity}%</span>
          <span>{weather.main.pressure}hPa</span>
        </div>
      </div>

      {/** Separator */}
      <hr className={styles.weatherDisplaySeparator} />

      {/** Details, second group - winds metrics and clouds */}
      <div className={styles.weatherDetails}>
        <div className={styles.weatherDisplayColumn}>
          <span>Wind Speed:</span>
          <span>Wind Direction:</span>
          <span>Cloudiness:</span>
        </div>
        <div
          className={[
            styles.weatherDisplayColumn,
            styles.weatherDetailsValues,
          ].join(" ")}
        >
          <span>
            {weather.wind.speed}
            {units === "metric" ? "m/s" : "mph"}
          </span>
          <span>{weather.wind.deg}deg</span>
          <span>{weather.clouds.all}%</span>
        </div>
      </div>
    </div>
  )
}
