import axios, { AxiosInstance } from 'axios'

// Creating an Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    // Add other custom default headers here
  },
})

export default axiosInstance
