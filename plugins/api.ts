import axios from 'axios'
import type { AxiosInstance } from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api: AxiosInstance = axios.create({
    baseURL: config.apiBase,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      console.error('API Error:', err)
      return Promise.reject(err)
    }
  )

  return {
    provide: {
      api,
    },
  }
})
