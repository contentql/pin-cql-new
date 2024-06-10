import { env } from '@env'
import axios, { AxiosInstance } from 'axios'

// Creating an Axios instance with default configuration
export const vercelAPIAxiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.VERCEL_API_KEY}`,
    // Add other custom default headers here
  },
})
