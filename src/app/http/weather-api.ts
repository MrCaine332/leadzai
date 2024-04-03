import $api, { API_URL } from "@/app/http/api"
import { GenericAbortSignal } from "axios"
import { GetWeatherResponse } from "@/app/types/responses"
import { delay } from "@/app/utils/delay"

type GetWeatherArgs = {
  params: {
    q: string
    units: string
  }
  signal?: GenericAbortSignal
}

const getWeather = async ({ params, signal }: GetWeatherArgs) => {
  const { data } = await $api.get<GetWeatherResponse>(`${API_URL}`, {
    signal: signal,
    params: params,
  })
  return data
}

export const weatherApi = {
  getWeather,
}
