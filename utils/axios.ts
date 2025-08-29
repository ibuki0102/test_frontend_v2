// api/axiosInstance.ts
import axios from 'axios';

export const createApi = () => {
  const runtimeConfig = useRuntimeConfig(); 

  return axios.create({
    baseURL: runtimeConfig.public.apiBase,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};