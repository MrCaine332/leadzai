import { combine, createEvent, createStore, restore, sample } from "effector"
import { createEffect } from "effector/compat"
import { weatherApi } from "@/app/http/weather-api"
import { status, debounce } from "patronum"
import { Weather } from "@/app/types/models"

type GetWeather = {
  params: {
    q: string
    units: string
  }
  signal?: AbortSignal
}

/** Store */
/** =================================== */
export const $weather = createStore<Weather | null>(null)

/** Events */
/** =================================== */
export const getWeather = createEvent<GetWeather>()
export const debouncedGetWeather = createEvent<GetWeather>()

/** Effects */
/** =================================== */
const getWeatherFx = createEffect<GetWeather, Weather>(
  async ({ params, signal }) => {
    const data = await weatherApi.getWeather({ params, signal })
    return data
  }
)

export const $getWeatherFxStatus = status({ effect: getWeatherFx })
export const $getWeatherFxError = restore(getWeatherFx.failData, null).reset(
  getWeather,
  getWeatherFx.done
)

export const $getWeatherStatus = combine({
  status: $getWeatherFxStatus,
  error: $getWeatherFxError,
})

sample({
  clock: getWeather,
  target: getWeatherFx,
})

debounce({
  source: debouncedGetWeather,
  timeout: 300,
  target: getWeatherFx,
})

sample({
  source: getWeatherFx.doneData,
  target: $weather,
})
