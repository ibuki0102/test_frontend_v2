// api/axiosInstance.ts
import axios from 'axios'

export function createApi(fromServer: boolean = true) {
  const runtimeConfig = useRuntimeConfig()

  return axios.create({
    baseURL: fromServer ? runtimeConfig.apiBase : runtimeConfig.public.apiBase,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
