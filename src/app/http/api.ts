import axios from "axios"

export const WEATHER_API_KEY = "b0a0c2b3cc7c60e03b9aeadd22f2a184"
export const API_URL = `https://api.openweathermap.org/data/2.5/weather`

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
  params: {
    appid: WEATHER_API_KEY,
  },
})

export default $api
